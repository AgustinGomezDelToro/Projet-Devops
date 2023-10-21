// /Applications/MAMP/htdocs/clinica-uja-next/clinica-uja/pages/api/Calendar/getPatientName.js

import { PrismaClient } from '@prisma/client';
import {NextApiRequest, NextApiResponse} from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { eventId } = req.query;

        if (!eventId) {
            return res.status(400).json({ error: 'El parámetro eventId es requerido' });
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
                return res.status(404).json({ error: 'Evento no encontrado' });
            }

            const patientName = specificEventWithPatient.Patient?.name || 'Desconocido';
            return res.status(200).json({ patientName });

        } catch (error) {
            console.error("Error al recuperar el evento y el paciente:", error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    } else {
        return res.status(405).json({ error: 'Método no permitido' });
    }
}
