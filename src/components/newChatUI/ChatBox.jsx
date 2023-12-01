import React, { useEffect, useState } from "react";
import MessageBox from "./MessageBox";

const ChatBox = ({ messages, setPinnedMessages }) => {
  const [messagesState, setMesagesState] = useState(messages);
  useEffect(() => {
    setMesagesState(messages);
  }, [messages]);

  return (
    <>
      <div class="chat-conversation p-3 p-lg-4" data-simplebar="init">
        <ul class="list-unstyled mb-0">
          {messagesState?.map((msg) => (
            <MessageBox
              msg={msg}
              key={msg._id}
              setPinnedMessages={setPinnedMessages}
            />
          ))}
          {messagesState.length === 0 && (
            <p className="text-center">No message found</p>
          )}

          {/* <li>
            <div class="chat-day-title">
              <span class="title">Today</span>
            </div>
          </li> */}
          {/* <li class="right">
            <div class="conversation-list">
              <div class="chat-avatar">
                <img src="assets/images/users/avatar-1.jpg" alt="ok" />
              </div>

              <div class="user-chat-content">
                <div class="ctext-wrap">
                  <div class="ctext-wrap-content">
                    <div class="card p-2 mb-2">
                      <div class="d-flex flex-wrap align-items-center attached-file">
                        <div class="avatar-sm me-3 ms-0 attached-file-avatar">
                          <div class="avatar-title bg-primary-subtle text-primary rounded font-size-20">
                            <i class="ri-file-text-fill"></i>
                          </div>
                        </div>
                        <div class="flex-grow-1 overflow-hidden">
                          <div class="text-start">
                            <h5 class="font-size-14 text-truncate mb-1">
                              admin_v1.0.zip
                            </h5>
                            <p class="text-muted text-truncate font-size-13 mb-0">
                              12.5 MB
                            </p>
                          </div>
                        </div>
                        <div class="ms-4 me-0">
                          <div class="d-flex gap-2 font-size-20 d-flex align-items-start">
                            <div>
                              <a
                                download="admin_v1.0.zip"
                                href="assets/images/small/admin_v1.0.zip"
                                class="fw-medium"
                              >
                                <i class="ri-download-2-line"></i>
                              </a>
                            </div>
                            <div class="dropdown">
                              <a
                                class="dropdown-toggle text-muted"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i class="ri-more-fill"></i>
                              </a>
                              <div class="dropdown-menu dropdown-menu-end">
                                <a class="dropdown-item" href="#">
                                  Share{" "}
                                  <i class="ri-share-line float-end text-muted"></i>
                                </a>
                                <a class="dropdown-item" href="#">
                                  Delete{" "}
                                  <i class="ri-delete-bin-line float-end text-muted"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p class="chat-time mb-0">
                      <i class="ri-time-line align-middle"></i>{" "}
                      <span class="align-middle">10:16</span>
                    </p>
                  </div>

                  <div class="dropdown align-self-start">
                    <a
                      class="dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="ri-more-2-fill"></i>
                    </a>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">
                        Copy{" "}
                        <i class="ri-file-copy-line float-end text-muted"></i>
                      </a>
                      <a class="dropdown-item" href="#">
                        Save <i class="ri-save-line float-end text-muted"></i>
                      </a>
                      <a class="dropdown-item" href="#">
                        Forward{" "}
                        <i class="ri-chat-forward-line float-end text-muted"></i>
                      </a>
                      <a class="dropdown-item" href="#">
                        Delete{" "}
                        <i class="ri-delete-bin-line float-end text-muted"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="conversation-name">Patricia Smith</div>
              </div>
            </div>
          </li> */}
          {/* <li>
            <div class="conversation-list">
              <div class="chat-avatar">
                <img src="assets/images/users/avatar-4.jpg" alt="ok" />
              </div>

              <div class="user-chat-content">
                <div class="ctext-wrap">
                  <div class="ctext-wrap-content">
                    <p class="mb-0">
                      typing
                      <span class="animate-typing">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                      </span>
                    </p>
                  </div>
                </div>

                <div class="conversation-name">Doris Brown</div>
              </div>
            </div>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default ChatBox;
