import {
  Avatar,
  Box,
  Flex,
  Button,
  Icon,
  ButtonGroup,
  SimpleGrid,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import React, { useState } from "react";
// Custom components
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import RecentActivity from "views/admin/default/components/RecentActivity";
import Analytics from "views/admin/default/components/Analytics";
import QuickActions from "views/admin/default/components/QuickActions";
import YieldFarmingOverview from "views/admin/default/components/YieldFarmingOverview";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import BIMAIcon from "assets/img/icons/bima.jpg";
import USDIcon from "assets/img/icons/usd.png";
import ETHIcon from "assets/img/icons/eth.png";
import BSCIcon from "assets/img/icons/bsc.png";
import MaticIcon from "assets/img/icons/matic.png"

const data = {
  BIMA: {
    portfolioValue: "1500 BIMA",
    earnings: "120 BIMA",
    yieldPerformance: "+15%",
    icon: BIMAIcon,
  },
  USD: {
    portfolioValue: "$3000",
    earnings: "$240",
    yieldPerformance: "+15%",
    icon: USDIcon,
  },
  Ethereum: {
    portfolioValue: "1.5 ETH",
    earnings: "0.05 ETH",
    yieldPerformance: "+15%",
    icon: ETHIcon,
  },
  BSC: {
    portfolioValue: "10 BNB",
    earnings: "0.4 BNB",
    yieldPerformance: "+15%",
    icon: BSCIcon,
  },
  Polygon: {
    portfolioValue: "2000 MATIC",
    earnings: "80 MATIC",
    yieldPerformance: "+15%",
    icon: MaticIcon,
  },
};


export default function UserReports() {
  const [selectedView, setSelectedView] = useState("USD");
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  // Function to get the appropriate icon for the selected view
  const getIcon = () => {
    return (
      <Image
        src={data[selectedView].icon}
        alt={`${selectedView} Icon`}
        w="100%" 
        h="100%" 
        objectFit="cover" 
      />
    );
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Toggle Buttons for switching views */}
      <ButtonGroup mb="20px">
        {Object.keys(data).map((key) => (
          <Button
            key={key}
            onClick={() => setSelectedView(key)}
            colorScheme={selectedView === key ? "blue" : "gray"}
          >
            {key}
          </Button>
        ))}
      </ButtonGroup>

      {/* Mini Statistics Grid */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
        gap="20px"
        mb="20px"
      >
        {/* Total Portfolio Value */}
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #FFD700 0%, #FFA500 100%)"
              icon={getIcon()} // Use the dynamic icon
            />
          }
          name="Portfolio Value"
          value={data[selectedView].portfolioValue}
        />
        {/* Earnings from Yield Farming */}
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4CAF50 0%, #388E3C 100%)"
              icon={getIcon()} // Use the dynamic icon
            />
          }
          name="Total Earnings"
          value={data[selectedView].earnings}
        />
        {/* Yield Performance */}
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #2196F3 0%, #1E88E5 100%)"
              icon={getIcon()} // Use the dynamic icon
            />
          }
          name="Yield Performance"
          value={data[selectedView].yieldPerformance}
        />
        {/* Breakdown of assets across networks */}
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #FF5722 0%, #E64A19 100%)"
              icon={getIcon()} // Use the dynamic icon
            />
          }
          name="Network Breakdown"
          value={selectedView}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap='20px' mb='20px'>
  {/* Left Column */}
  <Box>
    <YieldFarmingOverview />
    <QuickActions />
  </Box>
  
  {/* Right Column */}
  <Box>
  <WeeklyRevenue />
    <Analytics />
    </Box>
    </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1}} gap='20px'>
        <RecentActivity />
    </SimpleGrid>

    </Box>
  );
}
