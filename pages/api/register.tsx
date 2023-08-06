import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const hashedPassword = await hash(req.body.password, 10);

  const newUser = await prisma.users.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      createAt: new Date(),
      updateAt: new Date(),
      // Asegúrate de que uuid y otros campos se manejen adecuadamente
    }
  });

  res.json(newUser);
}
