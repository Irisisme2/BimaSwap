import React, { useEffect, useState } from 'react';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Card,
  CardHeader,
  CardBody,
  Text,
  Heading,
  Flex,
  Spinner,
  Button,
  Select,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import axios from 'axios';

// Sample initial data for charts
const initialData = [
  { name: 'Day 1', price: 4000, volume: 2400 },
  { name: 'Day 2', price: 3000, volume: 2210 },
  { name: 'Day 3', price: 2000, volume: 2290 },
  { name: 'Day 4', price: 2780, volume: 2000 },
  { name: 'Day 5', price: 1890, volume: 2181 },
  { name: 'Day 6', price: 2390, volume: 2500 },
  { name: 'Day 7', price: 3490, volume: 2100 },
];

const MarketAnalytics = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRange, setSelectedRange] = useState('7d');

  // Function to fetch data from the API
  const fetchMarketData = async (range) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: range,
        },
      });
      const chartData = response.data.prices.map(([timestamp, price], index) => ({
        name: `Day ${index + 1}`,
        price,
        volume: response.data.total_volumes[index][1], // Assuming volume is provided similarly
      }));
      setData(chartData);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data when the selected range changes
  useEffect(() => {
    fetchMarketData(selectedRange);
  }, [selectedRange]);

  return (
    <Box p={5}>
      <Heading mb={4}>Market Analytics</Heading>
      <Flex mb={4}>
        <Select
          placeholder="Select Date Range"
          onChange={(e) => setSelectedRange(e.target.value)}
          width="200px"
          mr={2}
        >
          <option value="1">1 Day</option>
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
          <option value="90">90 Days</option>
        </Select>
        <Button onClick={() => fetchMarketData(selectedRange)}>Fetch Data</Button>
      </Flex>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <Tabs variant="enclosed" onChange={(index) => setActiveTab(index)}>
          <TabList>
            <Tab>Price Chart</Tab>
            <Tab>Volume Chart</Tab>
            <Tab>Trends</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Card>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">Price Chart</Text>
                </CardHeader>
                <CardBody>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
                              <p>{`Price: $${payload[0].value.toFixed(2)}`}</p>
                            </div>
                          );
                        }
                        return null;
                      }} />
                      <Line type="monotone" dataKey="price" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </TabPanel>
            <TabPanel>
              <Card>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">Volume Chart</Text>
                </CardHeader>
                <CardBody>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
                              <p>{`Volume: ${payload[0].value}`}</p>
                            </div>
                          );
                        }
                        return null;
                      }} />
                      <Bar dataKey="volume" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </TabPanel>
            <TabPanel>
              <Card>
                <CardHeader>
                  <Text fontSize="lg" fontWeight="bold">Market Trends</Text>
                </CardHeader>
                <CardBody>
                  <Text>
                    The market shows a fluctuating pattern over the selected period.
                    Monitor the price movements closely and consider the volume trends for better trading decisions.
                  </Text>
                  <Flex justifyContent="space-between" mt={4}>
                    <Text fontWeight="bold">Current Price:</Text>
                    <Text>${data[data.length - 1].price.toFixed(2)}</Text>
                  </Flex>
                  <Flex justifyContent="space-between" mt={2}>
                    <Text fontWeight="bold">Volume (Last 24h):</Text>
                    <Text>{data[data.length - 1].volume}</Text>
                  </Flex>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
};

export default MarketAnalytics;
