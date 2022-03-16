import style, {
  ControlWrapper,
  DropdownsWrapperMobile,
  FiltersDropdownMobile,
  SortingDropdownMobile,
  TopWrapper,
} from './Styles';
import Pagination from 'src/elements/components/pagination/Pagination';
import Filters from '../filters/Filters';
import Sorting from '../sorting/Sorting';
import { ReactComponent as Triangle } from 'src/assets/icons/triangle.svg';
import { ReactComponent as Filter } from 'src/assets/icons/filter.svg';
import React, { FC } from 'react';
import { IProjectFilters } from '../../../../../../ts/interfaces/projects';

interface IControl {
  pagesAmount: number;
  onPageChange?: (page: number, pageSize?: number) => void;
  currentPage?: number;
  onFiltersChange?: (filters: IProjectFilters) => void;
  onSortChange?: (sort: Array<Array<string>>) => void;
}

const Control: FC<IControl> = ({
  pagesAmount,
  currentPage,
  onPageChange,
  onFiltersChange,
  onSortChange,
}) => {
  return (
    <ControlWrapper>
      <TopWrapper>
        <Sorting
          onSortChange={onSortChange}
          onFiltersChange={onFiltersChange}
          className={style.sorting}
        />
        <Pagination
          onChange={onPageChange}
          currentPage={currentPage}
          pageCount={pagesAmount}
        />
      </TopWrapper>

      <Filters onFiltersChange={onFiltersChange} className={style.filters} />

      <DropdownsWrapperMobile>
        <SortingDropdownMobile>
          <span>Сортировать по</span> <Triangle />
        </SortingDropdownMobile>
        <FiltersDropdownMobile>
          <span>Фильтр</span> <Filter />
        </FiltersDropdownMobile>
      </DropdownsWrapperMobile>
    </ControlWrapper>
  );
};

export default Control;
