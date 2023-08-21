import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import { useState } from 'react';


function Dashboard() {
    const [activeView, setActiveView] = useState('home');

    return (
        <Box flex="1">
            <Header />
            <Flex flexDirection={["column", null, "row"]}>
                <Sidebar setActiveView={setActiveView} />
                <MainContent activeView={activeView} />
            </Flex>
        </Box>
    );
}

export default Dashboard;