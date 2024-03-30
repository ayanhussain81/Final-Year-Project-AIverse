import { Avatar, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SellerMenu = ({ user, menuItems, handleLogout, collapse }) => {
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
  );
  const navigate = useNavigate();

  const MenuIcon = () => <Avatar name="Huzaifa" background="brand.500" size="sm" me={!collapse ? '18px' : 0} />;

  return (
    <Menu>
      <MenuButton
        display="flex"
        ps="24px"
        role="button"
        // pe={{ md: '16px', '2xl': '1px' }}
        // w="full"
        as={Button}
        _hover={{
          bg: 'transparent',
        }}
        _active={{
          bg: 'transparent',
        }}
        leftIcon={<MenuIcon />}
        alignItems="center"
        paddingBottom="1rem"
        borderRadius="30px"
      >
        {!collapse && (
          <Text color={textColor} fontSize="lg">
            Huzaifa
          </Text>
        )}
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
          {menuItems.map((item, index) => {
            return (
              <MenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                onClick={() => (item?.route ? navigate(item.route) : () => {})}
                borderRadius="8px"
                px="14px"
                key={index}
              >
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

export default SellerMenu;
