import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Output from './Output';

const MyQuillEditor = (props) => {
  const [value, setValue] = React.useState('');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <ReactQuill value={value} onChange={handleChange} />
    <Output value={value}></Output>
    </>
  );
};

export default MyQuillEditor;