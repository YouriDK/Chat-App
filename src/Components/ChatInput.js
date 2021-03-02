import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import firebase from "firebase";

export default function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState(null);

  const sendMessage = (e) => {
    e.preventDefault(); // * Permet de ne pas rafraichir la page
    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: "Youri C",
      userImage:
        "https://ih1.redbubble.net/image.1073751969.9363/flat,750x1000,075,f.jpg",
    });
    chatRef?.current.scrollIntoView({ behavior: "smooth" });
    setInput("");
  };

  return (
    <ChatInputConainer>
      <form>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND{" "}
        </Button>
      </form>
    </ChatInputConainer>
  );
}

const ChatInputConainer = styled.div`
  border-radius: 20px;
  > form {
    display: flex;
    position: relative;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
