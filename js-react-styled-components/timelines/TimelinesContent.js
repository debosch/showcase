import { debounce } from 'lodash/function';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import { getTimelinesList } from '../../../containers/explore-timelines/actions';
import { updateCurrentPageProperties } from '../../../containers/explore-timelines/actions';
import Pagination from '../../ui/Pagination';
import PaginationInput from './kit/PaginationInput';
import FilterItem from './search/FilterItem';
import Filters from './search/Filters';
import TimelinesSearch from './search/TimelinesSearch';
import Table from './table/Table';
import TimelinesControls from './TimelinesControls';

const TimelinesContent = ({
  timelinesList,
  currentPage,
  getTimelinesListAction,
  selectedCompany,
  updateCurrentPagePropertiesAction,
}) => {
  const debouncedInputChange = useCallback(
    debounce((value) => {
      updateCurrentPagePropertiesAction(value);
    }, 600),
    []
  );

  useEffect(() => {
    if (selectedCompany < 0) return;
    getTimelinesListAction(
      currentPage.source,
      currentPage.page,
      currentPage.perPage,
      currentPage.search,
      currentPage.favorite
    );
  }, [selectedCompany, currentPage.perPage]);

  const totalPagesAmount = Math.ceil(timelinesList?.totalCount / currentPage.perPage) || 1;

  const onClickNext = (nextPage) => {
    getTimelinesListAction(currentPage.source, nextPage, currentPage.perPage, currentPage.search, currentPage.favorite);
    updateCurrentPagePropertiesAction({ page: nextPage });
  };

  const onClickPrev = (prevPage) => {
    getTimelinesListAction(currentPage.source, prevPage, currentPage.perPage, currentPage.search, currentPage.favorite);
    updateCurrentPagePropertiesAction({ page: prevPage });
  };

  const onSearch = (value) => {
    getTimelinesListAction(currentPage.source, 1, currentPage.perPage, value, currentPage.favorite);
  };

  const onSearchChanged = (value) => {
    debouncedInputChange({ search: value });
  };

  const onFilterSelect = (isSelected) => {
    updateCurrentPagePropertiesAction({ favorite: isSelected });
    getTimelinesListAction(currentPage.source, 1, currentPage.perPage, currentPage.search, isSelected);
  };

  const onRowsPerPageChanged = (rows) => {
    if (rows < 1) rows = 1;
    debouncedInputChange({ perPage: rows });
  };

  return (
    <TimelinesContentSection>
      <ContentControls>
        <PaginationContainer>
          <StyledPagination
            totalCount={timelinesList?.totalCount}
            currentPage={currentPage.page}
            onClickNext={() => onClickNext(currentPage.page + 1)}
            onClickPrev={() => onClickPrev(currentPage.page - 1)}
            disabledPrev={currentPage.page <= 1}
            disabledNext={currentPage.page >= totalPagesAmount}
            totalPages={totalPagesAmount}
          />
          <PaginationInput placeholder={currentPage.perPage} onChange={(value) => onRowsPerPageChanged(value)} />
        </PaginationContainer>
        <TimelinesControls />
      </ContentControls>

      <SearchActionsContainer>
        <TimelinesSearch onChange={onSearchChanged} onSearch={onSearch} />
        <Filters>
          <FilterItem
            label="Only favorites"
            amount={timelinesList?.favoriteCount}
            onSelect={(isSelected) => onFilterSelect(isSelected)}
          />
        </Filters>
      </SearchActionsContainer>
      <Table currentPage={currentPage} />
    </TimelinesContentSection>
  );
};

TimelinesContent.propTypes = {
  timelinesList: PropTypes.object,
  currentPage: PropTypes.object,
  getTimelinesListAction: PropTypes.func,
  selectedCompany: PropTypes.number,
  updateCurrentPagePropertiesAction: PropTypes.func,
};

const TimelinesContentSection = styled.section``;

const ContentControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const PaginationContainer = styled.div``;

const StyledPagination = styled(Pagination)`
  margin-bottom: 10px;
`;

const SearchActionsContainer = styled.span`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const mapStateToProps = (state) => ({
  selectedCompany: state.global.selectedCompany,
  currentPage: state.exploreTimelines.currentPage,
  timelinesList: state.exploreTimelines.timelinesList,
});

const mapDispatchToProps = (dispatch) => ({
  getTimelinesListAction: bindActionCreators(getTimelinesList, dispatch),
  updateCurrentPagePropertiesAction: bindActionCreators(updateCurrentPageProperties, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimelinesContent);
