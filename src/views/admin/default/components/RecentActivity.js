import React, { useState } from "react";
import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  SimpleGrid,
  Divider,
  Alert,
  AlertIcon,
  Badge,
  VStack,
  HStack,
  Input,
  Button,
  IconButton,
  Icon,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import USDCIcon from "assets/img/icons/usdc.png";
import ETHIcon from "assets/img/icons/eth.png";
import BTCIcon from "assets/img/icons/btc.jpg";
import Card from "components/card/Card.js";

// Sample data for recent activities
const activities = {
  transactions: [
    { id: 1, type: "Deposit", asset: "USDC", amount: "$500", date: "2023-09-20", status: "Completed", icon: USDCIcon },
    { id: 2, type: "Withdrawal", asset: "ETH", amount: "$200", date: "2023-09-21", status: "Completed", icon: ETHIcon },
    { id: 3, type: "Strategy Change", details: "Switched to Balanced Growth Strategy", date: "2023-09-22", status: "Completed" },
    { id: 4, type: "Deposit", asset: "BTC", amount: "$300", date: "2023-09-23", status: "Pending", icon: BTCIcon },
    { id: 5, type: "Withdrawal", asset: "USDC", amount: "$100", date: "2023-09-24", status: "Completed", icon: USDCIcon },
  ],
  notifications: [
    { id: 1, message: "Deposit of $500 completed successfully.", date: "2023-09-20" },
    { id: 2, message: "Withdrawal of $200 completed successfully.", date: "2023-09-21" },
    { id: 3, message: "You have switched to Balanced Growth Strategy.", date: "2023-09-22" },
    { id: 4, message: "Your deposit of $300 is pending approval.", date: "2023-09-23" },
    { id: 5, message: "New yield farming opportunity available!", date: "2023-09-24" },
  ],
};

const RecentActivity = () => {
  const [selectedTab, setSelectedTab] = useState("Transactions");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("All");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const filteredTransactions = activities.transactions.filter((activity) => {
    const matchesSearch = activity.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter === "All" || (dateFilter === "Last Week" && activity.date >= "2023-09-17");
    return matchesSearch && matchesDate;
  });

  const filteredNotifications = activities.notifications.filter((notification) =>
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card p="20px" mb="20px">
      <Text fontSize="lg" fontWeight="bold" mb="20px">Recent Activity</Text>
      <HStack spacing={3} mb="20px">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton
          aria-label="Search"
          icon={<Icon as={FaSearch} />}
          colorScheme="purple"
        />
      </HStack>
      <HStack mb="20px">
        <Select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} placeholder="Select Date Range">
          <option value="All">All Time</option>
          <option value="Last Week">Last Week</option>
          <option value="Last Month">Last Month</option>
        </Select>
      </HStack>
      <Tabs variant="soft-rounded" colorScheme="purple">
        <TabList mb="20px">
          {["Transactions", "Notifications"].map((tab) => (
            <Tab key={tab} onClick={() => setSelectedTab(tab)}>
              {tab}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={{ base: 1 }} spacing={5}>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((activity) => (
                  <Box key={activity.id} p={4} shadow="md" borderWidth="1px" borderRadius="md" bg="gray.50">
                    <HStack justify="space-between">
                      <Text fontWeight="bold">{activity.type}</Text>
                      <Badge colorScheme={activity.status === "Completed" ? "green" : "yellow"}>
                        {activity.status}
                      </Badge>
                    </HStack>
                    <HStack mt={2}>
                      {activity.icon && <img src={activity.icon} alt={activity.asset} style={{ width: "30px", height: "30px" }} />} {/* Increased size */}
                      <Text>Asset: {activity.asset}</Text>
                    </HStack>
                    {activity.amount && <Text>Amount: {activity.amount}</Text>}
                    <Text>Date: {activity.date}</Text>
                    {activity.details && (
                      <Button mt={2} size="sm" onClick={onOpen}>View Details</Button>
                    )}
                  </Box>
                ))
              ) : (
                <Text>No transactions found.</Text>
              )}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <VStack spacing={3}>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <Alert key={notification.id} status="info" borderRadius="md" mb={2}>
                    <AlertIcon />
                    <Text>{notification.message} <small>({notification.date})</small></Text>
                  </Alert>
                ))
              ) : (
                <Text>No notifications found.</Text>
              )}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Divider my="20px" />
      <Text color="gray.500">
        This section keeps you updated on your recent transactions and notifications, helping you stay informed about your activities.
      </Text>

      {/* Modal for transaction details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Details about the selected transaction will be displayed here.</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default RecentActivity;