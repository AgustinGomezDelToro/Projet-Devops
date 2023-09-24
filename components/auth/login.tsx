import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Box, Button, Center, FormControl, FormLabel, FormErrorMessage, Input, Text, Heading } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

// Función para iniciar sesión
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post('/api/auth/login', credentials);
        if (response.data.message === "Inicio de sesión exitoso!") {
            return response.data.token;  // Devuelve el token en caso de éxito
        } else {
            console.log(response.data);
            return false;
        }
    } catch (error) {
        console.error("Hubo un error al iniciar sesión:", error.response?.data);
        return false;
    }
};

// Esquema de validación
const validationSchema = Yup.object({
    email: Yup.string().email('Correo no válido').required('Campo requerido'),
    password: Yup.string().required('Campo requerido'),
});

function Login() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (values, actions) => {
        const token = await loginUser(values); // Recibe el token o false si el inicio de sesión no es exitoso
        actions.setSubmitting(false);

        if (token) {

            setSuccessMessage("Inicio de sesión exitoso!");
            setErrorMessage(null);
            router.push('/dashboard');
        } else {
            setErrorMessage("Fallo en el inicio de sesión. Por favor, inténtelo de nuevo.");
            setSuccessMessage(null);
        }
    };

    return (
        <>
            <Box mb={8} textAlign="center" mt={20}>
                <Heading size="2xl">Iniciar Sesión</Heading>
            </Box>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <Form>
                        <Box m={450} spacing={4} mt={6}>
                            <Field name='email'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                        <FormLabel fontWeight="bold">Email:</FormLabel>
                                        <Input {...field} type="email" placeholder="Email" />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='password'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                        <FormLabel mt={10} fontWeight="bold">Contraseña:</FormLabel>
                                        <Input {...field} type="password" placeholder="Contraseña" />
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Center>
                                <Button mt={10} colorScheme='teal' type="submit" isLoading={props.isSubmitting}>
                                    Iniciar sesión
                                </Button>
                            </Center>
                        </Box>
                        {errorMessage && <Text color="red.500" fontSize="xl" fontWeight="bold" textAlign="center">{errorMessage}</Text>}
                        {successMessage && <Text color="green.500" fontSize="xl" fontWeight="bold" textAlign="center">{successMessage}</Text>}
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default Login;
