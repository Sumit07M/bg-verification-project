import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  VStack,
  useToast,
  Text,
  Icon,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiUpload } from 'react-icons/fi';

const schema = yup.object().shape({
  resume: yup.mixed().required('Resume is required'),
  certificates: yup.array().of(yup.mixed()),
  idProof: yup.mixed().required('ID proof is required'),
});

type DocumentsFormInputs = {
  resume: FileList;
  certificates: FileList;
  idProof: FileList;
};

export default function Documents() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DocumentsFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: DocumentsFormInputs) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to upload documents
      console.log('Documents:', data);
      toast({
        title: 'Documents uploaded successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error uploading documents',
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
        <FormControl isInvalid={!!errors.resume}>
          <FormLabel>Resume/CV</FormLabel>
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            {...register('resume')}
            display="none"
            id="resume-upload"
          />
          <Button
            as="label"
            htmlFor="resume-upload"
            leftIcon={<Icon as={FiUpload} />}
            width="full"
            cursor="pointer"
          >
            Upload Resume
          </Button>
          {errors.resume && (
            <Text color="red.500" fontSize="sm">
              {errors.resume.message}
            </Text>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.certificates}>
          <FormLabel>Certificates</FormLabel>
          <Input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            {...register('certificates')}
            display="none"
            id="certificates-upload"
          />
          <Button
            as="label"
            htmlFor="certificates-upload"
            leftIcon={<Icon as={FiUpload} />}
            width="full"
            cursor="pointer"
          >
            Upload Certificates
          </Button>
          {errors.certificates && (
            <Text color="red.500" fontSize="sm">
              {errors.certificates.message}
            </Text>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.idProof}>
          <FormLabel>ID Proof</FormLabel>
          <Input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            {...register('idProof')}
            display="none"
            id="id-proof-upload"
          />
          <Button
            as="label"
            htmlFor="id-proof-upload"
            leftIcon={<Icon as={FiUpload} />}
            width="full"
            cursor="pointer"
          >
            Upload ID Proof
          </Button>
          {errors.idProof && (
            <Text color="red.500" fontSize="sm">
              {errors.idProof.message}
            </Text>
          )}
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          isLoading={isLoading}
        >
          Upload Documents
        </Button>
      </VStack>
    </Box>
  );
} 