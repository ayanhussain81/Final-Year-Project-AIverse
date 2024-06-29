import { Flex, Box, useDisclosure, Tabs, Tab, TabList, Text } from '@chakra-ui/react';
import Header from 'layouts/sellerHeader';
import React, { useEffect, useState } from 'react';
import Content from '../dashboard/content';
import Sidebar from 'components/sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import axiosInstance from 'services/axiosInstance';
import TextEditor from './textEditor';
import Configure from './configure';
import { sellerRoutes } from 'routes';
import NoModelFound from './NoModelFound';
import { useHeader } from 'contexts/HeaderContext';
import RequirementsPopup from '../dashboard/requirementsPopup';

const SellerUpload = () => {
  const { id } = useParams();
  const [model, setModel] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeTab, setActiveTab] = useState('upload');
  const [isLoading, setIsLoading] = useState(true);
  const { setHeaderTitle, setModalListeners } = useHeader();
  // const [reqFile, setReqFile] = useState({
  //   line1: '',
  //   line2: '',
  //   line3: 'COPY ./${req.file.filename} /app/',
  //   line4: 'WORKDIR /app/',
  //   line5: 'RUN tar -xvf ${req.file.filename} && rm ${req.file.filename}',
  //   line6: 'RUN pip install --no-cache-dir -r requirements.txt',
  //   line7: '',
  //   line8: '',
  // });
  const [reqFile, setReqFile] = useState([
    { content: '' },
    { content: 'COPY ./${req.file.filename} /app/', disable: true, readOnly: true },
    { content: 'WORKDIR /app/', disable: true, readOnly: true },
    { content: 'RUN tar -xvf ${req.file.filename} && rm ${req.file.filename}', disable: true, readOnly: true },
    { content: 'RUN pip install --no-cache-dir -r requirements.txt', readOnly: true },
    { content: '' },
  ]);

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
            {activeTab === 'upload' && <Content tab="upload" handleShow={onOpen} height="80%" reqFile={reqFile} />}
            {activeTab === 'configure' && <Configure id={id} />}
            {activeTab === 'documentation' && <TextEditor id={id} />}
            <RequirementsPopup isOpen={isOpen} onClose={onClose} reqFile={reqFile} setReqFile={setReqFile} />
          </>
        ) : (
          <NoModelFound />
        ))}
    </>
  );
};

export default SellerUpload;
