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
  IconButton,
  Textarea,
} from '@chakra-ui/react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const schema = yup.object().shape({
  experience: yup.array().of(
    yup.object().shape({
      company: yup.string().required('Company name is required'),
      position: yup.string().required('Position is required'),
      startDate: yup.string().required('Start date is required'),
      endDate: yup.string().required('End date is required'),
      description: yup.string().required('Description is required'),
      responsibilities: yup.string().required('Responsibilities are required'),
    })
  ),
});

type WorkExperienceFormInputs = {
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    responsibilities: string;
  }[];
};

export default function WorkExperience() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkExperienceFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      experience: [
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
          responsibilities: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  });

  const onSubmit = async (data: WorkExperienceFormInputs) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to save work experience
      console.log('Work experience:', data);
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
      <VStack spacing={6}>
        {fields.map((field, index) => (
          <Box
            key={field.id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            width="100%"
            position="relative"
          >
            <IconButton
              aria-label="Remove experience"
              icon={<DeleteIcon />}
              position="absolute"
              right={2}
              top={2}
              onClick={() => remove(index)}
              isDisabled={fields.length === 1}
            />
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl isInvalid={!!errors.experience?.[index]?.company}>
                  <FormLabel>Company</FormLabel>
                  <Input
                    {...register(`experience.${index}.company`)}
                    placeholder="Enter company name"
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!errors.experience?.[index]?.position}>
                  <FormLabel>Position</FormLabel>
                  <Input
                    {...register(`experience.${index}.position`)}
                    placeholder="Enter position"
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!errors.experience?.[index]?.startDate}>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    type="date"
                    {...register(`experience.${index}.startDate`)}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!errors.experience?.[index]?.endDate}>
                  <FormLabel>End Date</FormLabel>
                  <Input
                    type="date"
                    {...register(`experience.${index}.endDate`)}
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl isInvalid={!!errors.experience?.[index]?.description}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    {...register(`experience.${index}.description`)}
                    placeholder="Enter job description"
                  />
                </FormControl>
              </GridItem>

              <GridItem colSpan={2}>
                <FormControl
                  isInvalid={!!errors.experience?.[index]?.responsibilities}
                >
                  <FormLabel>Responsibilities</FormLabel>
                  <Textarea
                    {...register(`experience.${index}.responsibilities`)}
                    placeholder="Enter key responsibilities"
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </Box>
        ))}

        <Button
          leftIcon={<AddIcon />}
          onClick={() =>
            append({
              company: '',
              position: '',
              startDate: '',
              endDate: '',
              description: '',
              responsibilities: '',
            })
          }
          variant="outline"
        >
          Add Work Experience
        </Button>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          isLoading={isLoading}
        >
          Save Work Experience
        </Button>
      </VStack>
    </Box>
  );
} 