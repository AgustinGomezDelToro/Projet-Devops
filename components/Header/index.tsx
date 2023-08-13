import { Box, Button, Flex } from "@chakra-ui/react";

function Header() {
    return (
        <Flex width="100%" p={4} borderBottom="1px solid gray" justifyContent="space-between" alignItems="center">
            <Box>
                <p>Bienvenido user.name!</p>
            </Box>
            <Button colorScheme="red">Salir</Button>
        </Flex>
    );
}

export default Header;
