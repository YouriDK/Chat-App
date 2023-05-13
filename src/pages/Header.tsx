import { FC, useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiFillClockCircle, AiOutlineSearch } from 'react-icons/ai';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { GoSignOut } from 'react-icons/go';
import { sleep } from '../Utils/utils';
import { ChatAppContext, auth } from '../firebase';

const Header: FC<any> = (): JSX.Element => {
  const [user] = useAuthState(auth);
  const { chatAppContext, setChatAppContext } = useContext(ChatAppContext);

  const [search, setSearch] = useState('');

  const handleFeatureComing = async () => {
    const temp = search;
    setSearch('Feature incoming.....');
    await sleep(2000);
    setSearch(temp);
  };

  return (
    <header className='flex justify-between secondary'>
      <GoSignOut
        size={30}
        onClick={() => auth.signOut()}
        className='c-primary'
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          marginLeft: '15px',
          cursor: 'pointer',
        }}
      />

      <div
        className='flex justify-between header-search'
        style={{
          flex: '0.4',
          borderRadius: '10px',
          textAlign: 'center',
          padding: '3px 10px',
        }}
      >
        <AiFillClockCircle
          size={30}
          onClick={handleFeatureComing}
          className='c-primary icon'
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        />

        <input
          className='bg-transparent text-center outline-0'
          placeholder='...'
          style={{
            border: 'none',
            color: 'white',
            minWidth: '30px',
            maxWidth: `${chatAppContext.isMobile ? '100px' : 'auto'}`,
          }}
          name='search'
          id='search'
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />

        <AiOutlineSearch
          size={30}
          className='icon'
          style={{
            color: 'var(--primary)',
            cursor: 'pointer',
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
          onClick={handleFeatureComing}
        />
      </div>

      {chatAppContext.isMobile ? (
        <div className='header-right'>
          {chatAppContext.showMenu ? (
            <BsToggleOn
              size={30}
              style={{
                color: 'var(--primary)',
                cursor: 'pointer',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
              onClick={() =>
                setChatAppContext({
                  showMenu: !chatAppContext.showMenu,
                  isMobile: chatAppContext.isMobile,
                })
              }
            />
          ) : (
            <BsToggleOff
              size={30}
              style={{
                color: 'var(--primary)',
                cursor: 'pointer',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
              onClick={() =>
                setChatAppContext({
                  showMenu: !chatAppContext.showMenu,
                  isMobile: chatAppContext.isMobile,
                })
              }
            />
          )}
        </div>
      ) : (
        <div className='header-right'>
          <img
            className='header-avatar'
            // * Permet  de déconnecter en cliquant sur l'avatar
            style={{ borderRadius: '55px', maxHeight: '60px' }}
            alt={user?.displayName || ''}
            src={user?.photoURL || ''}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
