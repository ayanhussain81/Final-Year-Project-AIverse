import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Divider,
  ModalCloseButton,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Text,
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/react';

const Popup = (props) => {
  const [selectedModelTypes, setSelectedModelTypes] = useState([]);
  const [selectedUseCases, setSelectedUseCases] = useState([]);

  const handleSearch = () => {
    props.handleFilter(selectedModelTypes, selectedUseCases);
    props.handleClose();
  };

  return (
    <Modal autoFocus={false} isOpen={props.showModal} onClose={props.handleClose} size="2xl" isCentered>
      <ModalOverlay />
      <ModalContent bg="#F8F8F8" borderRadius="xl" boxShadow="0px 4px 24px rgba(0, 0, 0, 0.1)">
        <ModalHeader fontSize="xl" color="#333" borderBottom="1px solid #E0E0E0">
          Filters
        </ModalHeader>
        <ModalCloseButton color="#333" />
        <ModalBody mt="1rem">
          <Stack spacing={4}>
            <FormControl>
              <FormLabel fontSize="xl" fontWeight="600">
                Model Type
              </FormLabel>
              <Text mb="1.2rem" color="#555" fontSize="md">
                Choose models based on input data type to be processed.
              </Text>

              <CheckboxGroup colorScheme="teal" onChange={setSelectedModelTypes}>
                <Stack spacing={14} direction="row" justifyContent="space around">
                  {Array.from(Array(Math.ceil(props.modelTypes.length / 3)).keys()).map((index) => (
                    <Stack direction="column" key={index}>
                      {props.modelTypes.slice(index * 3, (index + 1) * 3).map((type) => (
                        <Checkbox key={type} value={type} size="lg" padding="4px">
                          {type}
                        </Checkbox>
                      ))}
                    </Stack>
                  ))}
                </Stack>
              </CheckboxGroup>
            </FormControl>
            <Divider />
            <FormControl>
              <FormLabel fontSize="xl" fontWeight="600">
                Use Cases
              </FormLabel>
              <Text mb="1.2rem" color="#555" fontSize="md">
                Choose models by AI Use Cases for your product, customer engagement, etc.
              </Text>

              <CheckboxGroup colorScheme="teal" onChange={setSelectedUseCases}>
                <Stack spacing={14} direction="row" justifyContent="space around">
                  {Array.from(Array(Math.ceil(props.useCases.length / 3)).keys()).map((index) => (
                    <Stack direction="column" key={index}>
                      {props.useCases.slice(index * 3, (index + 1) * 3).map((type) => (
                        <Checkbox key={type} value={type} size="lg" padding="4px">
                          {type}
                        </Checkbox>
                      ))}
                    </Stack>
                  ))}
                </Stack>
              </CheckboxGroup>
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter borderTop="1px solid #E0E0E0">
          <Button
            padding="20px 22px"
            variant="outline"
            borderRadius="10px"
            color="#ffffff"
            bg="rgb(34 126 161)"
            _hover={{ bg: 'rgb(34 156 205)' }}
            _focus={{ bg: 'rgb(34 156 205)' }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Popup;
