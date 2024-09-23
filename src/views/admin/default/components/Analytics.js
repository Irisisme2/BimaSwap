import React, { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MdInfoOutline } from "react-icons/md";

// Icons
import USDCIcon from "assets/img/icons/usdc.png";
import ETHIcon from "assets/img/icons/eth.png";
import BTCIcon from "assets/img/icons/btc.jpg";

// Sample data for active yield farming strategies
const strategiesData = [
  {
    name: "Stable Yield Strategy",
    APY: "8%",
    riskLevel: "Low",
    fees: "0.25%",
    description: "Focuses on stablecoins and low-volatility assets, ensuring steady returns with minimal risk.",
    historicalReturns: [1.5, 2, 2.5, 2.8, 3, 3.5, 4],
    performanceMetrics: {
      maxDrawdown: "2%",
      sharpeRatio: "1.5",
      volatility: "5%",
    },
  },
  {
    name: "Balanced Growth Strategy",
    APY: "12%",
    riskLevel: "Medium",
    fees: "0.5%",
    description: "Combines stable assets and high-yield opportunities to balance growth and risk.",
    historicalReturns: [2, 2.5, 3.5, 4.5, 5, 6, 7],
    performanceMetrics: {
      maxDrawdown: "5%",
      sharpeRatio: "1.8",
      volatility: "10%",
    },
  },
  {
    name: "Aggressive Profit Maximization",
    APY: "20%",
    riskLevel: "High",
    fees: "1%",
    description: "Invests in high-risk, high-reward projects for substantial returns, ideal for risk-tolerant investors.",
    historicalReturns: [3, 4, 5, 6, 8, 10, 15],
    performanceMetrics: {
      maxDrawdown: "15%",
      sharpeRatio: "2.2",
      volatility: "25%",
    },
  },
];

// Sample data for top-performing pools
const topPools = [
  {
    name: "USDC Liquidity Pool",
    strategy: "Stable Yield Strategy",
    APY: "8%",
    TVL: "$3M",
    performance: "+1.2% last month",
    numberOfInvestors: 150,
    poolDetails: "Stablecoin pool focusing on USDC with low volatility.",
    icon: USDCIcon, // Add icon
  },
  {
    name: "ETH-BTC Yield Pool",
    strategy: "Balanced Growth Strategy",
    APY: "12%",
    TVL: "$2M",
    performance: "+2.5% last month",
    numberOfInvestors: 90,
    poolDetails: "A diversified pool with Ethereum and Bitcoin to capture market growth.",
    icons: [ETHIcon, BTCIcon],
  },
  {
    name: "DeFi Leverage Pool",
    strategy: "Aggressive Profit Maximization",
    APY: "20%",
    TVL: "$1.5M",
    performance: "+3.8% last month",
    numberOfInvestors: 60,
    poolDetails: "Leverages assets to amplify returns, suitable for experienced investors.",
    icon: BTCIcon, // Add icon
  },
];

// Historical data for yield performance
const historicalPerformanceData = [
  { month: "Jan", yield: 3.0 },
  { month: "Feb", yield: 3.5 },
  { month: "Mar", yield: 4.0 },
  { month: "Apr", yield: 5.0 },
  { month: "May", yield: 6.0 },
  { month: "Jun", yield: 7.5 },
  { month: "Jul", yield: 8.0 },
  { month: "Aug", yield: 8.5 },
  { month: "Sep", yield: 9.0 },
  { month: "Oct", yield: 9.5 },
  { month: "Nov", yield: 10.0 },
  { month: "Dec", yield: 10.5 },
];

export default function RealTimeAnalytics() {
  const [selectedTab, setSelectedTab] = useState("Strategies");

  return (
    <Card p="20px" mb="20px">
      <Box>
        <Heading size="lg" color="blue.600" mb="20px">
          Real-Time Analytics
        </Heading>
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList mb="20px">
            {["Strategies", "Top Pools", "Historical Performance"].map((tab) => (
              <Tab key={tab} onClick={() => setSelectedTab(tab)}>
                {tab}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text fontSize="xl" fontWeight="bold" mb="10px">
                Active Yield Farming Strategies
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                {strategiesData.map((strategy) => (
                  <Box key={strategy.name} p={4} shadow="md" borderWidth="1px" borderRadius="md" bg="gray.50">
                   
                    <Text>APY: {strategy.APY}</Text>
                    <Text>Risk Level: {strategy.riskLevel}</Text>
                    <Text>Platform Fees: {strategy.fees}</Text>
                    <Text mt={2}>{strategy.description}</Text>
                    <Divider my="10px" />
                    <Text fontWeight="bold">Performance Metrics:</Text>
                    <Text>Max Drawdown: {strategy.performanceMetrics.maxDrawdown}</Text>
                    <Text>Sharpe Ratio: {strategy.performanceMetrics.sharpeRatio}</Text>
                    <Text>Volatility: {strategy.performanceMetrics.volatility}</Text>
                    <Divider my="10px" />
                    <Text fontWeight="bold">Historical Returns:</Text>
                    <ResponsiveContainer width="100%" height={150}>
                      <LineChart data={strategy.historicalReturns.map((yieldValue, index) => ({ month: `M${index + 1}`, yield: yieldValue }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <RechartsTooltip />
                        <Line type="monotone" dataKey="yield" stroke={strategy.name === "Stable Yield Strategy" ? "#4A90E2" : strategy.name === "Balanced Growth Strategy" ? "#F39C12" : "#E74C3C"} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
  <Text fontSize="xl" fontWeight="bold" mb="10px">
    Top-Performing Pools
  </Text>
  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
    {topPools.map((pool) => (
      <Box key={pool.name} p={4} shadow="md" borderWidth="1px" borderRadius="md" bg="gray.50">
        <Flex alignItems="center" mb={2}>
          {pool.icons ? (
            pool.icons.map((icon, index) => (
              <img key={index} src={icon} alt={pool.name} style={{ width: "24px", height: "24px", marginRight: "8px" }} />
            ))
          ) : (
            <img src={pool.icon} alt={pool.name} style={{ width: "24px", height: "24px", marginRight: "8px" }} />
          )}
          <Text fontWeight="bold" fontSize="lg">{pool.name}</Text>
        </Flex>
        <Text>Strategy: {pool.strategy}</Text>
        <Text>APY: {pool.APY}</Text>
        <Text>TVL: {pool.TVL}</Text>
        <Text>{pool.performance}</Text>
        <Text>Investors: {pool.numberOfInvestors}</Text>
        <Divider my="10px" />
        <Text>{pool.poolDetails}</Text>
      </Box>
    ))}
  </SimpleGrid>
</TabPanel>
            <TabPanel>
              <Text fontSize="xl" fontWeight="bold" mb="10px">
                Historical Yield Performance
              </Text>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalPerformanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="yield" stroke="#4A90E2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <Divider my="20px" />
              <Text>
                This graph illustrates the historical yield performance over the months, allowing you to analyze trends 
                and make informed decisions about your investments. The increasing yield indicates the effectiveness of 
                the selected strategies.
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Divider my="20px" />
        <Heading size="md" color="blue.600" mb="10px">
          Overall Strategy Performance Metrics
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
          <Stat>
            <StatLabel>Average APY</StatLabel>
            <StatNumber>13.33%</StatNumber>
            <StatHelpText>Overall average across all strategies</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Total TVL</StatLabel>
            <StatNumber>$6.5M</StatNumber>
            <StatHelpText>Total Value Locked in all pools</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Average Risk Level</StatLabel>
            <StatNumber>Medium</StatNumber>
            <StatHelpText>Calculated based on current strategies</StatHelpText>
          </Stat>
        </SimpleGrid>
        <Divider my="20px" />
        <Flex alignItems="center">
          <Icon as={MdInfoOutline} boxSize={6} color="gray.500" mr={2} />
          <Text fontSize="sm" color="gray.600">
            Keep track of the performance metrics to optimize your investments and minimize risks.
          </Text>
        </Flex>
      </Box>
    </Card>
  );
}
