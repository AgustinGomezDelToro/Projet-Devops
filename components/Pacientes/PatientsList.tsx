import { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";

const PatientsList: React.FC = () => {
    const [patients, setPatients] = useState<any[]>([]);

    useEffect(() => {
        async function fetchPatients() {
            try {
                const response = await fetch('/api/Patients/Patients');

                if (!response.ok) {
                    throw new Error('Error al obtener los pacientes');
                }

                const data = await response.json();
                setPatients(data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        }

        fetchPatients();
    }, []);

    return (
        <Box overflowX="auto">
            <Table w="full" size="sm">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Nombre</Th>
                        <Th>Email</Th>
                        <Th>Teléfono</Th>
                        <Th>Rol</Th>
                        <Th>Historia Clínica</Th>
                        <Th>Paciente de</Th>
                        <Th>Fecha Creación</Th>
                        <Th>Fecha Actualización</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {patients.map(patient => (
                        <Tr key={patient.id}>
                            <Td>{patient.id}</Td>
                            <Td>{patient.name}</Td>
                            <Td>{patient.email}</Td>
                            <Td>{patient.telephone}</Td>
                            <Td>{patient.role}</Td>
                            <Td>{patient.clinicHistory}</Td>
                            <Td>{patient.patienDe}</Td>
                            <Td>{new Date(patient.createAt).toLocaleDateString()}</Td>
                            <Td>{new Date(patient.updateAt).toLocaleDateString()}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default PatientsList;
