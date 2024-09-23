import React, { useState } from 'react';
import {
  Box,
  Heading,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  SimpleGrid,
  Text,
  VStack,
  Button,
  useToast,
  Select,
  FormControl,
} from '@chakra-ui/react';
import Card from 'components/card/Card.js';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { CSVLink } from 'react-csv';
import { PDFDownloadLink } from '@react-pdf/renderer';
import RiskReportPDF from './RiskReportPDF'; 
const riskData = {
  strategies: [
    {
      name: 'Strategy A',
      riskLevel: 30,
      stdDev: 5,
      maxDrawdown: 10,
      VaR: 8,
      CVaR: 12,
      SharpeRatio: 1.5,
      beta: 1.2,
      alpha: 1.0,
      correlation: 0.7,
      historicalTrends: [
        { month: 'Jan', riskLevel: 28 },
        { month: 'Feb', riskLevel: 30 },
        { month: 'Mar', riskLevel: 25 },
        { month: 'Apr', riskLevel: 32 },
        { month: 'May', riskLevel: 30 },
        { month: 'Jun', riskLevel: 35 },
      ],
      recommended: 'Consider diversifying your assets.',
    },
    {
      name: 'Strategy B',
      riskLevel: 25,
      stdDev: 4,
      maxDrawdown: 7,
      VaR: 5,
      CVaR: 8,
      SharpeRatio: 1.2,
      beta: 1.0,
      alpha: 0.6,
      correlation: 0.5,
      historicalTrends: [
        { month: 'Jan', riskLevel: 24 },
        { month: 'Feb', riskLevel: 25 },
        { month: 'Mar', riskLevel: 23 },
        { month: 'Apr', riskLevel: 27 },
        { month: 'May', riskLevel: 26 },
        { month: 'Jun', riskLevel: 29 },
      ],
      recommended: 'Consider increasing your equity exposure.',
    },
    {
      name: 'Strategy C',
      riskLevel: 20,
      stdDev: 3,
      maxDrawdown: 5,
      VaR: 3,
      CVaR: 4,
      SharpeRatio: 1.8,
      beta: 0.8,
      alpha: 0.4,
      correlation: 0.3,
      historicalTrends: [
        { month: 'Jan', riskLevel: 22 },
        { month: 'Feb', riskLevel: 20 },
        { month: 'Mar', riskLevel: 19 },
        { month: 'Apr', riskLevel: 21 },
        { month: 'May', riskLevel: 20 },
        { month: 'Jun', riskLevel: 22 },
      ],
      recommended: 'This strategy is relatively low risk.',
    },
    {
      name: 'Strategy D',
      riskLevel: 40,
      stdDev: 6,
      maxDrawdown: 15,
      VaR: 10,
      CVaR: 14,
      SharpeRatio: 1.0,
      beta: 1.5,
      alpha: 1.2,
      correlation: 0.8,
      historicalTrends: [
        { month: 'Jan', riskLevel: 38 },
        { month: 'Feb', riskLevel: 40 },
        { month: 'Mar', riskLevel: 39 },
        { month: 'Apr', riskLevel: 41 },
        { month: 'May', riskLevel: 42 },
        { month: 'Jun', riskLevel: 43 },
      ],
      recommended: 'High risk; ensure proper hedging strategies.',
    },
    {
      name: 'Strategy E',
      riskLevel: 35,
      stdDev: 5,
      maxDrawdown: 12,
      VaR: 7,
      CVaR: 9,
      SharpeRatio: 1.4,
      beta: 1.1,
      alpha: 0.9,
      correlation: 0.6,
      historicalTrends: [
        { month: 'Jan', riskLevel: 34 },
        { month: 'Feb', riskLevel: 35 },
        { month: 'Mar', riskLevel: 33 },
        { month: 'Apr', riskLevel: 36 },
        { month: 'May', riskLevel: 38 },
        { month: 'Jun', riskLevel: 37 },
      ],
      recommended: 'Consider adjusting your portfolio towards safer assets.',
    },
    {
      name: 'Strategy F',
      riskLevel: 45,
      stdDev: 7,
      maxDrawdown: 20,
      VaR: 15,
      CVaR: 18,
      SharpeRatio: 0.9,
      beta: 1.7,
      alpha: 1.5,
      correlation: 0.9,
      historicalTrends: [
        { month: 'Jan', riskLevel: 42 },
        { month: 'Feb', riskLevel: 44 },
        { month: 'Mar', riskLevel: 45 },
        { month: 'Apr', riskLevel: 46 },
        { month: 'May', riskLevel: 48 },
        { month: 'Jun', riskLevel: 49 },
      ],
      recommended: 'Very high risk; reconsider your allocation.',
    },
  ],
  assets: [
    {
      name: 'Asset X',
      riskLevel: 25,
      stdDev: 4,
      maxDrawdown: 8,
      VaR: 5,
      CVaR: 6,
      SharpeRatio: 1.2,
      beta: 0.8,
      alpha: 0.5,
      correlation: 0.4,
      historicalTrends: [
        { month: 'Jan', riskLevel: 24 },
        { month: 'Feb', riskLevel: 25 },
        { month: 'Mar', riskLevel: 22 },
        { month: 'Apr', riskLevel: 26 },
        { month: 'May', riskLevel: 25 },
        { month: 'Jun', riskLevel: 28 },
      ],
      recommended: 'Stable asset - low risk.',
    },
    {
      name: 'Asset Y',
      riskLevel: 30,
      stdDev: 5,
      maxDrawdown: 10,
      VaR: 7,
      CVaR: 9,
      SharpeRatio: 1.1,
      beta: 1.1,
      alpha: 0.7,
      correlation: 0.5,
      historicalTrends: [
        { month: 'Jan', riskLevel: 28 },
        { month: 'Feb', riskLevel: 30 },
        { month: 'Mar', riskLevel: 29 },
        { month: 'Apr', riskLevel: 31 },
        { month: 'May', riskLevel: 32 },
        { month: 'Jun', riskLevel: 34 },
      ],
      recommended: 'Moderate risk; ensure good diversification.',
    },
    {
      name: 'Asset Z',
      riskLevel: 15,
      stdDev: 2,
      maxDrawdown: 3,
      VaR: 2,
      CVaR: 2.5,
      SharpeRatio: 1.6,
      beta: 0.5,
      alpha: 0.3,
      correlation: 0.2,
      historicalTrends: [
        { month: 'Jan', riskLevel: 14 },
        { month: 'Feb', riskLevel: 15 },
        { month: 'Mar', riskLevel: 14 },
        { month: 'Apr', riskLevel: 15 },
        { month: 'May', riskLevel: 15 },
        { month: 'Jun', riskLevel: 16 },
      ],
      recommended: 'Very low risk; ideal for conservative investors.',
    },
    {
      name: 'Asset W',
      riskLevel: 35,
      stdDev: 6,
      maxDrawdown: 12,
      VaR: 8,
      CVaR: 10,
      SharpeRatio: 1.0,
      beta: 1.3,
      alpha: 0.9,
      correlation: 0.6,
      historicalTrends: [
        { month: 'Jan', riskLevel: 32 },
        { month: 'Feb', riskLevel: 34 },
        { month: 'Mar', riskLevel: 36 },
        { month: 'Apr', riskLevel: 37 },
        { month: 'May', riskLevel: 39 },
        { month: 'Jun', riskLevel: 40 },
      ],
      recommended: 'Consider your exposure to this asset.',
    },
    {
      name: 'Asset V',
      riskLevel: 28,
      stdDev: 5,
      maxDrawdown: 8,
      VaR: 6,
      CVaR: 7,
      SharpeRatio: 1.3,
      beta: 1.2,
      alpha: 0.8,
      correlation: 0.4,
      historicalTrends: [
        { month: 'Jan', riskLevel: 26 },
        { month: 'Feb', riskLevel: 28 },
        { month: 'Mar', riskLevel: 27 },
        { month: 'Apr', riskLevel: 29 },
        { month: 'May', riskLevel: 30 },
        { month: 'Jun', riskLevel: 31 },
      ],
      recommended: 'Moderate risk; aligns well with growth strategies.',
    },
  ],
};

const RiskAnalysis = () => {
  const [selectedTab, setSelectedTab] = useState('strategies');
  const [riskFilter, setRiskFilter] = useState('');
  const toast = useToast();

  const handleTabChange = (index) => {
    const tabMap = { 0: 'strategies', 1: 'assets' };
    setSelectedTab(tabMap[index]);
  };

  const currentData = riskData[selectedTab];

  const handleDownload = () => {
    toast({
      title: "Download Initiated",
      description: "Your data is being prepared for download.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredData = currentData.filter(item => {
    return riskFilter ? item.riskLevel <= riskFilter : true;
  });

  return (
    <Box p={5}>
      <Card>
        <Heading as="h2" size="lg" mb={5}>
          Risk Analysis
        </Heading>

        <Tabs onChange={handleTabChange} variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab>Strategies</Tab>
            <Tab>Assets</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <FormControl mb={4}>
                <Select placeholder="Filter by Risk Level" onChange={(e) => setRiskFilter(e.target.value)}>
                  <option value="20">Up to 20</option>
                  <option value="30">Up to 30</option>
                  <option value="40">Up to 40</option>
                  <option value="50">Up to 50</option>
                </Select>
              </FormControl>
              <RiskCharts data={filteredData} />
              <RiskRecommendations data={filteredData} />
              <CSVLink data={filteredData} filename={`${selectedTab}_risk_data.csv`} onClick={handleDownload}>
                <Button colorScheme="green" mt={5}>Download CSV</Button>
              </CSVLink>
              <PDFDownloadLink document={<RiskReportPDF data={filteredData} />} fileName={`${selectedTab}_risk_report.pdf`}>
                <Button colorScheme="teal" mt={5}>Download PDF</Button>
              </PDFDownloadLink>
            </TabPanel>
            <TabPanel>
              <FormControl mb={4}>
                <Select placeholder="Filter by Risk Level" onChange={(e) => setRiskFilter(e.target.value)}>
                  <option value="20">Up to 20</option>
                  <option value="30">Up to 30</option>
                  <option value="40">Up to 40</option>
                  <option value="50">Up to 50</option>
                </Select>
              </FormControl>
              <RiskCharts data={filteredData} />
              <RiskRecommendations data={filteredData} />
              <CSVLink data={filteredData} filename={`${selectedTab}_risk_data.csv`} onClick={handleDownload}>
                <Button colorScheme="green" mt={5}>Download CSV</Button>
              </CSVLink>
              <PDFDownloadLink document={<RiskReportPDF data={filteredData} />} fileName={`${selectedTab}_risk_report.pdf`}>
                <Button colorScheme="teal" mt={5}>Download PDF</Button>
              </PDFDownloadLink>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Box>
  );
};

const RiskCharts = ({ data }) => {
  const chartData = data.map(item => ({
    name: item.name,
    riskLevel: item.riskLevel,
    stdDev: item.stdDev,
    maxDrawdown: item.maxDrawdown,
    VaR: item.VaR,
    CVaR: item.CVaR,
    beta: item.beta,
    alpha: item.alpha,
    correlation: item.correlation,
  }));

  return (
    <VStack spacing={5}>
      <Heading as="h3" size="md">Risk Level Overview</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="riskLevel" fill="#ff7300" name="Risk Level" />
          <Bar dataKey="stdDev" fill="#0088FE" name="Standard Deviation" />
          <Bar dataKey="maxDrawdown" fill="#00C49F" name="Max Drawdown" />
        </BarChart>
      </ResponsiveContainer>

      <Heading as="h3" size="md" mt={5}>Historical Risk Trends</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data[0].historicalTrends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="riskLevel" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <Heading as="h3" size="md" mt={5}>Risk Metrics Overview</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart outerRadius={90} data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis />
          <Radar name="Risk Metrics" dataKey="riskLevel" stroke="#ff7300" fill="#ff7300" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </VStack>
  );
};

const RiskRecommendations = ({ data }) => {
  return (
    <VStack spacing={3} mt={5}>
      <Heading as="h3" size="md">Recommendations:</Heading>
      {data.map((item, index) => (
        <Text key={index}>
          {item.name}: {item.recommended}
        </Text>
      ))}
    </VStack>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{`Name: ${label}`}</p>
        <p>{`Risk Level: ${payload[0].value}`}</p>
        <p>{`Std Dev: ${payload[1].value}`}</p>
        <p>{`Max Drawdown: ${payload[2].value}`}</p>
      </div>
    );
  }
  return null;
};

export default RiskAnalysis;
