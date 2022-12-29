import { FC } from 'react';
import { ClockLoader } from 'react-spinners';
import styled from 'styled-components';
import DisplayText from '../components/DisplayText';
import { BIGCSS, primary } from '../Types/Spinners';

const Saved: FC<any> = (): JSX.Element => {
  return (
    <SavedConatiner>
      <DisplayText text={"Saved Page's under construction 🏗"} />
      <br />
      <br />
      <br />
      <ClockLoader color={primary} loading css={BIGCSS} size={150} />
    </SavedConatiner>
  );
};

const SavedConatiner = styled.div`
  margin: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
export default Saved;
