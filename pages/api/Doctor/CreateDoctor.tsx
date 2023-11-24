import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function createDoctorHandler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const { name, email, telephone, speciality } = req.body;

                if (!name || !email || !telephone) {
                    return res.status(400).json({ error: "Des données nécessaires pour créer le médecin sont manquantes." });
                }

                const doctor = await prisma.doctorazerty.create({
                    data: {
                        name,
                        email,
                        telephone,
                        speciality,
                        eventsHistory: "Agenda",
                    }
                });
                res.status(201).json(doctor);
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Erreur lors de la création du médecin :", error.message);
                    res.status(500).json({ error: "Erreur lors de la création du médecin", details: error.message });
                } else {
                    console.error("Erreur inconnue :", error);
                    res.status(500).json({ error: "Erreur inconnue" });
                }
            }
            break;

        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).json({ error: `Méthode ${method} non autorisée` });
    }
}
