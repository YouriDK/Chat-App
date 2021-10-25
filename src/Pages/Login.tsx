import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { auth, provider } from '../firebase';
import { Button } from '@material-ui/core';

const Login: FC<any> = (): JSX.Element => {
  const SignIn = (e: any) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => {
      alert(error.message);
    });
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src='https://www.esecad.com/wp-content/uploads/sites/38/2016/11/slack-chat.png'
          alt=''
        />{' '}
        <h1>Sign in to the clone</h1>
        <p> Second project portfolio</p>
        <Button onClick={SignIn}>Sign in with Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: grid;
  background-color: #f8f8f8;
  height: 100vh;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0.12), 0 1px 2px rgba(0, 0, 0.24);

  > img {
    height: 100px;
    margin-bottom: 40px;
    object-fit: contain;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48;
    color: white;
  }
`;

export default Login;
