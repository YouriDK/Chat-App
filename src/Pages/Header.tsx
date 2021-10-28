import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Avatar } from '@material-ui/core';
import { AiFillClockCircle, AiOutlineSearch } from 'react-icons/ai';
import { GoSignOut } from 'react-icons/go';
import { Button } from 'reactstrap';
import MesssageBox from '../Components/MesssageBox';
import { sleep } from '../Utils/sleep';

const Header: FC<any> = (): JSX.Element => {
  const [user] = useAuthState(auth);
  const [search, setSearch] = useState('');
  const [alert, setAlert] = useState(false);
  const handleFeatureComing = async () => {
    setAlert(true);
    await sleep(2000);
    setAlert(false);
  };
  return (
    <HeaderContainer>
      <HeaderLeft>
        <Button
          onClick={() => auth.signOut()}
          style={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: 'white',
          }}
        >
          <span>
            <GoSignOut size={20} />
          </span>
        </Button>
      </HeaderLeft>

      <HeaderSearch>
        <div
          className='icon'
          onClick={handleFeatureComing}
          style={{ cursor: 'pointer' }}
        >
          <AiFillClockCircle
            size={25}
            onClick={handleFeatureComing}
            style={{ color: 'var(--primary)' }}
          />
        </div>
        <input
          placeholder='Search...'
          name='search'
          id='search'
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
        />
        <div
          className='icon'
          onClick={handleFeatureComing}
          style={{ cursor: 'pointer' }}
        >
          <AiOutlineSearch size={25} style={{ color: 'var(--primary)' }} />
        </div>
      </HeaderSearch>

      <HeaderRight>
        {alert && <MesssageBox variant='info' text='feature incoming' />}
        <HeaderAvatar
          // * Permet  de déconnecter en cliquant sur l'avatar
          alt={user?.displayName || ''}
          src={user?.photoURL || ''}
        />
      </HeaderRight>
    </HeaderContainer>
  );
};

// * Config avec Styled-Components
// ! Les Flex permettent de détermliner le pourcentage qu'il va avoir sur la page en largeuy
const HeaderSearch = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: var(--lg-background);
  text-align: center;
  padding: 3px 10px;
  color: gray;
  border: 1px var(--primary) solid;
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }
  > .icon :hover {
    opacity: 0.6;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--background);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 10px;
  > Button :hover {
    opacity: 0.8;
  }
  // * Pour configurer l'icone
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 0.3;
  margin-left: auto;
  margin-right: 20px;
`;
export default Header;
