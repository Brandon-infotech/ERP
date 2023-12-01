import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import VideoPlayer from "../VideoPlayer";
import { BsPinAngleFill } from "react-icons/bs";
const MessageBox = ({ msg, setPinnedMessages }) => {
  const user = useSelector((state) => state.user);
  const [messagesState, setMessagesState] = useState(msg);
  const [imgUrl, setImgUrl] = useState();
  const [showMessageOptions, setShowMessageOptions] = useState(false);
  const messageRef = useRef();
  const dateTime = new Date(msg.updatedAt);
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
  useEffect(() => {
    const fetchImages = async () => {
      if (msg.messageType === "image" || msg.messageType === "video") {
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}api/chats/messages/download`,
            {
              path: msg.file.path,
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
          path: msg.file.path,
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
      a.download = msg.file.originalname;

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
      setMessagesState((prev) => {
        return { ...prev, content: msg };
      });

      //change  in pinned messages
      // setPinnedMessages((prev) => {
      //   return prev.map((messages) => {
      //     if (messages._id === id) {
      //       return { ...messages, _id: id, content: msg };
      //     }
      //     return messages;
      //   });
      // });
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

      const container = document.getElementById(`p-${id}`);
      console.log(container);
      container.innerHTML = "";
      container.appendChild(inputElement);
      inputElement.focus();
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
      setMessagesState((prev) => {
        return { ...prev, isPinned: isPinned };
      });
      if (!isPinned) {
        console.log("unpinned");
        console.log(id);
        setPinnedMessages((prev) =>
          prev.filter((message) => message._id !== id)
        );
        // console.log(pinnedMessages);
      }
      if (isPinned) {
        setPinnedMessages((prev) => [
          ...prev,
          // { ...messagesState, time: formattedTime, isPinned: isPinned },
          { ...messagesState, isPinned: isPinned },
        ]);
        // console.log(pinnedMessages);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <li
      id={msg._id}
      className={`${msg.sender._id === user.id ? "right" : "left"}`}
    >
      <div className="conversation-list">
        <div className="chat-avatar">
          <img src={msg.sender.profilePhoto} alt="pfp" />
        </div>

        <div className="user-chat-content">
          <div className="ctext-wrap">
            <div className="ctext-wrap-content" id={`b${msg._id}`}>
              <p className="mb-1 text-break text-wrap" id={`p-${msg._id}`}>
                {msg.messageType === "text" && msg.content}
              </p>
              {msg.messageType === "image" && (
                <ul className="list-inline message-img  mb-0">
                  <li className="list-inline-item message-img-list me-2 ms-0">
                    <div>
                      <img src={imgUrl} alt="ok" className="rounded border" />
                    </div>
                    <div className="message-img-link">
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={downloadAttachmentHandler}
                          >
                            <i className="ri-download-2-line"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              )}
              {msg.messageType === "video" && (
                <VideoPlayer videoId={msg.file.path.slice(8)} />
              )}
              {msg.messageType === "file" && (
                <a className="attachment" onClick={downloadAttachmentHandler}>
                  {msg.file.originalname}
                </a>
              )}
              <p className="chat-time mb-0">
                <i className="ri-time-line align-middle"></i>
                <span className="align-middle">{formattedTime}</span>
                {messagesState.isPinned && (
                  <BsPinAngleFill size={15} className="pinIcon" />
                )}
              </p>
            </div>
            {/* dropdown */}
            <div className="dropdown align-self-start">
              <a
                id="dropdownMenuButton1"
                onClick={() => {
                  setShowMessageOptions(!showMessageOptions);
                }}
                className={`dropdown-toggle ${showMessageOptions && "show"}`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* <i className="ri-more-2-fill"></i> */}
              </a>
              <ul
                className={`dropdown-menu ${showMessageOptions && "show"}`}
                aria-labelledby="dropdownMenuButton1"
              >
                <a
                  className="dropdown-item"
                  onClick={() => {
                    pinMessage(msg._id);
                  }}
                >
                  {messagesState.isPinned ? "Unpin" : "Pin"}
                  <i className="ri-map-pin-3-line float-end text-muted"></i>
                </a>
                {messagesState.messageType === "text" && (
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      editHandler(msg._id);
                    }}
                  >
                    Edit
                    <i className="ri-chat-forward-line float-end text-muted"></i>
                  </a>
                )}

                <a
                  className="dropdown-item"
                  onClick={() => {
                    deleteHandler(msg._id);
                  }}
                >
                  Delete
                  <i className="ri-delete-bin-line float-end text-muted"></i>
                </a>
              </ul>
            </div>
          </div>

          <div className="conversation-name">{msg.sender.name}</div>
        </div>
      </div>
    </li>
  );
};

export default MessageBox;
