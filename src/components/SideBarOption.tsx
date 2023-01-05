import React, { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { GrStatusUnknown } from 'react-icons/gr';
import { useSelector } from 'react-redux';

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
  const isMobile = useSelector((state: any) => state.isMobile.isMobile);
  return (
    <SideBarOptionConatiner onClick={onClick}>
      {Icon ? (
        <>
          <Icon size={isMobile ? 40 : 35} style={{ padding: 10 }} />
          {!isMobile && <h3> {title} </h3>}
        </>
      ) : (
        <>
          <GrStatusUnknown size={isMobile ? 40 : 35} style={{ padding: 10 }} />
          {!isMobile && <h3> {title} </h3>}
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
