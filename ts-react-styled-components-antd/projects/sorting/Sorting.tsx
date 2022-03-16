import React, { FC, useState } from 'react';
import { Sort, LeftFilter, Label } from './Styles';
import { ReactComponent as TopArrow } from '../../../../../../assets/icons/arrowTop.svg';
import { ReactComponent as Scale } from '../../../../../../assets/icons/Group 2321.svg';
import { SerializedStyles } from '@emotion/react';
import { Checkbox } from 'antd';
import {
  InputEventType,
  CheckboxEventType,
} from '../../../../../../ts/types/input.type';
import moment from 'moment';
import {
  getFiltersObject,
  getSortArray,
} from '../../../../../../utils/projects/searchQuery';
import {
  IFilters,
  ISort,
  IProjectFilters,
} from '../../../../../../ts/interfaces/projects';
import { SortTypes, SortFlags } from '../../../../../../ts/enums/projects';

interface ISortingProps {
  className?: SerializedStyles;
  onFiltersChange?: (filters: IProjectFilters) => void;
  onSortChange?: (sort: Array<Array<string>>) => void;
}

const defaultSortState: ISort = {
  name: { order: SortTypes.desc, flag: SortFlags.string },
  deadline: { order: SortTypes.asc, flag: SortFlags.regular },
};

const Sorting: FC<ISortingProps> = ({
  className,
  onFiltersChange,
  onSortChange,
}) => {
  const [sort, setSort] = useState<ISort>(defaultSortState);
  const [filters, setFilters] = useState<IFilters>({});

  const updateFilters = (
    checked: boolean,
    field: string,
    deadlineTime: string,
  ) => {
    const newFilters = { ...filters };

    if (checked) {
      const currentTime = moment().toISOString();
      newFilters[field] =
        field === 'expiring'
          ? [currentTime, deadlineTime]
          : [deadlineTime, currentTime];
      setFilters(newFilters);
    } else {
      delete newFilters[field];
      setFilters(newFilters);
    }

    onFiltersChange?.(getFiltersObject(newFilters));
  };

  const updateSort = (checked: boolean, field: string) => {
    const newSort = { ...sort };

    if (checked) {
      newSort[field].order = SortTypes.asc;
    } else {
      newSort[field].order = SortTypes.desc;
    }

    setSort(newSort);
    onSortChange?.(getSortArray(newSort));
  };

  const onOverdueChange = (e: InputEventType | CheckboxEventType) => {
    updateFilters(
      e.target.checked,
      'overdue',
      moment().subtract(100, 'years').toISOString(),
    );
  };

  const onExpiringChange = (e: InputEventType | CheckboxEventType) => {
    updateFilters(
      e.target.checked,
      'expiring',
      moment().add(30, 'days').toISOString(),
    );
  };

  const onNameSortChange = (e: InputEventType) => {
    updateSort(e.target.checked, 'name');
  };

  const onDeadlineSortChange = (e: InputEventType) => {
    updateSort(e.target.checked, 'deadline');
  };

  return (
    <Sort css={className}>
      <LeftFilter>
        <Checkbox onChange={onOverdueChange}>Просроченные</Checkbox>
        <Checkbox onChange={onExpiringChange}>Истекающие</Checkbox>
        <Label>
          {sort.name.order === SortTypes.desc ? 'А-Я' : 'Я-А'}
          <TopArrow />
          <input type='checkbox' onChange={onNameSortChange} />
        </Label>
        <Label rotateIcon={sort.deadline.order === SortTypes.desc}>
          Дедлайн <Scale />
          <input type='checkbox' onChange={onDeadlineSortChange} />
        </Label>
      </LeftFilter>
    </Sort>
  );
};

export default Sorting;
