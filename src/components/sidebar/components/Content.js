// chakra imports
import { Avatar, Box, Button, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import SellerMenu from 'components/menu/SellerMenu';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import Links from 'components/sidebar/components/Links';
import React from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/auth';
import { FaMoneyBillAlt } from 'react-icons/fa';
import axiosInstance from 'services/axiosInstance';

// FUNCTIONS

function SidebarContent(props) {
  const { routes, collapse } = props;
  const seller = useSelector((state) => state.auth.seller);
  const { user: userState, tokens } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const getManageBillingLink = async () => {
    try {
      const response = await axiosInstance.post(
        '/seller/manage-billing',
        { sellerId: seller?._id },
        {
          headers: {
            Authorization: `Bearer ${tokens.access.token}`,
          },
        }
      );
      console.log(response.data);
      window.location.href = response.data.portalLink;
      return response.data;
    } catch (error) {
      console.error('Error fetching manage billing link:', error);
      throw error;
    } finally {
    }
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
        {props.isSeller && (
          <Button
            onClick={getManageBillingLink}
            justifyContent="flex-start"
            ps="34px"
            color="brand.500"
            _hover={{ bg: 'transparent' }}
            leftIcon={<FaMoneyBillAlt size={20} />}
            w="full"
          >
            {!collapse && 'Manage Billing'}
          </Button>
        )}

        <Button
          onClick={handleLogout}
          justifyContent="flex-start"
          ps="34px"
          color="red.400"
          _hover={{ bg: 'transparent' }}
          leftIcon={<IoIosLogOut size={20} />}
          w="full"
          mb="1rem"
        >
          {!collapse && 'Log out'}
        </Button>
        {/* <SellerMenu collapse={collapse} menuItems={[]} /> */}
      </Box>
    </Flex>
  );
}

export default SidebarContent;
