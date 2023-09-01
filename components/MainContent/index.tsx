import { Box } from "@chakra-ui/react";

function MainContent({ activeView }) {
    switch (activeView) {
        case 'home':
            return (
                <Box flex="1" p={4}>
                    <p>Inicio del dashboard</p>
                </Box>
            );
        case 'agendas':
            return (
                <Box flex="1" p={4}>
                    <p>Contenido de Agendas</p>
                </Box>
            );
        case 'Pacientes':
            return (
                <Box flex="1" p={4}>
                    <p>Contenido de Pacientes</p>
                </Box>
            );
        default:
            return (
                <Box flex="1" p={4}>
                    <p>Contenido principal del dashboard</p>
                </Box>
            );
    }
}

export default MainContent;