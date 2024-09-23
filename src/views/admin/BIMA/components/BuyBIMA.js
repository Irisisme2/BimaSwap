import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Image,
  Divider,
  useToast,
  Spinner,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons'; // Import CheckCircleIcon for purchase status
import BIMAIcon from 'assets/img/icons/bima.jpg';
import ETHIcon from 'assets/img/icons/eth.png';
import BTCIcon from 'assets/img/icons/btc.jpg';
import USDCIcon from 'assets/img/icons/usdc.png';
import BSCIcon from 'assets/img/icons/bsc.png';
import MaticIcon from 'assets/img/icons/matic.png';
import DAIIcon from 'assets/img/icons/dai.png';
import AvalancheIcon from 'assets/img/icons/avalanche.png';
import Card from "components/card/Card.js";

const BuyBIMA = () => {
  const toast = useToast();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [conversionAmount, setConversionAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('ETH');
  const [conversionResult, setConversionResult] = useState(null);
  const [adjustedBIMA, setAdjustedBIMA] = useState(null); // To store the adjusted BIMA amount
  const [purchaseRecords, setPurchaseRecords] = useState([]); // State to store purchase records
  const transactionFeeRate = 0.02; // Simulating a 2% transaction fee

  const handlePurchase = (method) => {
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to purchase.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setPaymentMethod(method);
    setShowModal(true); // Show confirmation modal
  };

  const confirmPurchase = () => {
    setLoading(true);
    setShowModal(false); // Hide confirmation modal

    // Simulate a purchase process
    setTimeout(() => {
      const success = Math.random() > 0.2; // Simulate success or failure
      setLoading(false);

      if (success) {
        toast({
          title: "Purchase Successful",
          description: `You have successfully purchased ${amount} BIMA via ${paymentMethod}.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Add the purchase to records
        setPurchaseRecords((prevRecords) => [
          ...prevRecords,
          { amount, paymentMethod, status: 'Completed' },
        ]);

        setAmount(''); // Clear amount on success
      } else {
        toast({
          title: "Purchase Failed",
          description: "There was an issue processing your purchase. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }, 2000);
  };

  const handleConversion = () => {
    // Simulate conversion logic
    const rates = {
      BTC: 0.005,
      ETH: 0.1,
      USDC: 0.25,
      DAI: 0.25,
      BSC: 0.5,
      MATIC: 1,
      AVALANCHE: 0.3,
    };

    const rate = rates[selectedCrypto];
    const result = rate * conversionAmount;

    // Calculate the adjusted amount after deducting transaction fees
    const fee = result * transactionFeeRate;
    const adjustedAmount = result - fee;

    setConversionResult(result);
    setAdjustedBIMA(adjustedAmount); // Store the adjusted amount
  };

  return (
    <Box p={5}>
      <Card>
        <VStack spacing={5}>
          <HStack spacing={3}>
            <Image src={BIMAIcon} alt="BIMA Icon" boxSize="50px" />
            <Heading as="h2" size="lg">Buy BIMA Stablecoins</Heading>
          </HStack>
          <Text>
            Simplify your DeFi experience with easy purchase options for BIMA stablecoins.
          </Text>

          <Divider />

          {/* Purchase Options */}
          <Heading as="h3" size="md">Purchase Options</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {/* Credit Card Option */}
            <Card p={5} bg="white" borderRadius="md" shadow="md">
              <Heading as="h4" size="sm">Buy with Credit Card</Heading>
              <Text mt={2}>
                Purchase BIMA instantly using your credit card through our secure payment processor.
              </Text>
              <FormControl mt={4} isRequired>
                <FormLabel>Amount (BIMA)</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  isDisabled={loading}
                />
              </FormControl>
              <Button
                colorScheme="blue"
                mt={4}
                isLoading={loading && paymentMethod === "Credit Card"}
                onClick={() => handlePurchase("Credit Card")}
              >
                Buy BIMA
              </Button>
            </Card>

            {/* Bank Transfer Option */}
            <Card p={5} bg="white" borderRadius="md" shadow="md">
              <Heading as="h4" size="sm">Bank Transfer</Heading>
              <Text mt={2}>
                Purchase BIMA via bank transfer. Follow the instructions below:
              </Text>
              <Text mt={2}>
                <strong>Instructions:</strong>
              </Text>
              <Text>1. Transfer funds to the following account:</Text>
              <Text>Account Number: 123456789</Text>
              <Text>Bank: Example Bank</Text>
              <Text>2. Include your BIMA wallet address in the transfer notes.</Text>
              <Text>3. Estimated processing time: 1-3 business days.</Text>
              <FormControl mt={4} isRequired>
                <FormLabel>Amount (BIMA)</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  isDisabled={loading}
                />
              </FormControl>
              <Button
                colorScheme="blue"
                mt={4}
                isLoading={loading && paymentMethod === "Bank Transfer"}
                onClick={() => handlePurchase("Bank Transfer")}
              >
                Purchase BIMA
              </Button>
            </Card>
          </SimpleGrid>

          {loading && (
            <Stack spacing={3} mt={5} alignItems="center">
              <Spinner size="lg" />
              <Text>Processing your purchase...</Text>
            </Stack>
          )}
        </VStack>
      </Card>

      {/* Conversion Tool */}
      <Box mt={10}>
        <Card p={5} bg="white" borderRadius="md" shadow="md">
          <Heading as="h3" size="md" textAlign="center">Conversion Tool</Heading>
          <Text textAlign="center" mt={2}>
            Convert your cryptocurrencies to BIMA.
          </Text>
          <Divider my={4} />
          <HStack justifyContent="space-between">
            {/* Cryptocurrency Selection */}
            <VStack alignItems="flex-start" width="45%">
              <Image src={selectedCrypto === 'ETH' ? ETHIcon : selectedCrypto === 'BTC' ? BTCIcon : selectedCrypto === 'USDC' ? USDCIcon : selectedCrypto === 'DAI' ? DAIIcon : selectedCrypto === 'BSC' ? BSCIcon : selectedCrypto === 'MATIC' ? MaticIcon : AvalancheIcon} alt={`${selectedCrypto} Icon`} boxSize="150px" ml={60} />
              <FormControl>
                <FormLabel>Select Cryptocurrency</FormLabel>
                <Select
                  placeholder="Select crypto"
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value)}
                >
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="USDC">USD Coin (USDC)</option>
                  <option value="DAI">Dai (DAI)</option>
                  <option value="BSC">Binance Smart Chain (BSC)</option>
                  <option value="MATIC">Polygon (MATIC)</option>
                  <option value="AVALANCHE">Avalanche (AVAX)</option>
                </Select>
              </FormControl>
            </VStack>

            {/* BIMA Amount Input */}
            <VStack alignItems="flex-start" width="45%">
              <Image src={BIMAIcon} alt="BIMA Icon" boxSize="150px" ml={60} />
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={conversionAmount}
                  onChange={(e) => setConversionAmount(e.target.value)}
                />
              </FormControl>
            </VStack>
          </HStack>
          <HStack justifyContent="center" mt={4}>
            <Button colorScheme="blue" onClick={handleConversion}>
              Convert to BIMA
            </Button>
          </HStack>
          {conversionResult !== null && (
            <Text mt={4} textAlign="center">
              You will receive approximately {conversionResult.toFixed(4)} BIMA (before fees).
            </Text>
          )}
          {adjustedBIMA !== null && (
            <Text mt={2} textAlign="center" color="red.500">
              After a {transactionFeeRate * 100}% transaction fee, you will receive approximately {adjustedBIMA.toFixed(4)} BIMA.
            </Text>
          )}
        </Card>
      </Box>

      {/* Confirmation Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Purchase</ModalHeader>
          <ModalBody>
            <Text fontWeight="bold">You are about to purchase:</Text>
            <Text>{amount} BIMA</Text>
            <Text>Using: {paymentMethod}</Text>
            <Text>Do you wish to proceed?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={confirmPurchase}>
              Confirm
            </Button>
            <Button onClick={() => setShowModal(false)} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Purchase Records */}
      <Box mt={10}>
        <Card p={5} bg="white" borderRadius="md" shadow="md">
          <Heading as="h3" size="md" textAlign="center">Purchase Records</Heading>
          <Divider my={4} />
          <List spacing={3}>
            {purchaseRecords.length > 0 ? (
              purchaseRecords.map((record, index) => (
                <ListItem key={index}>
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                  <Text>{record.amount} BIMA via {record.paymentMethod} - Status: {record.status}</Text>
                </ListItem>
              ))
            ) : (
              <Text textAlign="center">No purchase records available.</Text>
            )}
          </List>
        </Card>
      </Box>
    </Box>
  );
};

export default BuyBIMA;
