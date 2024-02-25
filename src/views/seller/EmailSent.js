import { Box, Text, Image } from '@chakra-ui/react';
import emailSentSvg from '../../assets/images/svgs/sent-mesage.svg';
import { useEffect } from 'react';
import axiosInstance from 'services/axiosInstance';
import { useSelector } from 'react-redux';

const EmailSentPage = ({ seller }) => {
  const { tokens } = useSelector((state) => state.auth);
  const { businessEmail, _id } = seller;

  const handleSendEmail = async () => {
    try {
      await axiosInstance.post(
        '/seller/send-verification-email',
        { sellerId: _id },
        {
          headers: {
            Authorization: `Bearer ${tokens.access.token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };

  return (
    <Box textAlign="center" mx="auto" mt="150px" w="70%">
      <Image src={emailSentSvg} mx="auto" alt="email-sent-img" width="35%" />

      <Text mb="4">
        An email has been sent to <strong>{businessEmail}</strong>.
      </Text>
      <Text mb="4">Please check your inbox and follow the instructions provided in the email to proceed.</Text>

      <Text as="span">Didn't get email? </Text>
      <Text as="span" role="button" color="#0E5A77" onClick={handleSendEmail} textDecoration="underline">
        Resend Email{' '}
      </Text>
    </Box>
  );
};

export default EmailSentPage;
