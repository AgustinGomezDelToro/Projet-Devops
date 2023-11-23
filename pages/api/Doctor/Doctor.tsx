import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function doctorHandler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const doctor = await prisma.doctorazerty.findMany();// Asegúrate de que 'doctorazerty' sea el nombre correcto del modelo en tu esquema Prisma
                res.status(200).json(doctor);
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Erreur lors de la récupération des médecins:", error.message);
                    res.status(500).json({ error: "Erreur lors de la récupération des médecins", details: error.message });
                }
            }
            break;

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).json({ error: `Méthode ${method} non autorisée` });
    }
}
