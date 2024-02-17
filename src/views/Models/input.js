import { Button, InputGroup, Input, InputLeftElement, Icon, Flex } from '@chakra-ui/react';
import { IoIosSearch } from 'react-icons/io';
import { MdOutlineSyncAlt } from 'react-icons/md';

const InputElements = (props) => {
  return (
    <Flex flexDirection={{ base: 'column', md: 'row' }} justifyContent="center" alignItems="center" width="100%">
      <InputGroup width={{ base: '100%', md: '50%' }} mb={{ base: '10px', md: '0' }}>
        <InputLeftElement children={<Icon as={IoIosSearch} mt="7px" boxSize={6} color="gray.500" />} />
        <Input
          height="48px"
          placeholder="Search Models"
          value={props.searchValue}
          onChange={props.handleChange}
          bg="#fffff"
          border="2px solid"
          borderRadius="10px"
          _focus={{ outline: 'none', border: '2px solid black' }}
        />
      </InputGroup>
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
