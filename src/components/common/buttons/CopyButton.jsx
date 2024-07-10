import { useState } from 'react';
import { Button, useClipboard, Tooltip, Icon } from '@chakra-ui/react';
import { MdContentCopy } from 'react-icons/md';

export const CopyApiKeyButton = ({ apiKey, theme, title }) => {
  const { hasCopied, onCopy } = useClipboard(apiKey);

  const handleCopy = () => {
    onCopy();
  };

  return (
    <Button
      onClick={handleCopy}
      size="sm"
      px="1.3rem"
      variant="action"
      leftIcon={!hasCopied && <Icon as={MdContentCopy} />}
      _focus={{ outline: 'none' }}
    >
      {hasCopied ? 'Copied!' : title}
    </Button>
  );
};
