import React, { useState } from 'react';
import {
  Box,
  Heading,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Text,
  SimpleGrid,
  Stack,
  Button,
  Divider,
  Select,
  Input,
  FormControl,
  FormLabel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tooltip,
  Checkbox,
  ButtonGroup,
  VStack,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { CSVLink } from 'react-csv';

// Sample Data
const strategiesData = {
  Strategy1: {
    historicalReturns: [
      { month: 'Jan', return: 5 },
      { month: 'Feb', return: 7 },
      { month: 'Mar', return: 8 },
      { month: 'Apr', return: 6 },
      { month: 'May', return: 9 },
      { month: 'Jun', return: 4 },
    ],
    riskAdjustedPerformance: [
      { month: 'Jan', value: 0.8 },
      { month: 'Feb', value: 0.75 },
      { month: 'Mar', value: 0.85 },
      { month: 'Apr', value: 0.7 },
      { month: 'May', value: 0.9 },
      { month: 'Jun', value: 0.6 },
    ],
    averageReturn: 6.5,
    volatility: 1.5,
    sharpeRatio: 1.2,
  },
  Strategy2: {
    historicalReturns: [
      { month: 'Jan', return: 3 },
      { month: 'Feb', return: 6 },
      { month: 'Mar', return: 5 },
      { month: 'Apr', return: 7 },
      { month: 'May', return: 8 },
      { month: 'Jun', return: 5 },
    ],
    riskAdjustedPerformance: [
      { month: 'Jan', value: 0.6 },
      { month: 'Feb', value: 0.65 },
      { month: 'Mar', value: 0.7 },
      { month: 'Apr', value: 0.75 },
      { month: 'May', value: 0.8 },
      { month: 'Jun', value: 0.65 },
    ],
    averageReturn: 5.0,
    volatility: 1.2,
    sharpeRatio: 1.0,
  },
  Strategy3: {
    historicalReturns: [
      { month: 'Jan', return: 4 },
      { month: 'Feb', return: 5 },
      { month: 'Mar', return: 6 },
      { month: 'Apr', return: 5 },
      { month: 'May', return: 6 },
      { month: 'Jun', return: 7 },
    ],
    riskAdjustedPerformance: [
      { month: 'Jan', value: 0.7 },
      { month: 'Feb', value: 0.8 },
      { month: 'Mar', value: 0.75 },
      { month: 'Apr', value: 0.8 },
      { month: 'May', value: 0.85 },
      { month: 'Jun', value: 0.75 },
    ],
    averageReturn: 5.5,
    volatility: 1.0,
    sharpeRatio: 1.1,
  },
};

const AnalyticsReports = () => {
  const [selectedStrategies, setSelectedStrategies] = useState(['Strategy1']);
  const [dateRange, setDateRange] = useState('Last 6 Months');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const handleStrategyChange = (e) => {
    const value = e.target.value;
    setSelectedStrategies((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  };

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
    // Logic to fetch data based on the selected date range can be implemented here
  };

  return (
    <Box p={5}>
      <Card>
        <Heading as="h2" size="lg" mb={5}>
          Investment Performance
        </Heading>

        <Stack direction="row" spacing={4} mb={5}>
          <Select value={dateRange} onChange={handleDateRangeChange}>
            <option value="Last 3 Months">Last 3 Months</option>
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="Last 1 Year">Last 1 Year</option>
            <option value="Custom">Custom</option>
          </Select>

          {dateRange === 'Custom' && (
            <Stack spacing={2} direction="row">
              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                />
              </FormControl>
            </Stack>
          )}

          <Button colorScheme="blue">Download Report</Button>
        </Stack>

        <VStack align="start">
          <Text fontWeight="bold">Select Strategies to Compare:</Text>
          <ButtonGroup spacing={4}>
            <Checkbox
              isChecked={selectedStrategies.includes('Strategy1')}
              onChange={handleStrategyChange}
              value="Strategy1"
            >
              Strategy 1
            </Checkbox>
            <Checkbox
              isChecked={selectedStrategies.includes('Strategy2')}
              onChange={handleStrategyChange}
              value="Strategy2"
            >
              Strategy 2
            </Checkbox>
            <Checkbox
              isChecked={selectedStrategies.includes('Strategy3')}
              onChange={handleStrategyChange}
              value="Strategy3"
            >
              Strategy 3
            </Checkbox>
          </ButtonGroup>
        </VStack>

        <Divider my={5} />

        <Tabs variant="enclosed">
          <TabList>
            {selectedStrategies.map((strategy, index) => (
              <Tab key={index}>{strategy}</Tab>
            ))}
          </TabList>

          <TabPanels>
            {selectedStrategies.map((strategy, index) => (
              <TabPanel key={index}>
                <InvestmentPerformance strategyData={strategiesData[strategy]} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Card>
    </Box>
  );
};

const InvestmentPerformance = ({ strategyData }) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
      <PerformanceChart title="Historical Returns" data={strategyData.historicalReturns} />
      <PerformanceChart title="Risk-Adjusted Performance" data={strategyData.riskAdjustedPerformance} />
      <PerformanceMetrics metrics={strategyData} />
      <DataTables data={strategyData} />
      <CumulativeReturnsChart data={strategyData.historicalReturns} />
      <RadarChartComponent strategyData={strategyData} />
    </SimpleGrid>
  );
};

const PerformanceChart = ({ title, data }) => (
  <Box>
    <Heading as="h3" size="md" mb={4}>
      {title}
    </Heading>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <RechartsTooltip />
        <Legend />
        <Line type="monotone" dataKey="return" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  </Box>
);

const CumulativeReturnsChart = ({ data }) => {
  const cumulativeData = data.map((item, index) => ({
    month: item.month,
    cumulativeReturn: data.slice(0, index + 1).reduce((sum, curr) => sum + curr.return, 0),
  }));

  return (
    <Box>
      <Heading as="h3" size="md" mb={4}>
        Cumulative Returns
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={cumulativeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <RechartsTooltip />
          <Area type="monotone" dataKey="cumulativeReturn" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

const RadarChartComponent = ({ strategyData }) => {
  const data = [
    {
      subject: 'Average Return',
      A: strategyData.averageReturn,
    },
    {
      subject: 'Volatility',
      A: strategyData.volatility,
    },
    {
      subject: 'Sharpe Ratio',
      A: strategyData.sharpeRatio,
    },
  ];

  return (
    <Box>
      <Heading as="h3" size="md" mb={4}>
        Performance Metrics Radar
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart outerRadius={90} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Radar name="Metrics" dataKey="A" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </Box>
  );
};

const PerformanceMetrics = ({ metrics }) => (
  <Box>
    <Heading as="h3" size="md" mb={4}>
      Performance Metrics
    </Heading>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Metric</Th>
          <Th>Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Average Return</Td>
          <Td>{metrics.averageReturn}%</Td>
        </Tr>
        <Tr>
          <Td>Volatility</Td>
          <Td>{metrics.volatility}</Td>
        </Tr>
        <Tr>
          <Td>Sharpe Ratio</Td>
          <Td>{metrics.sharpeRatio}</Td>
        </Tr>
      </Tbody>
    </Table>
  </Box>
);

const DataTables = ({ data }) => (
  <Box>
    <Heading as="h3" size="md" mb={4}>
      Detailed Data
    </Heading>
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Historical Returns</Tab>
        <Tab>Risk-Adjusted Performance</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Month</Th>
                <Th>Return (%)</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.historicalReturns.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.month}</Td>
                  <Td>{item.return}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TabPanel>
        <TabPanel>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Month</Th>
                <Th>Risk-Adjusted Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.riskAdjustedPerformance.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.month}</Td>
                  <Td>{item.value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Box>
);

export default AnalyticsReports;
