import { Flex, Text } from '@chakra-ui/react';

const Title = () => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Text
        lineHeight="1.2"
        textAlign="center"
        fontWeight="bold"
        margin="55px 350px"
        fontSize={{ base: '28px', lg: '44px' }}
      >
        Optimize Your Application with Cutting-Edge{' '}
        <Text display="inline" color="rgb(34 126 161)">
          AI Solutions
        </Text>
      </Text>
    </Flex>
  );
};

export default Title;
