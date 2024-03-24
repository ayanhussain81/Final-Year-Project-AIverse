import React, { useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Box } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa6';
import ContainedButton from 'components/common/buttons/ContainedButton';
import axiosInstance from 'services/axiosInstance';
import Toast from 'shared/toast';

const TextEditor = (props) => {
  const toast_ref = useRef();
  const [documentation, setDocumentation] = useState('');

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/models/update/${props.id}`, {
        documentation: documentation,
      });
      setDocumentation('');
      toast_ref.current.showSuccessToast('Successfully saved');
    } catch (error) {
      console.log(error);
    }
  };

  var modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['image'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
    ],
  };

  var formats = ['header', 'height', 'bold', 'italic', 'underline', 'list', 'bullet', 'indent', 'image', 'align', 'size'];

  const handleContentChange = (content) => {
    setDocumentation(content);
  };

  return (
    <>
      <Toast ref={toast_ref} />
      <Box margin="60px" mt="27px">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="Write your documentation"
          onChange={handleContentChange}
          style={{ height: '450px', background: 'white' }}
        ></ReactQuill>
        <ContainedButton
          type="button"
          extraClasses="px-2 mt-5 py-3 font-semibold bg-inherit leading-[100%]"
          icon={FaCheck}
          iconSize={17}
          children="Save Changes"
          onClick={() => handleUpdate()}
        />
      </Box>
    </>
  );
};

export default TextEditor;
