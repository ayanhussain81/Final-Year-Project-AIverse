import { Box, Flex } from '@chakra-ui/react';
import Sidebar from 'components/sidebar/Sidebar';
import Header from 'layouts/sellerHeader';
import React, { useState } from 'react';
import Content from './content';
import Popup from './popup';

const SellerDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <Flex height="100vh" width="100vw">
      <Sidebar />
      <Box flex="1" bg="white">
        <Header handleShow={handleShow} />
        <Content handleShow={handleShow} />
      </Box>
      <Popup showModal={showModal} handleClose={handleClose} />
    </Flex>
  );
};

export default SellerDashboard;
