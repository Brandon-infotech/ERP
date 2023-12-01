import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatContacts from "../../components/newChatUI/chatContacts/chatContacts";
import "./newchats.css";
import ChatHead from "../../components/newChatUI/ChatHead";
import ChatBox from "../../components/newChatUI/ChatBox";
import ChatInputBox from "../../components/newChatUI/ChatInputBox";
import AudioCallModal from "../../components/newChatUI/Modals/AudioCallModal";
import VideoCallModal from "../../components/newChatUI/Modals/VideoCallModal";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;
let socket;

const NewChat = () => {
  const user = useSelector((state) => state.user);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [filteredMessage, setFilteredMessage] = useState([]);
  const [openChat, setOpenChat] = useState("");
  const [toggleChat, setToggleChat] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  //fetch users
  const fetchUsers = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/chats/all`, {
        headers: { Authorization: user.token },
      })
      .then((res) => {
        setChats(res.data.Chat);
      });
  };

  useEffect(() => {
    fetchUsers(); //fetch all users

    // setting up connection with socket.io
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => {
      setSocketConnected(true);
    });
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      console.log("newMessageReceived");
      console.log(messages);
      setMessages((prev) => {
        return [...prev, newMessageReceived.messages];
      });
    });
    return () => {
      socket.off("message received").off();
    };
  });

  useEffect(() => {
    setFilteredMessage(messages);
  }, [messages]);

  // fetch chat messages
  const fetchMessage = (messages) => {
    setMessages(messages);
  };
  //open chat box
  const openChatHandler = (name) => {
    setOpenChat(name);
  };
  //send message handler
  const sendMessageHandler = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };
  //open chat window handler
  const openChatWindow = () => {
    setToggleChat(!toggleChat);
  };

  const searchhandler = async (e) => {
    try {
      const searchTerm = e.target.value;
      // setSearchItem(searchTerm);
      // console.log(messages);
      const filteredItems = messages.filter((msg) =>
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredMessage(filteredItems);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="layout-wrapper d-lg-flex">
      <ChatContacts
        socket={socket}
        setPinnedMessages={setPinnedMessages}
        chats={chats}
        openChatWindow={openChatWindow}
        setMessages={fetchMessage}
        setOpenChat={openChatHandler}
      />
      <div
        class={`user-chat ${
          toggleChat ? "user-chat-show" : ""
        } w-100 overflow-hidden`}
      >
        <div class="d-lg-flex">
          {openChat ? (
            <div class="w-100 overflow-hidden position-relative">
              <ChatHead
                setChats={setChats}
                closeChat={setOpenChat}
                search={searchhandler}
                chat={openChat}
                openChatWindow={openChatWindow}
                pinnedMessages={pinnedMessages}
              />
              <ChatBox
                socket={socket}
                pinnedMessages={pinnedMessages}
                messages={filteredMessage}
                setPinnedMessages={setPinnedMessages}
              />
              <ChatInputBox
                sendMessage={sendMessageHandler}
                chat={openChat}
                socket={socket}
              />
            </div>
          ) : (
            <h1 className="welcome-header">Welcome to Brandon Infotech</h1>
          )}

          <AudioCallModal />
          <VideoCallModal />
        </div>
      </div>
    </div>
  );
};

export default NewChat;
