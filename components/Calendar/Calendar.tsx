import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-buttons/styles/material.css';
import '@syncfusion/ej2-calendars/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-navigations/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-schedule/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css';


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
