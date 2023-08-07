import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface ExtendedUser extends User {
    role: string;
}

const prisma = new PrismaClient();

const options = {
    providers: [
        Providers.Credentials({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "" },
                password: {  label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user) {
                    throw new Error('No user found')
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    throw new Error('Incorrect password')
                }

                return { id: user.id, name: user.name, email: user.email, role: user.role }
            },
        }),
    ],
    callbacks: {
        session: async (session, user: ExtendedUser & JWT) => {
            session.user.role = user.role;
            return session;
        },
        jwt: async (token, user: ExtendedUser) => {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
    },
};

export default NextAuth(options);
