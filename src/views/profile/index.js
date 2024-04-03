import { Box, Text } from '@chakra-ui/react';
import Header from 'layouts/HomeHeader';
import React from 'react';

import Name from './name';
import Password from './password';

const Profile = () => {
  return (
    <>
      <Header />
      <Box
        mx={{ base: '20px', md: '30px', lg: '50px', xl: '150px' }}
        pt={{ base: '100px', md: '160px' }}
        pb={{ base: '60px', md: '100px' }}
      >
        <Text fontSize="2xl" color="#000" fontWeight="500" marginBottom="28px">
          My Account
        </Text>
        <Name />
        <Password />
      </Box>
    </>
  );
};

export default Profile;
