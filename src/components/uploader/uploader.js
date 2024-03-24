import { useRef, useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import './uploader.css';

function Uploader(props) {
  const [fileName, setFileName] = useState();
  const [fileSize, setFileSize] = useState('');
  const inputRef = useRef(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize((file.size / 1024).toFixed(2) + ' KB');
      props.handleUpload(file);
    }
  };

  return (
    <main>
      <form className="upload-form" onClick={() => inputRef.current.click()}>
        <input
          ref={inputRef}
          type="file"
          accept={props.isZip ? '.zip' : 'image/*'}
          className="input-field"
          hidden
          onChange={handleChange}
        />
        {fileName ? (
          <span className="upload-text">
            <div>{fileName}</div>
            <div>{fileSize}</div>
          </span>
        ) : (
          <>
            <MdCloudUpload color="gray" size={31} />
            <p>{props.title}</p>
          </>
        )}
      </form>
    </main>
  );
}

export default Uploader;
