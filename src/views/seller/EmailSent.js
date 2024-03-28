import { Box, Text, Image, Spinner } from '@chakra-ui/react';
import emailSentSvg from '../../assets/images/svgs/sent-mesage.svg';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from 'services/axiosInstance';
import { useSelector } from 'react-redux';
import Toast from 'shared/toast';
import { Button } from 'react-scroll';

const EmailSentPage = ({ seller }) => {
  const { tokens } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { businessEmail, _id } = seller;
  const toastRef = useRef(null);

  const handleSendEmail = async () => {
    try {
      setLoading(true);
      await axiosInstance.post(
        '/seller/send-verification-email',
        { sellerId: _id },
        {
          headers: {
            Authorization: `Bearer ${tokens.access.token}`,
          },
        }
      );
      toastRef.current.showSuccessToast('Email Sent Successfully!');
    } catch (error) {
      console.error('Error sending verification email:', error);
      toastRef.current.showErrorToast('Oops! Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast ref={toastRef} />
      <Box textAlign="center" mx="auto" mt="150px" w="70%">
        <Image src={emailSentSvg} mx="auto" alt="email-sent-img" width="35%" />

        <Text mb="4">
          An email has been sent to <strong>{businessEmail}</strong>.
        </Text>
        <Text mb="4">Please check your inbox and follow the instructions provided in the email to proceed.</Text>

        <Text as="span">Didn't get email? </Text>
        <Text
          as="span"
          role="button"
          color="#0E5A77"
          onClick={loading ? () => {} : handleSendEmail}
          textDecoration="underline"
        >
          Resend Email
        </Text>
        {loading && <Spinner size="xs" ms="1" color="#0E5A77" />}
      </Box>
    </>
  );
};

export default EmailSentPage;
