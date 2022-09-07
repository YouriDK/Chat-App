import { Button } from '@material-ui/core';
import firebase from 'firebase';
import { FC, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdSend } from 'react-icons/md';
import { auth, db } from '../firebase';
// import Picker from 'emoji-picker-react';
const ChatInput: FC<any> = ({
  channelName,
  channelId,
  chatRef,
}): JSX.Element => {
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth); // *  Récupération des données de l'user lors du login
  // const [chosenEmoji] = useState(null);
  // const onEmojiClick = (event: any, emojiObject: any) => {
  //   setInput(input + emojiObject);
  // };

  const sendMessage = (e: any) => {
    console.log('user', user);
    // TODO console.log('user', user?.uid); Rajouter l'uid dans les intels
    e.preventDefault(); // * Permet de ne pas rafraichir la page
    if (input !== '') {
      if (!channelId) {
        return false;
      }

      db.collection('rooms').doc(channelId).collection('messages').add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
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
      {/* <Picker onEmojiClick={onEmojiClick} /> */}
      <form>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder={`Message sur ${channelName} ...`}
        />

        <Button type='submit' onClick={sendMessage}>
          <MdSend
            size={35}
            style={{
              padding: 2,
              marginRight: '15px',
              color: 'var(--ligth-bg)',
            }}
          />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
