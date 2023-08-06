import { signIn } from "next-auth/react";

function SignIn() {
    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            role: e.target.role.value,
        };

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(errorData);
        }

        const data = await response.json();


        signIn('credentials', {
            email: formData.email,
            password: formData.password,
            callbackUrl: "/signin" // opcional
        });
    }

    return (
        <form onSubmit={handleRegister}>
            <input type="text" name="name" placeholder="Nombre" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Contraseña" required />
            <select name="role" required>
                <option value="ADMINISTRADOR">Administrador</option>
                <option value="ODONTOLOGO">Odontólogo</option>
                <option value="PACIENTE">Paciente</option>
            </select>
            <button type="submit">Registrarse</button>
        </form>
    );
}

export default SignIn;
