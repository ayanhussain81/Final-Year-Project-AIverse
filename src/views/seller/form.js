import React, { useRef, useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Stack } from '@chakra-ui/react';
import axiosInstance from 'services/axiosInstance';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'shared/toast';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
  businessEmail: Yup.string().email('Invalid email').required('Required'),
  occupation: Yup.string().required('Occupation is Required'),
  phone: Yup.string().required('Phone no. is Required'),
  country: Yup.string().required('Country is Required'),
  address: Yup.string().required('Address is Required'),
});

const Form = () => {
  const toastRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const { tokens, user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      businessEmail: '',
      occupation: '',
      phone: '',
      country: '',
      address: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true);
        const response = await axiosInstance.post(
          '/seller/register-as-seller',
          {
            userId: user?.id,
            ...values,
          },
          {
            headers: {
              Authorization: `Bearer ${tokens.access.token}`,
            },
          }
        );
        console.log('Registration successful', response.data);
        toastRef.current.showSuccessToast('Your Registraion was Successful');
      } catch (error) {
        console.error('Registration failed', error);
        toastRef.current.showErrorToast('Your Registraion was Unsuccessful');
      } finally {
        setLoading(false);
      }
      setSubmitting(false);
    },
  });

  return (
    <>
      <Toast ref={toastRef} />
      <Box
        as="form"
        onSubmit={formik.handleSubmit}
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
          <FormControl id="businessEmail" isInvalid={formik.touched.businessEmail && formik.errors.businessEmail}>
            <FormLabel>Business Email</FormLabel>
            <Input
              name="businessEmail"
              type="email"
              placeholder="Enter your email"
              borderRadius="xl"
              variant="auth"
              _focus={{ borderColor: '#227EA1' }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.businessEmail}
            />
            {formik.touched.businessEmail && formik.errors.businessEmail && (
              <Box color="red">{formik.errors.businessEmail}</Box>
            )}
          </FormControl>
          <FormControl id="occupation" isInvalid={formik.touched.occupation && formik.errors.occupation}>
            <FormLabel>Occupation</FormLabel>
            <Input
              name="occupation"
              type="text"
              placeholder="Enter your occupation"
              borderRadius="xl"
              variant="auth"
              _focus={{ borderColor: '#227EA1' }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.occupation}
            />
            {formik.touched.occupation && formik.errors.occupation && <Box color="red">{formik.errors.occupation}</Box>}
          </FormControl>
          <FormControl id="phone" isInvalid={formik.touched.phone && formik.errors.phone}>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              type="tel"
              variant="auth"
              placeholder="Enter your phone number"
              borderRadius="xl"
              _focus={{ borderColor: '#227EA1' }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && <Box color="red">{formik.errors.phone}</Box>}
          </FormControl>
          <FormControl id="country" isInvalid={formik.touched.country && formik.errors.country}>
            <FormLabel>Country</FormLabel>
            <Input
              name="country"
              variant="auth"
              type="text"
              placeholder="Enter your country"
              borderRadius="xl"
              _focus={{ borderColor: '#227EA1' }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
            />
            {formik.touched.country && formik.errors.country && <Box color="red">{formik.errors.country}</Box>}
          </FormControl>
          <FormControl id="address" isInvalid={formik.touched.address && formik.errors.address}>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              type="text"
              variant="auth"
              placeholder="Enter your address"
              borderRadius="xl"
              _focus={{ borderColor: '#227EA1' }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address && <Box color="red">{formik.errors.address}</Box>}
          </FormControl>
          <Button
            type="submit"
            disabled={loading}
            isLoading={loading}
            bg="#227EA1"
            color="white"
            _hover={{ bg: '#0E5A77' }}
            mt="4"
            borderRadius="lg"
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Form;
