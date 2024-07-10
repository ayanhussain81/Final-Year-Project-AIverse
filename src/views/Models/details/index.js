import React, { useEffect, useState } from 'react';
import { Box, Image, Heading, Text, Button, Tabs, TabList, Tab, Flex, Icon, Badge, Spinner, Center } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { GoPlusCircle } from 'react-icons/go';
import axiosInstance from 'services/axiosInstance';
import Header from 'layouts/HomeHeader';
import Demo from './demo';
import Documentation from './documentation';
import About from './about';
import { useSelector } from 'react-redux';
import Reviews from 'components/Reviews';

const ModelDetails = () => {
  const { name } = useParams();
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');
  const { user: userState } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      if (!userState) {
        navigate('/auth');
        return;
      }

      setIsLoading(true);
      const response = await axiosInstance.post('/users/user-checkout-session', { userId: userState.id, modelId: name });
      const { url } = response.data;

      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderDescription = () => {
    if (typeof model.description === 'string' && model.description.length > 20) {
      return `${model.description.slice(0, 20)}...`;
    } else if (typeof model.description === 'string') {
      return model.description;
    } else {
      return '';
    }
  };

  useEffect(() => {
    const getModel = async () => {
      try {
        const response = await axiosInstance.get(`/models/${name}`);
        setModel(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getModel();
  }, [name]);

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box bg="white">
      <Header />
      <Box mx={{ base: '20px', md: '30px', lg: '50px', xl: '150px' }} pt={{ base: '100px', md: '180px' }}>
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Box mr="10">
            <Image src={model.img} alt={model.name} objectFit="cover" width="285px" height="180px" />
          </Box>
          <Flex flexDirection="column" mt={{ base: '8px', md: '0px' }} gap={{ base: '4', md: '4', lg: '4' }}>
            <Heading as="h1" fontSize="3xl" m="0">
              {model.name}
            </Heading>
            <Text fontSize="xl" m="0">
              {renderDescription()}
            </Text>
            <Text fontSize="lg" m="0">
              {model.seller}
            </Text>
            <Badge colorScheme="green">
              {model.averageRating ? `Average Rating: ${model.averageRating.toFixed(1)}/5` : 'No ratings yet'}
            </Badge>
            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              isLoading={isLoading}
              leftIcon={<Icon as={GoPlusCircle} boxSize={6} />}
              width={{ base: '50%', md: '50%', lg: '50%' }}
              _hover={{ bg: '#0E5A77' }}
              _active={{ bg: '#0E5A77' }}
              bg="#227ea1"
              color="white"
            >
              Subscribe
            </Button>
          </Flex>
        </Flex>

        <Tabs mt="16" isFitted width="20%">
          <TabList borderBottom="none">
            <Tab _focus={{ boxShadow: 'none', borderBottom: '2px solid #000' }} onClick={() => setActiveTab('about')}>
              About
            </Tab>
            <Tab _focus={{ boxShadow: 'none', borderBottom: '2px solid #000' }} onClick={() => setActiveTab('demo')}>
              Demo
            </Tab>
            <Tab
              _focus={{ boxShadow: 'none', borderBottom: '2px solid #000' }}
              onClick={() => setActiveTab('documentation')}
            >
              Documentation
            </Tab>
          </TabList>
        </Tabs>
        {activeTab === 'about' && <About description={model.description} />}
        {activeTab === 'demo' && <Demo />}
        {activeTab === 'documentation' && <Documentation model={model} />}
        <Reviews modelId={name} />
      </Box>
    </Box>
  );
};

export default ModelDetails;
