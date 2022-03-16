import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Search } from '../../../ui/kit';

const TimelinesSearch = ({ onChange, onSearch }) => {
  return (
    <SearchContainer>
      <StyledSearch onChange={(value) => onChange(value)} onSearch={(value) => onSearch(value)} />
    </SearchContainer>
  );
};

TimelinesSearch.propTypes = {
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
};

const SearchContainer = styled.div`
  flex-basis: 60%;
`;

const StyledSearch = styled(Search)`
  margin-right: 15px;

  input {
    border-radius: 10px;
  }

  .search__button {
    color: var(--cs-fonts--label-color);
    background-color: var(--cs-general--second-color);
    border-radius: 5px;
  }
`;

export default TimelinesSearch;
