import { Box, Flex } from '@chakra-ui/react';
import UserHeader from 'components/navbar/NavbarUser';
import Sidebar from 'components/sidebar/Sidebar';
import { useHeader } from 'contexts/HeaderContext';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { userRoutes } from 'routes';
import PurchasedModels from 'views/user/PurchasedModels';

const UserLayout = () => {
  const { headerTitle, handleModalShow } = useHeader();

  return (
    <Flex>
      <Sidebar routes={userRoutes} />
      <Box flex="1" width="100%">
        <UserHeader name={headerTitle} />
        <Routes>
          <Route path="/purchased-models" element={<PurchasedModels />} />
          <Route path="*" element={<Navigate to="/user/purchased-models" replace />} />
        </Routes>
      </Box>
    </Flex>
  );
};

export default UserLayout;
