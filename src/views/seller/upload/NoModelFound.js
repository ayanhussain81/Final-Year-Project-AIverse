import React from 'react';
import { Center, Text, Button, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NoModelFound = () => {
  const navigate = useNavigate();
  return (
    <Box height="80vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center" m="auto">
      <Text fontSize="2xl" fontWeight="bold">
        Oops! It looks like we can't find that model right now!
      </Text>
      <Button mt={4} colorScheme="blue" onClick={() => navigate('/seller/models')}>
        Go Back
      </Button>
    </Box>
  );
};

export default NoModelFound;
