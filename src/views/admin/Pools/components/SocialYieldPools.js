import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  HStack,
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
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useToast,
  Progress,
  Tooltip,
  Checkbox,
  Grid,
  GridItem,
  Badge,
  Avatar,
  Stack,
  Divider,
  InputGroup,
  InputRightElement,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import { ChevronDownIcon, InfoIcon, SearchIcon, BellIcon } from '@chakra-ui/icons';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from 'chart.js';
import Card from "components/card/Card.js";

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, ChartTooltip, Legend);

// Sample Data for Existing Pools
const existingPools = [
  {
    id: 1,
    name: "ETH Yield Enthusiasts",
    strategy: "Yield Farming",
    totalFunds: 150000,
    contributors: 20,
    performance: "12% APY",
    description: "A community pool focused on ETH yield farming. High risk, high reward.",
    performanceHistory: [10, 12, 14, 11, 13, 12, 14],
    risk: "High",
    role: "Admin"
  },
  {
    id: 2,
    name: "DeFi Diversifiers",
    strategy: "Multi-Chain Liquidity Pools",
    totalFunds: 75000,
    contributors: 15,
    performance: "8% APY",
    description: "Diversified investments across multiple blockchains for balanced growth.",
    performanceHistory: [8, 7, 8, 9, 8, 7, 8],
    risk: "Medium",
    role: "Contributor"
  },
  {
    id: 3,
    name: "Stablecoin Saviors",
    strategy: "Stablecoin Staking",
    totalFunds: 50000,
    contributors: 10,
    performance: "5% APY",
    description: "Low-risk pool focusing on staking stablecoins for steady returns.",
    performanceHistory: [5, 5, 5, 5, 5, 5, 5],
    risk: "Low",
    role: "Viewer"
  },
];

// Sample Data for User's Contribution
const userContribution = [
  {
    poolName: "ETH Yield Enthusiasts",
    amountContributed: 10000,
    earnings: 1200,
    role: "Admin",
    joinedDate: "2023-01-15"
  },
  {
    poolName: "DeFi Diversifiers",
    amountContributed: 5000,
    earnings: 400,
    role: "Contributor",
    joinedDate: "2023-03-10"
  },
];

const SocialYieldPools = () => {
  const { isOpen: isJoinOpen, onOpen: onJoinOpen, onClose: onJoinClose } = useDisclosure();
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isNotificationOpen, onOpen: onNotificationOpen, onClose: onNotificationClose } = useDisclosure();
  const [selectedPool, setSelectedPool] = useState(null);
  const [newPool, setNewPool] = useState({
    name: '',
    strategy: '',
    minContribution: '',
    maxParticipants: '',
    risk: '',
    description: '',
  });
  const [sortCriteria, setSortCriteria] = useState('performance');
  const [filters, setFilters] = useState({ risk: '', strategy: '', performanceRange: [0, 15] });
  const [searchQuery, setSearchQuery] = useState('');
  const toast = useToast();

  // State for Loading Indicators
  const [loading, setLoading] = useState(false);

  const handleJoinClick = (pool) => {
    setSelectedPool(pool);
    onJoinOpen();
  };

  const handleCreatePoolChange = (e) => {
    const { name, value } = e.target;
    setNewPool({ ...newPool, [name]: value });
  };

  const handleCreateSubmit = () => {
    setLoading(true);
    existingPools.push({ ...newPool, totalFunds: 0, contributors: 0, performance: 'N/A', performanceHistory: [] });
    setNewPool({ name: '', strategy: '', minContribution: '', maxParticipants: '', description: '' });
    toast({
      title: "Pool Created",
      description: "Your new pool has been successfully created.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setLoading(false);
    onCreateClose();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredPools = existingPools.filter(pool => {
    const matchesRisk = filters.risk ? pool.risk === filters.risk : true;
    const matchesStrategy = filters.strategy ? pool.strategy === filters.strategy : true;
    const matchesSearch = searchQuery ? pool.name.toLowerCase().includes(searchQuery.toLowerCase()) || pool.description.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesPerformance = parseFloat(pool.performance) >= filters.performanceRange[0] && parseFloat(pool.performance) <= filters.performanceRange[1];
    return matchesRisk && matchesStrategy && matchesSearch && matchesPerformance;
  });

  const sortedPools = filteredPools.sort((a, b) => {
    if (sortCriteria === 'performance') {
      return parseFloat(b.performance) - parseFloat(a.performance);
    } else if (sortCriteria === 'contributors') {
      return b.contributors - a.contributors;
    } else if (sortCriteria === 'totalFunds') {
      return b.totalFunds - a.totalFunds;
    }
    return 0;
  });

  // Function to calculate earnings per contributor
  const calculateEarningsPerContributor = (pool) => {
    return pool.contributors ? (pool.totalFunds / pool.contributors).toFixed(2) : 0;
  };

  // Function to generate performance chart data
  const generatePerformanceChartData = (pool) => {
    return {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
      datasets: [
        {
          label: 'Performance Over Time',
          data: pool.performanceHistory,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  };

  return (
    <Box p={5}>
      <Card>
        <Heading as="h2" size="lg" mb={5}>
          Social Yield Pools
        </Heading>

        {/* Search and Filter Section */}
        <HStack mb={5}>
          <InputGroup>
            <Input
              placeholder="Search pools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputRightElement>
              <SearchIcon color="gray.300" />
            </InputRightElement>
          </InputGroup>
          <Select placeholder="Risk Level" name="risk" onChange={handleFilterChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
          <Select placeholder="Strategy" name="strategy" onChange={handleFilterChange}>
            <option value="Yield Farming">Yield Farming</option>
            <option value="Multi-Chain Liquidity Pools">Multi-Chain Liquidity Pools</option>
            <option value="Stablecoin Staking">Stablecoin Staking</option>
          </Select>
          <Button colorScheme="blue" onClick={() => setFilters({ risk: '', strategy: '', performanceRange: [0, 15] })}>
            Clear Filters
          </Button>
        </HStack>

        {/* My Pools Section */}
        <Heading as="h3" size="md" mb={3}>
          My Pools
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {userContribution.map((contribution, index) => (
            <Card key={index}>
              <HStack justifyContent="space-between" mb={3}>
                <Text fontWeight="bold">{contribution.poolName}</Text>
                <Text color="gray.500">{contribution.role}</Text>
              </HStack>
              <Text><strong>Joined On:</strong> {new Date(contribution.joinedDate).toLocaleDateString()}</Text>
              <Text><strong>Amount Contributed:</strong> ${contribution.amountContributed.toLocaleString()}</Text>
              <Text><strong>Earnings:</strong> ${contribution.earnings.toLocaleString()}</Text>
              <Button onClick={() => alert(`Contribute more to ${contribution.poolName}`)} mt={3}>Contribute More</Button>
              <Button onClick={() => alert(`Withdraw from ${contribution.poolName}`)} colorScheme="red" mt={1}>Withdraw</Button>
            </Card>
          ))}
        </SimpleGrid>

        {/* Existing Pools Section */}
        <Heading as="h3" size="md" mt={10} mb={3}>
          Existing Pools
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {sortedPools.map((pool) => (
            <Card key={pool.id}>
              <Box>
                <HStack justifyContent="space-between">
                  <Heading as="h4" size="md">{pool.name}</Heading>
                  <Tooltip label="Click for more info" aria-label="A tooltip">
                    <IconButton icon={<InfoIcon />} onClick={() => handleJoinClick(pool)} />
                  </Tooltip>
                </HStack>
                <HStack mt={2}>
                  <Text><strong>Strategy:</strong> {pool.strategy}</Text>
                  <Text><strong>Total Funds:</strong> ${pool.totalFunds.toLocaleString()}</Text>
                </HStack>
                <HStack mt={2}>
                  <Badge colorScheme={pool.risk === "High" ? 'red' : pool.risk === "Medium" ? 'yellow' : 'green'}>
                    {pool.risk}
                  </Badge>
                  <Text><strong>Performance:</strong> {pool.performance}</Text>
                </HStack>
                <Text>{pool.description}</Text>
                <HStack justifyContent="space-between" mt={4}>
                  <Text><strong>Earnings per Contributor:</strong> ${calculateEarningsPerContributor(pool)}</Text>
                  <Button colorScheme="blue" onClick={() => handleJoinClick(pool)}>Join</Button>
                </HStack>
                <Line data={generatePerformanceChartData(pool)} options={{
                  responsive: true,
                  plugins: { legend: { display: true } },
                  scales: { y: { beginAtZero: true } },
                }} />
              </Box>
            </Card>
          ))}
        </SimpleGrid>

        {/* Join Pool Button */}
        <Button onClick={onJoinOpen} colorScheme="blue" mb={5}>Join a Pool</Button>

        {/* Create Pool Button */}
        <Button onClick={onCreateOpen} colorScheme="teal">Create a Pool</Button>

        {/* Join Pool Modal */}
        <Modal isOpen={isJoinOpen} onClose={onJoinClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Join Pool: {selectedPool?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Details about the pool and joining process will go here.</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onJoinClose}>Join</Button>
              <Button variant="ghost" onClick={onJoinClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Create Pool Modal */}
        <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create a New Pool</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl mb={3}>
                <FormLabel>Name</FormLabel>
                <Input name="name" value={newPool.name} onChange={handleCreatePoolChange} />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Strategy</FormLabel>
                <Select name="strategy" value={newPool.strategy} onChange={handleCreatePoolChange}>
                  <option value="">Select Strategy</option>
                  <option value="Yield Farming">Yield Farming</option>
                  <option value="Multi-Chain Liquidity Pools">Multi-Chain Liquidity Pools</option>
                  <option value="Stablecoin Staking">Stablecoin Staking</option>
                </Select>
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Minimum Contribution</FormLabel>
                <Input type="number" name="minContribution" value={newPool.minContribution} onChange={handleCreatePoolChange} />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Maximum Participants</FormLabel>
                <Input type="number" name="maxParticipants" value={newPool.maxParticipants} onChange={handleCreatePoolChange} />
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Risk Level</FormLabel>
                <Select name="risk" value={newPool.risk} onChange={handleCreatePoolChange}>
                  <option value="">Select Risk Level</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Select>
              </FormControl>
              <FormControl mb={3}>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={newPool.description} onChange={handleCreatePoolChange} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCreateSubmit} isLoading={loading}>Create Pool</Button>
              <Button variant="ghost" onClick={onCreateClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Card>
    </Box>
  );
};

export default SocialYieldPools;
