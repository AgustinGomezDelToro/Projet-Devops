import { signIn } from "next-auth/react";

function Login() {
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn('credentials', {
            email,
            password,
            callbackUrl: "/tu-pagina-de-redireccion-despues-del-login" // opcional
        });
    }

    return (
        <form onSubmit={handleLogin}>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Contraseña" required />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
}

export default Login;
