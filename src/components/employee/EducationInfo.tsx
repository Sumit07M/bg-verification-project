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
  Select,
  IconButton,
} from '@chakra-ui/react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const schema = yup.object().shape({
  education: yup.array().of(
    yup.object().shape({
      degree: yup.string().required('Degree is required'),
      institution: yup.string().required('Institution is required'),
      fieldOfStudy: yup.string().required('Field of study is required'),
      startDate: yup.string().required('Start date is required'),
      endDate: yup.string().required('End date is required'),
      grade: yup.string().required('Grade is required'),
    })
  ),
});

type EducationFormInputs = {
  education: {
    degree: string;
    institution: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    grade: string;
  }[];
};

export default function EducationInfo() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      education: [{ degree: '', institution: '', fieldOfStudy: '', startDate: '', endDate: '', grade: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });

  const onSubmit = async (data: EducationFormInputs) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to save education info
      console.log('Education info:', data);
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
              aria-label="Remove education"
              icon={<DeleteIcon />}
              position="absolute"
              right={2}
              top={2}
              onClick={() => remove(index)}
              isDisabled={fields.length === 1}
            />
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <FormControl isInvalid={!!errors.education?.[index]?.degree}>
                  <FormLabel>Degree</FormLabel>
                  <Select {...register(`education.${index}.degree`)}>
                    <option value="">Select degree</option>
                    <option value="bachelor">Bachelor's</option>
                    <option value="master">Master's</option>
                    <option value="phd">PhD</option>
                    <option value="diploma">Diploma</option>
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!errors.education?.[index]?.institution}>
                  <FormLabel>Institution</FormLabel>
                  <Input
                    {...register(`education.${index}.institution`)}
                    placeholder="Enter institution name"
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!errors.education?.[index]?.fieldOfStudy}>
                  <FormLabel>Field of Study</FormLabel>
                  <Input
                    {...register(`education.${index}.fieldOfStudy`)}
                    placeholder="Enter field of study"
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!errors.education?.[index]?.grade}>
                  <FormLabel>Grade</FormLabel>
                  <Input
                    {...register(`education.${index}.grade`)}
                    placeholder="Enter grade"
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!errors.education?.[index]?.startDate}>
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    type="date"
                    {...register(`education.${index}.startDate`)}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl isInvalid={!!errors.education?.[index]?.endDate}>
                  <FormLabel>End Date</FormLabel>
                  <Input
                    type="date"
                    {...register(`education.${index}.endDate`)}
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
              degree: '',
              institution: '',
              fieldOfStudy: '',
              startDate: '',
              endDate: '',
              grade: '',
            })
          }
          variant="outline"
        >
          Add Education
        </Button>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          isLoading={isLoading}
        >
          Save Education Information
        </Button>
      </VStack>
    </Box>
  );
} 