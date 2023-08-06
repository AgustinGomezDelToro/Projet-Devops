import { Box, Button, Flex } from "@chakra-ui/react";

function login() {
    const login = () => {
        console.log("login");
    }


    return (
        <Flex width="100%" p={4} borderBottom="1px solid gray" justifyContent="space-between" alignItems="center">
            <Box>
                <p>Bienvenido a tu espacio  !</p>
            </Box>
            <Button colorScheme="red" onClick={login}>Salir</Button>
        </Flex>


    );
}

export default login;
