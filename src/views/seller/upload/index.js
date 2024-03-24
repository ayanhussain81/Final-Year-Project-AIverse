import { Flex, Box, useDisclosure, Tabs, Tab, TabList } from '@chakra-ui/react';
import Header from 'layouts/sellerHeader';
import React, { useEffect, useState } from 'react';
import Content from '../dashboard/content';
import Sidebar from 'components/sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import axiosInstance from 'services/axiosInstance';
import DrawerPop from './drawer';
import TextEditor from './textEditor';
import Configure from './configure';

const SellerUpload = () => {
  const { id } = useParams();
  const [model, setModel] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState('upload');

  const getModel = async () => {
    try {
      const response = await axiosInstance.get(`/models/${id}`);
      setModel(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getModel();
  }, []);

  return (
    <Flex height="100vh" width="100vw">
      <Sidebar />
      <Box flex="1">
        <Header name={`${model.name}`} handleShow={onOpen} />
        <Tabs mt="5" paddingX="60px" isFitted width="15%">
          <TabList borderBottom="none">
            <Tab _focus={{ boxShadow: 'none', borderBottom: '2px solid #000' }} onClick={() => setActiveTab('upload')}>
              Upload
            </Tab>
            <Tab _focus={{ boxShadow: 'none', borderBottom: '2px solid #000' }} onClick={() => setActiveTab('configure')}>
              Configure
            </Tab>
            <Tab
              _focus={{ boxShadow: 'none', borderBottom: '2px solid #000' }}
              onClick={() => setActiveTab('documentation')}
            >
              Documentation
            </Tab>
          </TabList>
        </Tabs>
        {activeTab === 'upload' && <Content tab="upload" handleShow={onOpen} height="80%" />}
        {activeTab === 'configure' && <Configure id={id} />}
        {activeTab === 'documentation' && <TextEditor id={id} />}
        <DrawerPop isOpen={isOpen} onClose={onClose} />
      </Box>
    </Flex>
  );
};

export default SellerUpload;
