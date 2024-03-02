import { Flex, Text } from '@chakra-ui/react';
import OutlinedButton from 'components/common/buttons/OutlinedButton';
import { HSeparator } from 'components/separator/Separator';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const Header = (props) => {
  return (
    <>
      <Flex
        paddingX="60px"
        bg="white"
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        inset={0}
        height="4.7rem"
      >
        <Text fontWeight="600" fontSize="2xl">
          Models
        </Text>
        <OutlinedButton
          type="button"
          extraClasses="px-3 py-3 font-semibold bg-inherit leading-[100%]"
          icon={FaPlus}
          iconSize={17}
          children="New Model"
          onClick={() => props.handleShow()}
        />
      </Flex>
      <HSeparator />
    </>
  );
};

export default Header;
