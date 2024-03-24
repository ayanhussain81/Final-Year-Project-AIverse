import { Box, Heading, Text, Divider, Stack, Flex } from '@chakra-ui/react';
import React from 'react';

const Documentation = ({ model }) => {
  const decodeHtmlEntities = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };
  const decodedHtmlContent = decodeHtmlEntities(model.documentation);
  return (
    <Box py={{ base: '30px', md: '50px' }}>
      <Heading as="h2" fontSize="2xl">
        Documentation
      </Heading>
      <Divider py="10px" borderColor="gray.400" />
      <Stack pt="20px" spacing="3">
        <Flex alignItems="center" fontSize="lg">
          <Heading fontSize="lg" mr="2">
            Endpoints:
          </Heading>
          <Text fontSize="lg">Use the following endpoint for making REST API call</Text>
        </Flex>
        <Flex alignItems="center">
          <Heading fontSize="lg" mr="2">
            Response:
          </Heading>
          <Text fontSize="lg">POST</Text>
        </Flex>
        <Flex alignItems="center">
          <Heading fontSize="lg" mr="2">
            Request Headers
          </Heading>
          <Text fontSize="lg">Obtain your API Key from the API Tokens section</Text>
        </Flex>
      </Stack>
      <div dangerouslySetInnerHTML={{ __html: decodedHtmlContent }} />
    </Box>
  );
};

export default Documentation;
