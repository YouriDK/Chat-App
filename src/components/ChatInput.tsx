import { Button } from '@material-ui/core';
import { FC, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
const ChatInput: FC<any> = ({
  channelName,
  channelId,
  chatRef,
}): JSX.Element => {
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth); // *  Récupération des données de l'user lors du login

  const sendMessage = async (e: any) => {
    // TODO console.log('user', user?.uid); Rajouter l'uid dans les intels
    e.preventDefault(); // * Permet de ne pas rafraichir la page
    if (input !== '') {
      if (!channelId) {
        return false;
      }
      await addDoc(collection(db, `rooms/${channelId}/messages`), {
        message: input,
        timestamp: serverTimestamp(),
        user: user?.displayName,
        userImage: user?.photoURL,
        uid: user?.uid,
      });

      if (chatRef?.current) {
        chatRef?.current.scrollIntoView(); // * Permet de Scroll down directement au changement
      } else {
      }
      setInput('');
    }
  };

  return (
    <div className='chat-input'>
      <form>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder={`Message on ${channelName} ...`}
        />

        <Button type='submit' onClick={sendMessage}>
          <RiSendPlane2Fill
            size={35}
            style={{
              padding: '1px',
              marginRight: '5px',
              color: 'var(--ligth-bg)',
            }}
          />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
