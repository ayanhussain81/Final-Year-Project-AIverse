import React from 'react';
import { Text, useColorModeValue } from '@chakra-ui/react';

const NoModelsMessage = () => {
  const textColorMsg = useColorModeValue('secondaryGray.600', 'white');

  return (
    <Text fontWeight="bold" color={textColorMsg} padding="2rem" textAlign="center">
      You haven't purchase any models yet
    </Text>
  );
};

export default NoModelsMessage;
