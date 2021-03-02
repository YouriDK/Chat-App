import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";

export default function Header() {
  return (
    <HeaderContainer>
      {/* Header Left */}
      <HeaderLeft>
        <HeaderAvatar
        // TODO : Add onClick
        />
      </HeaderLeft>
      {/* Header Middle */}

      {/* Header Right */}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div``;

const HeaderLeft = styled.div``;

const HeaderAvatar = styled(Avatar)``;
