import React, { FC, useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import ChatInput from '../Components/ChatInput';
import { db } from '../firebase';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Message from '../Components/Message';
import LoadingBox from '../Components/LoadingBox';
import MesssageBox from '../Components/MesssageBox';
import { getChatDetails } from '../Middleware/actions/chatActions';

const Chat: FC<any> = (props: any): JSX.Element => {
  // const chatRef = useRef(null);
  // const roomId = useSelector(selectRoomId);
  // const [details] = useDocument(
  //   roomId && db.collection('rooms').doc(roomId)
  // );
  // const [message, loading] = useCollection(
  //   roomId &&
  //     db
  //       .collection('rooms') // * Collections Rooms
  //       .doc(roomId) // * Sélection de la room en fonction de son ID
  //       .collection('messages') // * Récupérer tous les messages
  //       .orderBy('timestamp', 'asc') // * Et les affichent par ordre Chronologique
  // );

  // useEffect(() => {
  //   if (chatRef.current !== null) {
  //     const temp: any = chatRef.current;
  //     temp.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [roomId, loading]);
  // {/*//TODO Voir la fonctionnalités que l'on peut ajouter à ces détails    */}
  const chatId = props.match.params.id;
  const chatRef = useRef(null);

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
    setConvoName(details?.data()?.name);
  }, [details]);

  return loading ? (
    <LoadingBox />
  ) : !details && !messages ? (
    <MesssageBox variant='danger' text='Intels missing !' />
  ) : (
    <ChatContainer>
      <>
        <Header>
          <HeraderLeft>
            <h4>
              <strong>#{convoName}</strong>
            </h4>
            <StarBorderOutlinedIcon />
          </HeraderLeft>
          <HeaderRight>
            <p>
              <InfoOutlinedIcon /> Details{' '}
            </p>
          </HeaderRight>
        </Header>
        <ChatMessages>
          {messages?.docs.map((doc: any) => {
            const { message, timestamp, user, userImage } = doc.data();
            return (
              <Message // *Composant pour afficher chaque message
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
      </>
    </ChatContainer>
  );
};
export default Chat;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeraderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
