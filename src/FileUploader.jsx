/* eslint-disable */
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ title, onFileChange }) => {

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      onFileChange(event.target.result);
    };
    reader.readAsText(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <button {...getRootProps()}>
      {title}
      <input {...getInputProps()} />
    </button>
  );
};

export default FileUploader;