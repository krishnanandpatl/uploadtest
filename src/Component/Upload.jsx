import React, { useEffect, useState } from "react";
import axios from "axios";
import Download from "./Download";

function Upload() {
  const [files, setFiles] = useState([]);
  const [data, setData] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (event) => {
    setFiles(event.target.files);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const config = {
      onUploadProgress: (event) => {
        setUploadProgress((event.loaded / event.total) * 100);
      },
    };

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    let res = await axios.post(
      "https://localhost:7143/api/File",
      formData,
      config
    );

    console.log(res.data);
  };
  useEffect(() => {
    (async () => {
      let resp = await axios.get("https://localhost:7143/api/File");
      if (resp.status === 200) {
        setData(resp.data);
      }
    })();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
      <div>{uploadProgress}%</div>
      <div>
        {data === undefined ? (
          <p>Empty</p>
        ) : (
          <>
            {data.map(function (data) {
              return (
                <div key={data.id}>
                  <div>{data.fileName}</div>
                  <Download storedFileName={data.storedFileName} fileName={data.fileName}></Download>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default Upload;
