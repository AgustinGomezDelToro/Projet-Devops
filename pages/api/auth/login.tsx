import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const prisma = new PrismaClient();

export default async function loginHandler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end(); // Método no permitido
    }

    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Comparación con bcrypt:
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Genera un token JWT:
        const token = jwt.sign({ userId: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // Serializa la cookie:
        const serializedCookie = cookie.serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60 * 24,
            path: '/',
            sameSite: 'strict',
        });

        // Set the cookie header:
        res.setHeader('Set-Cookie', serializedCookie);
        return res.json({ message: "Inicio de sesión exitoso!", token: token });


    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor", error: process.env.NODE_ENV === 'development' ? error.message : undefined });
    }

}
