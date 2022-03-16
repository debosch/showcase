import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const styles = {
  menu: css`
    max-height: 240px;
    overflow-y: auto;
  `,
};

export const Performers = styled.div`
  position: relative;
  z-index: 1;
  list-style: none;
  display: flex;
  padding: 0;
`;

export const HiddenPerformers = styled.span`
  position: relative;
  width: 34px;
  height: 34px;
  color: ${({ theme }) => theme.colors.blackDark};
  margin-left: -8px;
  border: 1px solid ${({ theme }) => theme.colors.whiteMain};
  background-color: ${({ theme }) => theme.colors.graySimple};
  font-weight: 500;
  font-size: 0.75rem;
  border-radius: 50%;
`;

export const ListItemText = styled.p`
  vertical-align: middle;
  margin-bottom: 0;
  text-align: center;
  line-height: 34px;
`;
