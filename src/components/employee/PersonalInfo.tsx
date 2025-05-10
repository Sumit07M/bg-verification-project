import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Grid,
  GridItem,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  address: yup.string().required('Address is required'),
  phone: yup.string().required('Phone number is required'),
  emergencyContact: yup.string().required('Emergency contact is required'),
});

type PersonalInfoFormInputs = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  phone: string;
  emergencyContact: string;
};

export default function PersonalInfo() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: PersonalInfoFormInputs) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to save personal info
      console.log('Personal info:', data);
      toast({
        title: 'Information saved',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error saving information',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <Grid templateColumns="repeat(2, 1fr)" gap={4} width="100%">
          <GridItem>
            <FormControl isInvalid={!!errors.firstName}>
              <FormLabel>First Name</FormLabel>
              <Input {...register('firstName')} placeholder="Enter first name" />
              {errors.firstName && (
                <Box color="red.500" fontSize="sm">
                  {errors.firstName.message}
                </Box>
              )}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.lastName}>
              <FormLabel>Last Name</FormLabel>
              <Input {...register('lastName')} placeholder="Enter last name" />
              {errors.lastName && (
                <Box color="red.500" fontSize="sm">
                  {errors.lastName.message}
                </Box>
              )}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.dateOfBirth}>
              <FormLabel>Date of Birth</FormLabel>
              <Input type="date" {...register('dateOfBirth')} />
              {errors.dateOfBirth && (
                <Box color="red.500" fontSize="sm">
                  {errors.dateOfBirth.message}
                </Box>
              )}
            </FormControl>
          </GridItem>

          <GridItem>
            <FormControl isInvalid={!!errors.phone}>
              <FormLabel>Phone Number</FormLabel>
              <Input {...register('phone')} placeholder="Enter phone number" />
              {errors.phone && (
                <Box color="red.500" fontSize="sm">
                  {errors.phone.message}
                </Box>
              )}
            </FormControl>
          </GridItem>
        </Grid>

        <FormControl isInvalid={!!errors.address}>
          <FormLabel>Address</FormLabel>
          <Input {...register('address')} placeholder="Enter address" />
          {errors.address && (
            <Box color="red.500" fontSize="sm">
              {errors.address.message}
            </Box>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.emergencyContact}>
          <FormLabel>Emergency Contact</FormLabel>
          <Input
            {...register('emergencyContact')}
            placeholder="Enter emergency contact"
          />
          {errors.emergencyContact && (
            <Box color="red.500" fontSize="sm">
              {errors.emergencyContact.message}
            </Box>
          )}
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          isLoading={isLoading}
        >
          Save Information
        </Button>
      </VStack>
    </Box>
  );
} 