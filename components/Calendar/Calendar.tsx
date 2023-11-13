import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Modal, ModalOverlay, Flex, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Select, Spacer, useToast} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';


interface Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    color: string;
    patientId: number;
}

interface Patient {
    id: number;
    name: string;
}
const CalendarComponent: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
    const [subject, setSubject] = useState("");
    const toast = useToast();
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const [eventColor, setEventColor] = useState('blue');
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const hours = Array.from({ length: 15 }, (_, i) => (i + 7).toString().padStart(2, '0'));
    const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
    const [startHour, setStartHour] = useState('07');
    const [startMinute, setStartMinute] = useState('00');
    const [endHour, setEndHour] = useState('21');
    const [endMinute, setEndMinute] = useState('00');
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [selectedPatientName, setSelectedPatientName] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
                console.log("Récupération des événements depuis l'API...");
                const response = await fetch('/api/Calendar/Calendar');
                console.log("Réponse reçue:", response);

                if (!response.ok) {
                    console.error("Statut de la réponse:", response.status, "Texte du statut de la réponse:", response.statusText);
                    try {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Erreur lors de la récupération des événements');
                    } catch (jsonError) {
                        throw new Error('Erreur lors de la récupération des événements et en lisant lerreur retournée');
                    }
                }
                const data = await response.json();
                console.log("Données de l'API:", data);
                const transformedEvents = data.map((event: any) => ({
                    id: event.id,
                    title: event.Subject,
                    start: event.StartTime,
                    end: event.EndTime,
                    color: event.Color,
                    patientId: event.PatientId,
                }));
                setEvents(transformedEvents);
            } catch (error) {
                console.error("Erreur lors de la récupération des événements: ", error);
            }
        }


        async function fetchPatients() {
            try {
                const response = await fetch('/api/Patients/Patients');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erreur lors de la récupération des patients');
                }
                const data = await response.json();
                console.log("Données de l'API Patients: ", data);
                setPatients(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des patients: ", error);
            }
        }

        fetchEvents();
        fetchPatients();
    }, []);

    const handleDateClick = (arg: any) => {
        setSelectedDate(new Date(arg.dateStr));
        setIsOpen(true);
    };

    const startDateTime = selectedDate ? new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        parseInt(startHour, 10),
        parseInt(startMinute, 10)
    ) : new Date();

    const endDateTime = selectedDate ? new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        parseInt(endHour, 10),
        parseInt(endMinute, 10)
    ) : new Date();


    const handleEventClick = (info: any) => {
        setSelectedEvent(info.event);
        setSelectedEventId(info.event.id);
        setIsEventModalOpen(true);


        const eventId = info.event.id;

        fetch(`/api/Calendar/getPatientName?eventId=${eventId}`)
            .then(response => response.json())
            .then(data => {
                setSelectedPatientName(data.patientName);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération du nom du patient :", error);
                setSelectedPatientName("Inconnu");
            });
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = async () => {
        const startDate = new Date(`${selectedDate}T${startHour}:00`);
        const endDate = new Date(`${selectedDate}T${endHour}:00`);

        if (endDate.getTime() <= startDate.getTime()) {
            endDate.setDate(endDate.getDate() + 1);
        }

        const eventData = {
            Subject: subject,
            StartTime: startDateTime.toISOString(),
            EndTime: endDateTime.toISOString(),
            PatientId: selectedPatientId,
            Color: eventColor
        };

        try {
            const response = await fetch('/api/Calendar/createCalendarEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erreur lors de l'envoi de l'événement: ", (errorData as any).message);
                toast({
                    title: "Erreur lors de la création de l'événement.",
                    description: errorData.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                const createdEvent = await response.json();
                setEvents(prevEvents => [...prevEvents, {
                    id: createdEvent.event.id,
                    title: createdEvent.event.Subject,
                    start: createdEvent.event.StartTime,
                    end: createdEvent.event.EndTime,
                    patientId: createdEvent.event.PatientId,
                    color: createdEvent.event.Color
                }]);



                setIsOpen(false);
                toast({
                    title: "Événement créé.",
                    description: "L'événement a été créé avec succès.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'événement:", error);
            toast({
                title: "Erreur lors de la création de l'événement.",
                description: (error as Error)?.message || "Erreur inconnue",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async () => {
        if (selectedEventId) {
            try {
                const response = await fetch(`/api/Calendar/Calendar?eventId=${selectedEventId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const updatedEvents = events.filter(event => event.id !== selectedEventId);
                    setEvents(updatedEvents);

                    // Cierra el modal de detalles del evento
                    setIsEventModalOpen(false);

                    toast({
                        title: "Événement supprimé.",
                        description: "L'événement a été supprimé avec succès.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Erreur lors de la suppression de l'événement");
                }
            } catch (error) {
                toast({
                    title: "Error al eliminar evento.",
                    description: (error as Error).message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        }
    };



    const testPatient = patients.find(p => p.id === 1);
    console.log("Test Patient:", testPatient);
    console.log("List of patients:", patients);
    console.log("Selected Event:", selectedEvent);



    return (
        <div>
            <Box bg="white" shadow="base" borderRadius="lg" padding={5}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale="fr"
                    slotDuration="00:05:00"
                    slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    events={events.map(event => ({
                        ...event,
                        id: event.id.toString()
                    }))}
                    key={events.length}
                />
            </Box>
            <Modal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Détails de l'événement</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl >
                            <FormLabel>Sujet</FormLabel>
                            <Input value={selectedEvent?.title} isReadOnly />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Debut</FormLabel>
                            <Input value={selectedEvent?.start?.toLocaleString()} isReadOnly />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Fin</FormLabel>
                            <Input value={selectedEvent?.end?.toLocaleString()} isReadOnly />
                        </FormControl>


                        <FormControl mt={4}>
                            <FormLabel>Patient</FormLabel>
                            <Input value={selectedPatientName || "Inconnu"} isReadOnly />
                        </FormControl>


                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>Editer</Button>
                        <Button onClick={handleDelete} colorScheme="red" leftIcon={<DeleteIcon />} mr={3}>Effacer</Button>
                        <Spacer />
                        <Button onClick={() => setIsEventModalOpen(false)}>Fermer</Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>

            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ajouter un nouvel événement</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Sujet</FormLabel>
                            <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Debut</FormLabel>
                            <Flex>
                                <Select value={startHour} onChange={(e) => setStartHour(e.target.value)} mr={4}>
                                    {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
                                </Select>
                                <Select value={startMinute} onChange={(e) => setStartMinute(e.target.value)} mr={4}>
                                    {minutes.map(minute => <option key={minute} value={minute}>{minute}</option>)}
                                </Select>
                            </Flex>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Fin</FormLabel>
                            <Flex>
                                <Select value={endHour} onChange={(e) => setEndHour(e.target.value)} mr={4}>
                                    {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
                                </Select>
                                <Select value={endMinute} onChange={(e) => setEndMinute(e.target.value)} mr={4}>
                                    {minutes.map(minute => <option key={minute} value={minute}>{minute}</option>)}
                                </Select>
                            </Flex>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Paciente</FormLabel>
                            <Select onChange={(e) => setSelectedPatientId(Number(e.target.value))}>
                                <option value="">Sans patient</option>
                                {patients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                                ))}
                            </Select>

                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Couleur de l'événement</FormLabel>
                            <Select
                                placeholder="Seleccione color"
                                value={eventColor}
                                onChange={(e) => setEventColor(e.target.value)}
                            >
                                <option value="blue">Blue</option>
                                <option value="red">Rouge</option>
                                <option value="green">Vert</option>
                                <option value="#DAA520">Jaune</option>
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme="blue">Sauvegarder</Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </div>
    );
};

export default CalendarComponent;
