import React, { FC, MouseEventHandler, useContext } from 'react';
import styled from 'styled-components';
import { GrStatusUnknown } from 'react-icons/gr';

import { ChatAppContext } from '../firebase';

interface SideBarOptionProps {
  Icon: any;
  title: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  id?: string;
}
const SideBarOption: FC<SideBarOptionProps> = ({
  Icon,
  title,
  onClick,
}): JSX.Element => {
  const { chatAppContext } = useContext(ChatAppContext);
  return (
    <SideBarOptionConatiner onClick={onClick}>
      {Icon ? (
        <>
          <Icon
            size={chatAppContext.isMobile ? 40 : 35}
            style={{ padding: 10 }}
          />
          <h3> {title} </h3>
        </>
      ) : (
        <>
          <GrStatusUnknown
            size={chatAppContext.isMobile ? 40 : 35}
            style={{ padding: 10 }}
          />
          <h3> {title} </h3>
        </>
      )}
    </SideBarOptionConatiner>
  );
};

const SideBarOptionConatiner = styled.div`
  display: flex;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  margin-top: 10px;
  :hover {
    opacity: 0.8;
    background-color: var(--dark-background);
  }

  > h3 {
    font-weight: 500;
    font-size: 1.75rem;
  }

  > h3 > span {
    padding: 15px;
  }
`;

export default SideBarOption;
