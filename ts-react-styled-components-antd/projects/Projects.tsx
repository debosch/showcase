import { FooterMobile, Main } from './Styles';
import Control from './control/Control';
import CardGrid from './cardGrid/CardGrid';
import Pagination from 'src/elements/components/pagination/Pagination';
import Tabs, { INavigatorConfigItem } from '../tabs/Tabs';
import routes from '../../../../../nav/routes';
import SearchHeader from '../../../../components/searchHeader/SearchHeader';
import Button from '../../../../components/button/Button';
import { setShowCreateProjectModal } from '../../../../../redux/actions/modal';
import { useAppDispatch, useAppSelector } from '../../../../../redux/store';
import { useEffect, useState } from 'react';
import { getProjects } from '../../../../../redux/actions/project';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery, useDebounce } from '../../../../../hooks';
import { TaskTypes } from '../../../../../ts/enums/projects';
import { IProjectFilters } from '../../../../../ts/interfaces/projects';
import { getTaskStatus } from '../../../../../utils/projects/searchQuery';
import { InputEventType } from '../../../../../ts/types/input.type';

const viewNavigationConfig: INavigatorConfigItem[] = [
  {
    to: routes.projectsAll,
    isActive: window.location.pathname === routes.projectsAll,
    title: 'Все',
  },
  {
    to: routes.activeProjects,
    isActive: window.location.pathname === routes.activeProjects,
    title: 'Активные',
  },
  {
    to: routes.completedProjects,
    isActive: window.location.pathname === routes.completedProjects,
    title: 'Завершенные',
  },
  {
    to: routes.deletedProjects,
    isActive: window.location.pathname === routes.deletedProjects,
    title: 'Удалённые',
  },
];

const defaultFilterState: IProjectFilters = {
  filters: {},
  filters_between: {},
};

const Projects = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const history = useHistory();
  const { totalPages } = useAppSelector((state) => state.project);
  const searchParams = useQuery();
  const [filters, setFilters] = useState<IProjectFilters>(defaultFilterState);
  const [sort, setSort] = useState<Array<Array<string>>>([]);
  const debouncedSearchParams = useDebounce<URLSearchParams>(searchParams, 500);

  useEffect(() => {
    const page = Number(searchParams.get('page'));
    if (!page || page < 1) {
      searchParams.set('page', '1');
      history.replace({ search: searchParams.toString() });
    } else {
      const status = pathname.split('/').pop() as TaskTypes;
      dispatch(
        getProjects({
          page: searchParams.toString(),
          status: getTaskStatus(status),
          ...filters,
          sort,
        }),
      );
    }
  }, [dispatch, debouncedSearchParams, filters, sort, pathname, history]);

  const onPageChange = (page: number) => {
    searchParams.set('page', page.toString());
    history.push({ search: searchParams.toString() });
  };

  const onFiltersChange = (newFilters: IProjectFilters): void => {
    const updatedFilters = { ...filters };
    updatedFilters.filters = { ...filters.filters, ...newFilters.filters };
    updatedFilters.filters_between = {
      ...filters.filters_between,
      ...newFilters.filters_between,
    };
    setFilters(updatedFilters);
  };

  const onSortChange = (newSort: Array<Array<string>>): void => {
    setSort(newSort);
  };

  const onSearchChange = (event: InputEventType) => {
    const { value } = event.target;

    if (value) {
      searchParams.set('search', value);
      history.replace({ search: searchParams.toString() });
    } else {
      searchParams.delete('search');
      history.replace({ search: searchParams.toString() });
    }
  };

  return (
    <Main>
      <SearchHeader
        searchValue={searchParams.get('search') || undefined}
        onSearch={onSearchChange}
      >
        <Button onClick={() => dispatch(setShowCreateProjectModal(true))}>
          Создать новый проект
        </Button>
      </SearchHeader>
      <Tabs navigatorConfig={viewNavigationConfig} />
      <Control
        onSortChange={onSortChange}
        onFiltersChange={onFiltersChange}
        onPageChange={onPageChange}
        currentPage={Number(searchParams.get('page'))}
        pagesAmount={totalPages}
      />
      <CardGrid />
      <FooterMobile>
        <Pagination
          currentPage={Number(searchParams.get('page'))}
          onChange={onPageChange}
          pageCount={totalPages}
        />
        <Button onClick={() => dispatch(setShowCreateProjectModal(true))}>
          Создать новый проект
        </Button>
      </FooterMobile>
    </Main>
  );
};

export default Projects;
