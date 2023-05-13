import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { FC, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
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
import { useNavigate } from 'react-router-dom';
import SideBarOption from '../components/SideBarOption';
import { ChatAppContext, auth, db } from '../firebase';

interface sideBarOptionsProps {
  Icon: any;
  title: string;
  push: string;
}
interface ChannelProps {
  id: string;
  data: any;
}

const LeftMenu: FC<any> = (): JSX.Element => {
  const [channels, setChannels] = useState<ChannelProps[]>([]);
  const [user] = useAuthState(auth);
  const [options, setOptions] = useState(false);
  const { chatAppContext, setChatAppContext } = useContext(ChatAppContext);

  const letsGoTo = useNavigate();
  const getChannelName = async () => {
    const rooms = collection(db, 'rooms');

    onSnapshot(rooms, async (snapshot: any) => {
      const ChannelArray: ChannelProps[] = [];
      snapshot.docs.forEach((datas: any) => {
        ChannelArray.push({ id: datas.id, data: datas.data() });
      });
      setChannels(ChannelArray);
    });
  };

  useEffect(() => {
    getChannelName();
  }, []);

  const addChannel = async () => {
    const channelName = prompt('Please enter the channel name :');
    if (channelName) {
      const newChannel = await addDoc(collection(db, 'rooms'), {
        name: channelName,
      });

      letsGoTo(`/chat/${newChannel.id}`);
    }

    getChannelName();
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

  const handleLetsGoTo = (direction: string) => {
    if (chatAppContext.isMobile) {
      setChatAppContext({ ...chatAppContext, showMenu: false });
    }
    letsGoTo(direction);
  };
  return (
    <div
      className='left-menu'
      style={{
        color: 'black',
        minWidth: '15%',
        maxHeight: '100%',
        width: `${chatAppContext.isMobile ? '100%' : '260px'}`,
        maxWidth: `${chatAppContext.isMobile ? '100%' : '260px'}`,
        marginTop: '60px',
        borderRadius: '20px',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        overflowY: 'scroll',
        margin: '15px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
      }}
    >
      <div className='flex meanu-header' style={{ padding: '13px' }}>
        <div className='flex menu-info' style={{ flex: 1 }}>
          <>
            {' '}
            <img
              className='header-avatar'
              // * Permet  de déconnecter en cliquant sur l'avatar
              style={{ borderRadius: '55px', maxHeight: '30px' }}
              alt={user?.displayName || ''}
              src={user?.photoURL || ''}
            />
            <h3>{user?.displayName}</h3>
          </>
        </div>
      </div>
      <SideBarOption
        Icon={options ? AiFillMinusCircle : AiFillPlusCircle}
        title='Options'
        onClick={() => setOptions(!options)}
      />
      {options &&
        sideBarOptions.map((sidebar: sideBarOptionsProps, index: number) => (
          <SideBarOption
            key={index}
            Icon={sidebar.Icon}
            onClick={() => handleLetsGoTo(sidebar.push)}
            title={sidebar.title}
          />
        ))}

      <hr />

      <>
        <SideBarOption
          Icon={BiMessageAdd}
          title='Add channel'
          onClick={async () => await addChannel()}
        />

        {channels
          .sort((a: any, b: any) => (a.data.name > b.data.name ? 1 : -1))
          .map((channel: ChannelProps) => (
            <SideBarOption
              Icon={GiConversation}
              key={channel.id}
              title={channel.data.name}
              onClick={() => handleLetsGoTo(`/chat/${channel.id}`)}
            />
          ))}
      </>
    </div>
  );
};

export default LeftMenu;
