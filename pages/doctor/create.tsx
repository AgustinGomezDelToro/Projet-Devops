import React from 'react';
import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import CreateDoctor from "../../components/Doctor/CreateDoctor";

const DoctorCreate: React.FC = () => {
    return (
        <DashboardLayout>
            <div>
                <CreateDoctor />
            </div>
        </DashboardLayout>
    );
}

export default DoctorCreate;