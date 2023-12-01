import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { BsCamera, BsCameraVideo, BsFolder2 } from "react-icons/bs";
import { MdOutlineCall } from "react-icons/md";
import { AiOutlinePaperClip } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { PiPaperPlaneRightLight } from "react-icons/pi";
import axios from "axios";
import { useSelector } from "react-redux";
import ReactScrollToBttom from "react-scroll-to-bottom";
import Message from "../../components/Message";
import io from "socket.io-client";
import "./chats.css";
import VideoPlayer from "../../components/VideoPlayer";
import NewChat from "./NewChat";

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;
let socket;

//api call to fetch all the messages

const Chats = () => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [contact, setContact] = useState();
  const [messages, setMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messageType, setMessageType] = useState("text");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState([]);

  const [searchItem, setSearchItem] = useState("");
  // set the initial state of filteredUsers to an empty array
  const [filteredChats, setFilteredUsers] = useState([]);

  //fetch user function
  const fetchUsers = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/chats/all`, {
        headers: { Authorization: user.token },
      })
      .then((res) => {
        // console.log(res.data.Chat);
        setLoading(true);
        setData(res.data.Chat);
        setFilteredUsers(res.data.Chat);
      });
  };

  // useEffect(() => {
  //   fetchUsers(); //fetch all users
  //   // setting up connection with socket.io
  //   socket = io(ENDPOINT);
  //   socket.emit("setup", user);
  //   socket.on("connection", () => {
  //     setSocketConnected(true);
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.on("message received", (newMessageReceived) => {
  //     console.log("newMessageReceived");
  //     console.log("received");
  //     setMessage((prev) => {
  //       return [...prev, newMessageReceived.messages];
  //     });
  //   });
  //   return () => {
  //     socket.off("message received").off();
  //   };
  // }, []);

  const fetchImage = async (file) => {
    console.log(file);
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
  };

  const chatDisplay = async (id) => {
    try {
      setId(id);
      setPinnedMessages([]);
      // api call to fetch the chat details
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/chats/${id}`,
        {
          headers: { Authorization: user.token },
        }
      );

      setLoading(true);
      setContact(res.data[0]); //set the contact name

      //api call to fetch all the messages
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/chats/messages/${id}`
      );
      setMessage(data.messages);
      socket.emit("join chat", id);
      //sets the pinned messages
      data.messages.forEach((element) => {
        if (element.isPinned === true) {
          if (element.messageType === "image") {
            // fetch the image and show like in messages
            fetchImage(element.file);
          }
          setPinnedMessages((prev) => [...prev, element]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const messageSendHandler = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("sender", user.id);
    payload.append("content", newMessage);
    payload.append("file", file);
    payload.append("status", "sent");
    payload.append("messageType", messageType);
    payload.append("chat", id);

    try {
      if (file) setMessageType("file");

      if (messageType === "text" && newMessage === "")
        return alert("please type message");

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/chats/messages`,
        payload
      );
      socket.emit("new message", data);
      setMessage((prev) => [...prev, data.messages]);
      setFile(null);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const searchhandler = async (e) => {
    try {
      const searchTerm = e.target.value;
      setSearchItem(searchTerm);

      const filteredItems = data.filter((user) =>
        user.chatName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredUsers(filteredItems);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Sidebar>
      <div className="container border border-3 py-0 chat-container">
        <NewChat />
      </div>
    </Sidebar>
  );
  return (
    <Sidebar>
      {loading ? (
        <div className="container border border-3 py-0 chat-container">
          <div className="row h-100">
            <div className="col-3 px-0 all-chat-container h-100">
              <div className="py-3 px-2">
                <input
                  type="text"
                  onChange={searchhandler}
                  className="form-control search-chat"
                  placeholder="Search a chat..."
                />
              </div>
              <div className="all-chats">
                {filteredChats.length === 0 && <p>No chats found</p>}
                {filteredChats?.map((i) => (
                  <div
                    key={i._id}
                    className="d-flex px-3 justify-content-between align-items-center chat-class"
                    onClick={() => chatDisplay(i._id)}
                  >
                    <img
                      src={i.profilePhoto ? i.profilePhoto : i.chatImage}
                      className="rounded-5 d-none d-lg-block"
                      alt=""
                    />
                    <p>{i.chatName}</p>
                    {/* <p>{i.groupAdmin.profilePhoto}</p> */}
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="col-1 h-100 px-0 show-button d-sm-none">show</div> */}
            <div className="col-sm-9 px-0">
              <div className="main-bg h-70 rrt-25 d-flex justify-content-between align-items-center px-3 text-white">
                <div className=" d-flex justify-content-between align-items-center ">
                  <img
                    src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                    className=" chat_id_img rounded-5 h-25"
                    alt=""
                  />
                  {contact ? (
                    <div className="px-3 mt-0">
                      <h2 className="my-0">{contact.chatName}</h2>
                      <p className="my-0">{contact.position}</p>
                    </div>
                  ) : (
                    <div className="px-3">
                      <h2>Welcome To The Chats</h2>
                    </div>
                  )}
                </div>
                <div className="right">
                  <MdOutlineCall size={25} className="text-white mx-2" />
                  <BsCameraVideo size={25} className="text-white mx-2" />
                </div>
              </div>
              <div className="chat-section">
                {pinnedMessages.length > 0 && (
                  <h5
                    className="text-center bg-light pinned-chat-title"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Pinned Chat
                  </h5>
                )}
                <ReactScrollToBttom>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Pinned Chats
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="modal-body">
                          {pinnedMessages.map((i) => (
                            <div
                              data-bs-dismiss="modal"
                              className="pinnedMessages"
                              key={i._id}
                              onClick={() => {
                                ///to scroll it into view
                                const msg = document.getElementById(
                                  `b${i._id}`
                                );
                                msg.scrollIntoView({
                                  behavior: "smooth",
                                  block: "end",
                                });
                              }}
                            >
                              <span className="fw-bold">{i.sender.name}:</span>
                              <span className="pinnedContent text-break">
                                {i.content}
                              </span>
                              {i.messageType === "image" && (
                                <img
                                  src={imgUrl}
                                  alt="img"
                                  className="pinnedImage"
                                ></img>
                              )}
                              {i.messageType === "video" && (
                                <VideoPlayer videoId={i.file.path.slice(8)} />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ReactScrollToBttom>

                <ReactScrollToBttom className="chat-area p-2">
                  {messages ? (
                    messages.map((i, index) => (
                      <Message
                        pinnedMessages={pinnedMessages}
                        setPinnedMessages={setPinnedMessages}
                        index={index}
                        sender={i.sender}
                        messages={{
                          content: i.content,
                          _id: i._id,
                          isPinned: i.isPinned,
                          sender: i.sender,
                        }}
                        time={i.createdAt}
                        key={i._id}
                        msgId={i._id}
                        file={i.file}
                        type={i.messageType}
                      />
                    ))
                  ) : (
                    <h2>Create A Chat...</h2>
                  )}
                </ReactScrollToBttom>
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
                  className="input-area d-flex py-0 align-items-center position-absolute w-100 my-0"
                >
                  <input
                    type="text"
                    value={newMessage}
                    placeholder="Write a message"
                    className=" my-0 form-control message-input"
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                  />
                  <div className="media-input d-flex justify-content-between align-items-center">
                    <AiOutlinePaperClip
                      className=" mx-3 dropdown-toggle icon-primary"
                      data-bs-toggle="dropdown"
                      type="button"
                      aria-expanded="false"
                      size={30}
                    />
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
                    <button type="submit">
                      <PiPaperPlaneRightLight
                        className="icon-primary"
                        size={30}
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </Sidebar>
  );
};

export default Chats;
