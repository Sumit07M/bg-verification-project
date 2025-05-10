import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  useToast,
} from '@chakra-ui/react';
import PersonalInfo from '../components/employee/PersonalInfo';
import EducationInfo from '../components/employee/EducationInfo';
import WorkExperience from '../components/employee/WorkExperience';
import Documents from '../components/employee/Documents';

export default function EmployeeDashboard() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>Employee Dashboard</Heading>
        
        <Tabs isLazy variant="enclosed" onChange={(index) => setActiveTab(index)}>
          <TabList>
            <Tab>Personal Information</Tab>
            <Tab>Education</Tab>
            <Tab>Work Experience</Tab>
            <Tab>Documents</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <PersonalInfo />
            </TabPanel>
            <TabPanel>
              <EducationInfo />
            </TabPanel>
            <TabPanel>
              <WorkExperience />
            </TabPanel>
            <TabPanel>
              <Documents />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
} 