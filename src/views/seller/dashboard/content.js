import { Box, Flex, Text } from '@chakra-ui/react';
import { BsBoxes } from 'react-icons/bs';
import { LuCopyPlus } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa';
import ContainedButton from '../../../components/common/buttons/ContainedButton';
import SearchBar from 'shared/searchbar';
import Panel from './panel';

const Content = (props) => {
  const handleChange = async (event) => {
    props.onFilter(event.target.value);
  };

  return props.userModels ? (
    <Flex mx={{ base: '10px', md: '0px' }} my="30px" direction="column" justifyContent="start" alignItems="center">
      <SearchBar height="38px" boxSize="5" handleChange={handleChange} />
      {props?.userModels.map((model) => (
        <Panel model={model} getModelsBySeller={props.getModelsBySeller} />
      ))}
    </Flex>
  ) : (
    <Flex justifyContent="center" alignItems="center" height={props.height ? props.height : '85%'}>
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
          {props.name === 'Models' ? <BsBoxes size="28" color="#227EA1" /> : <LuCopyPlus size="28" color="#227EA1" />}
        </Box>
        <Text fontSize="2xl" fontWeight="bold" mb="1">
          {props.name === 'Models' ? 'Create your first API Model' : 'Create first version of your model'}
        </Text>
        <Text mb="4" color="gray.700">
          {props.name === 'Models'
            ? 'Create your AI model and publish them publicly or privately within your organization. Our platform offers a reliable and scalable infrastructure to host and deploy your models.'
            : 'Upload model files and create the first version of your model.'}
        </Text>
        <ContainedButton
          type="button"
          extraClasses="px-3 py-3 font-semibold bg-inherit leading-[100%]"
          icon={FaPlus}
          iconSize={17}
          children={props.name === 'Models' ? 'New Model' : 'New Version'}
          onClick={() => props.handleShow()}
        />
      </Box>
    </Flex>
  );
};

export default Content;
