import React from 'react';
import logoWhite from 'assets/img/layout/logoWhite.png';
import { Box, Image } from '@chakra-ui/react';

const PageLoader = () => {
  return (
    <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
      <Image m="auto" boxShadow="md" borderRadius="full" boxSize="120px" src={logoWhite} alt="logo" />
    </Box>
  );
};

export default PageLoader;
