import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import { setTimelines } from '../../../../containers/explore-timelines/actions';
import sortTypes from '../kit/SortTypes';
import TableBody from './TableBody';
import TableHead from './TableHead';
import TableHeader from './TableHeader';

const Table = ({ timelinesList, currentPage, isLoading, setTimelinesAction }) => {
  const [selectedTimelines, setSelectedTimelines] = useState(new Set());
  const [sortType, setSortType] = useState(sortTypes.BY_LAST_MODIFIED_FIRST);

  useEffect(() => {
    setSortType(sortTypes.BY_LAST_MODIFIED_FIRST);
  }, [currentPage]);

  useEffect(() => {
    sortTimelines(timelinesList.timeline || [], sortType);
  }, [sortType]);

  const onTimelineSelect = (event, timelineId) => {
    const { target } = event;
    const newSelectedTimelines = new Set(selectedTimelines);
    if (target.checked) {
      newSelectedTimelines.add(timelineId);
    } else {
      newSelectedTimelines.delete(timelineId);
    }

    setSelectedTimelines(newSelectedTimelines);
  };

  const onAllTimelinesSelect = (event, timelineIds) => {
    const { target } = event;
    const newSelectedTimelines = new Set(selectedTimelines);
    timelineIds.map((id) => (target.checked ? newSelectedTimelines.add(id) : newSelectedTimelines.delete(id)));
    setSelectedTimelines(newSelectedTimelines);
  };

  const clearSelectedTimelines = () => {
    const emptySet = new Set();
    setSelectedTimelines(emptySet);
  };

  const compareDates = (firstDate, secondDate) => {
    if (firstDate === secondDate) return 0;
    return firstDate > secondDate ? 1 : -1;
  };

  const sortTimelines = (timelines, sortType) => {
    let sortedTimelines;

    switch (sortType) {
      case sortTypes.BY_LAST_MODIFIED_FIRST:
        sortedTimelines = timelines.sort((prevTimeline, nextTimeline) =>
          compareDates(nextTimeline.updated, prevTimeline.updated)
        );
        break;

      case sortTypes.BY_LAST_MODIFIED_LAST:
        sortedTimelines = timelines.sort((prevTimeline, nextTimeline) =>
          compareDates(prevTimeline.updated, nextTimeline.updated)
        );
        break;

      default:
        sortedTimelines = [];
    }

    setTimelinesAction(sortedTimelines);
  };

  const onRefresh = () => {
    clearSelectedTimelines();
    sortTimelines(timelinesList?.timeline, sortType);
  };

  return (
    <TimelinesTableSection>
      <TableHeader
        timelinesAmount={timelinesList.totalCount || 0}
        selectedTimelinesAmount={selectedTimelines.size}
        currentPage={currentPage}
        onRefresh={onRefresh}
      />
      <StyledTable>
        <TableHead
          onAllTimelinesSelect={onAllTimelinesSelect}
          selectedTimelines={selectedTimelines}
          timelines={timelinesList?.timeline}
          sortType={sortType}
          setSortType={(changedSortType) => setSortType(changedSortType)}
        />
        <TableBody
          timelinesList={timelinesList?.timeline}
          selectedTimelines={selectedTimelines}
          isLoading={isLoading}
          onTimelineSelect={(event, timelineId) => onTimelineSelect(event, timelineId)}
        />
      </StyledTable>
    </TimelinesTableSection>
  );
};

Table.propTypes = {
  timelinesList: PropTypes.object,
  selectedTimelines: PropTypes.object,
  selectedCompany: PropTypes.number,
  currentPage: PropTypes.object,
  isLoading: PropTypes.bool,
  setTimelinesAction: PropTypes.func,
};

const TimelinesTableSection = styled.section`
  position: relative;
`;

const StyledTable = styled.table``;

const mapStateToProps = (state) => ({
  timelinesList: state.exploreTimelines.timelinesList,
  currentPage: state.exploreTimelines.currentPage,
  isLoading: state.exploreTimelines.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  setTimelinesAction: bindActionCreators(setTimelines, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
