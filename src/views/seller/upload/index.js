import { Flex, Box, useDisclosure, Tabs, Tab, TabList, Text } from '@chakra-ui/react';
import Header from 'layouts/sellerHeader';
import React, { useEffect, useState } from 'react';
import Content from '../dashboard/content';
import Sidebar from 'components/sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import axiosInstance from 'services/axiosInstance';
import DrawerPop from './drawer';
import TextEditor from './textEditor';
import Configure from './configure';
import { sellerRoutes } from 'routes';
import NoModelFound from './NoModelFound';
import { useHeader } from 'contexts/HeaderContext';

const SellerUpload = () => {
  const { id } = useParams();
  const [model, setModel] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState('upload');
  const [isLoading, setIsLoading] = useState(true);
  const { setHeaderTitle, setModalListeners } = useHeader();

  const getModel = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/models/${id}`);
      setModel(response.data);
      setHeaderTitle(response.data.name);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setModalListeners((state) => ({ ...state, handleShow: onOpen }));

    if (model) setHeaderTitle(model.name);
    return () => {
      setHeaderTitle('');
      setModalListeners((state) => ({ ...state, handleShow: undefined }));
    };
  }, [setHeaderTitle, model, setModalListeners]);

  useEffect(() => {
    getModel();
  }, []);

  return (
    <>
      {!isLoading &&
        (model ? (
          <>
            <Tabs mt="5" paddingX="60px" isFitted width="15%">
              <TabList borderBottom="none">
                <Tab _focus={{ boxShadow: 'none', borderBottom: '2px solid #000' }} onClick={() => setActiveTab('upload')}>
                  Upload
                </Tab>
                <Tab
                  _focus={{ boxShadow: 'none', borderBottom: '2px solid #000' }}
                  onClick={() => setActiveTab('configure')}
                >
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
          </>
        ) : (
          <NoModelFound />
        ))}
    </>
  );
};

export default SellerUpload;
