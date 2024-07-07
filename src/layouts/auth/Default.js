// Chakra imports
import { Box, Flex, Icon, Text, Container, Heading, Image, Grid, GridItem, Center } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import Footer from 'components/footer/FooterAuth';
import FixedPlugin from 'components/fixedPlugin/FixedPlugin';
import loginImage from 'assets/img/auth/login.png';
// Custom components
import { NavLink } from 'react-router-dom';
// Assets
import { FaChevronLeft } from 'react-icons/fa';

function AuthIllustration(props) {
  const { children } = props;
  // Chakra color mode
  return (
    <Box>
      <Flex justifyContent="space-evenly" alignItems="center">
        <Box display={{ base: 'none', md: 'block' }} height="400px">
          <Image src={loginImage} alt="Dan Abramov" height="100%" />
        </Box>
        <Flex
          h={{
            sm: 'initial',
            md: 'unset',
            // lg: '100vh',
            // xl: '97vh',
          }}
          // w="100%"
          // mx="auto"
          // justifyContent="center"
          // alignItems="center"
          // direction="column"
        >
          <Box py={{ md: '10px' }}>{children}</Box>
          {/* <Footer /> */}
        </Flex>
        <FixedPlugin />
      </Flex>
    </Box>
  );
}
// PROPS

AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.any,
};

export default AuthIllustration;
