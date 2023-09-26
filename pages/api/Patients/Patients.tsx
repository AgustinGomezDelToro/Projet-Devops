import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function patientsHandler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const patients = await prisma.pacientes.findMany(); // Asume que tienes una tabla llamada 'pacientes'
                res.status(200).json(patients);
            } catch (e) {
                res.status(500).json({ error: "No se pudieron obtener los pacientes" });
            }
            break;

        // Aquí puedes agregar más casos si deseas realizar otras operaciones como POST, PUT, DELETE, etc.

        default:
            res.setHeader('Allow', ['GET']); // Si solo vas a permitir GET, solo coloca GET en este array.
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
