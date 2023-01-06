import React from 'react';
import ReactQuill from 'react-quill';

const Output = (props) => {

  return (
    <ReactQuill value={props.value} readOnly={true} modules={{ toolbar: null }}/>
  );
};

export default Output;