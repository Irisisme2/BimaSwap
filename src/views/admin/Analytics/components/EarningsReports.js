import React, { useState } from 'react';
import {
  Box,
  Heading,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Button,
  SimpleGrid,
  VStack,
  Text,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CSVLink } from 'react-csv';

const earningsData = {
  daily: [
    { date: '2024-09-01', yield: 200, fees: 10, netReturn: 190 },
    { date: '2024-09-02', yield: 250, fees: 12, netReturn: 238 },
    { date: '2024-09-03', yield: 180, fees: 9, netReturn: 171 },
    { date: '2024-09-04', yield: 220, fees: 11, netReturn: 209 },
    { date: '2024-09-05', yield: 230, fees: 12, netReturn: 218 },
  ],
  weekly: [
    { week: 'Week 1', yield: 1400, fees: 60, netReturn: 1340 },
    { week: 'Week 2', yield: 1600, fees: 80, netReturn: 1520 },
  ],
  monthly: [
    { month: 'January', yield: 6000, fees: 300, netReturn: 5700 },
    { month: 'February', yield: 5000, fees: 250, netReturn: 4750 },
  ],
  yearly: [
    { year: '2022', yield: 72000, fees: 4000, netReturn: 68000 },
    { year: '2023', yield: 85000, fees: 5000, netReturn: 80000 },
  ],
};

const EarningsReports = () => {
  const [selectedTab, setSelectedTab] = useState('daily');

  const handleTabChange = (index) => {
    const tabMap = { 0: 'daily', 1: 'weekly', 2: 'monthly', 3: 'yearly' };
    setSelectedTab(tabMap[index]);
  };

  const currentData = earningsData[selectedTab];

  return (
    <Box p={5}>
      <Card>
        <Heading as="h2" size="lg" mb={5}>
          Earnings Reports
        </Heading>

        <Tabs onChange={handleTabChange} variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab>Daily</Tab>
            <Tab>Weekly</Tab>
            <Tab>Monthly</Tab>
            <Tab>Yearly</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <EarningsChart data={currentData} />
            </TabPanel>
            <TabPanel>
              <EarningsChart data={currentData} />
            </TabPanel>
            <TabPanel>
              <EarningsChart data={currentData} />
            </TabPanel>
            <TabPanel>
              <EarningsChart data={currentData} />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <VStack align="start" spacing={4} mt={5}>
          <Button colorScheme="blue" as={CSVLink} data={currentData} filename={`earnings_report_${selectedTab}.csv`}>
            Export as CSV
          </Button>
          <Button colorScheme="blue">
            Export as PDF
          </Button>
        </VStack>
      </Card>
    </Box>
  );
};

const EarningsChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={data[0].date ? 'date' : data[0].week ? 'week' : data[0].month ? 'month' : 'year'} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="yield" stroke="#8884d8" name="Yield" />
        <Line type="monotone" dataKey="fees" stroke="#82ca9d" name="Fees" />
        <Line type="monotone" dataKey="netReturn" stroke="#ffc658" name="Net Return" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EarningsReports;
