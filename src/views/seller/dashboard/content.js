import { Box, Flex, Text } from '@chakra-ui/react';
import { BsBoxes } from 'react-icons/bs';
import ContainedButton from '../../../components/common/buttons/ContainedButton';
import { FaPlus } from 'react-icons/fa';
import SearchBar from 'shared/searchbar';
import Panel from './panel';

const Content = (props) => {
  const handleChange = async (event) => {
    console.log(event.target.value);
    props.onFilter(event.target.value);
  };

  return props.userModels ? (
    <Flex mx={{ base: '10px', md: '0px' }} my="30px" direction="column" justifyContent="start" alignItems="center">
      <SearchBar height="38px" boxSize="5" handleChange={handleChange} />
      {props?.userModels.map((model) => (
        <Panel model={model} />
      ))}
    </Flex>
  ) : (
    <Flex justifyContent="center" alignItems="center" height="85%">
      <Box
        padding="30px"
        marginX={{ base: '20px', md: '0' }}
        direction="column"
        bg="gray.100"
        boxShadow="lg"
        borderRadius="lg"
        maxW="570px"
      >
        <Box display="inline-block" borderRadius="50%" bg="gray.200" p="4" mb="3">
          <BsBoxes size="28" color="#227EA1" />
        </Box>
        <Text fontSize="2xl" fontWeight="bold" mb="1">
          Create your first API Model
        </Text>
        <Text mb="4" color="gray.700">
          Create your AI model and publish them publicly or privately within your organization. Our platform offers a
          reliable and scalable infrastructure to host and deploy your models.
        </Text>
        <ContainedButton
          type="button"
          extraClasses="px-3 py-3 font-semibold bg-inherit leading-[100%]"
          icon={FaPlus}
          iconSize={17}
          children="New Model"
          onClick={() => props.handleShow()}
        />
      </Box>
    </Flex>
  );
};

export default Content;
