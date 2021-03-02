import React from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

export default function SideBarOption({ Icon, title, addChannelOption }) {
  const [channels, loading, error] = useCollection(db.collection("rooms"));
  console.log(channels);
  const addChannel = () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      db.collection("rooms").add({
        name: channelName,
      });
    }
  };
  const selectChannel = () => {};

  return (
    <SideBarOptionConatiner
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
      {Icon ? (
        <h3> {title} </h3>
      ) : (
        <SideBarOptionChannel>
          {" "}
          <span>#</span> {title}
        </SideBarOptionChannel>
      )}
    </SideBarOptionConatiner>
  );
}

const SideBarOptionConatiner = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
    background-color: #340e36;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SideBarOptionChannel = styled.div``;
