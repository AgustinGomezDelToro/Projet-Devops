import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, ModalOverlay, Flex, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Select, useToast} from '@chakra-ui/react';
import { DeleteIcon } from "@chakra-ui/icons";

const CalendarComponent: React.FC = () => {
    const [events, setEvents] = useState<any[]>([]);
    const [patients, setPatients] = useState<any[]>([]);
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
                console.log("Fetching events from API...");
                const response = await fetch('/api/Calendar/Calendar');
                console.log("Response received:", response);

                if (!response.ok) {
                    console.error("Response status:", response.status, "Response status text:", response.statusText);
                    try {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Error al obtener los eventos');
                    } catch (jsonError) {
                        throw new Error('Error al obtener los eventos y al leer el error devuelto');
                    }
                }
                const data = await response.json();
                console.log("Data from API:", data);
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
                console.error("Error fetching events:", error);
            }
        }

        const fetchEventById = async (id: string) => {
            try {
                const response = await fetch(`/api/Calendar/Calendar/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener el evento');
                }
                const event = await response.json();
                console.log("Event data:", event);
                // Aquí puedes decidir qué hacer con los datos del evento
                // Por ejemplo, guardar en el estado, mostrar en una modal, etc.
            } catch (error) {
                console.error("Error fetching the event:", error);
            }
        };


        async function fetchPatients() {
            try {
                const response = await fetch('/api/Patients');
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al obtener los pacientes');
                }
                const data = await response.json();
                console.log("Data from Pacientes API:", data); // Agrega este log
                setPatients(data);
            } catch (error) {
                console.error("Error fetching patients:", error);
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
                console.error("Error al obtener el nombre del paciente:", error);
                setSelectedPatientName("Desconocido");  // O manejar el error de una forma más elegante
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
            PatientId: selectedPatientId ? parseInt(selectedPatientId, 10) : null,
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

    const handleDelete = async () => {
        if (selectedEventId) {
            try {
                const response = await fetch('/api/Calendar/Calendar', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: selectedEventId }),
                });

                if (response.ok) {
                    setEvents(prevEvents => prevEvents.filter(event => event.id !== selectedEventId));
                    setIsOpen(false);
                    toast({
                        title: "Evento eliminado.",
                        description: "El evento ha sido eliminado con éxito.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al eliminar el evento');
                }
            } catch (error) {
                toast({
                    title: "Error al eliminar evento.",
                    description: error.message,
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
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale="es"
                slotDuration="00:05:00"
                slotLabelFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                events={events}
            />
            <Modal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detalles del Evento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl >
                            <FormLabel>Asunto</FormLabel>
                            <Input value={selectedEvent?.title} isReadOnly />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Inicio</FormLabel>
                            <Input value={selectedEvent?.start?.toLocaleString()} isReadOnly />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Fin</FormLabel>
                            <Input value={selectedEvent?.end?.toLocaleString()} isReadOnly />
                        </FormControl>


                        <FormControl mt={4}>
                            <FormLabel>Paciente</FormLabel>
                            <Input value={selectedPatientName || "Desconocido"} isReadOnly />
                        </FormControl>


                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => setIsEventModalOpen(false)}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

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
                            <Select onChange={(e) => setSelectedPatientId(e.target.value)}>
                                <option value="">Sin paciente</option>
                                {patients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                                ))}
                            </Select>

                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Color del evento</FormLabel>
                            <Select
                                placeholder="Seleccione color"
                                value={eventColor}
                                onChange={(e) => setEventColor(e.target.value)}
                            >
                                <option value="blue">Azul</option>
                                <option value="red">Rojo</option>
                                <option value="green">Verde</option>
                                <option value="#DAA520">Amarillo</option>
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleDelete} colorScheme="red" leftIcon={<DeleteIcon />} mr={3}>Eliminar</Button>
                        <Button onClick={handleSubmit} colorScheme="blue">Guardar</Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </div>
    );
};

export default CalendarComponent;
