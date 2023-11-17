import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function calendarHandler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    interface EventData {
        Subject: string;
        StartTime: Date;
        EndTime: Date;
        Color: string;
        Patient?: { connect: { id: number } };
    }

    switch (method) {
        case 'GET':
            try {
                const events = await prisma.event.findMany();
                res.status(200).json(events);
            } catch (e) {
                if (e instanceof Error) {
                    console.error("Erreur lors de la récupération des événements:", e);
                    res.status(500).json({ error: "Impossible de récupérer les événements", details: e.message });
                }
            }
            break;

        case 'POST':
            const { Subject, StartTime, EndTime, PatientId, Color } = req.body;

            try {
                console.log("Nouvelles données d'événement:", req.body);

                const eventData: EventData = {
                    Subject,
                    StartTime: new Date(StartTime),
                    EndTime: new Date(EndTime),
                    Color,
                    Patient: PatientId ? { connect: { id: PatientId } } : undefined
                };

                const event = await prisma.event.create({
                    data: eventData,
                });

                res.status(201).json(event);
            } catch (e) {
                if (e instanceof Error) {
                    console.error("Erreur lors de la création de l'événement:", e);
                    res.status(500).json({ error: "Impossible de créer l'événement", details: e.message });
                }
            }
            break;

        case 'DELETE':
            const eventId = Number(req.query.eventId);
            if (isNaN(eventId)) {
                res.status(400).json({ error: "ID de l'événement invalide" });
                return;
            }
            try {
                await prisma.event.delete({
                    where: { id: eventId },
                });
                res.status(200).json({ message: "Événement supprimé avec succès" });
            } catch (e) {
                if (e instanceof Error) {
                    console.error("Erreur lors de la suppression de l'événement:", e);
                    res.status(500).json({ error: "Impossible de supprimer l'événement", details: e.message });
                }
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Méthode ${method} non autorisée`);
    }
}
