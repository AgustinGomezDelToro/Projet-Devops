import { useState, useEffect } from 'react';
import {
    Input,
    Stack,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useColorModeValue,
    Flex,
    Heading
} from "@chakra-ui/react";

const PatientsList: React.FC = () => {
    const [patients, setPatients] = useState<any[]>([]);
    const [users, setUsers] = useState<{ [key: number]: string }>({});
    const [searchTerm, setSearchTerm] = useState<string>("");


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

    const bg = useColorModeValue('white', 'black');
    const shadow = useColorModeValue('md', 'lg');

    return (
        <Flex direction="column" align="center" mt={10}>
            <Heading mb={6}>Lista de Pacientes</Heading>
            <Box
                w={['90%', '85%', '95%']}
                p={8}
                bg={bg}
                rounded="xl"
                boxShadow="lg"  // Añade la sombra deseada aquí
                mt={2}         // Ajusta el margen superior aquí
            >
                <Stack spacing={4} mb={4}>
                    <Input
                        size='md'
                        placeholder="Buscar paciente por nombre..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Stack>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Nombre</Th>
                            <Th>Email</Th>
                            <Th>Teléfono</Th>
                            <Th>Historia Clínica</Th>
                            <Th>Paciente de</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredPatients.map(patient => (
                            <Tr key={patient.id}>
                                <Td>{patient.name}</Td>
                                <Td>{patient.email}</Td>
                                <Td>{patient.telephone}</Td>
                                <Td>{patient.clinicHistory}</Td>
                                <Td>{users[patient.patienDe] || "Desconocido"}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Flex>
    );
};

export default PatientsList;