import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import VideoPlayer from "../components/VideoPlayer";
import "./messages.css";

const Message = ({
  sender,
  messages,
  time,
  file,
  type,
  setPinnedMessages,
  pinnedMessages,
}) => {
  const user = useSelector((state) => state.user);
  const [imgUrl, setImgUrl] = useState();
  const [messagesState, setMesagesState] = useState(messages);
  const messageRef = useRef();
  const dateTime = new Date(time);
  // Extract hours, minutes, and seconds
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  // Format in 12-hour time with AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12
  const formattedTime = `${formattedHours}:${String(minutes).padStart(
    2,
    "0"
  )} ${ampm}`;

  let isSender = false;
  if (sender._id === user.id) isSender = true;
  //useEffect to fetch the images from backend on load and preview them
  useEffect(() => {
    const fetchImages = async () => {
      if (type === "image" || type === "video") {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}api/chats/messages/download`,
            {
              path: file.path,
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
      }
    };
    fetchImages();
  }, []);

  const downloadAttachmentHandler = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/chats/messages/download`,
        {
          path: file.path,
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
      const a = document.createElement("a");
      a.href = url;
      a.download = file.originalname;

      // Append the link to the document
      document.body.appendChild(a);

      // Programmatically click the link to trigger the download
      a.click();

      // Remove the link from the document
      document.body.removeChild(a);
    } catch (error) {
      console.log(error);
    }
  };

  const updateMessage = async (msg, id) => {
    //call the update api
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}api/chats/messages/${id}`,
        {
          content: msg,
        }
      );
      // change in messages state
      setMesagesState((prev) => {
        return { ...prev, content: msg };
      });

      //change  in pinned messages
      setPinnedMessages((prev) => {
        return prev.map((messages) => {
          if (messages._id === id) {
            return { ...messages, _id: id, content: msg };
          }
          return messages;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = async (id) => {
    try {
      let previousValue = messagesState.content;
      const inputElement = document.createElement("input");
      inputElement.type = "text";
      inputElement.style.backgroundColor = "transparent";
      inputElement.style.outline = "none";
      inputElement.value = messagesState.content;
      inputElement.ref = messageRef;
      // Function to replace the input element with a p element
      function replaceWithParagraph(value) {
        const pElement = document.createElement("p");
        pElement.textContent = value;
        pElement.style.margin = 0;
        // Replace the input with the p element
        container.innerHTML = "";
        container.appendChild(pElement);
      }

      inputElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          updateMessage(inputElement.value, id);
          previousValue = inputElement.value;
          inputElement.blur();
        }
      });
      // Add event listener for the blur event
      inputElement.addEventListener("blur", function () {
        if (document.activeElement !== inputElement) {
          // If not, set the input value back to the previous value
          inputElement.value = previousValue;
          // console.log(inputElement.value);
          replaceWithParagraph(previousValue);
        }
      });

      const container = document.getElementById(`${id}`);
      container.innerHTML = "";
      container.appendChild(inputElement);
      inputElement.focus();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/chats/messages/delete`,
        { id: id }
      );
      document.getElementById(id).remove();
    } catch (error) {
      console.log(error);
    }
  };

  const pinMessage = async (id) => {
    try {
      //api call to pin message
      let isPinned = !messagesState.isPinned;
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}api/chats/messages/pin/${id}`,
        { isPinned: isPinned }
      );
      setMesagesState((prev) => {
        return { ...prev, isPinned: isPinned };
      });
      if (!isPinned) {
        console.log("unpinned");
        console.log(id);
        setPinnedMessages((prev) =>
          prev.filter((message) => message._id !== id)
        );
        console.log(pinnedMessages);
      }
      if (isPinned) {
        setPinnedMessages((prev) => [
          ...prev,
          { ...messagesState, time: formattedTime, isPinned: isPinned },
        ]);
        console.log(pinnedMessages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // if (sender._id === user.id) {
  return (
    <div className="position-relative ">
      <div
        id={messagesState._id}
        className={`px-2 message my-2 ${
          isSender ? "loggedUser" : "otherUsers"
        }`}
        data-bs-target={`#a${messages._id}`}
        data-bs-toggle="collapse"
        aria-expanded="true"
      >
        <div style={{ position: "absolute", left: "10px", marginTop: "28px" }}>
          <div className={`collapse bg-light `} id={`a${messages._id}`}>
            <ul className="p-0" aria-labelledby="editting">
              {type === "text" && (
                <li
                  className="d-flex dropdown-item icon-primary justify-content-around py-1"
                  onClick={() => {
                    editHandler(messages._id);
                  }}
                >
                  <MdEdit size={25} />
                  Edit
                </li>
              )}
              <li
                className="d-flex dropdown-item icon-primary justify-content-around py-1"
                onClick={() => pinMessage(messages._id)}
              >
                <BsPinAngle size={25} />
                {messagesState.isPinned === false ? "Pin" : "Unpin"}
              </li>
              <li
                className="d-flex dropdown-item icon-primary justify-content-around py-1"
                onClick={() => {
                  deleteHandler(messages._id);
                }}
              >
                <RiDeleteBin6Line size={25} />
                Delete
              </li>
            </ul>
          </div>
        </div>

        <div className="messageContainer">
          {!isSender && <span className="name">{sender.name}</span>}
          {type === "file" && (
            <a className="attachment" onClick={downloadAttachmentHandler}>
              {file.originalname}
            </a>
          )}
          {type === "image" && (
            <img
              src={imgUrl}
              className="chatImages"
              onClick={downloadAttachmentHandler}
            />
          )}
          {type === "video" && <VideoPlayer videoId={file.path.slice(8)} />}
          <p className="text-break" id={`b${messages._id}`}>
            {messagesState.content}
          </p>
        </div>
        <p className="time">
          {formattedTime}
          {messagesState.isPinned && (
            <BsPinAngleFill size={15} className="pinIcon" />
          )}
        </p>
      </div>
    </div>
  );
  // } else {
  //   return (
  //     <>
  //       <div
  //         className={`reciever px-2 message my-2  otherUsers`}
  //         id="editting"
  //         data-bs-toggle="dropdown"
  //         aria-expanded="false"
  //       >
  //         <div>
  //           <span className="name">{sender.name}</span>
  //           {/* {type === "text" && (
  //             <a className="attachment" onClick={downloadAttachmentHandler}>
  //               {file.originalname}
  //             </a>
  //           )} */}
  //           {type === "image" && (
  //             <img
  //               src={imgUrl}
  //               className="chatImages"
  //               onClick={downloadAttachmentHandler}
  //             />
  //           )}
  //           <p id="editting">{messages.content}</p>
  //         </div>
  //         {/* <ul className="dropdown-menu p-0" aria-labelledby="editting">
  //           <li className="d-flex dropdown-item icon-primary justify-content-around py-1">
  //             <MdEdit size={25} />
  //             Edit
  //           </li>
  //           <li className="d-flex dropdown-item icon-primary justify-content-around py-1">
  //             <BsPinAngle size={25} onClick={() => pinMessage()} />
  //             Pin
  //           </li>
  //           <li className="d-flex dropdown-item icon-primary justify-content-around py-1">
  //             <RiDeleteBin6Line size={25} />
  //             Delete
  //           </li>
  //         </ul> */}
  //         <p className="time other">{formattedTime}</p>
  //       </div>
  //     </>
  //   );
  // }
};

export default Message;
