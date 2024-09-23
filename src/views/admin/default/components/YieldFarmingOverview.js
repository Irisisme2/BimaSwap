import React, { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Flex,
  Text,
  SimpleGrid,
  Select,
  Heading,
  Divider,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import Card from "components/card/Card.js";

// Subtle color scheme
const colors = {
  conservative: "#6B8E23", // OliveDrab for Conservative Staking
  highRisk: "#8B0000", // DarkRed for High-Risk Yield Aggregator
  moderateRisk: "#4682B4", // SteelBlue for Moderate Risk Strategy
  brandColor: "#4B0082", // Indigo for branding
};

// Sample strategy data with different time ranges
const strategiesData = {
  "Conservative Staking": {
    description:
      "A low-risk strategy focusing on staking well-established cryptocurrencies like Ethereum and Bitcoin. Aimed at investors seeking stable, albeit modest returns.",
    details: {
      allocation: {
        Ethereum: "60%",
        Bitcoin: "40%",
      },
      riskLevel: "Low",
      expectedAPY: "5-7%",
      sharpeRatio: "1.2",
      maxDrawdown: "8%",
      turnoverRate: "15%",
      volatility: "3%",
      sortinoRatio: "1.5",
      beta: "0.5",
      historicalReturns: {
        lastYear: 12, // in percentage
        lastThreeYears: 30, // in percentage
      },
    },
    performanceData: {
      "1 Year": [
        { name: "Jan", performance: 1.2 },
        { name: "Feb", performance: 1.5 },
        { name: "Mar", performance: 1.8 },
        { name: "Apr", performance: 2.0 },
        { name: "May", performance: 2.3 },
        { name: "Jun", performance: 2.7 },
        { name: "Jul", performance: 3.0 },
        { name: "Aug", performance: 3.2 },
        { name: "Sep", performance: 3.5 },
        { name: "Oct", performance: 3.8 },
        { name: "Nov", performance: 4.1 },
        { name: "Dec", performance: 4.4 },
      ],
      "3 Years": [
        { name: "Year 1", performance: 12 },
        { name: "Year 2", performance: 15 },
        { name: "Year 3", performance: 18 },
      ],
      "6 Months": [
        { name: "Jan", performance: 1.2 },
        { name: "Feb", performance: 1.5 },
        { name: "Mar", performance: 1.8 },
        { name: "Apr", performance: 2.0 },
        { name: "May", performance: 2.3 },
        { name: "Jun", performance: 2.7 },
      ],
    },
    currentAPY: "6.5%",
    totalValueLocked: "$250,000",
    historicalVolatility: "Low",
  },
  "High-Risk Yield Aggregator": {
    description:
      "A high-risk strategy investing in emerging DeFi projects and yield farming on lesser-known platforms. Offers potentially high, but volatile returns.",
    details: {
      allocation: {
        "New DeFi Projects": "40%",
        "High-APY Yield Farming": "30%",
        "Speculative Tokens": "30%",
      },
      riskLevel: "High",
      expectedAPY: "15-25%",
      sharpeRatio: "0.8",
      maxDrawdown: "25%",
      turnoverRate: "60%",
      volatility: "15%",
      sortinoRatio: "1.0",
      beta: "1.2",
      historicalReturns: {
        lastYear: 70, // in percentage
        lastThreeYears: 150, // in percentage
      },
    },
    performanceData: {
      "1 Year": [
        { name: "Jan", performance: 8 },
        { name: "Feb", performance: 9 },
        { name: "Mar", performance: 10 },
        { name: "Apr", performance: 12 },
        { name: "May", performance: 15 },
        { name: "Jun", performance: 18 },
        { name: "Jul", performance: 20 },
        { name: "Aug", performance: 22 },
        { name: "Sep", performance: 23 },
        { name: "Oct", performance: 24 },
        { name: "Nov", performance: 25 },
        { name: "Dec", performance: 26 },
      ],
      "3 Years": [
        { name: "Year 1", performance: 50 },
        { name: "Year 2", performance: 70 },
        { name: "Year 3", performance: 90 },
      ],
      "6 Months": [
        { name: "Jan", performance: 8 },
        { name: "Feb", performance: 9 },
        { name: "Mar", performance: 10 },
        { name: "Apr", performance: 12 },
        { name: "May", performance: 15 },
        { name: "Jun", performance: 18 },
      ],
    },
    currentAPY: "20%",
    totalValueLocked: "$100,000",
    historicalVolatility: "High",
  },
};

export default function YieldFarmingOverview() {
  const [selectedStrategy, setSelectedStrategy] = useState("Conservative Staking");
  const [dateRange, setDateRange] = useState("1 Year");
  const brandColor = colors.brandColor;
  const strategyColor =
    selectedStrategy === "Conservative Staking" ? colors.conservative : colors.highRisk;

  // Current details for the selected strategy and time range
  const strategyDetails = strategiesData[selectedStrategy];
  const performanceData = strategyDetails.performanceData[dateRange];

  // Risk metrics data for the bar chart
  const riskMetricsData = [
    {
      name: "Sharpe Ratio",
      value: parseFloat(strategyDetails.details.sharpeRatio),
    },
    {
      name: "Max Drawdown",
      value: parseFloat(strategyDetails.details.maxDrawdown),
    },
    {
      name: "Turnover Rate",
      value: parseFloat(strategyDetails.details.turnoverRate),
    },
    {
      name: "Volatility",
      value: parseFloat(strategyDetails.details.volatility),
    },
    {
      name: "Sortino Ratio",
      value: parseFloat(strategyDetails.details.sortinoRatio),
    },
    {
      name: "Beta",
      value: parseFloat(strategyDetails.details.beta),
    },
  ];

  return (
    <Card p="20px" mb="20px">
      <Box>
        <Flex justify="space-between" mb="20px">
          <Heading size="lg" color={brandColor}>
            Yield Farming Overview
          </Heading>
          <Select
            width="200px"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            color={brandColor}
          >
            <option value="1 Year">Last 1 Year</option>
            <option value="3 Years">Last 3 Years</option>
            <option value="6 Months">Last 6 Months</option>
          </Select>
        </Flex>

        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList mb="20px" justifyContent="center">
            {Object.keys(strategiesData).map((strategy) => (
              <Tab
                key={strategy}
                onClick={() => setSelectedStrategy(strategy)}
                _selected={{
                  bg: strategyColor,
                  color: "white",
                }}
              >
                {strategy}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {Object.keys(strategiesData).map((strategy) => (
              <TabPanel key={strategy}>
                {/* Strategy Description */}
                <Box mb="20px">
                  <Text fontSize="xl" fontWeight="bold" mb="10px" color={strategyColor}>
                    Strategy Overview
                  </Text>
                  <Text fontSize="md" color="gray.600">
                    {strategiesData[strategy].description}
                  </Text>
                </Box>

                {/* Strategy Details */}
                <Box mb="20px">
                  <Text fontSize="xl" fontWeight="bold" mb="10px" color={strategyColor}>
                    Strategy Details
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} p={4} bg="gray.50" borderRadius="md">
                    {Object.keys(strategiesData[strategy].details.allocation).map((key) => (
                      <Flex key={key} justify="space-between">
                        <Text fontWeight="bold" color="gray.700">{key}</Text>
                        <Text>{strategiesData[strategy].details.allocation[key]}</Text>
                      </Flex>
                    ))}
                  </SimpleGrid>
                </Box>

                {/* Key Metrics */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} mb="20px">
                  <Flex
                    direction="column"
                    align="center"
                    p={5}
                    bg={strategyColor}
                    color="white"
                    borderRadius="md"
                    shadow="md"
                  >
                    <Text fontWeight="bold">Current APY</Text>
                    <Text fontSize="2xl">{strategyDetails.currentAPY}</Text>
                  </Flex>
                  <Flex
                    direction="column"
                    align="center"
                    p={5}
                    bg={strategyColor}
                    color="white"
                    borderRadius="md"
                    shadow="md"
                  >
                    <Text fontWeight="bold">Total Value Locked</Text>
                    <Text fontSize="2xl">{strategyDetails.totalValueLocked}</Text>
                  </Flex>
                  <Flex
                    direction="column"
                    align="center"
                    p={5}
                    bg={strategyColor}
                    color="white"
                    borderRadius="md"
                    shadow="md"
                  >
                    <Text fontWeight="bold">Historical Volatility</Text>
                    <Text fontSize="2xl">{strategyDetails.historicalVolatility}</Text>
                  </Flex>
                </SimpleGrid>

                {/* Line Chart: Performance Over Time */}
                <Box mb="20px">
                  <Text fontSize="xl" fontWeight="bold" mb="10px" color={strategyColor}>
                    Performance Over Time
                  </Text>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="performance"
                        stroke={strategyColor}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>

                {/* Bar Chart: Risk Metrics */}
                <Box mb="20px">
                  <Text fontSize="xl" fontWeight="bold" mb="10px" color={strategyColor}>
                    Risk Metrics
                  </Text>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={riskMetricsData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="value" fill={strategyColor} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>

                {/* Area Chart: Historical Returns */}
                <Box mb="20px">
                  <Text fontSize="xl" fontWeight="bold" mb="10px" color={strategyColor}>
                    Historical Returns
                  </Text>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={[
                        { name: "Last Year", value: strategyDetails.details.historicalReturns.lastYear },
                        { name: "Last 3 Years", value: strategyDetails.details.historicalReturns.lastThreeYears },
                      ]}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Area type="monotone" dataKey="value" stroke={strategyColor} fillOpacity={0.3} fill={strategyColor} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>

                {/* Additional Insights */}
                <Box>
                  <Heading size="md" mb="4" color={strategyColor}>
                    Additional Insights
                  </Heading>
                  <Text color="gray.600">
                    It’s important to note that past performance is not indicative of future results. We encourage
                    investors to perform their own research before committing to any strategy.
                  </Text>
                  <Divider my="10px" />
                  <Text color="gray.600">
                    {selectedStrategy === "High-Risk Yield Aggregator"
                      ? "This strategy involves significant risk and should only be considered by experienced investors."
                      : "This strategy is suitable for investors looking for stable returns with minimal risk."}
                  </Text>
                </Box>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Card>
  );
}

