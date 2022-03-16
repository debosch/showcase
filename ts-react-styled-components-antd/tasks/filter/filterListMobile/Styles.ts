import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const styles = {
  checkbox: css`
    margin-right: 8px;
  `,

  select: css`
    &:not(.ant-select-customize-input) .ant-select-selector {
      height: 32px;
    }

    &.ant-select {
      width: 100%;
    }
  `,

  mobileClearButton: ({ colors }) => css`
    background-color: ${colors.transparent};
    border: none;
    font-weight: bold;
    width: 100%;
    color: ${colors.blueMain};
    box-shadow: none;

    &:focus {
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
      background-color: ${colors.transparent};
      span {
        opacity: 0.7;
      }
    }

    &:active {
      text-decoration: underline;
      color: ${colors.blueDark};
    }
  `,

  mobileAcceptButton: css`
    width: 100%;
    font-weight: bold;
  `,
};

export const MobileDatePickerSplit = styled.span`
  margin: 0 6px;
`;

export const MobileList = styled.ul`
  margin: 0;
  padding: 0 20px;
  list-style: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.whiteDark};
`;

type MobileListItemProps = {
  marginBottom?: number;
};

export const MobileListItem = styled.li<MobileListItemProps>`
  width: 100%;
  position: relative;
  white-space: nowrap;
  flex-flow: row nowrap;
  font-weight: 500;
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? `${marginBottom}px` : '50px'};

  .ant-row {
    justify-content: space-between;
  }

  .ant-picker {
    background-color: ${({ theme }) => theme.colors.whiteMain};
  }
`;

type MobileListItemTextProps = {
  marginBottom?: number;
};

export const MobileListItemText = styled.p<MobileListItemTextProps>`
  position: absolute;
  left: 0;
  bottom: 100%;
  margin-bottom: ${(props) =>
    props.marginBottom ? `${props.marginBottom}px` : 0};
`;

export const MobileListHeader = styled.h3`
  margin-bottom: 45px;
  padding: 0 0 6px 20px;
  font-weight: bold;
  font-size: 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.whiteLight}; ;
`;
