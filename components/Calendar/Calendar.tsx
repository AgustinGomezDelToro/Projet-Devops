import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Select, useToast } from '@chakra-ui/react';

const CalendarComponent: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [patients, setPatients] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedPatientId, setSelectedPatientId] = useState<string>('');
    const [subject, setSubject] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const toast = useToast();

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch('/api/Calendar');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al obtener los eventos');
                }
                const data = await response.json();
                const transformedEvents = data.map((event: any) => ({
                    title: event.Subject,
                    start: event.StartTime,
                    end: event.EndTime
                }));
                setEvents(transformedEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        }

        async function fetchPatients() {
            try {
                const response = await fetch('/api/Patients');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al obtener los pacientes');
                }
                const data = await response.json();
                setPatients(data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        }

        fetchEvents();
        fetchPatients();
    }, []);

    const handleDateClick = (arg: any) => {
        setSelectedDate(arg.dateStr);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = async () => {
        const startDate = new Date(`${selectedDate}T${startTime}:00`);
        const endDate = new Date(`${selectedDate}T${endTime}:00`);

        if (endDate.getTime() <= startDate.getTime()) {
            endDate.setDate(endDate.getDate() + 1);
        }

        const eventData = {
            Subject: subject,
            StartTime: startDate.toISOString(),
            EndTime: endDate.toISOString(),
            PatientId: parseInt(selectedPatientId, 10),
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
                    patientId: createdEvent.event.PatientId
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
                description: error?.message || "Error desconocido",
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
                        <FormControl isRequired>
                            <FormLabel>Asunto</FormLabel>
                            <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Inicio</FormLabel>
                            <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Fin</FormLabel>
                            <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Paciente</FormLabel>
                            <Select onChange={(e) => setSelectedPatientId(e.target.value)}>
                                {patients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme="blue">Guardar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CalendarComponent;
