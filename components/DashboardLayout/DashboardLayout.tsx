import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import Header from "../Header";

function DashboardLayout({ children }) {
    return (
        <Box flex="1">
            <Header />
            <Flex flexDirection={["column", null, "row"]}>
                <Sidebar />
                <Box flex="1" p={4}>
                    {children}
                </Box>
            </Flex>
        </Box>
    );
}

export default DashboardLayout;
