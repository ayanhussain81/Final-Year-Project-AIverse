import { Box, FormControl, FormLabel, Select, Stack, Textarea } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from 'services/axiosInstance';
import ContainedButton from 'components/common/buttons/ContainedButton';
import { FaCheck } from 'react-icons/fa6';
import Toast from 'shared/toast';

const Configure = (props) => {
  const toast_ref = useRef();
  const [formData, setFormData] = useState({
    category: '',
    usecase: '',
    description: '',
  });
  const [modelTypes, setModelTypes] = useState([]);
  const [useCases, setUseCases] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getModelTypes = async () => {
    try {
      const response = await axiosInstance.get('/models/categories');
      console.log(response.data.categories);
      setModelTypes(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const getModelUsecases = async () => {
    try {
      const response = await axiosInstance.get('/models/usecases');
      setUseCases(response.data.usecases);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/models/update/${props.id}`, {
        category: formData.category,
        usecase: formData.usecase,
        description: formData.description,
      });
      setFormData({
        category: '',
        usecase: '',
        description: '',
      });
      toast_ref.current.showSuccessToast('Successfully saved');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getModelTypes();
    getModelUsecases();
  }, []);

  return (
    <>
      <Toast ref={toast_ref} />
      <Box
        margin="60px"
        mt="27px"
        padding="40px"
        bg="whitesmoke"
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        borderRadius="10px"
      >
        <Stack spacing="6">
          <FormControl isRequired>
            <FormLabel fontSize="md" fontWeight="600">
              Category
            </FormLabel>
            <Select
              placeholder="Select category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              bg="#FFF"
            >
              {modelTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize="md" fontWeight="600">
              Usecase
            </FormLabel>
            <Select
              placeholder="Select usecase"
              name="usecase"
              value={formData.usecase}
              onChange={handleInputChange}
              bg="#FFF"
            >
              {useCases.map((usecase, index) => (
                <option key={index} value={usecase}>
                  {usecase}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize="md" fontWeight="600">
              Description
            </FormLabel>
            <Textarea
              placeholder="Try describing what does your model do"
              name="description"
              minH="180px"
              maxH="180px"
              resize="none"
              overflow="hidden"
              value={formData.description}
              _focus={{ outline: 'none', border: '1px solid black' }}
              bg="#FFF"
              onChange={(e) => {
                handleInputChange(e);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
          </FormControl>
        </Stack>
        <ContainedButton
          type="button"
          extraClasses="px-2 mt-5 py-2 font-semibold bg-inherit"
          icon={FaCheck}
          iconSize={16}
          children="Save Changes"
          onClick={() => handleUpdate()}
        />
      </Box>
    </>
  );
};

export default Configure;
