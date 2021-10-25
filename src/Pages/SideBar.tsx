import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { WiMoonAltNew } from 'react-icons/wi';
import { MdSave } from 'react-icons/md';
import { CgBrowser } from 'react-icons/cg';
import { BsFillPeopleFill } from 'react-icons/bs';
import { GiConversation } from 'react-icons/gi';
import {
  AiFillPlusCircle,
  AiFillMinusCircle,
  AiOutlineInbox,
  AiFillAppstore,
  AiFillFileText,
} from 'react-icons/ai';
import { BiCommentDetail, BiMessageAdd } from 'react-icons/bi';
import { enterRoom } from '../features/appSlice';
import SideBarOption from '../Components/SideBarOption';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { sleep } from '../Utils/sleep';
import MesssageBox from '../Components/MesssageBox';

const SideBar: FC<any> = (): JSX.Element => {
  const [channels, loading, error] = useCollection(db.collection('rooms'));
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);
  const [channel, setChannel] = useState(false);
  const [options, setOptions] = useState(false);

  const handleFeatureComing = async () => {
    setAlert(true);
    await sleep(2000);
    setAlert(false);
  };
  const addChannel = () => {
    console.log('ADD CHANNEL');
    const channelName = prompt('Please enter the channel name :');
    if (channelName) {
      db.collection('rooms').add({
        name: channelName,
      });
    }
  };
  const selectChannel = (id: string) => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <WiMoonAltNew color='green' size={20} />
          <h3>{user?.displayName}</h3>
        </SidebarInfo>
      </SidebarHeader>
      <SideBarOption
        Icon={options ? AiFillPlusCircle : AiFillMinusCircle}
        title='Options'
        onClick={() => setOptions(!options)}
      />
      {options && (
        <>
          <SideBarOption
            Icon={BiCommentDetail}
            title='Threads'
            onClick={handleFeatureComing}
          />
          <SideBarOption
            Icon={AiOutlineInbox}
            title='Mentions & reactions'
            onClick={handleFeatureComing}
          />
          <SideBarOption
            Icon={MdSave}
            title='Saved Items'
            onClick={handleFeatureComing}
          />
          <SideBarOption
            Icon={CgBrowser}
            title='Channel browser'
            onClick={handleFeatureComing}
          />
          <SideBarOption
            Icon={BsFillPeopleFill}
            title='People & user groups'
            onClick={handleFeatureComing}
          />
          <SideBarOption
            Icon={AiFillAppstore}
            title='Apps'
            onClick={handleFeatureComing}
          />
          <SideBarOption
            Icon={AiFillFileText}
            title='File browser'
            onClick={handleFeatureComing}
          />
          {alert && <MesssageBox variant='info' text={'Feature incoming'} />}
        </>
      )}
      <hr />
      <SideBarOption
        Icon={channel ? AiFillPlusCircle : AiFillMinusCircle}
        title='Channels'
        onClick={() => setChannel(!channel)}
      />
      {channel && (
        <>
          <SideBarOption
            Icon={BiMessageAdd}
            title='Add channel'
            onClick={addChannel}
          />

          {channels?.docs.map((doc) => (
            <SideBarOption
              Icon={GiConversation}
              key={doc.id}
              title={doc.data().name}
              onClick={() => selectChannel(doc.id)}
            />
          ))}
        </>
      )}
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid var(--slack-color);
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid var(--slack-color);
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid var(--slack-color);
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: var(--slack-color);
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;
  display: flex;
  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 600;
    align-items: center;
    margin-left: 15px;
  }
`;

export default SideBar;
