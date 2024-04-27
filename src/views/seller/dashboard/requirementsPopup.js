import { Modal, ModalHeader, ModalOverlay, ModalContent, ModalBody, ModalFooter, Box, Text, Input } from '@chakra-ui/react';
import ContainedButton from 'components/common/buttons/ContainedButton';
import { useState } from 'react';

const LineInput = ({ name, value, readOnly, placeholder, handleChange }) => {
  return (
    <Input
      name={name}
      type="text"
      readOnly={readOnly}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      _focus={{
        border: 'none',
      }}
      style={{
        border: 'none',
      }}
    />
  );
};

const RequirementsPopup = ({ reqFile, setReqFile, isOpen, onClose }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReqFile({ ...reqFile, [name]: value });
  };

  const isInputEmpty = Object.values(reqFile).some((value) => value === '');

  return (
    <Modal autoFocus={false} isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="#F8F8F8"
        borderRadius="xl"
        boxShadow="0px 4px 24px rgba(0, 0, 0, 0.1)"
        maxW={{ base: '90%', sm: '90%', md: '2xl' }}
        maxH="80vh"
      >
        <ModalHeader fontSize="xl" color="#333" borderBottom="1px solid #E0E0E0">
          Requirements File
        </ModalHeader>
        <ModalBody my="0.7rem" overflowY="auto">
          <Box marginBottom="8px" padding="20px" bg="whitesmoke" borderRadius="lg">
            <Text mb="6px" fontSize="md" color="black" fontWeight="600">
              Example
            </Text>
            <ul>
              <li>FROM nvidia/cuda:11.0-cudnn8-base</li>
              <li>RUN yum install -y python3 python3-pip</li>
              <li>
                COPY ./${'{'}req.file.filename{'}'} /app/
              </li>
              <li>WORKDIR /app/</li>
              <li>
                {' '}
                RUN tar -xvf ${'{'}req.file.filename{'}'} && rm ${'{'}req.file.filename{'}'}
              </li>
              <li>RUN pip install --no-cache-dir -r requirements.txt</li>
              <li>EXPOSE 8080</li>
              <li>ENTRYPOINT ["python3", "api.py"]</li>
            </ul>
          </Box>

          <Box color="blue" borderWidth="1px" borderColor="gray.300" borderRadius="lg" padding="4px">
            <LineInput name="line1" value={reqFile.line1} placeholder="Line 1" handleChange={handleChange} />
            <LineInput name="line2" value={reqFile.line2} placeholder="Line 2" handleChange={handleChange} />
            <LineInput name="line3" value={reqFile.line3} readOnly={true} />
            <LineInput name="line4" value={reqFile.line4} readOnly={true} />
            <LineInput name="line5" value={reqFile.line5} readOnly={true} />
            <LineInput name="line6" value={reqFile.line6} readOnly={true} />
            <LineInput name="line7" value={reqFile.line7} placeholder="Line 7" handleChange={handleChange} />
            <LineInput name="line8" value={reqFile.line8} placeholder="Line 8" handleChange={handleChange} />
          </Box>
          <ModalFooter>
            <ContainedButton
              type="submit"
              extraClasses="mt-1 px-5 py-3 rounded-lg font-semibold bg-inherit leading-[100%] w-full"
              children="Save"
              disabled={isInputEmpty}
              onClick={() => onClose()}
            />
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RequirementsPopup;
