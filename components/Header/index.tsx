import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

// Definición de la interfaz para el usuario
interface Utilisateur {
    name: string;
}

const Header: React.FC = () => {
    const router = useRouter();
    const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get('/api/profile/profile');
                setUtilisateur(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération du profil:", error);
            }
        };

        getProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout');
            router.push('/login');
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
        }
    };

    return (
        <Flex width="100%" p={4} borderBottom="0px solid gray" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" justifyContent="center">
                <p>Bonjour {utilisateur?.name} !</p>
            </Box>
            <Flex alignItems="center">
                {router.pathname !== "/dashboard" &&
                    <Button mr={2} onClick={() => router.push('/dashboard')}>Accueil</Button>
                }
                {router.pathname === "/dashboard" &&
                    <Button mr={2} onClick={() => router.push('/profile')}>Profil</Button>
                }
                <Button colorScheme="red" onClick={handleLogout}>Déconnexion</Button>
            </Flex>
        </Flex>
    );
}

export default Header;
