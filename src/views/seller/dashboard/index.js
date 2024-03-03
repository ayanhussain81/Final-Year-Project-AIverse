import { Box, Flex } from '@chakra-ui/react';
import Sidebar from 'components/sidebar/Sidebar';
import Header from 'layouts/sellerHeader';
import React, { useEffect, useState } from 'react';
import Content from './content';
import Popup from './popup';
import { useSelector } from 'react-redux';
import axiosInstance from 'services/axiosInstance';
import useDebounce from 'hooks/useDebounce';

const SellerDashboard = () => {
  const { seller, tokens } = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userModels, setUserModels] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const onFilter = (value) => setSearchValue(value);

  const debouncedValue = useDebounce(searchValue, 600);

  const getModelsBySeller = async () => {
    try {
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
    }
  };

  useEffect(() => {
    getModelsBySeller();
  }, [debouncedValue]);

  return (
    <Flex height="100vh" width="100vw">
      <Sidebar />
      <Box flex="1">
        <Header handleShow={handleShow} />
        <Content handleShow={handleShow} userModels={userModels} onFilter={onFilter} />
      </Box>
      <Popup showModal={showModal} handleClose={handleClose} getModelsBySeller={getModelsBySeller} />
    </Flex>
  );
};

export default SellerDashboard;
