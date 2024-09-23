import React, { useState } from "react";
import {
  Box,
  Button,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
  Image,
  Spinner,
} from "@chakra-ui/react";
import USDCIcon from "assets/img/icons/usdc.png";
import ETHIcon from "assets/img/icons/eth.png";
import BTCIcon from "assets/img/icons/btc.jpg";
import Card from "components/card/Card.js";

// Mapping asset icons and fees
const assetData = {
  usdc: { icon: USDCIcon, fee: 0.01 },
  eth: { icon: ETHIcon, fee: 0.02 },
  btc: { icon: BTCIcon, fee: 0.003 },
};

const QuickActions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentAction, setCurrentAction] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [fee, setFee] = useState(0);

  const handleOpen = (action) => {
    setCurrentAction(action);
    setSelectedAsset(""); // Reset selected asset
    setAmount(""); // Reset amount
    setRecipientAddress(""); // Reset recipient
    setFee(0); // Reset fee
    onOpen();
  };

  const handleAssetChange = (value) => {
    setSelectedAsset(value);
    setFee(assetData[value]?.fee || 0);
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate a network request
    setTimeout(() => {
      setLoading(false);
      onClose();
      // Reset form after submission
      setSelectedAsset("");
      setAmount("");
      setRecipientAddress("");
    }, 2000);
  };

  const renderModalContent = () => {
    return (
      <>
        {currentAction === "Transfer Assets" && (
          <>
            <FormControl mb={4}>
              <FormLabel>Select Asset</FormLabel>
              <Select placeholder="Select asset" onChange={(e) => handleAssetChange(e.target.value)}>
                {Object.keys(assetData).map((key) => (
                  <option key={key} value={key}>
                    {key.toUpperCase()}
                  </option>
                ))}
              </Select>
            </FormControl>
            {selectedAsset && (
              <Box mb={4} display="flex" alignItems="center">
                <Image src={assetData[selectedAsset].icon} alt={selectedAsset} boxSize="30px" mr={2} />
                <Text>{selectedAsset.toUpperCase()} - Fee: {fee} {selectedAsset.toUpperCase()}</Text>
              </Box>
            )}
            <FormControl mb={4}>
              <FormLabel>Amount to Transfer</FormLabel>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Recipient Address</FormLabel>
              <Input
                placeholder="Enter recipient address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
            </FormControl>
            <Text mt={2}>Transfer assets to another user.</Text>
          </>
        )}
        {/* Add content for other actions as needed */}
      </>
    );
  };

  return (
    <Card p="20px" mb="20px" height="365px">
      <Text fontSize="lg" fontWeight="bold" mb="20px">Quick Actions</Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
        <Button onClick={() => handleOpen("Deposit")} colorScheme="blue">Deposit</Button>
        <Button onClick={() => handleOpen("Withdraw")} colorScheme="green">Withdraw</Button>
        <Button onClick={() => handleOpen("Switch Strategy")} colorScheme="yellow">Switch Strategy</Button>
        <Button onClick={() => handleOpen("Transfer Assets")} colorScheme="purple">Transfer Assets</Button>
        <Button onClick={() => handleOpen("Start Yield Farming")} colorScheme="teal">Start Yield Farming</Button>
      </SimpleGrid>

      {/* Modal for actions */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentAction}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <Box textAlign="center" p={5}>
                <Spinner size="xl" />
                <Text mt={4}>Processing...</Text>
              </Box>
            ) : (
              renderModalContent()
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit} isDisabled={loading || !selectedAsset || !amount || !recipientAddress}>
              Submit
            </Button>
            <Button variant="outline" ml={3} onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default QuickActions;
