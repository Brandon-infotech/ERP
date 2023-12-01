import React, { useEffect, useState } from "react";
import ReactScrollToBttom from "react-scroll-to-bottom";
import VideoPlayer from "../VideoPlayer";
import "./ChatHead.css";
import ImageViewer from "../ImageViewer";
import defaultPfp from "../../resources/Assets/defaultPFP.jpg";
import { useSelector } from "react-redux";
import axios from "axios";

const ChatHead = ({
  chat,
  openChatWindow,
  pinnedMessages,
  search,
  closeChat,
  setChats,
}) => {
  const user = useSelector((state) => state.user);
  const [chatParticipants, setChatParticipants] = useState(chat.users);
  const [nonParticipants, setNonParticipants] = useState([]);
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    setChatParticipants(chat.users);
  }, [chat]);

  const fetchNonParticipantHandler = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/chats/users");
      const Users = data.Users.filter((u) => u._id !== user.id);
      let newUsers = Users.slice();
      for (let i = 0; i < chatParticipants.length; i++) {
        newUsers = newUsers.filter((u) => u._id !== chatParticipants[i]._id);
      }
      setNonParticipants(newUsers);
    } catch (error) {
      console.log(error);
    }
  };
  const selectContactHandler = (recipient) => {
    const recipientIndex = recipients.findIndex((u) => u._id === recipient._id);
    if (recipientIndex === -1) {
      setRecipients((prev) => [...prev, recipient]);
    } else {
      const updatedRecipients = [...recipients];
      updatedRecipients.splice(recipientIndex, 1);
      setRecipients(updatedRecipients);
    }
    const selectCircle = document.getElementById(`select2-${recipient._id}`);
    selectCircle?.classList.toggle("selected");
  };
  const addParticipantHandler = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/chats/add/${chat._id}`,
        { users: recipients }
      );
      setChatParticipants((prev) => [...prev, ...recipients]);
      setRecipients([]);
      document
        .querySelectorAll(".selected")
        .forEach((element) => element.classList.remove("selected"));
      alert("Added users to the group");
    } catch (error) {
      console.log(error);
    }
  };
  const removeParticipantHandler = async () => {
    try {
      // call backend api and remove the users from the db by popping
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}api/chats/remove/${chat._id}`,
        { users: recipients }
      );
      //remove the recipients from the chatParticipants array
      let newChatParticipants;
      newChatParticipants = chatParticipants.filter(
        (participant) =>
          !recipients.find((recipient) => recipient._id === participant._id)
      );

      setChatParticipants(newChatParticipants);

      setRecipients([]);
      document
        .querySelectorAll(".selected")
        .forEach((element) => element.classList.remove("selected"));
      alert("Removed users from the group");
    } catch (error) {
      console.log(error);
    }
  };
  const deleteChatHandler = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}api/chats/delete/${chat._id}`
      );
      setChats((prev) => {
        return prev.filter((chats) => chats._id !== chat._id);
      });
      closeChat(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div class="p-3 p-lg-4 border-bottom user-chat-topbar">
        <div class="row align-items-center">
          <div class="col-sm-4 col-8">
            <div class="d-flex align-items-center">
              <div class="d-block d-lg-none me-2 ms-0">
                <a
                  href="javascript: void(0);"
                  class="user-chat-remove text-muted font-size-16 p-2"
                  onClick={() => {
                    openChatWindow();
                  }}
                >
                  <i class="ri-arrow-left-s-line"></i>
                </a>
              </div>
              <div class="me-3 ms-0">
                <img
                  src={chat.chatImage ? chat.chatImage : defaultPfp}
                  class="rounded-circle avatar-xs"
                  alt=""
                />
              </div>
              <div class="flex-grow-1 overflow-hidden">
                <h5 class="font-size-16 mb-0 text-truncate">
                  <a class="text-reset user-profile-show">
                    {chat.isGroupChat && chat.chatName}
                    <div className="d-flex flex-column">
                      {!chat.isGroupChat &&
                        chat.users.find((u) => u._id !== user._id).name}
                      {!chat.isGroupChat && (
                        <span className="fs-6 fw-lighter">
                          {chat.users.find((u) => u._id !== user._id).position}
                        </span>
                      )}
                    </div>
                  </a>
                </h5>
                {/* <i class="ri-record-circle-fill font-size-10 text-success d-flex ms-1"></i> */}
              </div>
            </div>
          </div>
          <div class="col-sm-8 col-4">
            <ul class="list-inline user-chat-nav text-end mb-0">
              <li class="list-inline-item">
                <div class="dropdown">
                  <button
                    class="btn nav-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="ri-search-line" />
                  </button>
                  <div class="dropdown-menu p-0 dropdown-menu-end dropdown-menu-md custom-search">
                    <div class="search-box p-2 ">
                      <input
                        type="text"
                        class="form-control bg-light border-0"
                        placeholder="Search..."
                        onChange={search}
                      />
                    </div>
                  </div>
                </div>
              </li>

              <li class="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                <button
                  type="button"
                  class="btn nav-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#audiocallModal"
                >
                  <i class="ri-phone-line" />
                </button>
              </li>

              <li class="list-inline-item d-none d-lg-inline-block me-2 ms-0">
                <button
                  type="button"
                  class="btn nav-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#videocallModal"
                >
                  <i class="ri-vidicon-line"></i>
                </button>
              </li>

              <li class="list-inline-item">
                <div class="dropdown">
                  <button
                    class="btn nav-btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="ri-more-fill"></i>
                  </button>
                  <div class="dropdown-menu dropdown-menu-end custom-menu">
                    <a
                      class="dropdown-item d-block d-lg-none"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#audiocallModal"
                    >
                      Audio
                      <i class="ri-phone-line float-end text-muted"></i>
                    </a>
                    <a
                      class="dropdown-item d-block d-lg-none"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#videocallModal"
                    >
                      Video
                      <i class="ri-vidicon-line float-end text-muted"></i>
                    </a>
                    <a
                      class="dropdown-item"
                      href="#"
                      onClick={() => {
                        deleteChatHandler();
                      }}
                    >
                      Delete
                      <i class="ri-delete-bin-line float-end text-muted"></i>
                    </a>
                    {chat.isGroupChat && (
                      <>
                        <a
                          class="dropdown-item"
                          href="#"
                          onClick={() => {
                            fetchNonParticipantHandler();
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#addParticipants"
                        >
                          Add Participant
                          {/* <i class="ri-delete-bin-line float-end text-muted"></i> */}
                        </a>
                        <a
                          class="dropdown-item"
                          href="#"
                          onClick={() => {
                            fetchNonParticipantHandler();
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#removeParticipants"
                        >
                          Remove Participant
                          {/* <i class="ri-delete-bin-line float-end text-muted"></i> */}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Add more participant model */}
      <div
        class="modal fade"
        id="addParticipants"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add Participant
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {nonParticipants?.map((user) => (
                <div className="d-flex \ new-chat-list">
                  <div className="chat-user-img online align-self-center me-3 ms-0 py-2">
                    <img
                      src={user.profilePhoto ? user.profilePhoto : defaultPfp}
                      className="rounded-circle avatar-xs"
                      alt="Pfp"
                    />
                    <span className="user-status"></span>
                  </div>

                  <div
                    className="flex-grow-1 overflow-hidden"
                    style={{ cursor: "pointer" }}
                  >
                    <h5 className="text-truncate font-size-15 mb-1">
                      {user.name}
                    </h5>
                  </div>
                  <div
                    id={`select2-${user._id}`}
                    className="head-circlular-select"
                    onClick={() => {
                      selectContactHandler(user);
                    }}
                  ></div>
                </div>
              ))}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  addParticipantHandler();
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Remove Participant model */}
      <div
        class="modal fade"
        id="removeParticipants"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Remove Participant
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {chatParticipants?.map((user) => (
                <div className="d-flex \ new-chat-list">
                  <div className="chat-user-img online align-self-center me-3 ms-0 py-2">
                    <img
                      src={user.profilePhoto ? user.profilePhoto : defaultPfp}
                      className="rounded-circle avatar-xs"
                      alt="Pfp"
                    />
                    <span className="user-status"></span>
                  </div>

                  <div
                    className="flex-grow-1 overflow-hidden"
                    style={{ cursor: "pointer" }}
                  >
                    <h5 className="text-truncate font-size-15 mb-1">
                      {user.name}
                    </h5>
                  </div>
                  <div
                    id={`select2-${user._id}`}
                    className="head-circlular-select"
                    onClick={() => {
                      selectContactHandler(user);
                    }}
                  ></div>
                </div>
              ))}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  removeParticipantHandler();
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {pinnedMessages.length > 0 && (
        <div
          className="text-center pinned-chat-title"
          data-bs-toggle="modal"
          data-bs-target="#pinnedModal"
        >
          Pinned Chat
        </div>
      )}
      <ReactScrollToBttom>
        <div
          className="modal fade"
          id="pinnedModal"
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
                    className="pinnedMessages text-light"
                    key={i._id}
                    onClick={() => {
                      ///to scroll it into view
                      const msg = document.getElementById(`b${i._id}`);
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
                      <ImageViewer path={i.file.path} />
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
    </>
  );
};

export default ChatHead;
