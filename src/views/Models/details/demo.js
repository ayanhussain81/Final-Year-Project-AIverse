import { Box, Heading, Text, Divider, Stack, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import image1 from '../../../assets/images/miscellaneous/image-1.jpg';
import image2 from '../../../assets/images/miscellaneous/image-2.jpg';

const Demo = () => {
  return (
    <Box py={{ base: '30px', md: '50px' }}>
      <Heading as="h2" fontSize="2xl" pt="20px">
        How to Use
      </Heading>
      <Divider py="10px" borderColor="gray.400" />

      <Stack pt="20px" spacing="3">
        <Flex alignItems="center" fontSize="lg">
          <Heading fontSize="lg" mr="2">
            Endpoints:
          </Heading>
          <Text fontSize="lg">Use the endpoint provided in purchase models for making REST API call</Text>
        </Flex>
        <Flex alignItems="center">
          <Heading fontSize="lg" mr="2">
            Response:
          </Heading>
          <Text fontSize="lg">POST</Text>
        </Flex>
      </Stack>

      <Stack pt="20px" spacing="3">
        <Flex alignItems="center" fontSize="lg">
          <Heading fontSize="lg" mr="2">
            Step 1:
          </Heading>
          <Text fontSize="lg">Obtain API Key and Endpoint</Text>
        </Flex>
        <Text fontSize="lg" pl="28px">
          Log in to your dashboard where all the purchased models are displayed. Locate your API key and copy the endpoint
          URL provided for the specific model you wish to use.
        </Text>

        <Flex alignItems="center" fontSize="lg">
          <Heading fontSize="lg" mr="2">
            Step 2:
          </Heading>
          <Text fontSize="lg">Set Headers in API Request Tool</Text>
        </Flex>
        <Text fontSize="lg" pl="28px">
          In your API request tool (such as Postman), configure the headers to include your API key and other required
          information. Set the <strong>header</strong> with your API key, and ensure the <strong>Content-Type</strong> is set
          to <code>application/json</code>.
        </Text>
        <Box display="flex" justifyContent="center" alignItems="center" my="4">
          <Image width={800} height={500} src={image1} alt="Postman Headers Configuration" />
        </Box>

        <Flex alignItems="center" fontSize="lg">
          <Heading fontSize="lg" mr="2">
            Step 3:
          </Heading>
          <Text fontSize="lg">Send POST Request</Text>
        </Flex>
        <Text fontSize="lg" pl="28px">
          Use the copied endpoint and configured headers to send a POST request with the required JSON body. For example, to
          translate text, your JSON body might look like this:
        </Text>
        <Text fontSize="lg" pl="28px">
          <code>{`{ "text": "I am learning Flask" }`}</code>
        </Text>
        <Box display="flex" justifyContent="center" alignItems="center" my="4">
          <Image width={800} height={500} src={image2} alt="Postman Body Configuration" />
        </Box>

        <Flex alignItems="center" fontSize="lg">
          <Heading fontSize="lg" mr="2">
            Step 4:
          </Heading>
          <Text fontSize="lg">Check the Response</Text>
        </Flex>
        <Text fontSize="lg" pl="28px">
          Interpret the JSON response to get the translated text or desired output. The response will be in JSON format,
          confirming the successful processing of your request.
        </Text>
      </Stack>
    </Box>
  );
};

export default Demo;
