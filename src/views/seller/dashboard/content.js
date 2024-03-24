import { Box, Flex, Stack, Text, Heading } from '@chakra-ui/react';
import { BsBoxes } from 'react-icons/bs';
import { LuCopyPlus } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa';
import ContainedButton from '../../../components/common/buttons/ContainedButton';
import SearchBar from 'shared/searchbar';
import Panel from './panel';
import Uploader from 'components/uploader/uploader';
import { useState } from 'react';

const Content = (props) => {
  const [uploadedFiles, setUploadedFiles] = useState('');

  const handleChange = async (event) => {
    props.onFilter(event.target.value);
  };

  const uploadFile = async () => {
    console.log(uploadedFiles);
  };

  const handleUpload = (file) => {
    setUploadedFiles([...uploadedFiles, file]);
    console.log(uploadedFiles);
  };

  return props.userModels ? (
    <Flex mx={{ base: '10px', md: '0px' }} my="30px" direction="column" justifyContent="start" alignItems="center">
      <SearchBar height="38px" boxSize="5" handleChange={handleChange} />
      {props?.userModels.map((model) => (
        <Panel model={model} getModelsBySeller={props.getModelsBySeller} />
      ))}
    </Flex>
  ) : (
    <Flex justifyContent="center" alignItems="center" height={props.height ? props.height : '85%'}>
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
                <Uploader title="Click to browse or drag and drop your zip file" handleUpload={handleUpload} isZip={true} />
              </Box>

              <Box padding="20px" bg="whitesmoke" borderRadius="lg">
                <Text mb="6px" fontSize="md" color="black" fontWeight="600">
                  Requiremnts
                </Text>
                <ul>
                  Please ensure the following nomenclature while uploading zip file:
                  <li>1. Keep all model files in a folder titled ‘model_files’</li>
                  <li>2. Name your script file as ‘inference.py’</li>
                  <li>3. Name your requirement file as ‘requirments.txt’</li>
                </ul>
              </Box>
              <ContainedButton
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
