import React from 'react';
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import PatientsList from "../components/Pacientes/PatientsList";

const Calendar: React.FC = () => {
    return (
        <DashboardLayout>
            <div>
                <PatientsList />
            </div>
        </DashboardLayout>
    );
}

export default Calendar;
