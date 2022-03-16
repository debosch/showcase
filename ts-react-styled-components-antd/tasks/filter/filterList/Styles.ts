import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { breakpoints } from '../../../../../../components/ui/Style';

export const styles = {
  checkbox: css`
    margin-right: 8px;
  `,

  select: css`
    &:not(.ant-select-customize-input) .ant-select-selector {
      height: 32px;
    }
  `,

  clearButton: ({ colors }) => css`
    font-weight: bold;
    padding: 0;
    border: none;
    height: fit-content;
    color: ${colors.blueMain};
    text-decoration: underline;
    text-decoration-color: ${colors.blueMain};
    box-shadow: none;

    span {
      display: inline;
    }

    &:focus {
      text-decoration: underline;
      color: ${colors.blueDark};
    }

    &:focus-visible {
      text-decoration: underline;
      opacity: 0.7;
    }

    &:disabled,
    &:disabled:hover {
      text-decoration: underline;
      color: ${colors.grayDark};
      background-color: ${colors.transparent};
    }

    &:not(:disabled):hover {
      text-decoration: underline;
      opacity: 0.7;
    }

    &:active {
      text-decoration: underline;
      color: ${colors.blueDark};
    }
  `,

  filterButton: ({ colors }) => css`
    border: none;
    box-shadow: none;
    display: flex;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

    svg {
      margin-left: 6px;
    }

    svg > path {
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    &:hover,
    &:focus,
    &:focus-visible {
      color: ${colors.blueMain};

      svg > path {
        fill: ${colors.blueMain};
      }
    }

    @media (max-width: ${breakpoints.laptopM}) {
      border-left: 1px solid ${colors.gray};
    }
  `,
};

export const DatePickerSplit = styled.span`
  margin: 0 6px;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;

  @media (max-width: ${breakpoints.laptopM}) {
    flex-direction: column;
  }
`;

type ListItemProps = {
  showOnMobile?: boolean;
};

export const ListItem = styled.li<ListItemProps>`
  position: relative;
  white-space: nowrap;
  font-weight: 500;
  width: max-content;
  &:not(:last-child) {
    margin-right: 30px;
  }

  @media (min-width: ${breakpoints.laptopM}) {
    display: ${(props) => (props.showOnMobile ? 'none' : 'block')};
  }

  @media (max-width: ${breakpoints.laptopM}) {
    display: ${(props) => (props.showOnMobile ? 'block' : 'none')};
  }
`;

export const ListItemText = styled.p`
  position: absolute;
  left: 0;
  bottom: 100%;
  margin-bottom: 8px;
`;
