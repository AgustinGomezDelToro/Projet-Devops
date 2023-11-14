import React, { ReactNode } from 'react';
import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import Header from "../Header";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const setActiveView = (view: string) => {
        console.log("Changer view à :", view);
    };

    return (
        <Box flex="1" bg="gray.50">
            <Flex flexDirection={["column", null, "row"]}>
                <Sidebar setActiveView={setActiveView} />
                <Box flex="1" p={4}>
                    <Header />
                    {children}
                </Box>
            </Flex>
        </Box>
    );
}

export default DashboardLayout;
