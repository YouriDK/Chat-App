import React, { FC, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import ChatInput from '../Components/ChatInput';
import { db } from '../firebase';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Message from '../Components/Message';

const Chat: FC<any> = (): JSX.Element => {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  );
  const [roomMessage, loading] = useCollection(
    roomId &&
      db
        .collection('rooms') // * Collections Rooms
        .doc(roomId) // * Sélection de la room en fonction de son ID
        .collection('messages') // * Récupérer tous les messages
        .orderBy('timestamp', 'asc') // * Et les affichent par ordre Chronologique
  );

  useEffect(() => {
    if (chatRef.current !== null) {
      const temp: any = chatRef.current;
      temp.scrollIntoView({ behavior: 'smooth' });
    }
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessage && (
        <>
          <Header>
            <HeraderLeft>
              <h4>
                <strong>#{roomDetails?.data()?.name}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeraderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details{' '}
                {/*//TODO Voir la fonctionnalités que l'on peut ajouter à ces détails    */}
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessage?.docs.map((doc) => {
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
            channelName={roomDetails?.data()?.name}
            channelId={roomId}
          />
        </>
      )}
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
