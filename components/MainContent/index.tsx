import React from 'react';
import { Box } from "@chakra-ui/react";

// Definición de la interfaz para las props
interface MainContentProps {
    activeView: 'home' | 'agendas' | 'Pacientes' | string; // Puedes restringir más los tipos si es necesario
}

const MainContent: React.FC<MainContentProps> = ({ activeView }) => {
    switch (activeView) {
        case 'home':
            return (
                <Box flex="1" p={4}>
                    <p>Accueil du tableau de bord</p> {/* Traducido al francés */}
                </Box>
            );
        case 'agendas':
            return (
                <Box flex="1" p={4}>
                    <p>Contenu des Agendas</p> {/* Traducido al francés */}
                </Box>
            );
        case 'Pacientes':
            return (
                <Box flex="1" p={4}>
                    <p>Contenu des Patients</p> {/* Traducido al francés */}
                </Box>
            );
        default:
            return (
                <Box flex="1" p={4}>
                    <p>Contenu principal du tableau de bord</p> {/* Traducido al francés */}
                </Box>
            );
    }
}

export default MainContent;
