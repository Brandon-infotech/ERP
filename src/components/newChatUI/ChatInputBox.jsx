import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BsCamera, BsFolder2 } from "react-icons/bs";
import { HiOutlineVideoCamera } from "react-icons/hi";

const ChatInputBox = ({ sendMessage, chat, socket }) => {
  const user = useSelector((state) => state.user);
  const [newMessage, setNewMessage] = useState("");
  const [messageType, setMessageType] = useState("text");
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState();
  const [imageUrl, setImageUrl] = useState();
  const messageSendHandler = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("sender", user.id);
    payload.append("content", newMessage);
    payload.append("file", file);
    payload.append("status", "sent");
    payload.append("messageType", messageType);
    payload.append("chat", chat._id);

    try {
      if (file) setMessageType("file");

      if (messageType === "text" && newMessage === "")
        return alert("please type message");

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/chats/messages`,
        payload
      );
      socket.emit("new message", data);
      sendMessage(data.messages);
      // setMessage((prev) => [...prev, data.messages]);
      setFile(null);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {file && (
        <div className="selected-file">
          {messageType === "image" && (
            <img src={imageUrl} className="previewImgSend"></img>
          )}
          {messageType === "file" ? file.name.slice(0, 30) : ""}
          {messageType === "video" && (
            <video width="320" height="240" controls>
              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          )}
          <button
            type="button"
            class="btn btn-danger m-0 p-1 ms-1"
            onClick={() => {
              setFile(null);
              setMessageType("text");
            }}
          >
            X
          </button>
        </div>
      )}
      <form
        encType="multipart/form-data"
        onSubmit={messageSendHandler}
        class="chat-input-section p-3 p-lg-4 border-top mb-0"
      >
        <div class="row g-0">
          <div class="col">
            <input
              type="text"
              value={newMessage}
              class="form-control form-control-lg bg-light border-light"
              placeholder="Enter Message..."
              onChange={(e) => setNewMessage(e.target.value)}
            />
          </div>
          <div class="col-auto">
            <div class="chat-input-links ms-md-2 me-md-0">
              <ul class="list-inline mb-0">
                <ul className="dropdown-menu py-0 px-0 ">
                  <li className="dropdown-item py-0 my-0">
                    <input
                      name="file"
                      type="file"
                      id="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setMessageType("file");
                      }}
                      hidden
                    />
                    <label
                      htmlFor="file"
                      className="icon-primary d-flex gap-5 py-2 "
                    >
                      <BsFolder2 size={25} />
                      File
                    </label>
                  </li>
                  <li className="dropdown-item py-0 my-0">
                    <input
                      type="file"
                      id="video-file"
                      accept="video/*"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setMessageType("video");
                        setVideoUrl(URL.createObjectURL(e.target.files[0]));
                      }}
                      hidden
                    />
                    <label
                      htmlFor="video-file"
                      className="icon-primary d-flex gap-5  py-2 "
                    >
                      <HiOutlineVideoCamera size={25} />
                      Video
                    </label>
                  </li>
                  <li className="dropdown-item py-0 my-0">
                    <input
                      type="file"
                      id="image-file"
                      accept="image/*"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setMessageType("image");
                        console.log(URL.createObjectURL(e.target.files[0]));
                        setImageUrl(URL.createObjectURL(e.target.files[0]));
                      }}
                      hidden
                    />
                    <label
                      htmlFor="image-file"
                      className="icon-primary d-flex gap-5 py-2  "
                    >
                      <BsCamera size={22} />
                      Image
                    </label>
                  </li>
                </ul>

                <li
                  class="list-inline-item"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Attached File"
                >
                  <button
                    type="button"
                    class="btn btn-link text-decoration-none font-size-16 btn-lg waves-effect dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="ri-attachment-line"></i>
                  </button>
                  <ul className="dropdown-menu py-0 px-0 ">
                    <li className="dropdown-item py-0 my-0">
                      <input
                        name="file"
                        type="file"
                        id="file"
                        accept="application/pdf"
                        // onChange={(e) => {
                        //   setFile(e.target.files[0]);
                        //   setMessageType("file");
                        // }}
                        hidden
                      />
                      <label
                        htmlFor="file"
                        className="icon-primary d-flex gap-5 py-2 "
                      >
                        <BsFolder2 size={25} />
                        File
                      </label>
                    </li>
                    <li className="dropdown-item py-0 my-0">
                      <input
                        type="file"
                        id="video-file"
                        accept="video/*"
                        // onChange={(e) => {
                        //   setFile(e.target.files[0]);
                        //   setMessageType("video");
                        //   setVideoUrl(URL.createObjectURL(e.target.files[0]));
                        // }}
                        hidden
                      />
                      <label
                        htmlFor="video-file"
                        className="icon-primary d-flex gap-5  py-2 "
                      >
                        <HiOutlineVideoCamera size={25} />
                        Video
                      </label>
                    </li>
                    <li className="dropdown-item py-0 my-0">
                      <input
                        type="file"
                        id="image-file"
                        accept="image/*"
                        // onChange={(e) => {
                        //   setFile(e.target.files[0]);
                        //   setMessageType("image");
                        //   console.log(URL.createObjectURL(e.target.files[0]));
                        //   setImageUrl(URL.createObjectURL(e.target.files[0]));
                        // }}
                        hidden
                      />
                      <label
                        htmlFor="image-file"
                        className="icon-primary d-flex gap-5 py-2  "
                      >
                        <BsCamera size={22} />
                        Image
                      </label>
                    </li>
                  </ul>
                </li>

                <li class="list-inline-item">
                  <button
                    type="submit"
                    class="btn btn-primary font-size-16 btn-lg chat-send waves-effect waves-light"
                  >
                    <i class="ri-send-plane-2-fill"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ChatInputBox;
