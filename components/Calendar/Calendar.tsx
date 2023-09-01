import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';



const CalendarComponent: React.FC = () => {
    const [events, setEvents] = useState([
        { title: 'Evento inicial', date: '2023-08-22' },
    ]);

    const handleDateClick = (arg: any) => {
        const title = prompt("Ingrese el nombre del evento:");
        if (title) {
            setEvents([...events, { title, date: arg.dateStr }]);
        }
    }

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                dateClick={handleDateClick}
                events={events}
            />
        </div>
    );
}

export default CalendarComponent;
