import {
    Box,
    Button,
    Drawer,
    useBreakpointValue,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure
} from "@chakra-ui/react";

function Sidebar({ setActiveView }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const displayMenuButton = useBreakpointValue({ base: "block", md: "none" });

    return (
        <Box width={["100%", null, "20%"]} minHeight="100vh" borderRight="1px solid gray" p={4} position="relative">
            <Button onClick={onOpen} display={displayMenuButton} colorScheme="teal" mb={4} position="absolute" top="1rem" right="1rem">
                Menú
            </Button>

            {/* Drawer (Menú deslizable) */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth="1px">Navegación</DrawerHeader>
                        <DrawerBody>
                            <Button mb={4} width="100%" colorScheme="teal" onClick={() => setActiveView('home')}>
                                Home
                            </Button>
                            <Button mb={4} width="100%" colorScheme="teal" onClick={() => setActiveView('agendas')}>
                                Agendas
                            </Button>
                            <Button mb={4} width="100%" colorScheme="teal" onClick={() => setActiveView('Patients')}>
                                Pacientes
                            </Button>
                            <Button mb={4} width="100%" colorScheme="teal" onClick={() => setActiveView('odontograma')}>
                                Odontograma
                            </Button>
                        </DrawerBody>
                        <DrawerFooter borderTopWidth="1px">
                            {/* Información o acción adicional si es necesario */}
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>

            {/* Enlaces de Navegación (visibles en tablets y escritorio) */}
            <Box display={displayMenuButton === "none" ? "block" : "none"}>
                <Button mb={4} width="100%" colorScheme="teal" onClick={() => setActiveView('home')}>
                    Home
                </Button>
                <Button mb={4} width="100%" colorScheme="teal" onClick={() => setActiveView('agendas')}>
                    Agendas
                </Button>
                <Button mb={4} width="100%" colorScheme="teal" onClick={() => setActiveView('Patients')}>
                    Pacientes
                </Button>
                <Button mb={4} width="100%" colorScheme="teal" onClick={() => setActiveView('odontograma')}>
                    Odontograma
                </Button>
            </Box>
        </Box>
    );
}

export default Sidebar;
