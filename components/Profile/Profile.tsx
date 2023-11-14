import axios from "axios";
import { useEffect, useState } from "react";


interface UserData {
    name: string;
    email: string;
    role: string;
}

function Profile() {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const response = await axios.get('/api/profile/profile');
            console.log(response.data);
            setUserData(response.data);
        } catch (error) {
            console.error("Erreur lors de l'obtention du profil :", error); // Mensaje de error en francés
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
