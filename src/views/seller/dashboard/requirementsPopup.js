import { Modal, ModalHeader, ModalOverlay, ModalContent, ModalBody, ModalFooter, Box, Text, Input, Icon, Flex } from '@chakra-ui/react';
import ContainedButton from 'components/common/buttons/ContainedButton';
import { useState } from 'react';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { RiIndeterminateCircleFill } from "react-icons/ri";

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
  const handleChange = (e, index) => {
    const { value } = e.target;
    reqFile[index]['content'] = value
    setReqFile([...reqFile]);
  };

  const onAddNewLine = (index) => {
    let reqLines = [...reqFile];
    reqLines.splice(index + 1, 0, { content: '' })
    setReqFile([...reqLines]);

  }
  const onRemoveLine = (index) => {
    let reqLines = [...reqFile];
    reqLines = reqLines.filter((line, lineIdx) => lineIdx !== index)
    setReqFile([...reqLines]);

  }

  const isInputEmpty = reqFile.some((value) => value.content === '');

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
            {
              reqFile.map((line, lineIndex) => {
                return (
                  <Flex>
                    <LineInput name={`line${lineIndex + 1}`} placeholder={`Line ${lineIndex + 1}`} value={line.content} readOnly={line.readOnly} handleChange={(e) => handleChange(e, lineIndex)} />
                    <Flex justifyContent={'center'} alignItems={'center'} gap={'2'} mr={'2'} ml={'2'}>
                      <button disabled={line.disable && line.readOnly} onClick={() => onAddNewLine(lineIndex)}>
                        <BsFillPlusCircleFill fontSize={'15'} color='rgb(34 126 161)' />
                      </button>
                      <button disabled={line.readOnly || lineIndex == 0} onClick={() => onRemoveLine(lineIndex)}>
                        <RiIndeterminateCircleFill fontSize={'18'} color='red' />
                      </button>
                    </Flex>
                  </Flex>
                )
              })
            }
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
