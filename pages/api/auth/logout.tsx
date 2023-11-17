import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).end(); // Méthode non autorisée
    }

    // Supprime le cookie en fixant sa date d'expiration dans le passé
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('myTokenName', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0),
            path: '/',
            sameSite: 'strict',
        })
    );

    return res.json({ message: "Session fermée avec succès" });
}
