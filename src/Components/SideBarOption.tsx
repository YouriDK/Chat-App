import React, { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { GrStatusUnknown } from 'react-icons/gr';

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
  return (
    <SideBarOptionConatiner onClick={onClick}>
      {Icon ? (
        <>
          <Icon size={35} style={{ padding: 10 }} />
          <h3> {title} </h3>
        </>
      ) : (
        <>
          <GrStatusUnknown size={35} style={{ padding: 10 }} />
          <h3> {title} </h3>
        </>
      )}
    </SideBarOptionConatiner>
  );
};

const SideBarOptionConatiner = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
    background-color: var(--dark-background);
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

export default SideBarOption;
