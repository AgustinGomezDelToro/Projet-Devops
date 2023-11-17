import { verify } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default function profileHandler(req: NextApiRequest, res: NextApiResponse) {
    const { myTokenName } = req.cookies;

    if (!myTokenName) {
        return res.status(401).json({ message: "Vous n'êtes pas authentifié." });
    }

    try {
        const user = verify(myTokenName, process.env.JWT_SECRET as string);
        console.log("Utilisateur décodé du token:", user);
        return res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erreur lors de la vérification du token:", error.message);
            return res.status(500).json({ message: "Token invalide ou erreur lors du décodage.", details: error.message });
        }
    }
}
