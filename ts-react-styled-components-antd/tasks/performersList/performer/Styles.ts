import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Checkbox } from 'antd';

export const styles = {
  checkbox: css``,
};

interface ISPerformer {
  index: number;
  zIndex: number;
  isChecked?: boolean;
}

export const SPerformer = styled.label<ISPerformer>`
  position: relative;
  display: inline-block;
  align-items: center;
  justify-content: center;
  height: 34px;
  width: 34px;
  z-index: ${({ zIndex }) => -zIndex};
  margin-left: -8px;
  border-radius: 50%;

  img {
    transition: all 0.1s ease-in-out;
    box-shadow: 0 0 0 2px
      ${({ theme, isChecked }) =>
        isChecked ? theme.colors.blueMain : theme.colors.transparent};
  }

  &:hover {
    z-index: 1;

    img {
      transform: translateY(-5px);
    }
  }
`;

export const Image = styled.img`
  position: relative;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.whiteMain};
`;

export const SInput = styled(Checkbox)`
  visibility: hidden;
`;

export const ItemWrapper = styled.label`
  width: 100%;
  height: 100%;
`;

export const PerformerName = styled.p`
  display: inline;
  margin-left: 12px;
`;
