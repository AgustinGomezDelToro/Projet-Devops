import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function patientsHandler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const patients = await prisma.pacientes.findMany(); // Asume que tienes una tabla llamada 'pacientes'
                res.status(200).json(patients);
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Erreur lors de la récupération des patients:", error.message);
                    res.status(500).json({ error: "Erreur lors de la récupération des patients", details: error.message });
                }
            }
            break;

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).json({ error: `Méthode ${method} non autorisée` });
    }
}
