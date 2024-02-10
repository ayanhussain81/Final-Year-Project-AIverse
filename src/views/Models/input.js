import { Button, InputGroup, Input, InputLeftElement, Icon } from '@chakra-ui/react';
import { IoIosSearch } from 'react-icons/io';
import { MdOutlineSyncAlt } from 'react-icons/md';

const InputElements = (props) => {
  return (
    <InputGroup width="50vw">
      <InputGroup>
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
        ml="15px"
        height="48px"
        width="115px"
        onClick={props.handleShow}
        bg="#ffffff"
        color="black"
        borderColor="#E0E0E0"
        _hover={{ border: '1px solid black' }}
        _active={{ border: '1px solid black' }}
      >
        Filters
      </Button>
    </InputGroup>
  );
};

export default InputElements;
