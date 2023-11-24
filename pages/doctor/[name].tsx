import DashboardLayout from "../../components/DashboardLayout/DashboardLayout";
import DoctorProfile from "../../components/Doctor/DoctorProfile";

function DoctorProfilePage() {
    return (
        <DashboardLayout>
            <div>
                <DoctorProfile />
            </div>
        </DashboardLayout>
    )
}

export default DoctorProfilePage;