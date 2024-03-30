// chakra imports
import { Avatar, Box, Button, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import SellerMenu from 'components/menu/SellerMenu';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import React from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/auth';

// FUNCTIONS

function SidebarContent(props) {
  const { routes, collapse } = props;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  // SIDEBAR
  return (
    <Flex direction="column" height="100%" pt="25px" justifyContent="space-between" borderRadius="30px">
      <Brand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: '16px', '2xl': '1px' }}>
          <Links routes={routes} collapse={collapse} />
        </Box>
      </Stack>

      <Box>
        <Button
          onClick={handleLogout}
          justifyContent="flex-start"
          ps="34px"
          color="red.400"
          _hover={{ bg: 'transparent' }}
          leftIcon={<IoIosLogOut size={20} />}
          w="full"
          my="1rem"
        >
          {!collapse && 'Log out'}
        </Button>
        {/* <SellerMenu collapse={collapse} menuItems={[]} /> */}
      </Box>
    </Flex>
  );
}

export default SidebarContent;
