import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    IconButton,
    Input,
    Spacer,
    Stack,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, ViewIcon, EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';

const PatientsList: React.FC = () => {
    const [patients, setPatients] = useState<any[]>([]);
    const [users, setUsers] = useState<{ [key: number]: string }>({});
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        async function fetchData() {
            try {
                const patientsResponse = await fetch('/api/Patients/Patients');
                const usersResponse = await fetch('/api/users/users');

                if (!patientsResponse.ok || !usersResponse.ok) {
                    throw new Error('Error al obtener los datos');
                }

                const patientsData = await patientsResponse.json();
                const sortedPatients = patientsData.sort((a, b) => a.name.localeCompare(b.name));
                const usersData = await usersResponse.json();

                setPatients(sortedPatients);

                const usersMap: { [key: number]: string } = {};
                usersData.forEach((user: any) => {
                    usersMap[user.id] = user.name;
                });

                setUsers(usersMap);
            } catch (error) {
                console.error("Error fetching data:", error);
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
            <Heading mb={2}>Lista de Pacientes</Heading>
            <Box w={['90%', '85%', '95%']} p={8} bg={bg} rounded="xl" boxShadow="lg" mt={2}>
                <Stack spacing={2} mb={2}>
                    <Flex align="center">
                        <Input
                            size="md"
                            placeholder="Buscar paciente por nombre..."
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);  // Reset the page number when search term changes
                            }}
                        />
                        <Button
                            ml={2}  // Margen a la izquierda para separar el botón del input
                            color="white"
                            colorScheme="teal"
                            leftIcon={<AddIcon />}  // Icono de '+'
                            onClick={() => {
                                // Agrega aquí la lógica para crear un nuevo paciente
                            }}
                        >
                            Paciente
                        </Button>
                    </Flex>
                </Stack>


                <Table fontSize='14px' variant="simple" mt={6} borderX="2px solid lightgray" borderTop="2px solid lightgray" borderBottom="2px solid lightgray">
                <Thead mt={5}>
                        <Tr border="2px solid gray">
                            <Th >Nombre</Th>
                            <Th textAlign="center">Email</Th>
                            <Th textAlign="center">Teléfono</Th>
                            <Th textAlign="center">Historia Clínica</Th>
                            <Th textAlign="center">Paciente de</Th>
                            <Th textAlign="center">Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentItems.map(patient => (
                            <Tr key={patient.id} height="5px" mt={2}>
                                <Td>{patient.name}</Td>  {/* No se centra */}
                                <Td textAlign="center">{patient.email}</Td>
                                <Td textAlign="center">{patient.telephone}</Td>
                                <Td textAlign="center" isTruncated maxWidth="150px">
                                    {patient.clinicHistory}
                                </Td>
                                <Td textAlign="center">{users[patient.patienDe] || "Desconocido"}</Td>
                                <Td textAlign="center">
                                    <ButtonGroup isAttached variant="outline" spacing={4} size="md">
                                        <IconButton icon={<ViewIcon />} aria-label="View" />
                                        <IconButton icon={<EditIcon />} aria-label="Edit" colorScheme="gray" />
                                        <IconButton icon={<DeleteIcon />} aria-label="Delete" colorScheme="red" />
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
                        Anterior
                    </Button>
                    <Spacer />
                    <Button
                        rightIcon={<ChevronRightIcon />}
                        onClick={handleNextPage}
                        disabled={currentPage * itemsPerPage >= filteredPatients.length}
                    >
                        Siguiente
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
};

export default PatientsList;