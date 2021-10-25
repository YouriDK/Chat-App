import { Button } from '@material-ui/core';
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const ChatInput: FC<any> = ({
  channelName,
  channelId,
  chatRef,
}): JSX.Element => {
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth); // *  Récupération des données de l'user lors du login
  const sendMessage = (e: any) => {
    e.preventDefault(); // * Permet de ne pas rafraichir la page
    if (!channelId) {
      return false;
    }

    db.collection('rooms').doc(channelId).collection('messages').add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });
    chatRef?.current.scrollIntoView({ behavior: 'smooth' }); // * Permet de Scroll down directement au changement
    setInput('');
  };

  return (
    <ChatInputConainer>
      <form>
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type='submit' onClick={sendMessage}>
          SEND{' '}
        </Button>
      </form>
    </ChatInputConainer>
  );
};
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

export default ChatInput;
