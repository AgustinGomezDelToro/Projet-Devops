import { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";

const PatientsList: React.FC = () => {
    const [patients, setPatients] = useState<any[]>([]);
    const [users, setUsers] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        async function fetchData() {
            try {
                const patientsResponse = await fetch('/api/Patients/Patients');
                const usersResponse = await fetch('/api/users/users');  // Asegúrate de que esta ruta sea la correcta

                if (!patientsResponse.ok || !usersResponse.ok) {
                    throw new Error('Error al obtener los datos');
                }

                const patientsData = await patientsResponse.json();
                const usersData = await usersResponse.json();

                setPatients(patientsData);

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

    return (
        <Box overflowX="auto">
            <Table w="full" size="sm">
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
                    {patients.map(patient => (
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
    );
};

export default PatientsList;
