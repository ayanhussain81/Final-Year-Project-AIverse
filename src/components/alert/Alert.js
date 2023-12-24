import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import React from 'react';

const AlertComponent = ({ desc, title, status }) => {
  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{desc}</AlertDescription>
    </Alert>
  );
};

export default AlertComponent;
