import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Box, Button, Stack, Center, FormControl, FormLabel, FormErrorMessage, Input, Text, Heading } from '@chakra-ui/react';
import { Field, Form, Formik, FormikHelpers, FieldProps } from 'formik';
import * as Yup from 'yup';

interface LoginCredentials {
    email: string;
    password: string;
}

// Función para iniciar sesión
export const loginUser = async (credentials: LoginCredentials): Promise<string | false> => {
    try {
        const response = await axios.post("/api/auth/login", credentials);
        console.log("Respuesta de loginUser", response.data); // Depuración: Imprime la respuesta
        if (response.data.message === "Connexion réussie !") {
            return response.data.token;
        } else {
            console.log(response.data);
            return false;
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erreur lors de la connexion :", error.message);
        } else {
            console.error("Erreur lors de la connexion :", error);
        }
        return false;
    }
};

// Esquema de validación
const validationSchema = Yup.object({
    email: Yup.string().email("Email non valide").required("Champ requis"),
    password: Yup.string().required("Champ requis"),
});

function Login() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (values: LoginCredentials, actions: FormikHelpers<LoginCredentials>) => {
        console.log("handleSubmit ejecutado", values); // Depuración: Confirma que handleSubmit se llama
        const token = await loginUser(values);
        actions.setSubmitting(false);

        if (token) {
            console.log("Intentando redirigir a /dashboard"); // Depuración: Confirma intento de redirección
            setSuccessMessage("Connexion réussie !");
            setErrorMessage(null);
            router.push('/dashboard').catch(err => console.error("Error en redirección", err)); // Captura errores de redirección
        } else {
            setErrorMessage("Échec de la connexion. Veuillez réessayer.");
            setSuccessMessage(null);
        }
    };

    return (
        <>
            <Box mb={8} textAlign="center" mt={20}>
                <Heading size="2xl">Se connecter</Heading>
            </Box>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <Form>
                        <Stack m={450} spacing={4} mt={6}>
                            <Field name='email'>
                                {({ field, form }: FieldProps) => (
                                    <FormControl isInvalid={Boolean(form.errors.email) && Boolean(form.touched.email)}>
                                        <FormLabel fontWeight="bold">Email:</FormLabel>
                                        <Input {...field} type="email" placeholder="Email" />
                                        <FormErrorMessage>
                                            {typeof form.errors.email === 'string' ? form.errors.email : ''}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='password'>
                                {({ field, form }: FieldProps) => (
                                    <FormControl isInvalid={Boolean(form.errors.password) && Boolean(form.touched.password)}>
                                        <FormLabel mt={10} fontWeight="bold">Mot de passe:</FormLabel>
                                        <Input {...field} type="password" placeholder="Mot de passe" />
                                        <FormErrorMessage>
                                            {typeof form.errors.password === 'string' ? form.errors.password : ''}
                                        </FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Center>
                                <Button mt={10} colorScheme='teal' type="submit">
                                    Se connecter
                                </Button>
                            </Center>
                        </Stack>
                        {errorMessage && <Text color="red.500" fontSize="xl" fontWeight="bold" textAlign="center">{errorMessage}</Text>}
                        {successMessage && <Text color="green.500" fontSize="xl" fontWeight="bold" textAlign="center">{successMessage}</Text>}
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Login;
