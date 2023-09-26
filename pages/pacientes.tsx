import React from 'react';
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import PatientsList from "../components/Pacientes/PatientsList";
import Home from "../components/Pacientes/PacientesProfile";

const Calendar: React.FC = () => {
    return (
        <DashboardLayout>
            <div>
                <h1>Mi lista de pacientes</h1>
                <PatientsList />
            </div>
        </DashboardLayout>
    );
}

export default Calendar;
