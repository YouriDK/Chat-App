import { FC } from 'react';
import { ClockLoader } from 'react-spinners';
import styled from 'styled-components';
import DisplayText from '../Components/DisplayText';
import { BIGCSS, inter } from '../Types/Spinners';

const People: FC<any> = (): JSX.Element => {
  return (
    <PeopleContainer>
      {' '}
      <DisplayText text={"People page's under construction 🏗"} />
      <br />
      <br />
      <br />
      <ClockLoader color={inter} loading css={BIGCSS} size={150} />
    </PeopleContainer>
  );
};

const PeopleContainer = styled.div`
  margin: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
export default People;
