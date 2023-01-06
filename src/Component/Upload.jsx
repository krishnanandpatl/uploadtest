import React, { useState } from "react";
import axios from "axios";

function Upload() {
  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
    setFiles(event.target.files);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    let res = await axios.post("https://localhost:7143/api/File", formData);

    console.log(res.data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;
