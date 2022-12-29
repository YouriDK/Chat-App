import { FC } from 'react';
import { Formatdate } from '../Utils/utils';

interface MessageProps {
  message: string;
  user: string;
  timestamp: any;
  userImage: string;
  ref?: any;
  me: boolean;
}
const Message: FC<MessageProps> = ({
  message,
  user,
  timestamp,
  userImage,
  me,
}): JSX.Element => {
  return (
    <div
      className={`flex flex-col  bg-message ${
        me ? 'justify-start' : 'justify-end'
      }`}
      style={{
        padding: '15px',
        maxWidth: '45%',
        marginBottom: '20px',
        marginLeft: '20px',
        borderRadius: '15px',
      }}
    >
      <div className='flex '>
        <img src={userImage} alt='User' />
        <div className='flex flex-col' style={{ marginLeft: '5px' }}>
          <h4 className='c-purple'>{`${user} `}</h4>
          <h6 className='message-date'>{Formatdate(timestamp)}</h6>
        </div>
      </div>
      <p className='text-message'>{message}</p>
    </div>
  );
};

export default Message;
