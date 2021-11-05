import { FC } from 'react';
import styled from 'styled-components';
import DisplayText from '../Components/DisplayText';

const Home: FC<any> = (): JSX.Element => {
  return (
    <HomeContainer>
      <HomeHeader>
        <DisplayText text='Home Page' />
      </HomeHeader>
      <p>
        Chat app with React, Redux, Firebase , Styled-components technology.
      </p>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  background-color: var(--primary);
  flex: 0.7;
  flex-grow: 1;
  margin-top: 60px;
  max-width: 85%;

  > p {
    text-align: center;
  }
`;
const HomeHeader = styled.div`
  margin-top: 25px;
  text-align: center;
`;
export default Home;
