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
        <h4>
          {user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;

  > img {
    height: 40px;
    border-radius: 20px;
  }
`;
const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;

export default Message;
