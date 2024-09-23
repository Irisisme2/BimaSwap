import { Box, SimpleGrid } from "@chakra-ui/react";
import MyInvestments from "views/admin/Investments/components/MyInvestments";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <MyInvestments />
      </SimpleGrid>
    </Box>
  );
}
