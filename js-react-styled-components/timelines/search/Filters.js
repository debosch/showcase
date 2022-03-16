import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';

const Filters = ({ children }) => {
  return <FiltersList>{children}</FiltersList>;
};

Filters.propTypes = {
  children: PropTypes.node,
};

const FiltersList = styled.ul`
  list-style: none;
`;

export default Filters;
