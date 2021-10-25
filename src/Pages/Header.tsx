import React, { FC } from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const Header: FC<any> = (): JSX.Element => {
  const [user] = useAuthState(auth);
  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          onClick={() => auth.signOut()} // * Permet  de déconnecter en cliquant sur l'avatar
          alt={user?.displayName || ''}
          src={user?.photoURL || ''}
        />
        <AccessTimeIcon />
      </HeaderLeft>

      <HeaderSearch>
        <SearchIcon />
        <input placeholder='Search' />
      </HeaderSearch>

      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
};

// * Config avec Styled-Components
// ! Les Flex permettent de détermliner le pourcentage qu'il va avoir sur la page en largeuy
const HeaderSearch = styled.div`
  display: flex;
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  padding: 0 50px;
  color: gray;
  border: 1px gray solid;
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: white;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: white;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

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
  flex: 0.3;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;
export default Header;
