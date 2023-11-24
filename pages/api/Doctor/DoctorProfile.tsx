import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function doctorProfileHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            let { name } = req.query;
            name = (name as string).replace(/-/g, ' ');

            const doctor = await prisma.doctorazerty.findFirst({
                where: { name },
                select: {
                    name: true,
                    email: true,
                    telephone: true,
                    speciality: true,
                }
            });

            if (!doctor) {
                return res.status(404).json({ message: "Doctor no encontrado" });
            }

            res.status(200).json(doctor);
        } catch (error) {
            console.error("Error en la obtención del doctor:", error);
            res.status(500).json({ message: "Error interno del servidor" });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} No Permitido`);
    }
}
