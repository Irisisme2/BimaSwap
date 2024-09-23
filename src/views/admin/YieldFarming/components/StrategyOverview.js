import React, { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Heading,
  HStack,
  Divider,
  VStack,
  Button,
  Tooltip,
  Icon,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { InfoIcon } from "@chakra-ui/icons";
import Card from "components/card/Card.js";
import USDCIcon from "assets/img/icons/usdc.png";
import ETHIcon from "assets/img/icons/eth.png";
import BTCIcon from "assets/img/icons/btc.jpg";
// Sample data for strategies with detailed information
const strategiesData = [
  {
    name: "Low-Risk Strategy",
    description: "Focus on stable and secure pools, minimizing volatility.",
    expectedAPY: "3-5%",
    protocols: ["Aave", "Compound", "MakerDAO"],
    assets: ["USDC", "DAI"],
    riskProfile: "Conservative",
    targetInvestment: "$5,000 - $50,000",
    historicalReturns: [2, 3, 4, 5, 6],
    marketConditions: "Ideal during stable market periods.",
    icon: USDCIcon,
    additionalInsights: [
      "Utilizes primarily stablecoins for minimal risk.",
      "Regularly audited protocols ensure security.",
      "Ideal for beginners and risk-averse investors.",
    ],
  },
  {
    name: "Medium-Risk Strategy",
    description: "Balanced approach between safety and yield, aiming for steady growth.",
    expectedAPY: "5-10%",
    protocols: ["Yearn Finance", "Curve", "Balancer"],
    assets: ["ETH", "DAI"],
    riskProfile: "Moderate",
    targetInvestment: "$1,000 - $20,000",
    historicalReturns: [4, 5, 6, 7, 8],
    marketConditions: "Effective in fluctuating markets.",
    icon: ETHIcon,
    additionalInsights: [
      "Diversifies between stable and volatile assets.",
      "Suitable for investors looking for growth with managed risk.",
      "Focuses on liquidity provision and yield optimization.",
    ],
  },
  {
    name: "High-Risk Strategy",
    description: "Pursuing high-yield opportunities with increased volatility.",
    expectedAPY: "10-20%",
    protocols: ["SushiSwap", "PancakeSwap", "Uniswap"],
    assets: ["BTC", "LINK"],
    riskProfile: "Aggressive",
    targetInvestment: "$100 - $5,000",
    historicalReturns: [6, 8, 10, 12, 15],
    marketConditions: "Best during bullish market phases.",
    icon: BTCIcon,
    additionalInsights: [
      "Engages in liquidity mining and governance token farming.",
      "Higher volatility requires active monitoring.",
      "Best suited for experienced investors looking for significant gains.",
    ],
  },
];

const StrategyOverview = () => {
  const [selectedStrategyIndex, setSelectedStrategyIndex] = useState(0);
  const selectedStrategy = strategiesData[selectedStrategyIndex];

  // Sample customization parameters
  const [minAPY, setMinAPY] = useState("3%");
  const [maxAPY, setMaxAPY] = useState("20%");
  const [riskLevel, setRiskLevel] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const handleCustomize = () => {
    alert(`Customizing strategy with: \nMin APY: ${minAPY}\nMax APY: ${maxAPY}\nRisk Level: ${riskLevel}`);
  };

  return (
    <Card p="20px" mb="20px">
      <Heading size="lg" color="blue.600" mb="20px">
        Strategy Overview
      </Heading>
      <Tabs variant="soft-rounded" colorScheme="purple">
        <TabList mb="20px">
          {strategiesData.map((strategy, index) => (
            <Tab key={strategy.name} onClick={() => setSelectedStrategyIndex(index)}>
              {strategy.name}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {strategiesData.map((strategy, index) => (
            <TabPanel key={strategy.name}>
              <Text fontSize="xl" fontWeight="bold" mb="10px">
                {strategy.name}
                <Tooltip label="Learn more about this strategy" aria-label="A tooltip">
                  <Icon as={InfoIcon} boxSize={4} color="blue.500" ml={2} />
                </Tooltip>
              </Text>
              <HStack spacing={2}>
                <img src={strategy.icon} alt={`${strategy.name} Icon`} width="50" />
                <Text>{strategy.description}</Text>
              </HStack>
              <Text mt={2}><strong>Expected APY:</strong> {strategy.expectedAPY}</Text>
              <Text mt={2}><strong>Underlying Protocols:</strong> {strategy.protocols.join(", ")}</Text>
              <Text mt={2}><strong>Target Assets:</strong> {strategy.assets.join(", ")}</Text>
              <Text mt={2}><strong>Risk Profile:</strong> {strategy.riskProfile}</Text>
              <Text mt={2}><strong>Recommended Investment:</strong> {strategy.targetInvestment}</Text>
              <Text mt={2}><strong>Market Conditions:</strong> {strategy.marketConditions}</Text>
              <Divider my="20px" />
              <Text fontWeight="bold">Historical Returns:</Text>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={strategy.historicalReturns.map((yieldValue, index) => ({ month: `M${index + 1}`, yield: yieldValue }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="yield" stroke={index === 0 ? "#4A90E2" : index === 1 ? "#F1C40F" : "#E74C3C"} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <Divider my="20px" />
              <Text fontWeight="bold">Key Insights:</Text>
              <VStack align="start" spacing={1}>
                {strategy.additionalInsights.map((insight, index) => (
                  <Text key={index}>{`• ${insight}`}</Text>
                ))}
              </VStack>
              <Button mt={4} colorScheme="blue" onClick={() => setShowModal(true)}>
                Customize Strategy
              </Button>
              <Divider my="20px" />
              <Text fontWeight="bold">Customize Your Strategy:</Text>
              <FormControl mt={4}>
                <FormLabel>Minimum APY:</FormLabel>
                <Select value={minAPY} onChange={(e) => setMinAPY(e.target.value)}>
                  <option value="3%">3%</option>
                  <option value="5%">5%</option>
                  <option value="7%">7%</option>
                  <option value="10%">10%</option>
                  <option value="15%">15%</option>
                  <option value="20%">20%</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Maximum APY:</FormLabel>
                <Select value={maxAPY} onChange={(e) => setMaxAPY(e.target.value)}>
                  <option value="10%">10%</option>
                  <option value="15%">15%</option>
                  <option value="20%">20%</option>
                  <option value="25%">25%</option>
                  <option value="30%">30%</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Risk Level:</FormLabel>
                <Select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Select>
              </FormControl>
              <Button mt={4} colorScheme="blue" onClick={handleCustomize}>
                Apply Customization
              </Button>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <Box mt="20px">
        <Text fontWeight="bold">More Information:</Text>
        <Text>
          Each strategy is tailored to different risk tolerances, allowing investors to choose based on their financial goals.
          Consider diversifying across strategies for a balanced portfolio. Always consult with a financial advisor for personalized advice.
        </Text>
      </Box>

      {/* Modal for strategy customization */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Customize Your Strategy</ModalHeader>
          <ModalBody>
            <Text>Modify your strategy parameters:</Text>
            <FormControl mt={4}>
              <FormLabel>Minimum APY:</FormLabel>
              <Select value={minAPY} onChange={(e) => setMinAPY(e.target.value)}>
                <option value="3%">3%</option>
                <option value="5%">5%</option>
                <option value="7%">7%</option>
                <option value="10%">10%</option>
                <option value="15%">15%</option>
                <option value="20%">20%</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Maximum APY:</FormLabel>
              <Select value={maxAPY} onChange={(e) => setMaxAPY(e.target.value)}>
                <option value="10%">10%</option>
                <option value="15%">15%</option>
                <option value="20%">20%</option>
                <option value="25%">25%</option>
                <option value="30%">30%</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Risk Level:</FormLabel>
              <Select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
                <option value="All">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCustomize}>
              Apply
            </Button>
            <Button ml={3} onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default StrategyOverview;
