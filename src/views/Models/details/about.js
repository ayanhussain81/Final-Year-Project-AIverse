import React from 'react';
import { Stack, Heading, Divider, Text } from '@chakra-ui/react';

const About = ({ description }) => {
  console.log(description);
  return (
    <Stack minHeight="40vh" py={{ base: '30px', md: '50px' }} spacing="6">
      <Heading as="h2" fontSize="2xl">
        About Model
      </Heading>
      <Divider borderColor="gray.400" />
      <Text fontSize="lg">{description ? description : 'No Description provided'}</Text>
    </Stack>
  );
};

export default About;
