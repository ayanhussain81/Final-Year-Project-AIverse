import React, { useRef, useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Stack } from '@chakra-ui/react';
import axiosInstance from 'services/axiosInstance';
import Toast from 'shared/toast';

const Form = () => {
  const toastRef = useRef(null);
  const [formData, setFormData] = useState({
    businessEmail: '',
    occupation: '',
    phone: '',
    country: '',
    address: '',
  });
  const userId = '658708403788b128c4fd6761';
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/seller/register-as-seller', {
        userId,
        ...formData,
      });
      console.log('Registration successful', response.data);
      toastRef.current.showSuccessToast('Registraion Successful');
    } catch (error) {
      console.error('Registration failed', error);
      toastRef.current.showErrorToast('Registraion Unsuccessful');
    }
  };
  return (
    <>
      <Toast ref={toastRef} />
      <Box
        as="form"
        onSubmit={handleSubmit}
        maxW="2xl"
        mx={{ base: '4', md: 'auto' }}
        mt="150px"
        mb="80px"
        boxShadow="lg"
        bg="white"
        p="8"
        borderRadius="lg"
      >
        <Heading textAlign="center" mb="14">
          Register as a Seller
        </Heading>
        <Stack spacing="5">
          <FormControl id="email" isRequired>
            <FormLabel>Business Email</FormLabel>
            <Input
              name="businessEmail"
              type="email"
              placeholder="Enter your email"
              borderRadius="xl"
              _focus={{ borderColor: '#227EA1' }}
              onChange={handleChange}
              value={formData.email}
            />
          </FormControl>
          <FormControl id="occupation" isRequired>
            <FormLabel>Occupation</FormLabel>
            <Input
              name="occupation"
              type="text"
              placeholder="Enter your occupation"
              borderRadius="xl"
              _focus={{ borderColor: '#227EA1' }}
              onChange={handleChange}
              value={formData.occupation}
            />
          </FormControl>
          <FormControl id="phone" isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              borderRadius="xl"
              _focus={{ borderColor: '#227EA1' }}
              onChange={handleChange}
              value={formData.phone}
            />
          </FormControl>
          <FormControl id="country" isRequired>
            <FormLabel>Country</FormLabel>
            <Input
              name="country"
              type="text"
              placeholder="Enter your country"
              borderRadius="xl"
              _focus={{ borderColor: '#227EA1' }}
              onChange={handleChange}
              value={formData.country}
            />
          </FormControl>
          <FormControl id="address">
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              type="text"
              placeholder="Enter your address"
              borderRadius="xl"
              _focus={{ borderColor: '#227EA1' }}
              onChange={handleChange}
              value={formData.address}
            />
          </FormControl>
          <Button type="submit" bg="#227EA1" color="white" _hover={{ bg: '#0E5A77' }} mt="4" borderRadius="lg">
            Submit
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Form;
