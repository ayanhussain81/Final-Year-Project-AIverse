import { InputGroup, InputLeftElement, Input, Icon } from '@chakra-ui/react';
import { IoIosSearch } from 'react-icons/io';

const SearchBar = (props) => {
  return (
    <InputGroup width={{ base: '100%', md: '50%' }} mb={{ base: '10px', md: '0' }}>
      <InputLeftElement
        children={<Icon as={IoIosSearch} mt={props.mt} boxSize={props.boxSize ? props.boxSize : 6} color="gray.500" />}
      />
      <Input
        height={props.height}
        placeholder="Search Models"
        value={props.searchValue}
        onChange={props.handleChange}
        bg="#fffff"
        border="2px solid"
        borderRadius="10px"
        _focus={{ outline: 'none', border: '2px solid black' }}
      />
    </InputGroup>
  );
};

export default SearchBar;
