import React, { useState } from 'react';
import { Box, Center, Heading, Text, Stack, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaCreditCard, FaExclamationCircle } from 'react-icons/fa';
import axiosInstance from 'services/axiosInstance';
import { useSelector } from 'react-redux';

const PaymentFailed = () => {
  const bg = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('black', 'white');
  const seller = useSelector((state) => state.auth.seller);
  const [isLoading, setIsLoading] = useState(false);
  const { user: userState, tokens } = useSelector((state) => state.auth);

  const getManageBillingLink = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        '/seller/manage-billing',
        { sellerId: seller?._id },
        {
          headers: {
            Authorization: `Bearer ${tokens.access.token}`,
          },
        }
      );
      console.log(response.data);
      window.location.href = response.data.portalLink;
      return response.data;
    } catch (error) {
      console.error('Error fetching manage billing link:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center h="100vh" bg={bg}>
      <Box maxW="md" p={8} rounded="lg" shadow="lg" bg={bg}>
        <Stack spacing={4}>
          <Center>
            <Icon as={FaExclamationCircle} fontSize="4xl" color="red.500" />
          </Center>
          <Heading size="md" textTransform="uppercase">
            Payment Failed
          </Heading>
          <Text fontSize="lg" color={color}>
            Unfortunately, your recent payment attempt was unsuccessful. This could be due to insufficient funds, an expired
            card, or a network issue.
          </Text>
          <Text fontSize="md" color={color}>
            Please Click the button below for payment information
          </Text>
          <Stack spacing={2} direction={['column', 'row']}>
            <Button isLoading={isLoading} colorScheme="blue" variant="outline" onClick={getManageBillingLink}>
              Check Payment Details
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default PaymentFailed;
