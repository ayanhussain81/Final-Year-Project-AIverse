import { useEffect, useState } from 'react';
import { useFormik } from 'formik'; // Importing useFormik hook
import * as Yup from 'yup'; // Importing Yup for form validation
import {
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react';
import ContainedButton from 'components/common/buttons/ContainedButton';
import axiosInstance from 'services/axiosInstance';
import { useSelector } from 'react-redux';
import Uploader from 'components/uploader/uploader';

const Popup = (props) => {
  const { seller, tokens } = useSelector((state) => state.auth);
  const [uploadedImage, setUploadedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: props.name || '',
      description: props.description || '',
      price: props.price || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      price: Yup.number().required('Required').positive('Price must be positive').integer('Price must be an integer'),
    }),
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        if (props.isEdit) {
          await axiosInstance.put(`/models/update/${props.id}`, {
            name: values.name,
            description: values.description,
            img: uploadedImage,
            price: values.price,
          });
        } else {
          await axiosInstance.post('/models/create', {
            name: values.name,
            description: values.description,
            img: uploadedImage,
            seller: seller._id,
            price: values.price,
          });
        }
        props.getModelsBySeller();
        props.handleClose();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

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
          {props.isEdit ? 'Update Model' : 'Create New Model'}
        </ModalHeader>
        <ModalCloseButton color="#333" />
        <ModalBody my="0.7rem">
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl isInvalid={formik.touched.name && formik.errors.name}>
                <FormLabel fontSize="md" fontWeight="500">
                  Name
                </FormLabel>
                <Input
                  placeholder="Give your model a name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && <FormErrorMessage>{formik.errors.name}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={formik.touched.price && formik.errors.price}>
                <FormLabel fontSize="md" fontWeight="500">
                  Price
                </FormLabel>
                <Input
                  placeholder="Enter monthly price"
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price && <FormErrorMessage>{formik.errors.price}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={formik.touched.description && formik.errors.description}>
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
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.description && formik.errors.description && (
                  <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel fontSize="md" fontWeight="500">
                  Upload Image
                </FormLabel>
                <Uploader
                  title={
                    props.isEdit
                      ? 'Click to browse or drag and drop your updated model image'
                      : 'Click to browse or drag and drop your model image'
                  }
                  handleUpload={handleImageChange}
                />
              </FormControl>
            </Stack>
            <ModalFooter borderTop="1px solid #E0E0E0">
              <ContainedButton
                isLoading={isLoading}
                type="submit"
                disabled={isLoading}
                extraClasses="px-5 py-3 rounded-lg font-semibold bg-inherit leading-[100%] !w-1/4"
                children={props.isEdit ? 'Update' : 'Create'}
              />
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Popup;
