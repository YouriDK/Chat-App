import { FC } from 'react';
import { ClockLoader } from 'react-spinners';
import styled from 'styled-components';
import DisplayText from '../../components/DisplayText';
import { BIGCSS, primary } from '../../Types/Spinners';

const Threads: FC<any> = (): JSX.Element => {
  return (
    <ThreadContainer>
      <DisplayText text={"Threads Page's under construction 🏗"} />
      <br />
      <br />
      <br />
      <ClockLoader color={primary} loading css={BIGCSS} size={150} />
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
