import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
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
// import CustomModal from '../Components/CustomModal';

const SideBar: FC<any> = (): JSX.Element => {
  const [channels, loading, error] = useCollection(db.collection('rooms'));
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const [channel, setChannel] = useState(true);
  // const [channelName, setChannelName] = useState('');
  // const [modal, setModal] = useState(false);
  const [options, setOptions] = useState(true);
  const history = useHistory();

  const addChannel = () => {
    const channelName = prompt('Please enter the channel name :');
    //setModal(true);
    if (channelName) {
      db.collection('rooms').add({
        name: channelName,
      });
    }
  };

  const selectChannel = (id: string) => {
    history.push(`/chat/${id}`);
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <>
      {/* <CustomModal
        text=''
        display={false}
        value={channelName}
        change={setChannelName}
        handleOpen={setModal}
        isOpen={modal}
      /> */}
      <SidebarContainer>
        <SidebarHeader>
          <SidebarInfo>
            <WiMoonAltNew color='green' size={20} />
            <h3>{user?.displayName}</h3>
          </SidebarInfo>
        </SidebarHeader>
        <SideBarOption
          Icon={options ? AiFillMinusCircle : AiFillPlusCircle}
          title='Options'
          onClick={() => setOptions(!options)}
        />
        {options && (
          <>
            <SideBarOption
              Icon={BiCommentDetail}
              title='Threads'
              onClick={() => history.push(`/threads`)}
            />
            <SideBarOption
              Icon={AiOutlineInbox}
              title='Mentions & reactions'
              onClick={() => history.push(`/mentions`)}
            />
            <SideBarOption
              Icon={MdSave}
              title='Saved Items'
              onClick={() => history.push(`/saved`)}
            />
            <SideBarOption
              Icon={CgBrowser}
              title='Channel browser'
              onClick={() => history.push(`/channel`)}
            />
            <SideBarOption
              Icon={BsFillPeopleFill}
              title='People & user groups'
              onClick={() => history.push(`/people`)}
            />
            <SideBarOption
              Icon={AiFillAppstore}
              title='Apps'
              onClick={() => history.push(`/apps`)}
            />
            <SideBarOption
              Icon={AiFillFileText}
              title='File browser'
              onClick={() => history.push(`/files`)}
            />
          </>
        )}
        <hr />
        <SideBarOption
          Icon={channel ? AiFillMinusCircle : AiFillPlusCircle}
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
    </>
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
