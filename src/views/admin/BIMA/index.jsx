import { Box, SimpleGrid } from "@chakra-ui/react";
import BuyBIMA from "views/admin/BIMA/components/BuyBIMA";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <BuyBIMA />
      </SimpleGrid>
    </Box>
  );
}
