import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Divider,
  Button,
  HStack,
  Flex,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  useDisclosure,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
// For charting (You can install `chart.js` and `react-chartjs-2`)
// import { Line } from 'react-chartjs-2';
import Card from "components/card/Card.js";

// Import Icons
import USDCIcon from "assets/img/icons/usdc.png";
import ETHIcon from "assets/img/icons/eth.png";
import BTCIcon from "assets/img/icons/btc.jpg"; 
import BSCIcon from "assets/img/icons/bsc.png";
import MaticIcon from "assets/img/icons/matic.png";
import BIMAIcon from "assets/img/icons/bima.jpg";
import DAIIcon from "assets/img/icons/dai.png";  
import AvalancheIcon from "assets/img/icons/avalanche.png";  

// Sample Data
const portfolioSummary = {
  totalAssets: 50000,
  breakdown: [
    { network: "Ethereum", amount: 30000 },
    { network: "Binance Smart Chain", amount: 15000 },
    { network: "Polygon", amount: 5000 },
  ],
};

const initialInvestments = [
  {
    strategyName: "Yield Farming - ETH",
    strategyType: "Yield Farming",
    amountInvested: 10000,
    currentValue: 12000,
    realizedEarnings: 1500,
    unrealizedEarnings: 500,
    apy: "10%",
    riskLevel: "Medium",
    icon: ETHIcon,
    history: [],
    autoRebalance: false,
    transactionHistory: [
      { date: "2024-01-01", amount: 10000, type: "Investment" },
      { date: "2024-02-01", amount: 2000, type: "Withdrawal" },
    ],
    performanceData: [9500, 10000, 11500, 12000], // Dummy performance data
    riskExposure: "Medium",
    fundAllocation: {
      ETH: 0.6,
      DAI: 0.4,
    },
  },
  {
    strategyName: "Liquidity Pool - BSC",
    strategyType: "Liquidity Pool",
    amountInvested: 5000,
    currentValue: 5200,
    realizedEarnings: 200,
    unrealizedEarnings: 100,
    apy: "8%",
    riskLevel: "Low",
    icon: BSCIcon,
    history: [],
    autoRebalance: false,
    transactionHistory: [],
    performanceData: [4800, 4900, 5100, 5200], // Dummy performance data
    riskExposure: "Low",
    fundAllocation: {
      BNB: 0.7,
      USDC: 0.3,
    },
  },
  {
    strategyName: "Staking - MATIC",
    strategyType: "Staking",
    amountInvested: 2000,
    currentValue: 2100,
    realizedEarnings: 50,
    unrealizedEarnings: 50,
    apy: "12%",
    riskLevel: "High",
    icon: MaticIcon,
    history: [],
    autoRebalance: false,
    transactionHistory: [],
    performanceData: [1900, 2000, 2050, 2100], // Dummy performance data
    riskExposure: "High",
    fundAllocation: {
      MATIC: 1.0,
    },
  },
];

const strategies = [
  "Yield Farming - ETH",
  "Liquidity Pool - BSC",
  "Staking - MATIC",
  "Liquidity Pool - USDC",
];

const MyInvestments = () => {
  const [investments, setInvestments] = useState(initialInvestments);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [adjustmentAmount, setAdjustmentAmount] = useState(0);
  const [actionType, setActionType] = useState('');
  const [newStrategy, setNewStrategy] = useState('');
  const [alert, setAlert] = useState('');
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();

  const handleActionClick = (action, investment) => {
    setSelectedInvestment(investment);
    setActionType(action);
    setAdjustmentAmount(0); // Reset input value
    setNewStrategy(''); // Reset new strategy selection
    onOpen();
  };

  const handleDetailsClick = (investment) => {
    setSelectedInvestment(investment);
    onDetailsOpen();
  };

  const handleSubmit = () => {
    if (actionType === 'Add Funds') {
      if (adjustmentAmount <= 0) {
        setAlert("Amount must be greater than 0.");
        return;
      }
      const updatedInvestments = investments.map(investment => 
        investment.strategyName === selectedInvestment.strategyName
          ? {
              ...investment,
              amountInvested: investment.amountInvested + parseFloat(adjustmentAmount),
              currentValue: investment.currentValue + parseFloat(adjustmentAmount),
              history: [...investment.history, `Added $${adjustmentAmount}`],
              transactionHistory: [...investment.transactionHistory, { date: new Date().toLocaleDateString(), amount: adjustmentAmount, type: 'Investment' }],
            }
          : investment
      );
      setInvestments(updatedInvestments);
      setAlert("Funds added successfully!");
    } else if (actionType === 'Withdraw Funds') {
      if (adjustmentAmount <= 0 || adjustmentAmount > selectedInvestment.amountInvested) {
        setAlert("Invalid withdrawal amount.");
        return;
      }
      const updatedInvestments = investments.map(investment => 
        investment.strategyName === selectedInvestment.strategyName
          ? {
              ...investment,
              amountInvested: investment.amountInvested - parseFloat(adjustmentAmount),
              currentValue: investment.currentValue - parseFloat(adjustmentAmount),
              history: [...investment.history, `Withdrew $${adjustmentAmount}`],
              transactionHistory: [...investment.transactionHistory, { date: new Date().toLocaleDateString(), amount: adjustmentAmount, type: 'Withdrawal' }],
            }
          : investment
      );
      setInvestments(updatedInvestments);
      setAlert("Funds withdrawn successfully!");
    } else if (actionType === 'Reallocate Funds') {
      const updatedInvestments = investments.map(investment => 
        investment.strategyName === selectedInvestment.strategyName
          ? {
              ...investment,
              amountInvested: investment.amountInvested + parseFloat(adjustmentAmount),
              history: [...investment.history, `Reallocated $${adjustmentAmount}`],
            }
          : investment
      );
      setInvestments(updatedInvestments);
      setAlert("Funds reallocated successfully!");
    } else if (actionType === 'Switch Strategy') {
      const updatedInvestments = investments.map(investment => 
        investment.strategyName === selectedInvestment.strategyName
          ? {
              ...investment,
              strategyName: newStrategy,
              history: [...investment.history, `Switched to ${newStrategy}`],
            }
          : investment
      );
      setInvestments(updatedInvestments);
      setAlert("Strategy switched successfully!");
    }

    onClose(); // Close modal after processing
  };

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={5}>
        My Investments
      </Heading>

      {alert && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          {alert}
        </Alert>
      )}

      {/* Portfolio Summary */}
      <Card mb={5}>
        <Box p={4}>
          <Heading size="md">Portfolio Summary</Heading>
        </Box>
        <Box p={4}>
          <Stat>
            <StatLabel>Total Assets Invested</StatLabel>
            <StatNumber>${portfolioSummary.totalAssets.toLocaleString()}</StatNumber>
          </Stat>
          <Divider my={4} />
          <Heading size="sm">Breakdown by Blockchain Network:</Heading>
          {portfolioSummary.breakdown.map((item, index) => (
            <Text key={index}>
              {item.network}: ${item.amount.toLocaleString()}
            </Text>
          ))}
        </Box>
      </Card>

      {/* Active Investments */}
<Heading as="h3" size="md" mb={3}>
  Active Investments
</Heading>
<SimpleGrid columns={{ sm: 1, md: 2 }} spacing={5}>
  {investments.map((investment, index) => (
    <Card key={index}>
      <Flex direction="column" justify="space-between" h="100%">
        <Box p={4} display="flex" justifyContent="center">
          <Image src={investment.icon} alt={`${investment.strategyName} Icon`} boxSize="80px" objectFit="contain" />
        </Box>
        <Box p={4}>
          <Heading size="md" textAlign="center">{investment.strategyName}</Heading>
          <Text><strong>Strategy Type:</strong> {investment.strategyType}</Text>
          <Text><strong>Amount Invested:</strong> ${investment.amountInvested.toLocaleString()}</Text>
          <Text><strong>Current Value:</strong> ${investment.currentValue.toLocaleString()}</Text>
          <Text><strong>Realized Earnings:</strong> ${investment.realizedEarnings.toLocaleString()}</Text>
          <Text><strong>Unrealized Earnings:</strong> ${investment.unrealizedEarnings.toLocaleString()}</Text>
          <HStack mt={2} justifyContent="center">
            <Text><strong>APY:</strong> {investment.apy}</Text>
            <Text><strong>Risk Level:</strong> {investment.riskLevel}</Text>
            <Switch 
              isChecked={investment.autoRebalance} 
              onChange={() => {
                const updatedInvestments = investments.map(i => 
                  i.strategyName === investment.strategyName
                    ? { ...i, autoRebalance: !i.autoRebalance }
                    : i
                );
                setInvestments(updatedInvestments);
              }} 
            />
            <Text>Auto Rebalance</Text>
          </HStack>
        </Box>
        
        <HStack justifyContent="space-between" p={4}>
          <HStack>
            <Button colorScheme="blue" mr={2} onClick={() => handleActionClick('Add Funds', investment)}>Add Funds</Button>
            <Button colorScheme="red" mr={2} onClick={() => handleActionClick('Withdraw Funds', investment)}>Withdraw Funds</Button>
            <Button colorScheme="green" mr={2} onClick={() => handleActionClick('Reallocate Funds', investment)}>Reallocate Funds</Button>
            <Button onClick={() => handleActionClick('Switch Strategy', investment)}>Switch Strategy</Button>
          </HStack>
          <Button colorScheme="purple" onClick={() => handleDetailsClick(investment)}>Details</Button>
        </HStack>
        
        <Box p={4}>
          <Heading size="sm">Investment History:</Heading>
          {investment.history.length > 0 ? (
            investment.history.map((historyItem, idx) => (
              <Text key={idx}>{historyItem}</Text>
            ))
          ) : (
            <Text>No history available.</Text>
          )}
        </Box>
      </Flex>
    </Card>
  ))}
</SimpleGrid>

      {/* Modal for Actions */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{actionType} - {selectedInvestment?.strategyName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {actionType === 'Switch Strategy' ? (
              <FormControl>
                <FormLabel>Select New Strategy</FormLabel>
                <Select
                  value={newStrategy}
                  onChange={(e) => setNewStrategy(e.target.value)}
                  placeholder="Select strategy"
                >
                  {strategies.map((strategy, index) => (
                    <option key={index} value={strategy}>{strategy}</option>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  value={adjustmentAmount}
                  onChange={(e) => setAdjustmentAmount(e.target.value)}
                  placeholder="Enter amount"
                  min={0}
                />
              </FormControl>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

     {/* Modal for Investment Details */}
<Modal isOpen={isDetailsOpen} onClose={onDetailsClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Investment Details - {selectedInvestment?.strategyName}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Heading size="sm">Transaction History:</Heading>
      <SimpleGrid columns={1} spacing={3} mb={4}>
        {selectedInvestment?.transactionHistory.length > 0 ? (
          selectedInvestment.transactionHistory.map((transaction, idx) => (
            <Box key={idx} p={3} borderWidth="1px" borderRadius="md">
              <Text><strong>Date:</strong> {transaction.date}</Text>
              <Text><strong>Amount:</strong> ${transaction.amount}</Text>
              <Text><strong>Type:</strong> {transaction.type}</Text>
            </Box>
          ))
        ) : (
          <Text>No transactions available.</Text>
        )}
      </SimpleGrid>

      <Heading size="sm">Performance Over Time:</Heading>
      {/* Uncomment and implement chart here */}
      {/* <Line data={data} /> */}

      <Heading size="sm" mt={4}>Risk Exposure:</Heading>
      <Text>{selectedInvestment?.riskExposure}</Text>

      <Heading size="sm" mt={4}>Fund Allocation:</Heading>
      <SimpleGrid columns={2} spacing={3}>
        {selectedInvestment && selectedInvestment.fundAllocation ? (
          Object.entries(selectedInvestment.fundAllocation).map(([asset, allocation]) => (
            <Box key={asset} p={3} borderWidth="1px" borderRadius="md">
              <Text><strong>{asset}:</strong> {Math.round(allocation * 100)}%</Text>
            </Box>
          ))
        ) : (
          <Text>No fund allocation data available.</Text>
        )}
      </SimpleGrid>
    </ModalBody>
    <ModalFooter>
      <Button variant="ghost" onClick={onDetailsClose}>Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </Box>
  );
};

export default MyInvestments;

