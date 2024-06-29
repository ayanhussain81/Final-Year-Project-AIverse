import { Modal, ModalHeader, ModalOverlay, ModalContent, ModalFooter } from '@chakra-ui/react';
import OutlinedButton from 'components/common/buttons/OutlinedButton';
import Toast from 'shared/toast';

const ConfirmationPopup = (props) => {
  return (
    <Modal autoFocus={false} isOpen={props.showModal} onClose={props.handleClose} onConfirm={props.onConfirm} isCentered>
      <Toast ref={props.ref} />
      <ModalOverlay />
      <ModalContent
        bg="#F8F8F8"
        borderRadius="xl"
        boxShadow="0px 4px 24px rgba(0, 0, 0, 0.1)"
        maxW={{ base: '90%', sm: '90%', md: 'md' }}
      >
        <ModalHeader fontSize="lg" color="#333" borderBottom="1px solid #E0E0E0">
          {props.message}
        </ModalHeader>

        <ModalFooter justifyContent="center" gap={4}>
          <OutlinedButton
            extraClasses="px-4 py-2 rounded-lg font-semibold bg-inherit leading-[100%] !w-1/4"
            children="Yes"
            onClick={props.handleConfirmation}
          />
          <OutlinedButton
            extraClasses="px-4 py-2 rounded-lg font-semibold bg-inherit leading-[100%] !w-1/4"
            onClick={props.handleClose}
            children="No"
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationPopup;
