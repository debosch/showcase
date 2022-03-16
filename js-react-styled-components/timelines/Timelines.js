import React from 'react';
import styled from 'styled-components/macro';
import TimelinesContent from './TimelinesContentContainer';

const Timelines = () => {
  return (
    <TimelinesPage>
      <TimelinesContent />
    </TimelinesPage>
  );
};

const TimelinesPage = styled.div`
  padding-left: 20px;
`;

export default Timelines;
