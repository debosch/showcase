import { css } from '@emotion/react';

export const styles = {
  select: {
    main: css`
      max-width: 180px;
      width: 100%;
      font-weight: 700;

      &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
        border-radius: 4px;
      }
    `,

    0: css`
      &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
        background-color: rgba(194, 197, 201, 0.2);
      }
    `,

    1: ({ colors }) => css`
      &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
        border-color: ${colors.greenLight};
        background-color: rgba(162, 232, 28, 0.2);
      }
    `,

    2: ({ colors }) => css`
      &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
        border-color: ${colors.yellow};
        background-color: rgba(255, 182, 43, 0.2);
      }
    `,

    3: ({ colors }) => css`
      &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
        border-color: ${colors.blueMain};
        background-color: rgba(47, 124, 239, 0.2);
      }
    `,
  },
};
