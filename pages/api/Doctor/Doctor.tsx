import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function doctorHandler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req;

    switch (method) {
        case 'GET':
            try {
                let orderBy;
                const sortMethod = query.sort as string;

                // Determinar el orden basado en el parámetro 'sort'
                switch (sortMethod) {
                    case 'name':
                        orderBy = { name: 'asc' }; // Orden alfabético
                        break;
                    case 'createdAt':
                    default:
                        orderBy = { createAt: 'desc' }; // Los más recientes primero
                        break;
                }

                const doctors = await prisma.doctorazerty.findMany({
                    orderBy: orderBy,
                });


                res.status(200).json(doctors);
            } catch (error: any) { // Especificamos 'any' como tipo para 'error'
                console.error("Error durante la recuperación de los médicos:", error.message);
                res.status(500).json({ error: "Error durante la recuperación de los médicos", details: error.message });
            }
            break;

        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).json({ error: `Método ${method} no permitido` });
    }
}
