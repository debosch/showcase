import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';

const HeaderButton = ({ label, onClick }) => {
  return (
    <Button onClick={onClick}>
      <ButtonLabel>{label}</ButtonLabel>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11 7.41222C11 7.41222 9.3368 10.2888 7.49215 10.8069C4.68616 11.595 1.57173 9.89801 1.07188 7.03503C0.600469 4.33492 2.49841 1.37719 5.27224 1.37719C7.66702 1.37719 9.85445 3.26314 9.85445 3.26314M9.85445 3.26314L9.4014 1M9.85445 3.26314H7.1103"
          stroke="#38CEDF"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
};

HeaderButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const Button = styled.button`
  color: var(--cs-general--brand-color);
  background-color: var(--cs-general-transapent);

  &:hover {
    color: var(--cs-ui--button-light);

    svg path {
      stroke: var(--cs-ui--button-light);
    }
  }
`;

const ButtonLabel = styled.p`
  display: inline;
  margin-right: 5px;
`;

export default HeaderButton;
