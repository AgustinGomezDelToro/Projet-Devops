import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";

function Dashboard() {
    return (
        <Box flex="1">
            <Header />
            <Flex flexDirection={["column", null, "row"]}>
                <Sidebar />
                <MainContent />
            </Flex>
        </Box>
    );
}

export default Dashboard;
