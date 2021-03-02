import React from "react";
import styled from "styled-components";

export default function Login() {
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://www.undernews.fr/wp-content/uploads/2020/03/slack-logo.jpg"
          alt=""
        />{" "}
        <h1>Sign in to the clone</h1>
        <p> Porfolio Project incoming</p>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

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
`;
