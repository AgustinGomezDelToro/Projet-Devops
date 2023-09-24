import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import Cookies from 'js-cookie';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Select, useToast
} from '@chakra-ui/react';

const CalendarComponent: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [patients, setPatients] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedPatientId, setSelectedPatientId] = useState<string>('');
    const [subject, setSubject] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [user, setUser] = useState<any | null>(null);

    const toast = useToast();

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await fetch('/api/profile');

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error fetching user profile, server response:", errorData);
                    throw new Error('Error al obtener el perfil del usuario');
                }

                const userData = await response.json();
                console.log("User data from profile API:", userData);
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }

        fetchProfile();

        fetch('/api/Calendar')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los eventos');
                }
                return response.json();
            })
            .then((data) => {
                const transformedEvents = data.map((event: any) => ({
                    title: event.Subject,
                    start: event.StartTime,
                    end: event.EndTime
                }));
                setEvents(transformedEvents);
            })
            .catch((error) => console.error("Error fetching events:", error));

        fetch('/api/Patients')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener los pacientes');
                }
                return response.json();
            })
            .then((data) => setPatients(data))
            .catch((error) => console.error("Error fetching patients:", error));

    }, []);

    const handleDateClick = (arg: any) => {
        setSelectedDate(arg.dateStr);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };


    const handleSubmit = async () => {
        const token = Cookies.get('myTokenName'); // Obtiene el token desde las cookies
        const eventData = {
            Subject: subject,
            StartTime: `${selectedDate}T${startTime}`,
            EndTime: `${selectedDate}T${endTime}`,
            PatientId: parseInt(selectedPatientId, 10),
            userId: user?.id,
        };

        try {
            const response = await fetch('/api/createCalendarEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al enviar el evento:", errorData.message);
                toast({
                    title: "Error al crear evento.",
                    description: errorData.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                const createdEvent = await response.json();
                setEvents([...events, {
                    title: createdEvent.event.Subject,
                    start: createdEvent.event.StartTime,
                    end: createdEvent.event.EndTime,
                    patientId: createdEvent.event.PatientId // Agrega el PatientId aquí
                }]);

                setIsOpen(false);
                toast({
                    title: "Evento creado.",
                    description: "El evento ha sido creado con éxito.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("Error al enviar el evento:", error);
            toast({
                title: "Error al crear evento.",
                description: error?.message || "Error desconocido", // Si no hay mensaje, mostrar "Error desconocido"
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };


    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                dateClick={handleDateClick}
                events={events}
            />
            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar nuevo evento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Asunto</FormLabel>
                            <Input placeholder="Asunto" value={subject} onChange={e => setSubject(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Hora de inicio</FormLabel>
                            <Input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Hora de finalización</FormLabel>
                            <Input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Paciente</FormLabel>
                            <Select placeholder="Seleccione paciente" onChange={(e) => setSelectedPatientId(e.target.value)}>
                                {patients.map((patient: any) => (
                                    <option key={patient.id} value={patient.id}>
                                        {patient.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleSubmit}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CalendarComponent;
