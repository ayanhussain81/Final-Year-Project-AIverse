import { forwardRef, useImperativeHandle } from 'react';
import { useToast } from '@chakra-ui/react';

const Toast = forwardRef((props, ref) => {
  const toast = useToast();

  const showSuccessToast = (description) => {
    toast({
      position: 'top',
      description,
      status: 'success',
      duration: 2000,
      variant: 'subtle',
      isClosable: false,
    });
  };

  const showErrorToast = (description) => {
    toast({
      position: 'top',
      description,
      status: 'error',
      duration: 2000,
      variant: 'subtle',
      isClosable: false,
    });
  };

  useImperativeHandle(ref, () => ({
    showSuccessToast,
    showErrorToast,
  }));

  return null;
});

export default Toast;
