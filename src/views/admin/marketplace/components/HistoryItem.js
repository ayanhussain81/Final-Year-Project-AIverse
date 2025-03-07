import React from 'react';
// Chakra imports
import { Box, Flex, Icon, Image, Text, useClipboard, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card.js';
// Assets
import { FaEthereum } from 'react-icons/fa';
import { CopyApiKeyButton } from 'components/common/buttons/CopyButton';
import TransparentMenu from 'components/menu/TransparentMenu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { DeleteIcon } from '@chakra-ui/icons';

export default function NFT(props) {
  const { image, name, author, date, modelId, price, apiKey, handleDeleteSubscription } = props;
  const endpoint = `http://18.119.167.28:5000/v1/model/predict/${modelId}`;

  // Chakra Color Mode
  const textColor = useColorModeValue('brands.900', 'white');
  const bgItem = useColorModeValue(
    { bg: 'white', boxShadow: '0px 40px 58px -20px rgba(112, 144, 176, 0.12)' },
    { bg: 'navy.700', boxShadow: 'unset' }
  );
  const textColorDate = useColorModeValue('secondaryGray.600', 'white');

  return (
    <Card _hover={bgItem} bg="transparent" boxShadow="unset" px="24px" py="21px" transition="0.2s linear">
      <Flex direction={{ base: 'column' }} justify="center">
        <Flex justifyContent="space-between" position="relative" align="center">
          <Flex cursor="pointer">
            <Image src={image} w="66px" h="66px" borderRadius="20px" me="16px" />
            <Flex
              direction="column"
              w={{ base: '70%', md: '100%' }}
              me={{ base: '4px', md: '32px', xl: '10px', '3xl': '32px' }}
            >
              <Text
                color={textColor}
                fontSize={{
                  base: 'md',
                }}
                mb="5px"
                fontWeight="bold"
                me="14px"
              >
                {name}
              </Text>
              <Text
                color="secondaryGray.600"
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

          <Flex me={{ base: '4px', md: '32px', xl: '10px', '3xl': '32px' }} align="center">
            {/* <Icon as={FaEthereum} color={textColor} width='9px' me='7px' /> */}
            {/* <Text fontWeight="700" fontSize="md" color={textColor}>
              {price}
            </Text> */}
          </Flex>
          <Flex gap={3} alignItems="center">
            <Text ms="auto" fontWeight="700" fontSize="sm" color={textColorDate}>
              {date}
            </Text>
            <CopyApiKeyButton apiKey={apiKey} title="API Key" />
            <CopyApiKeyButton apiKey={endpoint} title="Endpoint" />
            <TransparentMenu
              menuItems={[{ name: 'Delete', onClick: handleDeleteSubscription, icon: DeleteIcon }]}
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
