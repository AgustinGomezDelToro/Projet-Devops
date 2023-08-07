import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

function SignIn() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

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
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // Manejo de errores basado en la respuesta del servidor
        if (!response.ok) {
            const errorData = await response.json();
            setErrorMessage(errorData.error);
            return;
        }

        // Si la respuesta fue exitosa, limpiar cualquier mensaje de error anterior
        setErrorMessage("");
        setSuccessMessage("Usuario registrado con éxito.");

        // Autenticar al usuario después de un registro exitoso
        try {
            await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                callbackUrl: `${window.location.origin}/dashboard`,
                redirect: false,
            });

            // Si el inicio de sesión fue exitoso, redirige al usuario al dashboard
            router.push("/dashboard");
        } catch (error) {
            setErrorMessage("Error durante el inicio de sesión");
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" name="name" placeholder="Nombre" required />
            <input type="email" name="email" placeholder="Email" required />
            <input
                type="password"
                name="password"
                placeholder="Contraseña"
                required
            />
            <select name="role" required>
                <option value="ADMINISTRADOR">Administrador</option>
                <option value="ODONTOLOGO">Odontólogo</option>
                <option value="PACIENTE">Paciente</option>
            </select>
            <button type="submit">Registrarse</button>
            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
        </form>
    );
}

export default SignIn;
