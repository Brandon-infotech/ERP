import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import defaultPfp from "../../../resources/Assets/defaultPFP.jpg";
import "./contacts.css";
const Contacts = ({
  socket,
  chats,
  setMessages,
  setOpenChat,
  openChatWindow,
  setPinnedMessages,
}) => {
  console.log(chats);
  const user = useSelector((state) => state.user);
  const [imgUrl, setImgUrl] = useState();
  const [filteredChats, setFilteredChats] = useState(chats);
  const [searchItem, setSearchItem] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [groupName, setGroupName] = useState("");

  // Fetch all users on mount
  useEffect(() => {
    getAllUsers();
  }, []);
  //initialises filtered chats
  useEffect(() => {
    setFilteredChats(chats);
  }, [chats]);

  const searchhandler = async (e) => {
    try {
      const searchTerm = e.target.value;
      setSearchItem(searchTerm);

      const filteredItems = chats.filter((chat) =>
        chat.chatName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredChats(filteredItems);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchImage = async (file) => {
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
      // setId(id);
      setPinnedMessages([]);
      // api call to fetch the chat details
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/chats/${id}`,
        {
          headers: { Authorization: user.token },
        }
      );
      setOpenChat(res.data[0]); //set the contact name

      //api call to fetch all the messages
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/chats/messages/${id}`
      );
      setMessages(data.messages);

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
      openChatWindow();
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/chats/users");
      const Users = data.Users.filter((u) => u._id !== user.id);
      setAllUsers(Users);
    } catch (error) {
      console.log(error);
    }
  };

  const createChatHandler = async (recipient) => {
    let body;
    if (!recipient.length) {
      body = {
        chatName: recipient.name,
        chatImage: recipient.profilePhoto,
        users: [recipient._id, user.id],
        isGroupChat: false,
      };
    }
    if (recipient.length === 1) {
      body = {
        chatName: recipient[0].name,
        chatImage: recipient[0].profilePhoto,
        users: [recipient[0]._id, user.id],
        isGroupChat: false,
      };
    }
    if (recipient.length >= 2) {
      const recipientIds = recipient.map((u) => u._id);
      if (groupName === "") {
        setRecipients([]);
        document
          .querySelectorAll(".selected")
          .forEach((element) => element.classList.remove("selected"));
        return alert("Please enter group name");
      }
      body = {
        chatName: groupName,
        chatImage: recipient.profilePhoto,
        users: [...recipientIds, user.id],
        isGroupChat: true,
      };
    }
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/chats/new",
        body
      );
      alert(data.message);
      if (data.success === true)
        setFilteredChats((prev) => [...prev, data.chat]);
      setRecipients([]);
      document
        .querySelectorAll(".selected")
        .forEach((element) => element.classList.remove("selected"));
    } catch (error) {
      console.log(error);
    }
  };

  const selectContactHandler = async (recipient) => {
    const recipientIndex = recipients.findIndex((u) => u._id === recipient._id);
    if (recipientIndex === -1) {
      setRecipients((prev) => [...prev, recipient]);
    } else {
      const updatedRecipients = [...recipients];
      updatedRecipients.splice(recipientIndex, 1);
      setRecipients(updatedRecipients);
    }
    const selectCircle = document.getElementById(`select-${recipient._id}`);
    selectCircle?.classList.toggle("selected");
  };
  return (
    <div
      className="tab-pane fade show active"
      id="pills-chat"
      role="tabpanel"
      aria-labelledby="pills-chat-tab"
    >
      {/* <!-- Start chats content --> */}
      <div>
        <div className="px-4 pt-4">
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <h4 className=" mb-4">Chats</h4>
            <button
              className="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#chatModal"
              style={{ padding: "0 10px 0 10px", height: "25px" }}
            >
              New Chat
            </button>
          </div>
          {/* Chat modal */}
          <div
            className="modal fade"
            id="chatModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Create new chat
                  </h1>
                  <button
                    onClick={() => {
                      setRecipients([]);
                      document
                        .querySelectorAll(".selected")
                        .forEach((element) =>
                          element.classList.remove("selected")
                        );
                    }}
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {allUsers?.map((user) => (
                    <div className="d-flex \ new-chat-list">
                      <div className="chat-user-img online align-self-center me-3 ms-0 py-2">
                        <img
                          src={
                            user.profilePhoto ? user.profilePhoto : defaultPfp
                          }
                          className="rounded-circle avatar-xs"
                          alt="Pfp"
                        />
                        <span className="user-status"></span>
                      </div>

                      <div
                        className="flex-grow-1 overflow-hidden"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          createChatHandler(user);
                        }}
                      >
                        <h5 className="text-truncate font-size-15 mb-1">
                          {user.name}
                        </h5>
                        <p className="chat-user-message text-truncate mb-0">
                          Click here to chat !
                        </p>
                      </div>
                      <div
                        id={`select-${user._id}`}
                        className="circlular-select"
                        onClick={() => {
                          selectContactHandler(user);
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  {recipients.length > 1 && (
                    <div
                      className="input-group"
                      style={{ border: "2px solid #e5e2eb" }}
                    >
                      <span className="input-group-text">Enter group name</span>
                      <textarea
                        onChange={(e) => {
                          setGroupName(e.target.value);
                        }}
                        className="form-control"
                        aria-label="With textarea"
                      ></textarea>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      createChatHandler(recipients);
                    }}
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Create Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Search Box--> */}
          <div className="search-box chat-search-box">
            <div className="input-group mb-3 rounded-3">
              <span
                className="input-group-text text-muted bg-light pe-1 ps-3"
                id="basic-addon1"
              >
                <i className="ri-search-line search-icon font-size-14"></i>
              </span>
              <input
                type="text"
                onChange={searchhandler}
                className="form-control bg-light"
                placeholder="Search messages or users"
                aria-label="Search messages or users"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
        </div>

        {/* <!-- Start chat-message-list --> */}
        <div>
          <h5 className="mb-3 px-3 font-size-16">Recent</h5>

          <div className="chat-message-list px-2" data-simplebar>
            {/* Contact list */}
            <ul className="list-unstyled chat-list chat-user-list">
              {filteredChats.length === 0 && <p>No chats found</p>}
              {filteredChats?.map((chat) => (
                <li
                  key={chat._id}
                  onClick={() => {
                    chatDisplay(chat._id);
                  }}
                >
                  {/* classNameName can be unread active and typing */}
                  <a>
                    <div className="d-flex">
                      <div className="chat-user-img online align-self-center me-3 ms-0">
                        <img
                          src={chat.chatImage ? chat.chatImage : defaultPfp}
                          className="rounded-circle avatar-xs"
                          alt="Pfp"
                        />
                        <span className="user-status"></span>
                      </div>

                      <div className="flex-grow-1 overflow-hidden">
                        <h5 className="text-truncate font-size-15 mb-1">
                          {chat.isGroupChat && chat.chatName}
                          <div className="chatName d-flex gap-2">
                            {!chat.isGroupChat &&
                              chat.users.find((u) => u._id !== user._id).name}
                            {!chat.isGroupChat && (
                              <span className="fs-6 fw-lighter fst-italic">
                                (
                                {
                                  chat.users.find((u) => u._id !== user._id)
                                    .position
                                }
                                )
                              </span>
                            )}
                          </div>
                        </h5>
                        <p className="chat-user-message text-truncate mb-0">
                          Click here to open the chat !
                        </p>
                      </div>
                      <div className="font-size-11">05 min</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <!-- End chat-message-list --> */}
      </div>
      {/* <!-- End chats content --> */}
    </div>
  );
};

export default Contacts;
