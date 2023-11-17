import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { eventId } = req.query;

        if (!eventId) {
            return res.status(400).json({ error: 'Le paramètre eventId est requis' });
        }

        try {
            const specificEventWithPatient = await prisma.event.findUnique({
                where: {
                    id: parseInt(eventId as string)
                },
                include: {
                    Patient: true
                }
            });

            if (!specificEventWithPatient) {
                return res.status(404).json({ error: 'Événement non trouvé' });
            }

            const patientName = specificEventWithPatient.Patient?.name || 'Inconnu';
            return res.status(200).json({ patientName });

        } catch (error) {
            if (error instanceof Error) {
                console.error("Erreur lors de la récupération de l'événement et du patient :", error.message);
                return res.status(500).json({ error: 'Erreur interne du serveur', details: error.message });
            }
        }
    } else {
        return res.status(405).json({ error: 'Méthode non autorisée' });
    }
}
