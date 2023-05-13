import { FC } from 'react';
import { ClockLoader } from 'react-spinners';
import styled from 'styled-components';
import DisplayText from '../../components/DisplayText';
import { primary } from '../../Types/Spinners';

const Channel: FC<any> = (): JSX.Element => {
  return (
    <ChannelContainer>
      {' '}
      <DisplayText text={"Channel Browser Page's under construction 🏗"} />
      <br />
      <br />
      <br />
      <ClockLoader color={primary} loading size={150} />
    </ChannelContainer>
  );
};

const ChannelContainer = styled.div`
  margin: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
export default Channel;
