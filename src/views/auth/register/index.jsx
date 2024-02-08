/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import { HSeparator } from 'components/separator/Separator';
import DefaultAuth from 'layouts/auth/Default';
// Assets
import illustration from 'assets/img/auth/auth.png';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import axiosInstance from 'services/axiosInstance';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/actions/auth';

function Register() {
    // Chakra color mode
  const textColor = 'rgb(34 126 161)';
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = 'rgb(34 126 161)';
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
  const googleText = useColorModeValue('navy.700', 'white');
  const googleHover = useColorModeValue({ bg: 'gray.200' }, { bg: 'whiteAlpha.300' });
  const googleActive = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.200' });
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch();

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    name: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/\d/, 'Password must contain at least 1 number')
      .matches(/[a-zA-Z]/, 'Password must contain at least 1 letter')
      .required('Password is Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      setSubmitting(true);
      setLoading(true);
      try {
        delete values.confirmPassword;
        const response = await axiosInstance.post('/auth/register', values);
        console.log('Registration successful:', response.data);
        const { user, tokens } = response.data;
        dispatch(loginSuccess(user, tokens));

        resetForm();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors({ email: 'Email already exists' });
          console.error('Server Error:', error.response.data);
        } else {
          console.error('Error:', error.message);
        }
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        flexDirection="column"
      >
        <Box me="auto" w={'100%'}>
          <Heading color={textColor} fontSize="36px" mb="10px" textAlign={'center'}>
            Register
          </Heading>
          <Text mb="15px" ms="4px" color={textColorSecondary} fontWeight="400" fontSize="md" textAlign={'center'}>
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '100%', lg:'25vw' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          // mb={{ base: '20px', md: 'auto' }}
          as="form"
          onSubmit={formik.handleSubmit}
        >
          <Button
            fontSize="sm"
            me="0px"
            mb="15px"
            py="15px"
            h="40px"
            borderRadius="16px"
            bg={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
          >
            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
            Continue with Google
          </Button>
          <Flex align="center" /*mb="25px"*/>
            <HSeparator />
            <Text color="gray.400" mx="14px">
              or
            </Text>
            <HSeparator />
          </Flex>
          <FormControl isInvalid={formik.errors.name} pb="15px">
            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
              Name<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: '0px', md: '0px' }}
              type="text"
              placeholder="John Doe"
              fontWeight="500"
              size="md"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* {formik.errors.name && formik.touched.name && (
              <FormErrorMessage px="4px" color="red" fontSize="sm">
                {formik.errors.name}
              </FormErrorMessage>
            )} */}
          </FormControl>
          <FormControl isInvalid={formik.errors.email} pb="15px">
            <FormLabel display="flex" ms="4px" fontSize="sm" fontWeight="500" color={textColor} mb="8px">
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: '0px', md: '0px' }}
              type="email"
              placeholder="mail@simmmple.com"
              fontWeight="500"
              size="md"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* {formik.errors.email && formik.touched.email && (
              <FormErrorMessage px="4px" color="red" fontSize="sm">
                {formik.errors.email}
              </FormErrorMessage>
            )} */}
          </FormControl>
          <FormControl isInvalid={formik.errors.password} pb="15px">
            <FormLabel ms="4px" fontSize="sm" fontWeight="500" color={textColor} display="flex">
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                size="md"
                type={show ? 'text' : 'password'}
                variant="auth"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <InputRightElement display="flex" alignItems="center" mt="2px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: 'pointer' }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            {/* {formik.errors.password && formik.touched.password && (
              <FormErrorMessage px="4px" color="red" fontSize="sm">
                {formik.errors.password}
              </FormErrorMessage>
            )} */}
          </FormControl>
          {/* <FormControl isInvalid={formik.errors.confirmPassword} pb="15px">
            <FormLabel ms="4px" fontSize="sm" fontWeight="500" color={textColor} display="flex">
              Confirm Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Confirm Your Password"
                size="md"
                type={show ? 'text' : 'password'}
                variant="auth"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <InputRightElement display="flex" alignItems="center" mt="2px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: 'pointer' }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
              <FormErrorMessage px="4px" color="red" fontSize="sm">
                {formik.errors.confirmPassword}
              </FormErrorMessage>
            )}
          </FormControl> */}

          {/* <Flex justifyContent="space-between" align="center">
            <FormControl display="flex" alignItems="center">
              <Checkbox id="remember-login" colorScheme="brandScheme" me="10px" />
              <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal" color={textColor} fontSize="sm">
                Keep me logged in
              </FormLabel>
            </FormControl>
          </Flex> */}
          <Button
            fontSize="sm"
            disabled={loading}
            isLoading={loading}
            // variant="brand"
            color='#ffffff'
            bg='rgb(34 126 161)'
            fontWeight="500"
            w="100%"
            h="40px"
            mt="15px"
            type="submit"
          >
            Register
          </Button>
          <Flex flexDirection="column" justifyContent="center" alignItems="start" maxW="100%" mt="20px" mb='80px'>
            <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Already have account?
              <NavLink to="/auth/sign-in">
                <Text color={textColorBrand} as="span" ms="5px" fontWeight="500">
                  Sign in
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default Register;
