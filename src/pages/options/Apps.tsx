import { FC } from 'react';
import { ClockLoader } from 'react-spinners';
import styled from 'styled-components';
import { inter } from '../../Types/Spinners';
import DisplayText from '../../components/DisplayText';

const Apps: FC<any> = (): JSX.Element => {
  return (
    <AppsContainer>
      {' '}
      <DisplayText text={"Application Page's under construction 🏗"} />
      <br />
      <br />
      <br />
      <ClockLoader color={inter} loading size={150} />
    </AppsContainer>
  );
};

const AppsContainer = styled.div`
  margin: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
export default Apps;
