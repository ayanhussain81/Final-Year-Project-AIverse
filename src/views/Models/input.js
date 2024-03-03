import { Button, Icon, Flex } from '@chakra-ui/react';
import { MdOutlineSyncAlt } from 'react-icons/md';
import SearchBar from 'shared/searchbar';

const InputElements = (props) => {
  return (
    <Flex flexDirection={{ base: 'column', md: 'row' }} justifyContent="center" alignItems="center" width="100%">
      <SearchBar searchValue={props.searchValue} handleChange={props.handleChange} height="48px" mt="7px" />
      <Button
        leftIcon={<Icon as={MdOutlineSyncAlt} boxSize={5} color="black.700" />}
        border="2px solid"
        borderRadius="10px"
        ml={{ base: '0', md: '15px' }}
        height="48px"
        width={{ base: '100%', md: 'auto' }}
        onClick={props.handleShow}
        bg="#ffffff"
        color="black"
        borderColor="#E0E0E0"
        _hover={{ border: '1px solid black' }}
        _active={{ border: '1px solid black' }}
      >
        Filters
      </Button>
    </Flex>
  );
};

export default InputElements;
