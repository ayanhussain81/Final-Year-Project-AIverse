import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from 'services/axiosInstance';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, purchaseId }) => {
  const { user: userState, tokens } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.post(
        '/users/cancel-subscription',
        { purchaseId },
        {
          headers: {
            Authorization: `Bearer ${tokens.access.token}`,
          },
        }
      );
      onConfirm();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to delete this model? This action will also cancel your subscription instantly and prorate
            your remaining balance.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} isLoading={isLoading} onClick={handleConfirm}>
            Yes, delete it
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
