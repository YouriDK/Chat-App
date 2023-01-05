import { FC, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiFillClockCircle, AiOutlineSearch } from 'react-icons/ai';
import { GoSignOut } from 'react-icons/go';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import { sleep } from '../Utils/utils';
import { setVisibleMenu } from '../Middleware/actions/chatActions';

const Header: FC<any> = (): JSX.Element => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const isMobile = useSelector((state: any) => state.isMobile.isMobile);
  const showMenu = useSelector((state: any) => state.showMenu.showMenu);
  const handleFeatureComing = async () => {
    const temp = search;
    setSearch('Feature incoming.....');
    await sleep(2000);
    setSearch(temp);
  };

  const handleMenu = () => {
    // console.log('handleMenu', showMenu);
    // console.log('isMobile', isMobile);
    dispatch(setVisibleMenu(!showMenu));
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
          placeholder='Search...'
          style={{ border: 'none', color: 'white', minWidth: '30px' }}
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

      {isMobile ? (
        <div className='header-right'>
          {showMenu ? (
            <BsToggleOn
              size={30}
              style={{
                color: 'var(--primary)',
                cursor: 'pointer',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
              onClick={() => dispatch(setVisibleMenu(!showMenu))}
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
              onClick={() => dispatch(setVisibleMenu(!showMenu))}
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
