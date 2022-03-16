import styled from '@emotion/styled';

export const DisplayButtons = styled.span`
  display: flex;
  flex-direction: row;
`;

interface ISLabelProps {
  isChecked?: boolean;
}

export const SLabel = styled.label<ISLabelProps>`
  font-weight: 700;
  color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.blueMain : theme.colors.blackDark};
  display: flex;
  align-items: center;

  svg {
    margin-right: 6px;
  }

  svg > path {
    fill: ${({ theme, isChecked }) =>
      isChecked ? theme.colors.blueMain : theme.colors.blackDark};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.blueDark};

    svg > path {
      fill: ${({ theme }) => theme.colors.blueDark};
    }
  }

  &:not(:last-child) {
    margin-right: 26px;
  }
`;
export const SInput = styled.input`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;
