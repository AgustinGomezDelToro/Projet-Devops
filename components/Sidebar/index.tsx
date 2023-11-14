import React from 'react';
import {Box, Button, Drawer, useBreakpointValue, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure} from "@chakra-ui/react";
import Link from 'next/link';

// Definición de la interfaz para las props
interface SidebarProps {
    setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveView }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const displayMenuButton = useBreakpointValue({ base: "block", md: "none" });

    return (
        <Box width={["100%", null, "20%"]} minHeight="100vh" borderRight="0px solid gray" p={4} position="relative" bg="white" boxShadow="lg"  >
            <Button onClick={onOpen} display={displayMenuButton} colorScheme="teal" mb={4} position="absolute" top="1rem" right="1rem">
                Menu
            </Button>

            {/* Drawer (Menú deslizable) */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
                        <DrawerBody>
                            <Button mb={4} width="100%" colorScheme="teal" onClick={() => setActiveView('home')}>
                                Accueil
                            </Button>
                            <Button mb={4} width="100%" colorScheme="teal" onClick={() => setActiveView('agendas')}>
                                Agendas
                            </Button>
                            <Button mb={4} width="100%" colorScheme="teal" onClick={() => setActiveView('Pacientes')}>
                                Patients
                            </Button>
                            <Button mb={4} width="100%" colorScheme="teal" onClick={() => setActiveView('odontograma')}>
                                Odontogramme
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
                <Link href="/home">
                    <Button mb={4} width="100%" colorScheme="teal">
                        Accueil
                    </Button>
                </Link>
                <Link href="/agenda">
                    <Button mb={4} width="100%" colorScheme="teal" >
                        Agendas
                    </Button>
                </Link>
                <Link href="/pacientes">
                    <Button mb={4} width="100%" colorScheme="teal">
                        Patients
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}

export default Sidebar;
