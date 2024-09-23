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
  VStack,
  Tooltip,
  Button,
  IconButton,
  Stack,
  HStack,
} from "@chakra-ui/react";
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
import { AddIcon, InfoIcon } from "@chakra-ui/icons";
import Card from "components/card/Card.js";

// Sample data for earnings over different periods
const earningsData = {
  Daily: [
    { date: "2023-09-01", earnings: 20 },
    { date: "2023-09-02", earnings: 25 },
    { date: "2023-09-03", earnings: 18 },
    { date: "2023-09-04", earnings: 22 },
    { date: "2023-09-05", earnings: 30 },
    { date: "2023-09-06", earnings: 35 },
    { date: "2023-09-07", earnings: 40 },
  ],
  Weekly: [
    { week: "Week 1", earnings: 100 },
    { week: "Week 2", earnings: 120 },
    { week: "Week 3", earnings: 150 },
    { week: "Week 4", earnings: 130 },
    { week: "Week 5", earnings: 160 },
  ],
  Monthly: [
    { month: "Jan", earnings: 400 },
    { month: "Feb", earnings: 450 },
    { month: "Mar", earnings: 500 },
    { month: "Apr", earnings: 600 },
    { month: "May", earnings: 700 },
  ],
};

const performanceMetrics = {
  AnnualizedReturn: "10% (Based on last 12 months)",
  Volatility: "5% (Standard deviation of returns)",
  SharpeRatio: "1.2 (Risk-adjusted return)",
  MaxDrawdown: "15% (Maximum observed loss)",
  CompoundingEffect: "20% growth over 5 years with reinvestment",
};

const historicalData = [
  { year: 2019, return: 0.05, risk: 0.02 },
  { year: 2020, return: 0.07, risk: 0.03 },
  { year: 2021, return: 0.10, risk: 0.04 },
  { year: 2022, return: 0.04, risk: 0.05 },
  { year: 2023, return: 0.12, risk: 0.02 },
];

export default function EarningsOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState("Daily");
  const [showDetails, setShowDetails] = useState(false);

  const chartData = earningsData[selectedPeriod];

  return (
    <Card p="20px" mb="20px" height="620px">
      <Box>
        <Flex justify="space-between" mb="20px">
          <Heading size="lg" color="blue.500">
            Earnings Overview
          </Heading>
          <Select
            width="150px"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            color="blue.500"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </Select>
        </Flex>

        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList mb="20px" justifyContent="center">
            {["Compounding", "Reinvested Earnings", "Performance Metrics", "Risk Metrics"].map((tab) => (
              <Tab key={tab}>{tab}</Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text fontSize="xl" fontWeight="bold" mb="10px">
                Earnings Over Time
              </Text>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey={selectedPeriod === "Daily" ? "date" : selectedPeriod === "Weekly" ? "week" : "month"} />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="earnings" stroke="#4B0082" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <Divider my="20px" />
              <Text>
                This graph illustrates your earnings based on the selected timeframe. 
                The data reflects how your earnings grow over time.
              </Text>
            </TabPanel>
            <TabPanel>
              <Text fontSize="xl" fontWeight="bold" mb="10px">
                Details on Reinvested Earnings
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold">Reinvestment Strategy</Text>
                  <Text color="gray.600">
                    A detailed strategy for reinvesting your earnings can significantly boost your overall returns.
                  </Text>
                </Box>
                <Box p={4} shadow="md" borderWidth="1px" borderRadius="md">
                  <Text fontWeight="bold">Compounding Effect</Text>
                  <Text color="gray.600">
                    Compounding earnings over time can lead to exponential growth. The earlier you start reinvesting, the better your returns.
                  </Text>
                </Box>
              </SimpleGrid>
              <Button
                mt={4}
                leftIcon={<AddIcon />}
                colorScheme="teal"
                variant="outline"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "Hide Details" : "Show Compounding Details"}
              </Button>
              {showDetails && (
                <Box mt={4} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
                  <Text fontWeight="bold">Compounding Example:</Text>
                  <Text color="gray.600">
                    If you reinvest your earnings consistently, you can achieve significant growth over the years.
                  </Text>
                  <Text color="gray.600">
                    For example, with a 20% annual return, $1,000 can grow to $3,218 in 5 years.
                  </Text>
                </Box>
              )}
            </TabPanel>
            <TabPanel>
              <Text fontSize="xl" fontWeight="bold" mb="10px">
                Performance Metrics
              </Text>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                {Object.entries(performanceMetrics).map(([metric, description]) => (
                  <Box key={metric} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                    <Text fontWeight="bold">{metric.replace(/([A-Z])/g, ' $1')}</Text>
                    <Text color="gray.600">{description}</Text>
                    <Tooltip label="Click for more info" aria-label="A tooltip">
                      <IconButton
                        icon={<InfoIcon />}
                        size="sm"
                        variant="ghost"
                        colorScheme="blue"
                        aria-label="Info"
                        mt={1}
                      />
                    </Tooltip>
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <Text fontSize="xl" fontWeight="bold" mb="10px">
                Risk Metrics
              </Text>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="return" stroke="#28a745" strokeWidth={2} name="Annual Return" />
                  <Line type="monotone" dataKey="risk" stroke="#dc3545" strokeWidth={2} name="Risk (Volatility)" />
                </LineChart>
              </ResponsiveContainer>
              <Text mt={4}>
                This graph illustrates the historical returns and risk metrics over the past years. 
                A higher return often accompanies higher risk, and this data helps you evaluate your strategies accordingly.
              </Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Card>
  );
}
