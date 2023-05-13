import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { FC, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BiConversation } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { sleep } from '../Utils/utils';
import ChatInput from '../components/ChatInput';
import LoadingBox from '../components/LoadingBox';
import Message from '../components/Message';
import MesssageBox from '../components/MesssageBox';
import { auth, db } from '../firebase';
import styled from 'styled-components';

interface MessageProps {
  id: string;
  data: any;
}
const Chat: FC<any> = (): JSX.Element => {
  const params = useParams();
  const chatId = params.ChatId;
  const chatRef = useRef<HTMLHeadingElement>(null);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const [convoName, setConvoName] = useState('');
  const [user] = useAuthState(auth);
  const letsGoTo = useNavigate();
  const details: any = {};
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const getChannelName = async () => {
    const roomNameRef = doc(db, 'rooms', chatId as string);
    const messagesQuery = collection(db, `rooms/${chatId}/messages`);
    const roomName = await getDoc(roomNameRef);
    setConvoName(roomName.data()?.name);
    onSnapshot(messagesQuery, async (snapshot: any) => {
      const MessagesDataArray: MessageProps[] = [];
      snapshot.docs.forEach((datas: any) => {
        MessagesDataArray.push({ id: datas.id, data: datas.data() });
      });
      setMessages(MessagesDataArray);
    });

    setLoading(false);
  };
  useEffect(() => {
    getChannelName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  const checkUuid = (uid: string): boolean => {
    return uid === user?.uid;
  };
  const handleFeatureComing = async () => {
    setAlert(true);
    await sleep(2000);
    setAlert(false);
  };

  const deleteChat = async () => {
    const docToRemove = doc(db, 'rooms', chatId as string);
    await deleteDoc(docToRemove);
    letsGoTo('/');
  };
  return loading ? (
    <LoadingBox Icon />
  ) : !details && !messages ? (
    <MesssageBox variant='danger' text='Intels missing !' />
  ) : (
    <ChatBox>
      <div
        className='flex justify-between chat-header'
        style={{
          padding: '10px',
          borderRadius: '8px',
          maxWidth: '100%',
          margin: '20px',
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
            size={20}
            style={{
              marginLeft: '15px',
              marginRight: '15px',
              color: 'var(--ligth-bg)',
            }}
            onClick={() => deleteChat()}
          />
        </div>
      </div>

      <div className='chat-messages flex flex-col h-full'>
        <br />
        {messages
          .sort((a: any, b: any) =>
            a.data.timestamp > b.data.timestamp ? 1 : -1
          )
          .map((intels: MessageProps) => {
            const { message, timestamp, user, userImage, uid } = intels.data;
            return (
              <div
                className={`${
                  checkUuid(uid) ? 'flex justify-end' : 'flex justify-start'
                } `}
                style={{
                  marginLeft: '2%',
                  marginRight: '2%',
                  paddingBottom: '10px',
                  marginBottom: '10px',
                }}
              >
                <Message
                  me={checkUuid(uid)}
                  key={intels.id}
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
        channelName={convoName}
        channelId={chatId}
      />
    </ChatBox>
  );
};

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.7;
  flex-grow: 1;
  width: 70%;
  max-width: 100%;
  background-color: transparent;
  padding: 5px;
  height: 100%;
`;
export default Chat;
