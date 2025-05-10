import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';

// Mock data - replace with actual API data
const mockEmployees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'pending',
    submittedDate: '2024-03-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'verified',
    submittedDate: '2024-03-14',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    status: 'rejected',
    submittedDate: '2024-03-13',
  },
];

type Employee = typeof mockEmployees[0];

export default function ManagerDashboard() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleViewDetails = (employee: Employee) => {
    setSelectedEmployee(employee);
    onOpen();
  };

  const handleVerify = (employeeId: number) => {
    // TODO: Implement verification API call
    toast({
      title: 'Employee verified',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleReject = (employeeId: number) => {
    // TODO: Implement rejection API call
    toast({
      title: 'Employee rejected',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'yellow';
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>Manager Dashboard</Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Submitted Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockEmployees.map((employee) => (
              <Tr key={employee.id}>
                <Td>{employee.name}</Td>
                <Td>{employee.email}</Td>
                <Td>
                  <Badge colorScheme={getStatusColor(employee.status)}>
                    {employee.status}
                  </Badge>
                </Td>
                <Td>{employee.submittedDate}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleViewDetails(employee)}
                  >
                    View Details
                  </Button>
                  {employee.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        colorScheme="green"
                        mr={2}
                        onClick={() => handleVerify(employee.id)}
                      >
                        Verify
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleReject(employee.id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Employee Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {selectedEmployee && (
                <Tabs>
                  <TabList>
                    <Tab>Personal Info</Tab>
                    <Tab>Education</Tab>
                    <Tab>Work Experience</Tab>
                    <Tab>Documents</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <VStack align="stretch" spacing={4}>
                        <Text>
                          <strong>Name:</strong> {selectedEmployee.name}
                        </Text>
                        <Text>
                          <strong>Email:</strong> {selectedEmployee.email}
                        </Text>
                        {/* Add more personal info fields */}
                      </VStack>
                    </TabPanel>
                    <TabPanel>
                      <Text>Education information will be displayed here</Text>
                    </TabPanel>
                    <TabPanel>
                      <Text>Work experience will be displayed here</Text>
                    </TabPanel>
                    <TabPanel>
                      <Text>Uploaded documents will be displayed here</Text>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
} 