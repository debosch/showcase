import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import LoadingSpinner from '../../../ui/LoadingSpinner/LoadingSpinner';
import TableItem from './TableItem';

const TableBody = ({ timelinesList, selectedTimelines, isLoading, onTimelineSelect }) => {
  const fillTableBody = () => {
    return timelinesList?.map((timeline) => {
      return (
        <TableItem
          timeline={timeline}
          key={timeline.savedObjectId}
          selected={selectedTimelines.has(timeline.savedObjectId)}
          onTimelineSelect={(event) => onTimelineSelect(event, timeline.savedObjectId)}
        />
      );
    });
  };

  return (
    <Body isLoading={isLoading}>
      {isLoading ? (
        <LoadingRowWrapper>
          <LoadingColWrapper rowspan="0">
            <LoadingSpinner />
          </LoadingColWrapper>
        </LoadingRowWrapper>
      ) : (
        fillTableBody()
      )}
    </Body>
  );
};

TableBody.propTypes = {
  timelinesList: PropTypes.array,
  isLoading: PropTypes.bool,
  onTimelineSelect: PropTypes.func,
  selectedTimelines: PropTypes.object,
};

const Body = styled.tbody`
  height: ${({ isLoading }) => (isLoading ? '300px' : 'fit-content')};
`;

const LoadingRowWrapper = styled.tr`
  line-height: 300px;
`;

const LoadingColWrapper = styled.td``;

export default TableBody;
