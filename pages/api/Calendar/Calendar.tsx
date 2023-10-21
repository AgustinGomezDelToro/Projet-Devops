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
            } catch (e: any) {
                console.error("Error al obtener eventos:", e);
                res.status(500).json({ error: "No se pudieron obtener los eventos", details: e.message });
            }
            break;

        case 'POST':
            const { Subject, StartTime, EndTime, PatientId, Color } = req.body;

            try {
                console.log("New Event Data:", req.body);

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
            } catch (e: any) {
                console.error("Error al crear el evento:", e);
                res.status(500).json({ error: "No se pudo crear el evento", details: e.message });
            }
            break;

        case 'DELETE':
            const eventId = Number(req.query.eventId);
            if (isNaN(eventId)) {
                res.status(400).json({ error: "ID de evento inválido" });
                return;
            }
            try {
                await prisma.event.delete({
                    where: { id: eventId },
                });
                res.status(200).json({ message: "Evento eliminado con éxito" });
            } catch (e: any) {
                console.error("Error al eliminar el evento:", e);
                res.status(500).json({ error: "No se pudo eliminar el evento", details: e.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
