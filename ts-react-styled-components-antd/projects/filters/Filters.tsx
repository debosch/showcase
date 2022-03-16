import { FC, useState } from 'react';
import style, { FilterBlock, FilterTitle, FilterWrapper } from './Styles';
import { SerializedStyles } from '@emotion/react';
import PriorityControl from 'src/elements/components/priorityControl/PriorityControl';
import DatePicker from 'src/elements/components/datePicker/DatePicker';
import Select from 'src/elements/components/select/Select';
import moment from 'moment';
import { PriorityType } from '../../../../../components/priorityArrow/PriorityArrow';
import { IProjectFilters } from '../../../../../../ts/interfaces/projects';

interface Props {
  className?: SerializedStyles;
  onFiltersChange?: (filters: IProjectFilters) => void;
}

const defaultFiltersState: IProjectFilters = {
  filters_between: {
    created_at: [
      moment().subtract(100, 'years').toISOString(),
      moment().add(100, 'years').toISOString(),
    ],
  },
  filters: {
    service: '',
    priority: null,
  },
};

const Filters: FC<Props> = ({ className, onFiltersChange }) => {
  const [filters, setFilters] = useState<IProjectFilters>(defaultFiltersState);

  const handleCreationStartChange = (value: moment.Moment | null) => {
    const updatedFilters = { ...filters };
    updatedFilters.filters_between.created_at[0] = value
      ? value.toISOString()
      : moment().subtract(100, 'years').toISOString();

    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const handleCreationEndChange = (value: moment.Moment | null) => {
    const updatedFilters = { ...filters };
    updatedFilters.filters_between.created_at[1] = value
      ? value.toISOString()
      : moment().add(100, 'years').toISOString();

    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const onPriorityChange = (priority: PriorityType) => {
    const updatedFilters = { ...filters };
    updatedFilters.filters.priority = priority ? [priority] : priority;

    setFilters(updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  return (
    <FilterWrapper css={className}>
      <FilterBlock>
        <div>
          <FilterTitle>Этап</FilterTitle>
          <Select
            placeholder='Выберите этап'
            className={style.select}
            needPopUpContainer={false}
          />
        </div>
        <div>
          <FilterTitle>Услуга</FilterTitle>
          <Select
            placeholder='Выберите услуги'
            className={style.select}
            needPopUpContainer={false}
          />
        </div>
        <div>
          <FilterTitle>Дата создания</FilterTitle>
          <DatePicker onChange={handleCreationStartChange} />
          {'  -  '}
          <DatePicker onChange={handleCreationEndChange} />
        </div>
        <div>
          <PriorityControl onChange={onPriorityChange} />
        </div>
      </FilterBlock>
    </FilterWrapper>
  );
};

export default Filters;
