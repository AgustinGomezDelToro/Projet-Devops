// /Applications/MAMP/htdocs/clinica-uja-next/clinica-uja/pages/api/profile.tsx
import {verify} from 'jsonwebtoken';

export default function profileHandler(req, res) {
    const {myTokenName} = req.cookies;

    if (!myTokenName) {
        return res.status(401).json({ message: "No estás autenticado." });
    }

    try {
        const user = verify(myTokenName, process.env.JWT_SECRET);
        console.log(user);
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: "Token inválido o ha ocurrido un error al decodificarlo." });
    }
}
