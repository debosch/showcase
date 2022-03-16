import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import TimelinesContent from './TimelinesContent';
import TimelinesHeader from './TimelinesHeader';

const TimelinesContentContainer = () => {
  return (
    <TimelinesListWrapper>
      <TimelinesListHeader>
        <TimelinesHeader />
      </TimelinesListHeader>
      <TimelinesContent />
    </TimelinesListWrapper>
  );
};

TimelinesContentContainer.propTypes = {
  getTimelinesListAction: PropTypes.func,
  selectedCompany: PropTypes.number,
  currentPage: PropTypes.object,
};

const TimelinesListWrapper = styled.div``;

const TimelinesListHeader = styled.section``;

export default TimelinesContentContainer;
