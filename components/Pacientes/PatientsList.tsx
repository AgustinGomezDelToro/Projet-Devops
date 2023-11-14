import React, { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, Flex, Heading, IconButton, Input, Spacer, Stack, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, ViewIcon, EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';

// Definición de interfaces para los pacientes y usuarios
interface Patient {
    id: number;
    name: string;
    email: string;
    telephone: string;
    clinicHistory: string;
    patienDe: number;
}

interface UserMap {
    [key: number]: string;
}

const PatientsList: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [users, setUsers] = useState<UserMap>({});
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;

    useEffect(() => {
        async function fetchData() {
            try {
                const patientsResponse = await fetch('/api/Patients/Patients');
                const usersResponse = await fetch('/api/users/users');

                if (!patientsResponse.ok || !usersResponse.ok) {
                    throw new Error('Erreur lors de la récupération des données.');
                }

                const patientsData = await patientsResponse.json();
                const sortedPatients = patientsData.sort((a: Patient, b: Patient) => a.name.localeCompare(b.name));
                const usersData = await usersResponse.json();

                setPatients(sortedPatients);

                const usersMap: UserMap = {};
                usersData.forEach((user: any) => {
                    usersMap[user.id] = user.name;
                });

                setUsers(usersMap);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        }

        fetchData();
    }, []);

    function normalizeString(str: string): string {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    const filteredPatients = patients.filter(patient =>
        normalizeString(patient.name).includes(normalizeString(searchTerm))
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

    const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPatients.length / itemsPerPage)));

    const bg = useColorModeValue('white', 'gray.800');

    return (
        <Flex direction="column" align="center" mt={2}>
            <Heading mb={2}>Liste des patients</Heading>
            <Box w={['90%', '85%', '95%']} p={8} bg={bg} rounded="xl" boxShadow="lg" mt={2}>
                <Stack spacing={2} mb={2}>
                    <Flex align="center">
                        <Input
                            size="md"
                            placeholder="Rechercher un patient par nom..."
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);  // Reset the page number when search term changes
                            }}
                        />
                        <Button
                            ml={2}
                            colorScheme="teal"
                            leftIcon={<AddIcon />}
                            onClick={() => {}}
                        >
                            Ajouter un patient
                        </Button>
                    </Flex>
                </Stack>

                <Table fontSize='14px' variant="simple" mt={6} borderX="2px solid lightgray" borderTop="2px solid lightgray" borderBottom="2px solid lightgray">
                    <Thead mt={5}>
                        <Tr border="2px solid gray">
                            <Th>Nom</Th>
                            <Th textAlign="center">Email</Th>
                            <Th textAlign="center">Téléphone</Th>
                            <Th textAlign="center">Dossier Médical</Th>
                            <Th textAlign="center">Patient de</Th>
                            <Th textAlign="center">Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentItems.map(patient => (
                            <Tr key={patient.id} height="5px" mt={2}>
                                <Td>{patient.name}</Td>
                                <Td textAlign="center">{patient.email}</Td>
                                <Td textAlign="center">{patient.telephone}</Td>
                                <Td textAlign="center" isTruncated maxWidth="150px">
                                    {patient.clinicHistory}
                                </Td>
                                <Td textAlign="center">{users[patient.patienDe] || "Inconnu"}</Td>
                                <Td textAlign="center">
                                    <ButtonGroup isAttached variant="outline" spacing={4} size="md">
                                        <IconButton icon={<ViewIcon />} aria-label="Voir" />
                                        <IconButton icon={<EditIcon />} aria-label="Éditer" colorScheme="gray" />
                                        <IconButton icon={<DeleteIcon />} aria-label="Supprimer" colorScheme="red" />
                                    </ButtonGroup>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>

                <Flex mt={4}>
                    <Button
                        leftIcon={<ChevronLeftIcon />}
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Précédent
                    </Button>
                    <Spacer />
                    <Button
                        rightIcon={<ChevronRightIcon />}
                        onClick={handleNextPage}
                        disabled={currentPage * itemsPerPage >= filteredPatients.length}
                    >
                        Suivant
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
};

export default PatientsList;
