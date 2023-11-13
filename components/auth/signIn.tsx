import { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, FormControl, FormLabel, FormErrorMessage, Select, Input, Center, Text, Stack } from '@chakra-ui/react';
import { Formik, Field, Form, FieldProps } from 'formik';
import * as Yup from 'yup';
import Header from "../Header";

interface RegisterValues {
    name: string;
    email: string;
    password: string;
    role: string;
}

function SignIn() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const router = useRouter();

    const validationSchema = Yup.object({
        name: Yup.string().required('Le nom est requis'),
        email: Yup.string()
            .email("L'email n'est pas valide")
            .required("L'email est requis"),
        password: Yup.string().required('Le mot de passe est requis').test('is-strong', 'Le mot de passe est trop faible', value => value !== 'azerty' && value !== 'qwerty'),
        role: Yup.string().required('Le rôle est requis')
    });

    const handleRegister = async (values: RegisterValues) => {
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
            return;
        }

        setErrorMessage("");
        setSuccessMessage("Utilisateur enregistré avec succès.");

        await router.push("/dashboard");
    };

    return (
        <>
            <Header />
            <Box width={["100%", "80%", "60%", "40%"]} mx="auto" mt={10}>
                <Center mt={6}>
                    <h1>Enregistrer un utilisateur</h1>
                </Center>

                <Formik initialValues={{ name: '', email: '', password: '', role: '' }} validationSchema={validationSchema} onSubmit={handleRegister}>
                    {props => (
                        <Form>
                            <Stack m={4} mt={6} spacing={4}>
                                <Field name='name'>
                                    {({ field, form }: FieldProps) => (
                                        <FormControl isInvalid={Boolean(form.errors.name) && Boolean(form.touched.name)}>
                                            <FormLabel>Nom et prénom :</FormLabel>
                                            <Input {...field} type="text" placeholder="Nom et prénom" />
                                            <FormErrorMessage>{typeof form.errors.name === 'string' ? form.errors.name : ''}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name='email'>
                                    {({ field, form }: FieldProps) => (
                                        <FormControl isInvalid={Boolean(form.errors.email) && Boolean(form.touched.email)}>
                                            <FormLabel>Email :</FormLabel>
                                            <Input {...field} type="email" placeholder="Email" />
                                            <FormErrorMessage>{typeof form.errors.email === 'string' ? form.errors.email : ''}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name='password'>
                                    {({ field, form }: FieldProps) => (
                                        <FormControl isInvalid={Boolean(form.errors.password) && Boolean(form.touched.password)}>
                                            <FormLabel>Mot de passe :</FormLabel>
                                            <Input {...field} type="password" placeholder="Mot de passe" />
                                            <FormErrorMessage>{typeof form.errors.password === 'string' ? form.errors.password : ''}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field name='role'>
                                    {({ field, form }: FieldProps) => (
                                        <FormControl isInvalid={Boolean(form.errors.role) && Boolean(form.touched.role)}>
                                            <FormLabel>Rôle :</FormLabel>
                                            <Select {...field}>
                                                <option value="" label="Sélectionner un statut" />
                                                <option value="ADMINISTRADOR" label="Administrateur" />
                                                <option value="ODONTOLOGO" label="Dentiste" />
                                                <option value="PACIENTE" label="Patient" />
                                            </Select>
                                            <FormErrorMessage>{typeof form.errors.role === 'string' ? form.errors.role : ''}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Center>
                                    <Button mt={4} colorScheme='teal' type="submit" isLoading={props.isSubmitting}>
                                        Enregistrer l'utilisateur
                                    </Button>
                                </Center>
                            </Stack>

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
