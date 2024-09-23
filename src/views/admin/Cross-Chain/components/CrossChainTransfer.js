import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast,
  Spinner,
  VStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { CloseIcon } from '@chakra-ui/icons';
import Card from "components/card/Card.js";

const CrossChainTransfer = () => {
  const [sourceChain, setSourceChain] = useState("Ethereum");
  const [destinationChain, setDestinationChain] = useState("Binance Smart Chain");
  const [asset, setAsset] = useState("BIMA Stablecoin");
  const [amount, setAmount] = useState("");
  const [estimatedFees, setEstimatedFees] = useState("$0.00");
  const [transactionTime, setTransactionTime] = useState("5-10 minutes");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleTransfer = () => {
    const parsedAmount = parseFloat(amount);
    // Validate the transfer amount
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid transfer amount.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simulate fee calculation based on the amount and selected chains
    const calculatedFees = (parsedAmount * 0.01).toFixed(2); // Example: 1% fee
    setEstimatedFees(`$${calculatedFees}`);
    setTransactionTime("5 minutes"); // Example transaction time
    onOpen(); // Open the confirmation modal
  };

  const handleConfirmTransfer = () => {
    setIsLoading(true);
    const parsedAmount = parseFloat(amount);

    // Simulate a transfer process
    setTimeout(() => {
      toast({
        title: "Transfer Initiated",
        description: `Successfully initiated transfer of ${parsedAmount.toFixed(2)} ${asset} from ${sourceChain} to ${destinationChain}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Update transaction history
      setTransactionHistory((prev) => [
        ...prev,
        {
          asset,
          amount: parsedAmount.toFixed(2),
          sourceChain,
          destinationChain,
          fees: estimatedFees,
          status: "Completed",
          date: new Date().toLocaleString(),
          transactionId: Math.random().toString(36).substring(2, 15), // Generate a fake transaction ID
          explorerLink: "https://explorer.example.com", // Placeholder for explorer link
        },
      ]);

      // Reset input fields
      setAmount("");
      setEstimatedFees("$0.00");
      setIsLoading(false);
      onClose();
    }, 2000); // Simulating network delay
  };

  const handleDeleteTransaction = (transactionId) => {
    setTransactionHistory((prev) => prev.filter(tx => tx.transactionId !== transactionId));
    toast({
      title: "Transaction Deleted",
      description: "The selected transaction has been removed.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Card p="20px" mb="20px">
      <Heading size="lg" color="blue.600" mb="20px">
        Cross-Chain Transfers
      </Heading>
      <Divider mb="20px" />
      <FormControl mb="20px">
        <FormLabel>Source Chain</FormLabel>
        <Select value={sourceChain} onChange={(e) => setSourceChain(e.target.value)}>
          <option value="Ethereum">Ethereum</option>
          <option value="Binance Smart Chain">Binance Smart Chain</option>
          <option value="Polygon">Polygon</option>
          <option value="Avalanche">Avalanche</option>
          {/* Add more chains as necessary */}
        </Select>
      </FormControl>
      <FormControl mb="20px">
        <FormLabel>Destination Chain</FormLabel>
        <Select value={destinationChain} onChange={(e) => setDestinationChain(e.target.value)}>
          <option value="Binance Smart Chain">Binance Smart Chain</option>
          <option value="Ethereum">Ethereum</option>
          <option value="Polygon">Polygon</option>
          <option value="Avalanche">Avalanche</option>
          {/* Add more chains as necessary */}
        </Select>
      </FormControl>
      <FormControl mb="20px">
        <FormLabel>Asset</FormLabel>
        <Select value={asset} onChange={(e) => setAsset(e.target.value)}>
          <option value="BIMA Stablecoin">BIMA Stablecoin</option>
          <option value="USDC">USDC</option>
          <option value="DAI">DAI</option>
          {/* Add more assets as necessary */}
        </Select>
      </FormControl>
      <FormControl mb="20px">
        <FormLabel>Transfer Amount</FormLabel>
        <Input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </FormControl>
      <Text fontWeight="bold" mb="10px">
        Estimated Fees: {estimatedFees}
      </Text>
      <Text fontWeight="bold" mb="20px">
        Estimated Transaction Time: {transactionTime}
      </Text>
      <Button colorScheme="blue" onClick={handleTransfer}>
        Initiate Transfer
      </Button>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Transfer</ModalHeader>
          <ModalBody>
            <Text>
              You are about to transfer <strong>{parseFloat(amount).toFixed(2)} {asset}</strong> from <strong>{sourceChain}</strong> to <strong>{destinationChain}</strong>.
            </Text>
            <Text mt={4}><strong>Estimated Fees:</strong> {estimatedFees}</Text>
            <Text><strong>Estimated Transaction Time:</strong> {transactionTime}</Text>
            <Divider my="20px" />
            <Text>Note: Ensure you have sufficient balance to cover the transfer fees.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleConfirmTransfer} isLoading={isLoading}>
              Confirm Transfer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Transaction History */}
      <Box mt="20px">
        <Heading size="md" color="blue.600" mb="10px">
          Transfer History
        </Heading>
        <VStack align="start" spacing={2} width="100%">
          {transactionHistory.length > 0 ? (
            transactionHistory.map((tx) => (
              <Box key={tx.transactionId} borderWidth="1px" borderRadius="md" p={2} width="100%">
                <Text><strong>Transaction ID:</strong> {tx.transactionId}</Text>
                <Text><strong>Asset:</strong> {tx.asset}</Text>
                <Text><strong>Amount:</strong> {tx.amount}</Text>
                <Text><strong>From:</strong> {tx.sourceChain}</Text>
                <Text><strong>To:</strong> {tx.destinationChain}</Text>
                <Text><strong>Fees:</strong> {tx.fees}</Text>
                <Text><strong>Status:</strong> {tx.status}</Text>
                <Text><strong>Date:</strong> {tx.date}</Text>
                <HStack spacing={2} mt={2}>
                  <Button as="a" href={tx.explorerLink} target="_blank" colorScheme="blue">
                    View on Explorer
                  </Button>
                  <IconButton
                    icon={<CloseIcon />}
                    onClick={() => handleDeleteTransaction(tx.transactionId)}
                    colorScheme="red"
                    aria-label="Delete Transaction"
                    variant="outline"
                  />
                </HStack>
              </Box>
            ))
          ) : (
            <Text>No transactions found.</Text>
          )}
        </VStack>
      </Box>

      {/* Cross-Chain Bridges Information */}
      <Box mt="20px">
        <Heading size="md" color="blue.600" mb="10px">
          Cross-Chain Bridges Information
        </Heading>
        <Text>
          <strong>Anyswap:</strong> A decentralized protocol allowing users to swap tokens across different blockchains with security and low fees.
        </Text>
        <Text>
          <strong>Connext:</strong> A protocol designed for instant cross-chain transactions with a focus on security and user experience.
        </Text>
        <Text mt={2}>
          Ensure to review the security features and protocols in place before making transfers.
        </Text>
      </Box>
    </Card>
  );
};

export default CrossChainTransfer;
