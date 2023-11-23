import React from 'react';
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import DoctorList from "../components/Doctor/DoctorList";

const Calendar: React.FC = () => {
    return (
        <DashboardLayout>
            <div>
                <DoctorList />
            </div>
        </DashboardLayout>
    );
}

export default Calendar;
