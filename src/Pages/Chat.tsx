import React, { FC, useRef, useEffect, useState } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import ChatInput from '../Components/ChatInput';
import { db } from '../firebase';
import Message from '../Components/Message';
import LoadingBox from '../Components/LoadingBox';
import MesssageBox from '../Components/MesssageBox';
import { BiConversation } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { sleep } from '../Utils/sleep';
const Chat: FC<any> = (props: any): JSX.Element => {
  const chatId = props.match.params.id;
  const chatRef = useRef<HTMLHeadingElement>(null);
  const [alert, setAlert] = useState(false);
  const [convoName, setConvoName] = useState('');
  const [details] = useDocument(chatId && db.collection('rooms').doc(chatId));
  const [messages, loading] = useCollection(
    chatId &&
      db
        .collection('rooms') // * Collections Rooms
        .doc(chatId) // * Sélection de la room en fonction de son ID
        .collection('messages') // * Récupérer tous les messages
        .orderBy('timestamp', 'asc') // * Et les affichent par ordre Chronologique
  );
  useEffect(() => {
    if (chatRef?.current !== null) {
      chatRef?.current.scrollIntoView();
    }
    setConvoName(details?.data()?.name);
  }, [details, messages?.docs]);

  const handleFeatureComing = async () => {
    setAlert(true);
    await sleep(2000);
    setAlert(false);
  };
  return loading ? (
    <LoadingBox Icon />
  ) : !details && !messages ? (
    <MesssageBox variant='danger' text='Intels missing !' />
  ) : (
    <ChatContainer className='ChatContainer'>
      <Header>
        <HeraderLeft>
          <BiConversation
            size={40}
            className='icons'
            style={{
              padding: 2,
              marginRight: '15px',
              color: 'var(--ligth-bg)',
            }}
          />
          <h3>
            <strong style={{ color: 'var(--ligth-bg)' }}>{convoName}</strong>
          </h3>
        </HeraderLeft>
        <HeaderRight
          onClick={handleFeatureComing}
          style={{ cursor: 'pointer' }}
        >
          <FiSettings
            className='icons'
            size={25}
            style={{ padding: 2, marginRight: '5px', color: 'var(--ligth-bg)' }}
          />
          <h3>
            <strong style={{ marginRight: '15px', color: 'var(--ligth-bg)' }}>
              Details
            </strong>
          </h3>
        </HeaderRight>
      </Header>
      {alert && <MesssageBox variant='info' text='feature incoming' />}
      <ChatMessages>
        <br />
        {messages?.docs.map((doc: any) => {
          const { message, timestamp, user, userImage } = doc.data();
          return (
            <Message
              key={doc.id}
              message={message}
              timestamp={timestamp}
              user={user}
              userImage={userImage}
            />
          );
        })}
        <ChatBottom ref={chatRef} />
      </ChatMessages>

      <ChatInput // * Barre pour écrire un message
        chatRef={chatRef}
        channelName={details?.data()?.name}
        channelId={chatId}
      />
    </ChatContainer>
  );
};
export default Chat;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 3px solid var(--background);
`;
const HeraderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.7;
  flex-grow: 1;
  margin-top: 60px;
  width: 100%;
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  min-height: 80%;
`;
const ChatBottom = styled.div``;
