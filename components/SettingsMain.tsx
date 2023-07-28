'use client'

import { ChangeEvent, useState } from "react";
import Image from "next/image";

const SettingsMain = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<any>();
  const [filename, setFilename] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState(""); // State to store the local preview URL

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput.files) {
      const selectedFile = fileInput.files[0];
      setFile(selectedFile);
      setFilename(selectedFile.name);

      // Preview the image locally using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "uploadHere");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dmvuenhhc/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`failed on the api fetch`);
        }

        const data = await response.json();
        setImageUrl(data.secure_url);
        console.log(data);
      } catch (err) {
        throw new Error(`error on cloudinary api`);
      }
    } catch (err) {
      throw new Error(`handle submit failed : ${err}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      {previewImageUrl && <Image src={previewImageUrl} alt="image" width={26} height={26} />}
      {imageUrl && <Image src={imageUrl} alt="image" width={26} height={26} />}
    </form>
  );
};

export default SettingsMain;
