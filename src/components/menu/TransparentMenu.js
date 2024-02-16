import React from 'react';

// Chakra imports
import { Menu, MenuButton, MenuItem, MenuList, useDisclosure, useColorModeValue, Flex, Icon, Text } from '@chakra-ui/react';
// Assets
import { MdOutlinePerson, MdOutlineCardTravel, MdOutlineLightbulb, MdOutlineSettings } from 'react-icons/md';

export default function TransparentMenu(props) {
  const { menuItems, icon, ...rest } = props;

  // Ellipsis modals
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();

  // Chakra color mode

  const textColor = useColorModeValue('secondaryGray.500', 'white');
  const textHover = useColorModeValue(
    { color: 'secondaryGray.900', bg: 'unset' },
    { color: 'secondaryGray.500', bg: 'unset' }
  );
  const bgList = useColorModeValue('white', 'whiteAlpha.100');
  const bgShadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');

  return (
    <Menu isOpen={isOpen1} onClose={onClose1}>
      <MenuButton {...rest} onClick={onOpen1}>
        {icon}
      </MenuButton>
      <MenuList
        w="170px"
        minW="unset"
        maxW="170px !important"
        border="transparent"
        backdropFilter="blur(63px)"
        bg={bgList}
        boxShadow={bgShadow}
        borderRadius="20px"
        p="15px"
      >
        {menuItems.map((item) => {
          return (
            <MenuItem
              transition="0.2s linear"
              color={textColor}
              _hover={textHover}
              p="0px"
              borderRadius="8px"
              _active={{
                bg: 'transparent',
              }}
              _focus={{
                bg: 'transparent',
              }}
              mb="10px"
            >
              <Flex align="center">
                <Icon as={item.icon} h="17px" w="17px" me="8px" />
                <Text fontSize="sm" fontWeight="400">
                  {item.name}
                </Text>
              </Flex>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
