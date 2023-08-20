import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import {router} from "next/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, password, role } = req.body;

// Validar el correo electrónico
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: 'El email ya existe en nuestro sistema, por favor elige otro.' });
  }


  // Hashear la contraseña
  const hashedPassword = await hash(password, 10);


  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        createAt: new Date(),
        updateAt: new Date(),
      }
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
}
