import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

interface LoginRequest {
    email: string;
    password: string;
}

interface ApiResponse {
    message: string;
    token?: string;
    error?: string;
}

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    if (req.method !== "POST") {
        return res.status(405).end(); // Méthode non autorisée
    }

    const { email, password } = req.body as LoginRequest;

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Comparaison avec bcrypt :
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // Génère un token JWT :
        const token = jwt.sign({ userId: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET!, {
            expiresIn: "1d",
        });

        // Sérialise le cookie :
        const serializedCookie = cookie.serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24,
            path: '/',
            sameSite: 'strict',
        });

        // Définit l'en-tête du cookie :
        res.setHeader('Set-Cookie', serializedCookie);
        return res.json({ message: "Connexion réussie!", token: token });

    } catch (error) {
        return res.status(500).json({
            message: "Erreur interne du serveur",
            error: process.env.NODE_ENV === 'development' ? 'Erreur inconnue' : undefined
        });
    }
}


