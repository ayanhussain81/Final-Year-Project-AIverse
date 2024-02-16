import { Avatar, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const UserMenu = ({ user, menuItems, handleLogout }) => {
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
  );

  return (
    <Menu>
      <MenuButton p="0px">
        <Avatar
          _hover={{ cursor: 'pointer' }}
          color="white"
          name={user ? user?.name : 'user'}
          bg="#195d77"
          size="sm"
          w="45px"
          h="45px"
        />
      </MenuButton>
      <MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
        <Flex w="100%" mb="0px">
          <Text
            ps="20px"
            pt="16px"
            pb="10px"
            w="100%"
            borderBottom="1px solid"
            borderColor={borderColor}
            fontSize="sm"
            fontWeight="700"
            color={textColor}
          >
            👋&nbsp; Hey, {user ? user?.name?.split(' ')[0] : 'user'}
          </Text>
        </Flex>
        <Flex flexDirection="column" p="10px">
          {menuItems.map((item) => {
            return (
              <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
                <Text fontSize="sm">{item.name}</Text>
              </MenuItem>
            );
          })}

          <MenuItem
            _hover={{ bg: 'none' }}
            _focus={{ bg: 'none' }}
            color="red.400"
            borderRadius="8px"
            px="14px"
            onClick={handleLogout}
          >
            <Text fontSize="sm">Log out</Text>
          </MenuItem>
        </Flex>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
