import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function calendarHandler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const events = await prisma.event.findMany(); // Asume que tienes una tabla llamada 'event'
                res.status(200).json(events);
            } catch (e) {
                res.status(500).json({ error: "No se pudieron obtener los eventos" });
            }
            break;

        case 'POST':
            try {
                const newEvent = req.body;
                const event = await prisma.event.create({
                    data: newEvent,
                });
                res.status(201).json(event);
            } catch (e) {
                res.status(500).json({ error: "No se pudo crear el evento" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

