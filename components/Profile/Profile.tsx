import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const response = await axios.get('/api/profile/profile');
            console.log(response.data);
            setUserData(response.data);
        } catch (error) {
            console.error("Error obteniendo el perfil:", error);
        }
    };

    return (
        <>
            {userData && (
                <div>
                    <p>{userData.name}</p>
                    <p>Email: {userData.email}</p>
                    <p>Status: {userData.role}</p>
                </div>
            )}
        </>
    );
}

export default Profile;
