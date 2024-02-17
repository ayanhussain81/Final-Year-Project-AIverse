import { Flex, Text } from '@chakra-ui/react';

const Title = () => {
  return (
    <Flex justifyContent="center">
      <Text
        lineHeight="1.2"
        textAlign="center"
        fontWeight="bold"
        margin={{ base: '55px 2px', sm: '55px 4px', md: '55px 15px', lg: '55px 50px', xl: '55px 100px' }}
        fontSize={{ base: '21px', sm: '25px', md: '34px', lg: '38px', xl: '40px' }}
      >
        Optimize Your Application with Cutting Edge{' '}
        <Text color="rgb(34 126 161)" display={{ base: 'inline', md: 'block' }}>
          AI Solutions
        </Text>
      </Text>
    </Flex>
  );
};

export default Title;
