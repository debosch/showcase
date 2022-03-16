import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AdaptiveFont, breakpoints } from '../../../../../components/ui/Style';

const style = {
  sorting: css`
    overflow-y: hidden;

    @media (max-width: ${breakpoints.tablet}) {
      height: 0;
    }
  `,

  pagination: css`
    @media (max-width: ${breakpoints.tablet}) {
      height: 0;
    }
  `,

  filters: css`
    overflow: hidden;
    @media (max-width: ${breakpoints.tablet}) {
      height: 0;
      padding: 0;
    }
  `,
};

export const ControlWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding: 22px 40px 16px 24px;
  overflow-y: hidden;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 0 40px 0 24px;
    width: 0;
    display: none;
  }
`;

export const DropdownsWrapperMobile = styled.div`
  width: 100%;
  display: none;

  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
  }
`;

export const SortingDropdownMobile = styled.button`
  ${AdaptiveFont(14, 18)};
  display: none;
  padding: 13px 17px;
  border: 1px solid #eeeeee;
  border-left: 0;
  border-top: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.blackDark};
  width: 50%;

  font-family: 'Lato';
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blackDark};
  align-items: center;
  justify-content: center;

  span {
    ${AdaptiveFont(12, 16)};
  }

  svg {
    margin-left: 10px;
    width: calc(10px + (12 - 10) * ((100vw - 375px) / (1920 - 375)));
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
  }
`;

export const FiltersDropdownMobile = styled.button`
  ${AdaptiveFont(14, 18)};
  display: none;
  padding: 13px 17px;
  border: 1px solid #eeeeee;
  border-left: 0;
  border-top: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.blackDark};
  width: 50%;

  font-family: 'Lato';
  font-weight: bold;
  color: ${({ theme }) => theme.colors.blackDark};
  align-items: center;
  justify-content: center;

  span {
    ${AdaptiveFont(12, 16)};
  }

  svg {
    margin-left: 10px;
    width: calc(12px + (16 - 12) * ((100vw - 375px) / (1920 - 375)));
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: flex;
  }
`;

export default style;
