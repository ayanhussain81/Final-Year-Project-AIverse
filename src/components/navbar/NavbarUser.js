import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import OutlinedButton from 'components/common/buttons/OutlinedButton';
import { HSeparator } from 'components/separator/Separator';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { userRoutes } from 'routes';

const UserHeader = (props) => {
  let navbarBg = useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(11,20,55,0.5)');
  let navbarFilter = 'none';
  let navbarBackdrop = 'blur(20px)';

  return (
    <>
      <Flex
        paddingX="60px"
        borderBottom="1px"
        borderColor="rgb(135 140 189 / 30%)"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        inset={0}
        height="4.7rem"
        zIndex="99"
        bgColor={navbarBg}
        bg={navbarBg}
        filter={navbarFilter}
        backdropFilter={navbarBackdrop}
      >
        <Text fontWeight="600" fontSize="2xl">
          {props.name}
        </Text>
        <Box display="flex" gap="4">
          <SidebarResponsive routes={userRoutes} />
        </Box>
      </Flex>
      {/* <HSeparator /> */}
    </>
  );
};

export default UserHeader;
