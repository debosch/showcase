import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';

const TableItemAction = ({ children, onClick, buttonClass = '' }) => {
  return (
    <ItemAction className={buttonClass} onClick={onClick}>
      {children}
    </ItemAction>
  );
};

TableItemAction.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  buttonClass: PropTypes.string,
};

const ItemAction = styled.button`
  background-color: var(--cs-general--transparent);
  color: var(--cs-fonts--label-color);

  &:not(:last-child) {
    margin-right: 20px;
  }
`;

export default TableItemAction;
