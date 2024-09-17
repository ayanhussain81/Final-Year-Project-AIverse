import { Box, Flex, Stack, Text, Heading, FormErrorMessage } from '@chakra-ui/react';
import { BsBoxes } from 'react-icons/bs';
import { LuCopyPlus } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa';
import ContainedButton from '../../../components/common/buttons/ContainedButton';
import Panel from './panel';
import Uploader from 'components/uploader/uploader';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from 'services/axiosInstance';

const Content = (props) => {
  const [uploadedFiles, setUploadedFiles] = useState();
  const [fileError, setFileError] = useState();
  const { id } = useParams();

  const uploadFile = async () => {
    let requirements = '';
    console.log(props);
    props?.reqFile.map((line) => (requirements = requirements + line.content + '\n'));
    console.log(requirements);
    try {
      const formData = new FormData();
      formData.append('file', uploadedFiles);
      formData.append('dockerContent', requirements);

      const response = await axiosInstance.post(`/models/host/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle successful response
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      // Handle error
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server Error:', error.response.data);
        return { isError: true, message: error.response.data.message };
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No Response from Server');
        return { isError: true, message: 'No response from server' };
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Request Error:', error.message);
        return { isError: true, message: error.message };
      }
    }
  };

  const handleUpload = (file) => {
    const fileName = file.name;
    setFileError('');
    if (fileName.endsWith('.tar.gz')) {
      setUploadedFiles(file);
      props.handleShow();
      console.log('Selected file:', file);
    } else {
      console.error('Invalid file format. Please select a .tar.gz file.');
      setFileError('Invalid file format. Please select a .tar.gz file.');
    }

    console.log(uploadedFiles);
  };

  return props.userModels?.length > 0 || props.modelExist ? (
    props?.userModels?.map((model) => <Panel model={model} getModelsBySeller={props.getModelsBySeller} />)
  ) : (
    <Flex justifyContent="center" alignItems="center" height={props.height ? props.height : '75vh'}>
      <Box
        padding="30px"
        marginX={{ base: '20px', md: '0' }}
        direction="column"
        bg="gray.100"
        boxShadow="lg"
        borderRadius="lg"
        maxW="570px"
      >
        {props.tab ? (
          <>
            <Heading as="h2" size="md" marginTop="4px" marginBottom="30px">
              Upload Model Files
            </Heading>
            <Stack mt="20px" mb="10px" spacing="6">
              <Box>
                <Text mb="6px" fontSize="md" color="black">
                  Zip File
                </Text>
                <Uploader
                  title="Click to browse or drag and drop your zip file"
                  handleUpload={handleUpload}
                  acceptType={'.tar.gz'}
                />
                <Text mt="1.5" color="red.500">
                  {fileError ? fileError : ''}
                </Text>
              </Box>

              <Box padding="20px" bg="whitesmoke" borderRadius="lg">
                <Text mb="6px" fontSize="md" color="black" fontWeight="600">
                  Requiremnts
                </Text>
                <ul>
                  Please ensure the following nomenclature while uploading .tar.gz file:
                  <li>1. Keep all model files in a folder titled ‘model_files’</li>
                  <li>2. Name your script file as ‘inference.py’</li>
                  <li>3. Name your requirement file as ‘requirments.txt’</li>
                </ul>
              </Box>
              <ContainedButton
                disabled={!uploadedFiles || !uploadedFiles.name.endsWith('.tar.gz')}
                extraClasses="px-[24px] py-[10px] text-500 font-semibold leading-tight"
                children="Upload"
                onClick={() => uploadFile()}
              />
            </Stack>
          </>
        ) : (
          <>
            <Box display="inline-block" borderRadius="50%" bg="gray.200" p="4" mb="3">
              {props.name === 'Models' ? <BsBoxes size="28" color="#227EA1" /> : <LuCopyPlus size="28" color="#227EA1" />}
            </Box>
            <Text fontSize="2xl" fontWeight="bold" mb="1">
              {props.name === 'Models' ? 'Create your first API Model' : 'Create first version of your model'}
            </Text>
            <Text mb="4" color="gray.700">
              {props.name === 'Models'
                ? 'Create your AI model and publish them publicly or privately within your organization. Our platform offers a reliable and scalable infrastructure to host and deploy your models.'
                : 'Upload model files and create the first version of your model.'}
            </Text>
            <ContainedButton
              type="button"
              extraClasses="px-3 py-3 font-semibold bg-inherit leading-[100%]"
              icon={FaPlus}
              iconSize={17}
              children={props.name === 'Models' ? 'New Model' : 'New Version'}
              onClick={() => props.handleShow()}
            />
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Content;
