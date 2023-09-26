import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function calendarHandler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const events = await prisma.event.findMany();
                res.status(200).json(events);
            } catch (e) {
                console.error("Error al obtener eventos:", e);
                res.status(500).json({ error: "No se pudieron obtener los eventos", details: e.message });
            }
            break;

        case 'POST':
            const { Subject, StartTime, EndTime, PatientId, Color } = req.body;

            try {
                console.log("New Event Data:", req.body);

                const eventData = {
                    Subject: Subject,
                    StartTime: StartTime,
                    EndTime: EndTime,
                    Color: Color,
                };

                // Si PatientId es proporcionado, entonces lo añadimos a la conexión
                if (PatientId) {
                    eventData.Patient = {
                        connect: {
                            id: PatientId,
                        }
                    };
                }

                const event = await prisma.event.create({
                    data: eventData,
                });

                res.status(201).json(event);
            } catch (e) {
                console.error("Error al crear el evento:", e);
                res.status(500).json({ error: "No se pudo crear el evento", details: e.message });
            }
            break;


        case 'DELETE':
            const { id } = req.body;

            try {
                await prisma.event.delete({
                    where: {
                        id: id,
                    },
                });

                res.status(200).json({ message: "Evento eliminado con éxito" });
            } catch (e) {
                console.error("Error al eliminar el evento:", e);
                res.status(500).json({ error: "No se pudo eliminar el evento", details: e.message });
            }
            break;


        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
