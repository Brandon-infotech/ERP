import axios from "axios";
import React, { useEffect, useState } from "react";

const ImageViewer = ({ path }) => {
  const [imgUrl, setImgUrl] = useState("");
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}api/chats/messages/download`,
          {
            //   path: msg.file.path,
            path: path,
          },
          { responseType: "blob" }
        );

        // Assuming the binary data is stored in a variable named pdfBinaryData
        const pdfBinaryData = res.data;
        // console.log(pdfBinaryData);
        // Create a Blob from the binary data
        const blob = new Blob([pdfBinaryData], { type: "application/pdf" });

        // Create a download link
        const url = window.URL.createObjectURL(blob);
        setImgUrl(url);
        // console.log(imgUrl);
      } catch (error) {
        console.log(error);
      }
    };
    fetchImages();
    console.log(imgUrl);
  }, []);
  return <img src={imgUrl} alt="imgaaa"></img>;
};

export default ImageViewer;
