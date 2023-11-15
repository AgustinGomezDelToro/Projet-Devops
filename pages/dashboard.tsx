import React, { ReactNode } from 'react';
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar/index";
import Header from "../components/Header/index";

interface DashboardLayoutProps {
    children: ReactNode;
    setActiveView: (view: string) => void;
    activeView: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, setActiveView, activeView }) => {
    return (
        <Box flex="1" bg="gray.50">
            <Flex flexDirection={["column", null, "row"]}>
                <Sidebar setActiveView={setActiveView} />
                <Box flex="1" p={4}>
                    <Header />
                    {/* Pasar activeView a los componentes internos si es necesario */}
                    {children}
                </Box>
            </Flex>
        </Box>
    );
}

export default DashboardLayout;
