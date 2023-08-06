import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
    providers: [
        Providers.Credentials({
            id: 'credentials',
            authorize: async (credentials) => {
                const user = { id: 1, name: "User", email: "user@example.com", role: "ODONTOLOGO" }; // Puedes reemplazar esto con la lógica para buscar al usuario en tu base de datos.

                if (user) {
                    return Promise.resolve(user);
                } else {
                    return Promise.reject(new Error('Las credenciales son incorrectas'));
                }
            },
        }),
    ],
    database: process.env.DATABASE_URL,
});
