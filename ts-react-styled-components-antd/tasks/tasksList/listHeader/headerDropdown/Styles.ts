import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from 'antd';

export const styles = {
  dropdownItem: ({ colors }) => css`
    padding: 0;

    &:not(:last-child) {
      border-bottom: 1px solid ${colors.graySimple};
    }
  `,

  dropdown: ({ colors }) => css`
    border: 1px solid ${colors.transparent};

    &.dropdown_opened {
      background-color: ${colors.whiteMain};
      border-color: ${colors.graySimple};
      border-radius: 6px 6px 0 0;
      top: 0;
    }
  `,

  overlay: ({ colors }) => css`
    border: 1px solid ${colors.graySimple};
    border-radius: 0 0 6px 6px;
  `,

  checkbox: css`
    margin-right: 8px;
  `,
};
export const SButton = styled(Button)`
  font-weight: 700;
  border: none;
  box-shadow: none;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.transparent};
  text-align: start;
  width: 100%;
  height: 100%;

  &:hover,
  &:active,
  &:focus,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.transparent};
  }

  &:disabled {
    background: none;
  }
`;

export const Icon = styled.span`
  transform: rotate(-90deg);
  margin-left: 8px;

  svg {
    height: 12px;
    width: 6px;
  }
`;
