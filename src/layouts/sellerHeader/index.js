import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import OutlinedButton from 'components/common/buttons/OutlinedButton';
import { HSeparator } from 'components/separator/Separator';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { sellerRoutes } from 'routes';

const Header = (props) => {
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
          {props.name === 'Models' && (
            <OutlinedButton
              type="button"
              extraClasses="mobile-sm:px-1 mobile-lg:px-3 mobile-sm:py-1 mobile-lg:py-3 font-semibold bg-inherit leading-[100%] border"
              icon={FaPlus}
              iconSize={17}
              className="border-solid"
              children={props.name === 'Models' ? 'New Model' : 'New Version'}
              onClick={() => props.handleShow()}
            />
          )}
          <SidebarResponsive routes={sellerRoutes} />
        </Box>
      </Flex>
      {/* <HSeparator /> */}
    </>
  );
};

export default Header;
