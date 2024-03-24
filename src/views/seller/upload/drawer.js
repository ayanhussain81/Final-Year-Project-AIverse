import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  Box,
  Flex,
  Heading,
  Tab,
  TabList,
  Tabs,
  Text,
  Stack,
} from '@chakra-ui/react';
import ContainedButton from 'components/common/buttons/ContainedButton';
import OutlinedButton from 'components/common/buttons/OutlinedButton';
import React, { useEffect, useState } from 'react';
import Uploader from 'components/uploader/uploader';

const DrawerPop = (props) => {
  const [activeTab, setActiveTab] = useState('individual');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = (file) => {
    setUploadedFiles([...uploadedFiles, file]);
    console.log(uploadedFiles);
  };

  useEffect(() => {
    console.log(uploadedFiles);
  }, [uploadedFiles, activeTab]);

  return (
    <Drawer isOpen={props.isOpen} placement="right" size="xl" onClose={props.onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading fontSize="2xl" fontWeight="500">
              Create Model Version
            </Heading>
            <ContainedButton extraClasses="px-[24px] py-[12px] text-500 font-semibold leading-tight" children="Create" />
          </Flex>
        </DrawerHeader>

        <DrawerBody>
          <Box bg="#ffffff" mx="auto" className="my-6 shadow-lg rounded-lg" width={{ base: '50%', md: '90%' }}>
            <div className="px-7 py-4 sm:p-6">
              <Tabs width="55%" isFitted borderBottom="none">
                <Heading as="h2" size="md" marginTop="7px" marginBottom="30px">
                  Upload Model Files
                </Heading>

                <TabList bg="whitesmoke" padding="8px" borderRadius="lg" borderBottom="none">
                  <Tab
                    _active={{ backgroundColor: 'white' }}
                    _selected={{
                      boxShadow: 'none',
                      backgroundColor: activeTab === 'individual' ? 'white' : 'transparent',
                      borderRadius: 'lg',
                    }}
                    onClick={() => {
                      setActiveTab('individual');
                      setUploadedFiles([]);
                    }}
                  >
                    Individual Files
                  </Tab>
                  <Tab
                    _active={{ backgroundColor: 'white' }}
                    _selected={{
                      boxShadow: 'none',
                      backgroundColor: activeTab === 'zip' ? 'white' : 'transparent',
                      borderRadius: 'lg',
                    }}
                    onClick={() => {
                      setActiveTab('zip');
                      setUploadedFiles([]);
                    }}
                  >
                    Zip File
                  </Tab>
                </TabList>
              </Tabs>
              {activeTab === 'individual' && (
                <Stack spacing="6" mt="20px" mb="10px">
                  <Box>
                    <Text mb="6px" fontSize="md" color="black">
                      1. Model File
                    </Text>
                    <Uploader title="Click to browse or drag and drop your model file" handleUpload={handleUpload} />
                  </Box>
                  <Box>
                    <Text mb="6px" fontSize="md" color="black">
                      2. Script File
                    </Text>
                    <Uploader title="Click to browse or drag and drop your script file" handleUpload={handleUpload} />
                  </Box>
                  <Box>
                    <Text mb="6px" fontSize="md" color="black">
                      3. Requirements File
                    </Text>
                    <Uploader title="Click to browse or drag and drop your requiremnts file" handleUpload={handleUpload} />
                  </Box>
                </Stack>
              )}
              {activeTab === 'zip' && (
                <Stack mt="20px" mb="10px" spacing="6">
                  <Box>
                    <Text mb="6px" fontSize="md" color="black">
                      Zip File
                    </Text>
                    <Uploader
                      title="Click to browse or drag and drop your zip file"
                      handleUpload={handleUpload}
                      isZip={true}
                    />
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
                </Stack>
              )}
            </div>
          </Box>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <OutlinedButton
            extraClasses="px-[22px] py-[10px] text-500 font-semibold leading-tight"
            onClick={props.onClose}
            children="Cancel"
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerPop;
