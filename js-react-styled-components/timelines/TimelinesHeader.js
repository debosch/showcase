import React from 'react';
import styled from 'styled-components/macro';
import TimelinesMenu from './TimelinesMenu';

const TimelinesHeader = () => {
  return (
    <Header>
      <HeaderText>Timelines</HeaderText>
      <HeaderNavigation>
        <TimelinesMenu />
      </HeaderNavigation>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const HeaderText = styled.h1`
  color: var(--cs-fonts--label-color);
  text-transform: uppercase;
  font-size: 47px;
`;

const HeaderNavigation = styled.div`
  position: relative;
  width: 250px;
  height: 40px;
`;

export default TimelinesHeader;
