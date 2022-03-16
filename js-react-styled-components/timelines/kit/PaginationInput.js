import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Input } from '../../../ui/kit';

const PaginationInput = ({ onChange, placeholder, disabled = false }) => {
  const [value, setValue] = useState('');

  const onInputChange = (event) => {
    let { value } = event.target;
    setValue(value);
    onChange && onChange(Number(value));
  };

  return (
    <>
      <Label>Rows per page:</Label>
      <StyledInput
        className="pagination-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onInputChange(event)}
        disabled={disabled}
      />
    </>
  );
};

PaginationInput.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

const Label = styled.p`
  display: inline;
  color: var(--cs-fonts--text-color);
  margin-right: 5px;
`;

const StyledInput = styled(Input)`
  &.pagination-input {
    max-width: 50px;
    border: none;
    border-bottom: 2px solid var(--cs-general--line-color);
    border-radius: 0;
    background-color: var(--cs-general--transparent);
    box-shadow: none;
    padding: 0;
    height: fit-content;
    color: var(--cs-fonts--label-color);
  }
`;

export default PaginationInput;
