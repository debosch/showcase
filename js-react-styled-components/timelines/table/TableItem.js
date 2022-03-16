import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components/macro';
import { ReactComponent as CreateTemplateIcon } from '../../../../assets/images/explore-timelines/icon_create-template.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/images/explore-timelines/icon_delete.svg';
import { ReactComponent as DuplicateIcon } from '../../../../assets/images/explore-timelines/icon_duplicate.svg';
import { ReactComponent as ExportIcon } from '../../../../assets/images/explore-timelines/icon_export.svg';
import { downloadTimelines } from '../../../../containers/explore-timelines/actions';
import { lastModified } from '../../../../utils/lastModifyingTime';
import TableItemAction from './TableItemAction';

const TableItem = ({ timeline, rowClass, colClass, onTimelineSelect, selected, downloadTimelinesAction }) => {
  const formatLastModifiedTime = (milliseconds) => {
    const { timePassed, timeType } = lastModified(milliseconds);
    return `${timePassed} ${timeType} ago`;
  };

  const onExport = () => {
    downloadTimelinesAction([timeline.savedObjectId], `${timeline.title}.ndjson`);
  };

  const checkboxDisabled = !timeline.savedObjectId ? 'checkbox_disabled' : '';

  return (
    <Item className={rowClass}>
      <ItemColumn className={colClass}>
        <label className="checkbox">
          <StyledInput
            disabled={checkboxDisabled}
            className={`checkbox__input ${checkboxDisabled}`}
            type="checkbox"
            checked={selected}
            onChange={(event) => onTimelineSelect(event, timeline.savedObjectId)}
          />
          <span className="checkbox__label checkbox__label_primary" />
        </label>
      </ItemColumn>
      <ItemColumn className="table-item__name">{timeline.title}</ItemColumn>
      <ItemColumn className="table-item__description">{timeline.description}</ItemColumn>
      <ItemColumn>{formatLastModifiedTime(timeline.updated)}</ItemColumn>
      <ItemColumn>{timeline.updatedBy}</ItemColumn>
      <ItemColumn>{timeline.pinnedEventIds.length}</ItemColumn>
      <ItemColumn>{timeline.notes.filter((note) => note.note).length}</ItemColumn>
      <ItemColumn>{timeline.favorite.length}</ItemColumn>
      <ItemColumn className="table-item__actions">
        <TableItemAction onClick={() => {}}>
          <CreateTemplateIcon />
        </TableItemAction>
        <TableItemAction onClick={() => {}}>
          <DuplicateIcon />
        </TableItemAction>
        <TableItemAction onClick={onExport}>
          <ExportIcon />
        </TableItemAction>
        <TableItemAction onClick={() => {}}>
          <DeleteIcon />
        </TableItemAction>
      </ItemColumn>
    </Item>
  );
};

TableItem.propTypes = {
  timeline: PropTypes.object,
  rowClass: PropTypes.string,
  colClass: PropTypes.string,
  onTimelineSelect: PropTypes.func,
  selected: PropTypes.bool,
  downloadTimelinesAction: PropTypes.func,
};

const Item = styled.tr`
  border-top: 1px solid var(--cs-general--line-color);

  &:hover {
    background-color: var(--cs-ui--button-hover-color);
  }
`;

const ItemColumn = styled.td`
  color: var(--cs-fonts--label-color);
  vertical-align: middle;
  padding: 10px 0 10px 5px;

  &:not(:first-child) {
    padding-left: 10px;
  }

  &.table-item__name {
    color: var(--cs-general--brand-color);
  }

  &.table-item__description {
    max-width: 200px;
  }

  &.table-item__actions {
    text-align: end;
  }

  &:last-child {
    min-width: 100px;
  }
`;

const StyledInput = styled.input``;

const mapDispatchToProps = (dispatch) => ({
  downloadTimelinesAction: bindActionCreators(downloadTimelines, dispatch),
});

export default connect(null, mapDispatchToProps)(TableItem);
