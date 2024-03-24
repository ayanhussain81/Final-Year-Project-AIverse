import React, { useEffect, useState } from 'react';
import { Box, Image, Heading, Text, Button, Tabs, TabList, Tab, Flex, Icon } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { GoPlusCircle } from 'react-icons/go';
import axiosInstance from 'services/axiosInstance';
import Header from 'layouts/HomeHeader';
import Demo from './demo';
import Documentation from './documentation';
import About from './about';

const ModelDetails = () => {
  const { name } = useParams();
  const [model, setModel] = useState({});
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const getModel = async () => {
      try {
        const response = await axiosInstance.get(`/models/${name}`);
        setModel(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getModel();
  }, [name]);

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
              {model.description}
            </Text>
            <Text fontSize="lg" m="0">
              {model.owner}
            </Text>
            <Button
              leftIcon={<Icon as={GoPlusCircle} boxSize={6} />}
              width={{ base: '45%', md: '40%', lg: '30%' }}
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
        {activeTab === 'about' && <About />}
        {activeTab === 'demo' && <Demo />}
        {activeTab === 'documentation' && <Documentation model={model} />}
      </Box>
    </Box>
  );
};

export default ModelDetails;
