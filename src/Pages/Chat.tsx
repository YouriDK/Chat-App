import React, { FC, useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import ChatInput from '../Components/ChatInput';
import { db } from '../firebase';
import Message from '../Components/Message';
import LoadingBox from '../Components/LoadingBox';
import MesssageBox from '../Components/MesssageBox';
import { BiConversation } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { sleep } from '../Utils/sleep';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Chat: FC<any> = (props: any): JSX.Element => {
  const chatId = props.match.params.id;
  const chatRef = useRef<HTMLHeadingElement>(null);
  const [alert, setAlert] = useState(false);
  const [convoName, setConvoName] = useState('');
  const [user] = useAuthState(auth);
  const history = useHistory();
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

  const checkUuid = (uid: string): boolean => {
    return uid === user?.uid;
  };
  const handleFeatureComing = async () => {
    setAlert(true);
    await sleep(2000);
    setAlert(false);
  };

  const deleteChat = () => {
    db.collection('rooms') // * Collections Rooms
      .doc(chatId) // * Sélection de la room en fonction de son ID
      .delete()
      .then(() => history.push('/'))
      .catch((err: any) => console.log('ERREUR DE SUPPRESION !'));
  };
  return loading ? (
    <LoadingBox Icon />
  ) : !details && !messages ? (
    <MesssageBox variant='danger' text='Intels missing !' />
  ) : (
    <div
      className='flex flex-col bg-transparent p-[5px] h-full'
      style={{ flex: '0.7', flexGrow: 1 }}
    >
      <div
        className='flex justify-between chat-header'
        style={{
          padding: '5px',
          borderRadius: '8px',
          width: '80%',
          margin: 'auto',
        }}
      >
        <div className='flex items-center'>
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
        </div>
        <div
          className='flex items-center'
          onClick={handleFeatureComing}
          style={{ cursor: 'pointer' }}
        >
          <FiSettings
            className='icons'
            size={25}
            style={{ padding: 2, marginRight: '5px', color: 'var(--ligth-bg)' }}
          />

          <FaTrash
            style={{ marginRight: '15px', color: 'var(--ligth-bg)' }}
            onClick={() => deleteChat()}
          />
        </div>
      </div>

      <div className='chat-messages flex flex-col h-full'>
        <br />
        {messages?.docs.map((doc: any) => {
          const { message, timestamp, user, userImage, uid } = doc.data();
          return (
            <div
              className={`${
                checkUuid(uid) ? 'flex justify-end' : 'flex justify-start'
              } `}
              style={{ maxWidth: '99%' }}
            >
              <Message
                me={checkUuid(uid)}
                key={doc.id}
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
              />
            </div>
          );
        })}
        <div ref={chatRef} />
      </div>
      {alert && <MesssageBox variant='info' text='Feature incoming....' />}
      <ChatInput
        // * Barre pour écrire un message
        chatRef={chatRef}
        channelName={details?.data()?.name}
        channelId={chatId}
      />
    </div>
  );
};
export default Chat;
