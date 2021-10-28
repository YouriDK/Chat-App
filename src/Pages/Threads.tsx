import { FC } from 'react';
import { ClockLoader } from 'react-spinners';
import styled from 'styled-components';
import DisplayText from '../Components/DisplayText';
import { BIGCSS, inter } from '../Types/Spinners';

const Threads: FC<any> = (): JSX.Element => {
  return (
    <ThreadContainer>
      {' '}
      <DisplayText text={"Threads Page's under construction 🏗"} />
      <br />
      <br />
      <br />
      <ClockLoader color={inter} loading css={BIGCSS} size={150} />
    </ThreadContainer>
  );
};

const ThreadContainer = styled.div`
  margin: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
export default Threads;
