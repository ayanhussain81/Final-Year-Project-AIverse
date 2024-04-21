import { Box, Flex } from '@chakra-ui/react';
import Sidebar from 'components/sidebar/Sidebar';
import Header from 'layouts/sellerHeader';
import React, { useEffect, useState } from 'react';
import Content from './content';
import Popup from './popup';
import { useSelector } from 'react-redux';
import axiosInstance from 'services/axiosInstance';
import useDebounce from 'hooks/useDebounce';
import { useDisclosure } from '@chakra-ui/react';
import ConnectPopup from './ConnectPopup';
import { sellerRoutes } from 'routes';
import { useHeader } from 'contexts/HeaderContext';

const SellerDashboard = () => {
  const { seller, tokens } = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userModels, setUserModels] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleShow = () => {
    if (seller?.isAccountActive) {
      setShowModal(true);
      return;
    }
    onOpen();
  };

  const handleClose = () => setShowModal(false);
  const onFilter = (value) => setSearchValue(value);
  const { setHeaderTitle, setModalListeners } = useHeader();

  const debouncedValue = useDebounce(searchValue, 600);

  const getModelsBySeller = async () => {
    try {
      setIsLoading(true);
      let url = `/models/seller/${seller._id}`;
      if (debouncedValue) {
        url += `?modelName=${searchValue}`;
      }
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${tokens.access.token}`,
        },
      });
      setUserModels(response.data.models);
    } catch (error) {
      console.error('Error getting models:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getModelsBySeller();
  }, [debouncedValue]);

  useEffect(() => {
    setModalListeners((state) => ({ ...state, handleShow: handleShow }));
    setHeaderTitle('Models');
    return () => {
      setHeaderTitle('');
      setModalListeners((state) => ({ ...state, handleShow: undefined }));
    };
  }, [setHeaderTitle, setModalListeners]);

  return (
    <>
      {!isLoading && (
        <Content
          name="Models"
          handleShow={handleShow}
          userModels={userModels}
          onFilter={onFilter}
          getModelsBySeller={getModelsBySeller}
        />
      )}
      <Popup showModal={showModal} handleClose={handleClose} getModelsBySeller={getModelsBySeller} />
      <ConnectPopup onOpen={onOpen} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default SellerDashboard;
