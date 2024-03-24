import { Flex, Text } from '@chakra-ui/react';
import OutlinedButton from 'components/common/buttons/OutlinedButton';
import { HSeparator } from 'components/separator/Separator';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const Header = (props) => {
  return (
    <>
      <Flex paddingX="60px" justifyContent="space-between" alignItems="center" position="sticky" inset={0} height="4.7rem">
        <Text fontWeight="600" fontSize="2xl">
          {props.name}
        </Text>
        {props.name === 'Models' && (
          <OutlinedButton
            type="button"
            extraClasses="mobile-sm:px-1 mobile-lg:px-3 mobile-sm:py-1 mobile-lg:py-3 font-semibold bg-inherit leading-[100%]"
            icon={FaPlus}
            iconSize={17}
            children={props.name === 'Models' ? 'New Model' : 'New Version'}
            onClick={() => props.handleShow()}
          />
        )}
      </Flex>
      <HSeparator />
    </>
  );
};

export default Header;
