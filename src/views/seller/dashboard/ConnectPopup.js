import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';
import ContainedButton from 'components/common/buttons/ContainedButton';
import axiosInstance from 'services/axiosInstance';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const ConnectPopup = ({ isOpen, onOpen, onClose }) => {
  const { seller, tokens } = useSelector((state) => state.auth);
  const [loader, setLoader] = useState(false);

  const handleConnect = async () => {
    setLoader(true);
    try {
      const response = await axiosInstance.post(
        `/seller/connect-registration`,
        {
          sellerId: seller._id,
        },
        {
          headers: {
            Authorization: `Bearer ${tokens.access.token}`,
          },
        }
      );

      const connectLink = response.data.url;
      window.location.href = connectLink;
    } catch (error) {
      if (error.response) {
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        console.error('Network Error:', error.request);
      } else {
        console.error('Request Error:', error.message);
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading fontSize="lg">Become a Seller on AIVerse</Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody pb={6}>
            <Text pb={4}>
              Before creating your first model, you'll need to register with Stripe Connect to receive payments from buyers.
              This trusted solution ensures secure transactions and seamless payouts directly to your bank account.
            </Text>
            <Button
              fontSize="md"
              disabled={loader}
              isLoading={loader}
              color="#ffffff"
              bg="rgb(34 126 161)"
              fontWeight="700"
              w="100%"
              h="40px"
              onClick={handleConnect}
              _hover={{ bg: 'navy.400' }}
              _disabled={{
                bg: 'navy.50',
                _hover: {
                  bg: 'navy.50',
                },
              }}
            >
              Connect with Stripe Connect
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectPopup;
