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
    <Box mt={{ base: '40px' }}>
      <Flex justifyContent="space-evenly" height="600px" alignItems="center">
        <Box display={{ base: 'none', md: 'block' }} height="400px">
          <Image loading="lazy" src={loginImage} alt="auth image" height="100%" />
        </Box>
        <Flex
          h={{
            sm: 'initial',
            md: 'unset',
          }}
        >
          <Box py={{ md: '10px' }}>{children}</Box>
        </Flex>
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
