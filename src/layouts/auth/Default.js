// Chakra imports
import { Box, Flex, Icon, Text, Container, Heading, Image, Grid, GridItem, Center } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import Footer from 'components/footer/FooterAuth';
import FixedPlugin from 'components/fixedPlugin/FixedPlugin';
// Custom components
import { NavLink } from 'react-router-dom';
// Assets
import { FaChevronLeft } from 'react-icons/fa';

function AuthIllustration(props) {
  const { children, illustrationBackground } = props;
  // Chakra color mode
  return (
    // <Container>
    <Center mt={'2.5em'}>
      <Grid gridTemplateColumns="repeat(7,1fr)" h={'87vh'} w={'60vw'} className='authBoxShadow'>
        <GridItem
          colSpan={{ base: 0, sm: 0, md: 0, lg: 3 }}
        >
          <Box
            display={{ base: 'none', md: 'block' }}
            borderLeftRadius={'10px'}
            bg='green'
          >
            <Image src='https://images.pexels.com/photos/719396/pexels-photo-719396.jpeg?auto=compress&cs=tinysrgb&w=600' alt='Dan Abramov' w='100vw' h={'87vh'} objectFit='fill' borderLeftRadius={'10px'} />
          </Box>
        </GridItem>
        <GridItem
          colSpan={{ base: 7, sm: 7, md: 7, lg: 4 }}
        >
          <Flex
            h={{
              sm: 'initial',
              md: 'unset',
              lg: '100vh',
              xl: '97vh',
            }}
            w='100%'
            mx="auto"
            justifyContent="center"
            alignItems='center'
            direction="column"
          >
            <Box py={{ md: '10px' }}>{children}</Box>
            {/* <Footer /> */}
          </Flex>
        </GridItem>
        <FixedPlugin />
      </Grid>
    </Center>
    // </Container>
  );
}
// PROPS

AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.any,
};

export default AuthIllustration;
