import { FC, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import {
  AiFillAppstore,
  AiFillFileText,
  AiFillMinusCircle,
  AiFillPlusCircle,
  AiOutlineInbox,
} from 'react-icons/ai';
import { BiCommentDetail, BiMessageAdd } from 'react-icons/bi';
import { BsFillPeopleFill } from 'react-icons/bs';
import { CgBrowser } from 'react-icons/cg';
import { GiConversation } from 'react-icons/gi';
import { MdSave } from 'react-icons/md';
import { WiMoonAltNew } from 'react-icons/wi';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SideBarOption from '../components/SideBarOption';
import { enterRoom } from '../features/appSlice';
import { auth, db } from '../firebase';

interface sideBarOptionsProps {
  Icon: any;
  title: string;
  push: string;
}

const LeftMenu: FC<any> = (): JSX.Element => {
  const [channels] = useCollection(db.collection('rooms'));
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [options, setOptions] = useState(true);
  const history = useHistory();

  const addChannel = () => {
    const channelName = prompt('Please enter the channel name :');
    if (channelName) {
      db.collection('rooms').add({
        name: channelName,
      });
    }
  };
  const sideBarOptions: sideBarOptionsProps[] = [
    {
      Icon: BiCommentDetail,
      title: 'Threads',
      push: '/threads',
    },
    {
      Icon: AiOutlineInbox,
      title: 'Mentions & reactions',
      push: '/mentions',
    },
    {
      Icon: MdSave,
      title: 'Saved Items',
      push: '/saved',
    },
    {
      Icon: CgBrowser,
      title: 'Channel browser',
      push: '/channel',
    },
    {
      Icon: BsFillPeopleFill,
      title: 'People & user groups',
      push: '/people',
    },
    {
      Icon: AiFillAppstore,
      title: 'Apps',
      push: '/apps',
    },
    {
      Icon: AiFillFileText,
      title: 'File browser',
      push: '/files',
    },
  ];

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
    <div
      className='left-menu'
      style={{
        color: 'black',
        minWidth: '15%',
        maxWidth: '260px',
        marginTop: '60px',
        borderRadius: '20px',
        margin: '15px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;',
      }}
    >
      <div className='flex meanu-header' style={{ padding: '13px' }}>
        <div className='flex menu-info' style={{ flex: 1 }}>
          <WiMoonAltNew color='green' size={20} />
          <h3>{user?.displayName}</h3>
        </div>
      </div>
      <SideBarOption
        Icon={options ? AiFillMinusCircle : AiFillPlusCircle}
        title='Options'
        onClick={() => setOptions(!options)}
      />
      {options &&
        sideBarOptions.map((sidebar: sideBarOptionsProps) => (
          <SideBarOption
            Icon={sidebar.Icon}
            onClick={() => history.push(sidebar.push)}
            title={sidebar.title}
          />
        ))}

      <hr />

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
    </div>
  );
};

export default LeftMenu;
