import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, FormControl, FormLabel, FormErrorMessage, Select, Input, Center, Text } from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import Header from "../Header";
import { loginUser } from '../auth/login.tsx';


function SignIn() {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es requerido'),
        email: Yup.string()
            .email('El email no es válido')
            .required('El email es requerido'),
        password: Yup.string().required('La contraseña es requerida').test('is-strong', 'La contraseña es demasiado débil', value => value !== 'azerty' && value !== 'qwerty'
            ),
        role: Yup.string().required('El rol es requerido')
    });



    const handleRegister = async (values, actions) => {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setErrorMessage(errorData.error);
            actions.setSubmitting(false);
            return;
        }

        setErrorMessage("");
        setSuccessMessage("Usuario registrado con éxito.");

        router.push("/dashboard");
    };



    return (
        <>
            <Header />
        <Box width={["100%", "80%", "60%", "40%"]} mx="auto" mt={10}>
            <Center m={4} spacing={4} mt={6}>
                <h1>Registre un usuario</h1>
            </Center>

            <Formik initialValues={{ name: '', email: '', password: '', role: '' }} validationSchema={validationSchema} onSubmit={handleRegister}>
                {props => (
                    <Form>
                        <Box m={4} spacing={4} mt={6}>
                            <Field name='name'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <FormLabel>Nombre y apellido:</FormLabel>
                                        <Input {...field} type="text" placeholder="Nombre y apellido" />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='email'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                        <FormLabel>Email:</FormLabel>
                                        <Input {...field} type="email" placeholder="Email" />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='password'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                        <FormLabel>Contraseña:</FormLabel>
                                        <Input {...field} type="password" placeholder="Contraseña" />
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name='role'>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.role && form.touched.role}>
                                        <FormLabel>Role:</FormLabel>
                                        <Select {...field}>
                                            <option value="" label="Selecciona status" />
                                            <option value="ADMINISTRADOR" label="Administrador" />
                                            <option value="ODONTOLOGO" label="Odontólogo" />
                                            <option value="PACIENTE" label="Paciente" />
                                        </Select>
                                        <FormErrorMessage>{form.errors.role}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Center>
                                <Button mt={4} colorScheme='teal' type="submit" isLoading={props.isSubmitting}>
                                    Registrar usuario
                                </Button>
                            </Center>
                        </Box>

                        {errorMessage && <Text color="red.500" fontSize="xl" fontWeight="bold" textAlign="center">{errorMessage}</Text>}
                        {successMessage && <Text color="green.500" fontSize="xl" fontWeight="bold" textAlign="center">{successMessage}</Text>}
                    </Form>
                )}
            </Formik>
        </Box>
            </>
    );
}

export default SignIn;
