import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import { useState } from 'react';
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";


function Dashboard() {
    const [activeView, setActiveView] = useState('home');

    return (

        <DashboardLayout setActiveView={setActiveView} activeView={activeView}>
            <Box flex="1">
                <Flex flexDirection={["column", null, "row"]}>
                </Flex>
            </Box>
        </DashboardLayout>
    );
}

export default Dashboard;