import React, { FC } from 'react';
import styled from 'styled-components';

interface MessageProps {
  message: string;
  user: string;
  timestamp: any;
  userImage: string;
  ref?: any;
}
const Message: FC<MessageProps> = ({
  message,
  user,
  timestamp,
  userImage,
}): JSX.Element => {
  return (
    <MessageContainer>
      <img src={userImage} alt='User' />
      <MessageInfo>
        <h4 style={{ color: 'var(--ligth-primary)' }}>
          {user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <p style={{ color: 'white' }}>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  width: 30%;
  margin-bottom: 20px;
  margin-left: 20px;

  border-radius: 25px;

  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--dark-bg);
  > img {
    height: 40px;
    border-radius: 20px;
  }
`;
const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: white;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;

export default Message;
