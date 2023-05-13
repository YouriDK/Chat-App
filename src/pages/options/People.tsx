import { FC } from 'react';
import { ClockLoader } from 'react-spinners';
import styled from 'styled-components';
import DisplayText from '../../components/DisplayText';
import { BIGCSS, primary } from '../../Types/Spinners';

const People: FC<any> = (): JSX.Element => {
  return (
    <PeopleContainer>
      {' '}
      <DisplayText text={"People page's under construction 🏗"} />
      <br />
      <br />
      <br />
      <ClockLoader color={primary} loading /*css={BIGCSS}*/ size={150} />
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
