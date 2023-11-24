import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, ButtonGroup, Flex, Heading, IconButton, Input, Spacer, Stack, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon, ViewIcon, EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface Doctorazerty {
    id: number;
    name: string;
    email: string;
    telephone: string;
    eventsHistory: string;
    createAt: string;
    updateAt: string;
}

const DoctorList: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctorazerty[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortMethod, setSortMethod] = useState<string>('createdAt'); // Nuevo estado para el método de ordenación
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;
    //const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const sortQuery = `sort=${sortMethod}`; // Añade el método de ordenación a la consulta
            try {
                const doctorsResponse = await fetch(`/api/Doctor/Doctor?${sortQuery}`);
                if (!doctorsResponse.ok) {
                    throw new Error('Erreur lors de la récupération des données des médecins.');
                }
                const doctorsData = await doctorsResponse.json();
                setDoctors(doctorsData);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            }
        }
        fetchData();
    }, [sortMethod]);

    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    function normalizeString(str: string): string {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    // Función para manejar el cambio de ordenamiento
    const toggleSortDirection = () => {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        setSortMethod(sortMethod === 'createdAt' ? 'name' : 'createdAt');
    };

    const filteredDoctors = doctors.filter(doctor =>
        normalizeString(doctor.name).includes(normalizeString(searchTerm))
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDoctors.slice(indexOfFirstItem, indexOfLastItem);
    const  router = useRouter();

    const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredDoctors.length / itemsPerPage)));
    const bg = useColorModeValue('white', 'gray.800');

    return (
        <Flex direction="column" align="center" mt={2}>
            <Heading mb={2}>Liste des Médecins</Heading>
            <Box w={['90%', '85%', '95%']} p={8} bg={bg} rounded="xl" boxShadow="lg" mt={2}>
                <Stack spacing={2} mb={2}>
                    <Flex align="center">
                        <Input
                            size="md"
                            placeholder="Rechercher un médecin par nom..."
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <Button ml={2} onClick={toggleSortDirection}>
                            {sortDirection === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />}
                        </Button>
                        <Button
                            ml={2}
                            colorScheme="teal"
                            leftIcon={<AddIcon />}
                            onClick={() => router.push('/doctor/create')}
                        >
                            Ajouter
                        </Button>
                    </Flex>
                </Stack>

                <Table fontSize='14px' variant="simple" mt={6} borderX="2px solid lightgray" borderTop="2px solid lightgray" borderBottom="2px solid lightgray">                    <Thead mt={5}>
                        <Tr border="2px solid gray">
                            <Th>Nom</Th>
                            <Th textAlign="left">Email</Th>
                            <Th textAlign="center">Téléphone</Th>
                            <Th textAlign="center">Agenda</Th>
                            <Th textAlign="center">Patients</Th>
                            <Th textAlign="center">Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentItems.map(doctor => (
                            <Tr key={doctor.id}>
                                <Td textAlign="left">
                                    <Button variant="link" onClick={() => router.push(`/doctor/${doctor.name.split(' ').join('-')}`)}>
                                        {doctor.name}
                                    </Button>
                                </Td>
                                <Td textAlign="left" isTruncated maxWidth="200px">
                                    {doctor.email}
                                </Td>
                                <Td textAlign="center">{doctor.telephone}</Td>
                                <Td textAlign="center" isTruncated maxWidth="150px">
                                    <Link href={`/agenda/${encodeURIComponent(doctor.name)}`} passHref>
                                        <Button as="a" variant="link">
                                            Ver Agenda
                                        </Button>
                                    </Link>
                                </Td>
                                <Td textAlign="center">
                                    <Button variant="link" onClick={() => router.push(`/doctor/${doctor.name.split(' ').join('-')}/patients`)}>
                                        Patients
                                    </Button>
                                </Td>
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
                        disabled={currentPage * itemsPerPage >= filteredDoctors.length}
                    >
                        Suivant
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
};

export default DoctorList;
