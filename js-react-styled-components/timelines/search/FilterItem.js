import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components/macro';

const FilterItem = ({ label, amount, onSelect }) => {
  const [isSelected, setActive] = useState(false);

  const onFilterSelect = () => {
    setActive(!isSelected);
    onSelect && onSelect(!isSelected);
  };

  return (
    <FiltersItem onClick={onFilterSelect} isSelected={isSelected}>
      <FilterLabel>{label}</FilterLabel>
      <FilteredAmount>{amount}</FilteredAmount>
    </FiltersItem>
  );
};

FilterItem.propTypes = {
  label: PropTypes.string,
  amount: PropTypes.number,
  onSelect: PropTypes.func,
};

const FiltersItem = styled.li`
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: var(--cs-fonts--label-color);
  background-color: ${(props) =>
    props.isSelected ? `var(--cs-ui--button-active-color)` : `var(--cs-ui--select-bg-color)`};
  border: 1px solid var(--cs-general--line-color);
  border-radius: 5px;

  &.selected {
    background-color: var(--cs-ui--button-active-color);
  }

  &:hover {
    background-color: var(--cs-ui--select-hover-color);
  }
`;

const FilterLabel = styled.p`
  margin-right: 15px;
  display: inline;
`;

const FilteredAmount = styled.p`
  display: inline;
  background-color: #0c313d;
  border-radius: 5px;
  padding: 2px 4px;
`;

export default FilterItem;
