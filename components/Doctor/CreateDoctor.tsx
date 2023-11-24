import React, { useState } from "react";
import { useRouter } from "next/router";
import {
    Box, Button, FormControl, FormLabel, FormErrorMessage, Input,
    Center, Stack, Heading, Text
} from '@chakra-ui/react';
import { Formik, Field, Form, FieldProps } from 'formik';
import * as Yup from 'yup';

interface DoctorValues {
    name: string;
    email: string;
    telephone: string;
    speciality?: string;
}

function CreateDoctor() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const router = useRouter();

    const validationSchema = Yup.object({
        name: Yup.string().required('Le nom est requis'),
        email: Yup.string().email("L'email n'est pas valide").required("L'email est requis"),
        telephone: Yup.string().required('Le numéro de téléphone est requis'),
        speciality: Yup.string()
    });

    const handleCreateDoctor = async (values: DoctorValues) => {
        const response = await fetch("/api/Doctor/CreateDoctor", {
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
        setSuccessMessage("Médecin enregistré avec succès.");
        router.push("/doctors");
    };

    return (
        <Box width={["100%", "80%", "60%", "40%"]} mx="auto" mt={10}>
            <Center mt={2} mb={6}>
                <Heading mb={2}>Enregistrer un médecin</Heading>
            </Center>

            <Formik
                initialValues={{ name: '', email: '', telephone: '', speciality: '' }}
                validationSchema={validationSchema}
                onSubmit={handleCreateDoctor}
            >
                {props => (
                    <Form>
                        <Stack spacing={4}>
                            <Field name="name">
                                {({ field, form }: FieldProps) => (
                                    <FormControl isInvalid={Boolean(form.errors.name) && Boolean(form.touched.name)}>
                                        <FormLabel htmlFor="name">Nom</FormLabel>
                                        <Input {...field} id="name" placeholder="Nom" />
                                        <FormErrorMessage>{typeof form.errors.name === 'string' ? form.errors.name : ''}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="email">
                                {({ field, form }: FieldProps) => (
                                    <FormControl isInvalid={Boolean(form.errors.email) && Boolean(form.touched.email)}>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input {...field} id="email" placeholder="Email" />
                                        <FormErrorMessage>{typeof form.errors.email === 'string' ? form.errors.email : ''}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="telephone">
                                {({ field, form }: FieldProps) => (
                                    <FormControl isInvalid={Boolean(form.errors.telephone) && Boolean(form.touched.telephone)}>
                                        <FormLabel htmlFor="telephone">Numéro de téléphone</FormLabel>
                                        <Input {...field} id="telephone" placeholder="Numéro de téléphone" />
                                        <FormErrorMessage>{typeof form.errors.telephone === 'string' ? form.errors.telephone : ''}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>

                            <Field name="speciality">
                                {({ field }: FieldProps) => (
                                    <FormControl>
                                        <FormLabel htmlFor="speciality">Spécialité</FormLabel>
                                        <Input {...field} id="speciality" placeholder="Spécialité" />
                                    </FormControl>
                                )}
                            </Field>

                            <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
                                Enregistrer
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>

            {errorMessage && <Text color="red.500" fontSize="xl" fontWeight="bold" textAlign="center">{errorMessage}</Text>}
            {successMessage && <Text color="green.500" fontSize="xl" fontWeight="bold" textAlign="center">{successMessage}</Text>}
        </Box>
    );
}

export default CreateDoctor;
