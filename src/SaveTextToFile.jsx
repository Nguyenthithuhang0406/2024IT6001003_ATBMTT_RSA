/* eslint-disable */
import React, { useState, useRef } from "react";
import FileSaver from "file-saver";

const SaveTextToFile = ({ content, filename = "vidu.txt" }) => {
  const handleSave = () => {
    const blob = new Blob([content], { type: "text/plain" });

    FileSaver.saveAs(blob, filename);
  };

  return <button onClick={handleSave}>Lưu</button>;
};

export default SaveTextToFile;
