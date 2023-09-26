import {verify} from 'jsonwebtoken';

export default function profileHandler(req, res) {
    const {myTokenName} = req.cookies;

    if (!myTokenName) {
        return res.status(401).json({ message: "No estás autenticado." });
    }

    try {
        const user = verify(myTokenName, process.env.JWT_SECRET);
        console.log("User decoded from token:", user);
        return res.json(user);
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).json({ message: "Token inválido o ha ocurrido un error al decodificarlo." });
    }
}
