import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as DeleteIcon } from '../../../../assets/images/explore-timelines/icon_delete.svg';
import { ReactComponent as ExportIcon } from '../../../../assets/images/explore-timelines/icon_export.svg';
import TableItemAction from './TableItemAction';

const HeaderDropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdown = useRef();

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (!dropdown.current?.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  return (
    <Dropdown ref={dropdown} onClick={toggleDropdown}>
      <HeaderDropdownLabel>Bulk actions</HeaderDropdownLabel>
      <HeaderDropdownIcon isDropdownOpen={isDropdownOpen}>
        <svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 5L13 1" stroke="#38CEDF" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </HeaderDropdownIcon>
      {isDropdownOpen && (
        <HeaderDropdownOptionsList>
          <HeaderDropdownListOption>
            <TableItemAction onClick={() => {}} buttonClass="header-dropdown__item-action">
              <ExportIcon />
              Export selected
            </TableItemAction>
          </HeaderDropdownListOption>
          <HeaderDropdownListOption>
            <TableItemAction onClick={() => {}} buttonClass="header-dropdown__item-action">
              <DeleteIcon />
              Delete Selected
            </TableItemAction>
          </HeaderDropdownListOption>
        </HeaderDropdownOptionsList>
      )}
    </Dropdown>
  );
};

HeaderDropdown.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
};

const Dropdown = styled.div`
  display: inline;
  position: relative;
  margin-right: 15px;
`;

const HeaderDropdownIcon = styled.span`
  svg {
    transform: rotate(${({ isDropdownOpen }) => (isDropdownOpen ? `180deg` : `0`)});
  }
`;

const HeaderDropdownLabel = styled.p`
  color: var(--cs-general--brand-color);
  margin-right: 5px;
  display: inline;
`;

const HeaderDropdownOptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: -25%;
  background-color: var(--cs-general--popup-background);
  box-shadow: 0 0 20px var(--cs-general--popup-transparent);
  border-radius: 5px;
`;

const HeaderDropdownListOption = styled.li`
  padding: 10px 5px;
  border-radius: 5px;

  svg {
    margin-right: 5px;
    vertical-align: middle;
  }

  .header-dropdown__item-action {
    min-width: 150px;
  }

  &:hover {
    background-color: var(--cs-ui--button-hover-color);
  }
`;

export default HeaderDropdown;
