import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import { getTimelinesList } from '../../../../containers/explore-timelines/actions';
import HeaderButton from './HeaderButton';
import HeaderDropdown from './HeaderDropdown';

const TableHeader = ({ timelinesAmount, selectedTimelinesAmount, getTimelinesListAction, currentPage, onRefresh }) => {
  const FormattedInfo = () => {
    return `Showing: ${timelinesAmount} timelines | Selected ${selectedTimelinesAmount} timelines`;
  };

  const onRefreshClick = () => {
    getTimelinesListAction(
      currentPage.source,
      currentPage.page,
      currentPage.perPage,
      currentPage.search,
      currentPage.favorite
    ).then(() => {
      onRefresh && onRefresh();
    });
  };

  return (
    <Header>
      <TimelinesTableInfo>{FormattedInfo()}</TimelinesTableInfo>
      <HeaderDropdown />
      <HeaderButton
        label="Refresh"
        onClick={() => {
          onRefreshClick();
        }}
      />
    </Header>
  );
};

TableHeader.propTypes = {
  timelinesAmount: PropTypes.number,
  selectedTimelinesAmount: PropTypes.number,
  getTimelinesListAction: PropTypes.func,
  currentPage: PropTypes.object,
  onRefresh: PropTypes.func,
};

const Header = styled.header`
  display: flex;
  margin-bottom: 15px;
`;

const TimelinesTableInfo = styled.p`
  display: inline;
  font-family: 'Industry', sans-serif;
  color: var(--cs-fonts--text-color);
  line-height: 18px;
  font-size: 14px;
  margin-right: 25px;
`;

const mapDispatchToProps = (dispatch) => ({
  getTimelinesListAction: bindActionCreators(getTimelinesList, dispatch),
});

export default connect(null, mapDispatchToProps)(TableHeader);
