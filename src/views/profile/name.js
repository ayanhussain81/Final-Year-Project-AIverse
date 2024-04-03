import React, { useRef, useState } from 'react';
import { Box, Stack, StackDivider, Button, Avatar, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import axiosInstance from 'services/axiosInstance';
import { FaCheck } from 'react-icons/fa';
import Toast from 'shared/toast';
import { updateUser } from '../../redux/actions/auth';

const Name = () => {
  const toast_ref = useRef();
  const dispatch = useDispatch();
  const { user, tokens, seller } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const nameSchema = Yup.object().shape({
    name: Yup.string().required('Username is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: user.name,
    },
    validationSchema: nameSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setLoading(true);
        const response = await axiosInstance.patch(`/users/${user?.id}`, values, {
          headers: {
            Authorization: `Bearer ${tokens.access.token}`,
          },
        });
        console.log('Updated', response.data);
        dispatch(updateUser({ user: { ...user, name: values.name }, seller }));
        toast_ref.current.showSuccessToast('Name Updated Successfully');
      } catch (error) {
        toast_ref.current.showErrorToast(error.response?.data?.message);
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Toast ref={toast_ref} />
      <Box
        as="form"
        onSubmit={formik.handleSubmit}
        border="1px solid rgb(227, 232, 239)"
        maxWidth="740px"
        borderRadius="lg"
        marginBottom="32px"
      >
        <div className="px-6 py-6 sm:p-6">
          <Stack divider={<StackDivider />} spacing="5">
            <div className="flex justify-between items-center">
              <span className="text-550 font-semibold">Personal Details</span>
              <Button
                type="submit"
                bg="#227EA1"
                color="white"
                _hover={{ bg: '#0E5A77' }}
                _active={{ bg: '#0E5A77' }}
                disabled={loading}
                isLoading={loading}
                borderRadius="lg"
                leftIcon={!loading && <FaCheck size="14" style={{ marginRight: '2px' }} />}
              >
                Save
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span className="text-md ">Profile Picture </span>
                <Avatar
                  color="white"
                  name={user ? user?.name : 'user'}
                  bg="rgb(34 126 161 / 0.9)"
                  size="lg"
                  w="100px"
                  h="100px"
                  marginTop="7px"
                />
              </div>
              <FormControl id="name">
                <FormLabel>Username</FormLabel>
                <Input
                  isRequired={true}
                  borderRadius="xl"
                  placeholder="Enter username"
                  _focus={{ borderColor: '#227EA1' }}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && <Box color="red">{formik.errors.name}</Box>}
              </FormControl>
            </div>
          </Stack>
        </div>
      </Box>
    </>
  );
};

export default Name;
