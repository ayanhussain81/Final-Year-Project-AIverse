import React, { useRef, useState } from 'react';
import { Box, Stack, StackDivider, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import axiosInstance from 'services/axiosInstance';
import { FaCheck } from 'react-icons/fa';
import Toast from 'shared/toast';

const Password = () => {
  const toast_ref = useRef();
  const { user, tokens } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const passwordSchema = Yup.object().shape({
    password: Yup.string().required('password is required'),
    newPassword: Yup.string().required('new password is required'),
    confirm: Yup.string().required('comfirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirm: '',
    },
    validationSchema: passwordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setLoading(true);
        const response = await axiosInstance.patch(`/users/${user?.id}/updatePassword`, values, {
          headers: {
            Authorization: `Bearer ${tokens.access.token}`,
          },
        });
        console.log('Updated', response.data);
        toast_ref.current.showSuccessToast('Password Updated Successfully');
        resetForm();
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
      <Box as="form" onSubmit={formik.handleSubmit} border="1px solid rgb(227, 232, 239)" maxWidth="740px" borderRadius="lg">
        <div className="px-6 py-6 sm:p-6">
          <Stack divider={<StackDivider />} spacing="5">
            <div className="flex justify-between items-center">
              <span className="text-550 font-semibold">Change Password</span>
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

            <Stack spacing="4" className="flex-col justify-between items-center">
              <FormControl id="password">
                <FormLabel>Current Password</FormLabel>
                <Input
                  isRequired={true}
                  borderRadius="xl"
                  placeholder="Enter current password"
                  _focus={{ borderColor: '#227EA1' }}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && <Box color="red">{formik.errors.password}</Box>}
              </FormControl>
              <FormControl id="newPassword">
                <FormLabel>New Password</FormLabel>
                <Input
                  isRequired={true}
                  borderRadius="xl"
                  placeholder="Enter new password"
                  _focus={{ borderColor: '#227EA1' }}
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.newPassword && <Box color="red">{formik.errors.newPassword}</Box>}
              </FormControl>
              <FormControl id="confirm">
                <FormLabel>Confrim New Password</FormLabel>
                <Input
                  isRequired={true}
                  borderRadius="xl"
                  placeholder="Enter new password"
                  _focus={{ borderColor: '#227EA1' }}
                  name="confirm"
                  value={formik.values.confirm}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirm && <Box color="red">{formik.errors.confirm}</Box>}
              </FormControl>
            </Stack>
          </Stack>
        </div>
      </Box>
    </>
  );
};

export default Password;
