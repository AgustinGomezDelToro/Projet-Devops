import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const users = await prisma.user.findMany({ select: { id: true, name: true } });
            res.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                console.error("Erreur lors de la récupération des utilisateurs:", error.message);
                res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs", details: error.message });
            }
        }
    } else {
        res.status(405).json({ error: 'Méthode non autorisée' });
    }
}
