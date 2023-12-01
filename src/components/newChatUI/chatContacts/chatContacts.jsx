import React from "react";
import Contacts from "./Contacts";

const chatContacts = ({
  socket,
  chats,
  setMessages,
  setOpenChat,
  openChatWindow,
  setPinnedMessages,
}) => {
  return (
    <>
      <div className="chat-leftsidebar me-lg-1 ms-lg-0">
        <div className="tab-content">
          <Contacts
            socket={socket}
            setPinnedMessages={setPinnedMessages}
            openChatWindow={openChatWindow}
            chats={chats}
            setMessages={setMessages}
            setOpenChat={setOpenChat}
          />
        </div>
      </div>
    </>
  );
};

export default chatContacts;
