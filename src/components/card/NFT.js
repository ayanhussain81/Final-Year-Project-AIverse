import { Box, Button, Flex, Image, Link, Text } from '@chakra-ui/react';
import Card from 'components/card/Card.js';

export default function NFT(props) {
  const { image, name, author, download } = props;

  return (
    <Card style={{ overflow: 'hidden' }} pt="0" px="0" pb="25px">
      <Flex direction={{ base: 'column' }} justify="center">
        <Box mb={{ base: '0px', '2xl': '20px' }}>
          <Image
            _hover={{
              objectFit: 'cover',
              transform: 'scale(1.05)',
              transition: 'transform 0.9s ease',
            }}
            width="100%"
            height="90%"
            objectFit="cover"
            src={image}
            borderTopRadius="20px"
          />
        </Box>
        <Flex flexDirection="column" px="3" justify="space-between" h="100%">
          <Flex direction="row" justifyContent="center">
            <Box border="1px" borderColor="blue" borderRadius="100px" p="2px 5px" mr="7px" mt="10px" mb="15px">
              <Text color="rgb(34 126 161)" fontSize="13" fontWeight="600">
                Pattern Recognition
              </Text>
            </Box>
            <Box border="1px" borderColor="blue" borderRadius="100px" p="2px 5px" mt="10px" mb="15px">
              <Text color="rgb(34 126 161)" fontSize="13" fontWeight="600">
                Computer Vision
              </Text>
            </Box>
          </Flex>
          <Flex
            justify="space-between"
            direction={{
              base: 'row',
              md: 'column',
              lg: 'row',
              xl: 'column',
              '2xl': 'row',
            }}
            mb="auto"
          >
            <Flex direction="column">
              <Text
                color="black"
                fontSize={{
                  base: 'xl',
                  md: 'lg',
                  lg: 'lg',
                  xl: 'lg',
                  '2xl': 'md',
                  '3xl': 'lg',
                }}
                mb="5px"
                fontWeight="bold"
                me="14px"
              >
                {name}
              </Text>
              <Text
                color="black.700"
                fontSize={{
                  base: 'sm',
                }}
                fontWeight="400"
                me="14px"
              >
                {author}
              </Text>
            </Flex>
          </Flex>
          <Flex
            align="start"
            justify="space-between"
            direction={{
              base: 'row',
              md: 'column',
              lg: 'row',
              xl: 'column',
              '2xl': 'row',
            }}
            mt="20px"
          >
            <Link
              href={download}
              mt={{
                base: '0px',
                md: '10px',
                lg: '0px',
                xl: '10px',
                '2xl': '0px',
              }}
            >
              <Button
                variant="outline"
                color="black"
                borderColor="black"
                _hover={{
                  color: 'white',
                  background: 'black',
                }}
                _active={{
                  background: 'black',
                }}
                fontWeight="500"
                borderRadius="10px"
                px="15px"
                py="4px"
              >
                Try it out
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
