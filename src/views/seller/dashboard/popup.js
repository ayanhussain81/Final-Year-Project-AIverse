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
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import ContainedButton from 'components/common/buttons/ContainedButton';
import axiosInstance from 'services/axiosInstance';
import { useSelector } from 'react-redux';

const Popup = (props) => {
  const { seller, tokens } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setUploadedImage(null);
    }
  };

  const handleCreate = async () => {
    try {
      await axiosInstance.post('/models/create', {
        name: formData.name,
        description: formData.description,
        img: uploadedImage,
        owner: seller._id,
      });
      props.getModelsBySeller();
    } catch (error) {
      console.log(error);
    }
    props.handleClose();
  };

  return (
    <Modal autoFocus={false} isOpen={props.showModal} onClose={props.handleClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="#F8F8F8"
        borderRadius="xl"
        boxShadow="0px 4px 24px rgba(0, 0, 0, 0.1)"
        maxW={{ base: '90%', sm: '90%', md: '2xl' }}
      >
        <ModalHeader fontSize="xl" color="#333" borderBottom="1px solid #E0E0E0">
          Create New Model
        </ModalHeader>
        <ModalCloseButton color="#333" />
        <ModalBody my="0.7rem">
          <Stack spacing={4}>
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
                minH="60px"
                maxH="100px"
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
            <FormControl>
              <FormLabel fontSize="md" fontWeight="500">
                Upload Image
              </FormLabel>
              <Input
                paddingTop="5px"
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files[0])}
              />
            </FormControl>
            <Box display="flex" justifyContent="center">
              {uploadedImage && <img src={uploadedImage} alt="Uploaded" style={{ maxHeight: '100px' }} />}
            </Box>
          </Stack>
        </ModalBody>
        <ModalFooter borderTop="1px solid #E0E0E0">
          <ContainedButton
            type="button"
            extraClasses="px-5 py-3 rounded-lg font-semibold bg-inherit leading-[100%]"
            children="Create"
            onClick={handleCreate}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Popup;
