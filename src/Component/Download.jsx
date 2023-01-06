import React, { useState, useEffect } from "react";
import axios from "axios";

function Download(props) {
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    async function fetchFile() {
      try {
        const response = await axios.get(
          `https://localhost:7143/api/File/${props.storedFileName}`,
          {
            responseType: "blob",
          }
        );
        setFileData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchFile();
  }, [props.storedFileName]);

  function handleDownload() {
    if (!fileData) {
      return;
    }

    const url = window.URL.createObjectURL(fileData);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = props.fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return <button onClick={handleDownload}>Download</button>;
}

export default Download;
