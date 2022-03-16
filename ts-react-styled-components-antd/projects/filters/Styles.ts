import styled from '@emotion/styled';
import { css } from '@emotion/react';

const style = {
  select: css`
    &:not(.ant-select-customize-input) .ant-select-selector {
      height: 32px;
    }
  `,
};

export const FilterWrapper = styled.div`
  padding: 2vh 2vw 0 2vw;
`;

export const FilterTitle = styled.div`
  padding-bottom: 8px;
  font-weight: bold;
`;

export const FilterBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  > div {
    margin-right: 2vw;
  }
`;

export default style;
