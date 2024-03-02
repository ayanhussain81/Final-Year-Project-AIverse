import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Stack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';

const Popup = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = async () => {
    console.log(formData);
    props.handleClose();
  };

  return (
    <Modal autoFocus={false} isOpen={props.showModal} onClose={props.handleClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="#F8F8F8"
        borderRadius="xl"
        boxShadow="0px 4px 24px rgba(0, 0, 0, 0.1)"
        maxW={{ base: '90%', sm: '90%', md: 'xl' }}
      >
        <ModalHeader fontSize="xl" color="#333" borderBottom="1px solid #E0E0E0">
          Create New Model
        </ModalHeader>
        <ModalCloseButton color="#333" />
        <ModalBody my="1rem">
          <Stack spacing={5}>
            <FormControl>
              <FormLabel fontSize="md" fontWeight="500">
                Name
              </FormLabel>
              <Input
                placeholder="Give your model a name"
                name="name"
                value={formData.name}
                _focus={{ outline: 'none', border: '1px solid black' }}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="md" fontWeight="500">
                Description
              </FormLabel>
              <Textarea
                placeholder="Try describing what does your model do"
                name="description"
                minH="80px"
                maxH="300px"
                resize="none"
                overflow="hidden"
                value={formData.description}
                _focus={{ outline: 'none', border: '1px solid black' }}
                onChange={(e) => {
                  handleInputChange(e);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              />
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
            onClick={handleCreate}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Popup;
