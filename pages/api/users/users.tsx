import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const users = await prisma.user.findMany({ select: { id: true, name: true } });
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los usuarios" });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
