import { Box, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axios.get('/api/profile');
                setUser(response.data);
            } catch (error) {
                console.error("Error obteniendo el perfil:", error);
            }
        };

        getProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout');
            router.push('/login');
        } catch (error) {
            console.error("Error cerrando sesión:", error);
        }
    };

    return (
        <Flex width="100%" p={4} borderBottom="1px solid gray" justifyContent="space-between" alignItems="center">
            <Box>
                <p>Bienvenido {user?.name} !</p>
            </Box>
            <Flex alignItems="center">
                { router.pathname !== "/dashboard" &&
                    <Button mr={2} onClick={() => router.push('/dashboard')}>Home</Button>
                }
                { router.pathname === "/dashboard" &&
                    <Button mr={2} onClick={() => router.push('/profile')}>Perfil</Button>
                }
                <Button colorScheme="red" onClick={handleLogout}>Salir</Button>
            </Flex>
        </Flex>
    );
}

export default Header;
