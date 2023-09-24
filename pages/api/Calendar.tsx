import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { parseISO, formatISO } from 'date-fns';

const prisma = new PrismaClient();

export default async function calendarHandler(req, res) {
    const { method } = req;

    // Obtener el token desde el header Authorization
    const authHeader = req.headers.authorization;
    const myTokenName = authHeader && authHeader.split(' ')[1];

    console.log("Token recibido en calendarHandler:", myTokenName); // Añadido

    if (!myTokenName) {
        return res.status(401).json({ message: "No estás autenticado." });
    }

    let userData;
    try {
        userData = jwt.verify(myTokenName, process.env.JWT_SECRET);
        console.log("Datos del usuario después de la verificación:", userData); // Añadido
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).json({ message: "Token inválido o ha ocurrido un error al decodificarlo." });
    }

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
            if (!userData.userId) {
                console.error("ID de usuario no encontrado en el token:", userData);
                return res.status(400).json({ error: "El ID del usuario es necesario para crear un evento." });
            }

            const { Subject, StartTime, EndTime, PatientId } = req.body;

            try {
                console.log("New Event Data:", req.body);

                // Formatea las fechas a un formato completo ISO-8601 DateTime
                const formattedStartTime = formatISO(parseISO(StartTime));
                const formattedEndTime = formatISO(parseISO(EndTime));

                const event = await prisma.event.create({
                    data: {
                        Subject: Subject,
                        StartTime: formattedStartTime,
                        EndTime: formattedEndTime,
                        Patient: {
                            connect: {
                                id: PatientId,
                            }
                        },
                        user: {
                            connect: {
                                id: userData.userId
                            }
                        }
                    },
                });

                res.status(201).json(event);
            } catch (e) {
                console.error("Error al crear el evento:", e);
                res.status(500).json({ error: "No se pudo crear el evento", details: e.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
