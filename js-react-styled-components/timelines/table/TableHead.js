import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import { ReactComponent as ArrowIcon } from '../../../../assets/images/arrow-back.svg';
import { ReactComponent as ChatIcon } from '../../../../assets/images/explore-timelines/icon_chat.svg';
import { ReactComponent as PinIcon } from '../../../../assets/images/explore-timelines/icon_pin.svg';
import { ReactComponent as StarIcon } from '../../../../assets/images/explore-timelines/icon_star.svg';
import { setTimelines } from '../../../../containers/explore-timelines/actions';
import sortTypes from '../kit/SortTypes';
import TableItemAction from './TableItemAction';

const TableHead = ({ timelines, selectedTimelines, onAllTimelinesSelect, sortType, setSortType }) => {
  const handleSelectAll = (event, timelines) => {
    const timelinesIds = timelines.map((timeline) => timeline.savedObjectId);

    onAllTimelinesSelect && onAllTimelinesSelect(event, timelinesIds);
  };

  const handleSortTypeChange = () => {
    switch (sortType) {
      case sortTypes.BY_LAST_MODIFIED_FIRST:
        setSortType(sortTypes.BY_LAST_MODIFIED_LAST);
        break;

      case sortTypes.BY_LAST_MODIFIED_LAST:
        setSortType(sortTypes.BY_LAST_MODIFIED_FIRST);
        break;
    }
  };

  const areTimelinesSelected = selectedTimelines.size === timelines?.length && timelines.length;

  return (
    <THead>
      <TableHeadRow>
        <TableHeadRowTitle>
          <label className="checkbox">
            <input
              checked={areTimelinesSelected}
              onChange={(event) => handleSelectAll(event, timelines)}
              className="checkbox__input"
              type="checkbox"
            />
            <span className="checkbox__label checkbox__label_primary" />
          </label>
        </TableHeadRowTitle>
        <TableHeadRowTitle>Timeline Name</TableHeadRowTitle>
        <TableHeadRowTitle>Description</TableHeadRowTitle>
        <TableHeadRowTitle>
          <TableItemAction onClick={handleSortTypeChange} buttonClass="table__last-modified">
            Last modified
            <IconContainer sortType={sortType}>
              <ArrowIcon />
            </IconContainer>
          </TableItemAction>
        </TableHeadRowTitle>
        <TableHeadRowTitle>Modified By</TableHeadRowTitle>
        <TableHeadRowTitle>
          <PinIcon />
        </TableHeadRowTitle>
        <TableHeadRowTitle>
          <ChatIcon />
        </TableHeadRowTitle>
        <TableHeadRowTitle>
          <StarIcon />
        </TableHeadRowTitle>
      </TableHeadRow>
    </THead>
  );
};

TableHead.propTypes = {
  onAllTimelinesSelect: PropTypes.func,
  selectedTimelines: PropTypes.object,
  timelines: PropTypes.array,
  setTimelinesAction: PropTypes.func,
  byLastModified: PropTypes.bool,
  sortType: PropTypes.string,
  setSortType: PropTypes.func,
};

const THead = styled.thead`
  color: var(--cs-fonts--text-color);
`;

const TableHeadRow = styled.tr``;

const TableHeadRowTitle = styled.th`
  vertical-align: middle;
  padding: 10px 0 10px 5px;

  button {
    padding-left: 0;
  }

  .table__last-modified {
    color: var(--cs-fonts--text-color);
  }

  &:not(:first-child) {
    padding-left: 10px;
  }

  &:first-child {
    width: 18px;
  }
`;

const IconContainer = styled.span`
  svg {
    fill-rule: nonzero;
    vertical-align: middle;
    margin-left: 5px;
    transform: rotate(${({ sortType }) => (sortType === sortTypes.BY_LAST_MODIFIED_FIRST ? `-90deg` : `90deg`)});
  }
`;

const mapDispatchToProps = (dispatch) => ({
  setTimelinesAction: bindActionCreators(setTimelines, dispatch),
});

export default connect(null, mapDispatchToProps)(TableHead);
