import { Box, Heading, Divider } from '@chakra-ui/react';
import React from 'react';

const Documentation = ({ model }) => {
  const decodeHtmlEntities = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };
  const decodedHtmlContent = model.documentation ? decodeHtmlEntities(model.documentation) : 'No documentation provided';
  return (
    <Box minHeight="40vh" py={{ base: '30px', md: '50px' }}>
      <Heading as="h2" fontSize="2xl">
        Documentation
      </Heading>
      <Divider py="10px" borderColor="gray.400" />
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: decodedHtmlContent }} />
    </Box>
  );
};

export default Documentation;
