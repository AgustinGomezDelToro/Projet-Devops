import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { name, email, password, role } = req.body;

  // Valider le email
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ error: 'L\'email existe déjà dans notre système, veuillez en choisir un autre.' });
  }

  // Hashear le mdp
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
    if (error instanceof Error) {
      console.error("Erreur lors du traitement de votre demande:", error.message);
      res.status(500).json({ error: 'Une erreur est survenue lors du traitement de votre demande', details: error.message });
    }
  }
}
