import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect("http://10.16.16.108:7000", {
  transports: ["websocket"],
  upgrade: false,
  cors: true,
});

function ChatApp() {
  const [messages, setMessages] = useState([]);
  console.log(messages, "this message come from ....");
  const [sendMessage, setSendMessage] = useState("");
  const authorEmail = localStorage.getItem("authorEmail");
  const userEmail = localStorage.getItem("userEmail");
  console.log(authorEmail, "auhtorEmail");
  const authorId = localStorage.getItem("authorId");

  const handleMessageChange = (event) => {
    setSendMessage(event.target.value);
  };
  const buttonText = authorId ? "Send to User" : "Send to Author";
  const handleSendMessage = (e) => {
    if (authorId) {
      let receiverUser = userEmail;
      socket.emit("authorChat", {
        text: sendMessage,
        email: authorEmail,
        receiver: receiverUser,
      });
    } else {
      let receiveAuthor = authorEmail;
      socket.emit("userChat", {
        text: sendMessage,
        email: userEmail,
        receiver: receiveAuthor,
      });
    }
    setSendMessage("");
  };

  useEffect(() => {
    const handleMessage = (message) => {
      console.log(message, `get message from ${message.email}`);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("authorChat", handleMessage);

    socket.on("userChat", handleMessage);

    return () => {
      socket.off("userChat", handleMessage);
      socket.off("authorChat", handleMessage);
    };
  }, []);

  return (
    <div className="chatboat-body-container-div">
      <div>
        {messages.map((message, index) => (
          <div
            className={
              message.email === authorEmail ? "message-author" : "message-user"
            }
          >
            <div
              key={index}
              className={message.email === authorEmail ? "author" : "user"}
            >
              {message.text}
              {message.email}
            </div>
          </div>
        ))}
        {/* <div>
          {messages.text}
          {`This receive from ${messages.email}`}
        </div> */}
      </div>
      <div className="chatboat-container-div">
        <div className="chat-text-input-div">
          <input
            type="text"
            className="chat-text-input"
            value={sendMessage}
            onChange={handleMessageChange}
          />
          <button
            className={authorId ? "author-buton" : "user-button"}
            onClick={handleSendMessage}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
