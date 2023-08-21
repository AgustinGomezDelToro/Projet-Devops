import ProfileComponent from "../components/Profile/Profile";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";

function ProfilePage() {
    return (
        <DashboardLayout>
        <div>
            <ProfileComponent />
        </div>
        </DashboardLayout>
    )
}

export default ProfilePage;
