import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select,
    Input, Center
} from '@chakra-ui/react'

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
        <Box width={["100%", "80%", "60%", "40%"]} mx="auto" mt={10}>
        <Center m={4} spacing={4} mt={6} >
            <h1>Registre un usuario</h1>
        </Center>

        <form onSubmit={handleRegister}>
            <Box m={4} spacing={4} mt={6}>
                <FormControl>
                    <FormLabel>Nombre : </FormLabel>
                    <Input type="text" name="name" placeholder="Nombre" isRequired />
                </FormControl>
            </Box>

            <Box m={4} spacing={4} textColor={"blue.900"}>
                <FormControl>
                    <FormLabel>Email : </FormLabel>
                    <Input type="email" name="email" placeholder="Email" isRequired />
                </FormControl>
            </Box>

            <Box m={4} spacing={4}>
                <FormControl>
                    <FormLabel>Contraseña : </FormLabel>
                    <Input type="password" name="password" placeholder="Contraseña" isRequired/>
                </FormControl>
            </Box>

            <Box m={4} spacing={4}>
                <FormControl>
                    <FormLabel>Role : </FormLabel>
                    <Select name="role" placeholder='Select role' isRequired>
                        <option value="ADMINISTRADOR">Administrador</option>
                        <option value="ODONTOLOGO">Odontólogo</option>
                        <option value="PACIENTE">Paciente</option>
                    </Select>
                </FormControl>
            </Box>


            <Button colorScheme='teal' type="submit">Registrar usuario</Button>
            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
        </form>
        </Box>
    );
}

export default SignIn;
