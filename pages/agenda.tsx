import React from 'react';
import CalendarComponent from '../components/Calendar/Calendar';
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";

const Agenda: React.FC = () => {
    return (
        <DashboardLayout>
        <div>
            <h1>Mi Calendario</h1>
            <CalendarComponent />
        </div>
        </DashboardLayout>
    );
}

export default Agenda;
