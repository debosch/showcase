import styled from '@emotion/styled';

export const Sort = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftFilter = styled.div`
  display: flex;
  width: 430px;
  justify-content: space-between;
  cursor: pointer;
  align-items: center;
`;

export const CheckboxLabel = styled.span`
  margin-left: 8px;
`;

interface ILabel {
  rotateIcon?: boolean;
}

export const Label = styled.label<ILabel>`
  cursor: pointer;

  input {
    visibility: hidden;
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  svg {
    margin-left: 5px;
    vertical-align: middle;
    transform: ${({ rotateIcon }) => (rotateIcon ? 'rotateX(180deg)' : '')};
  }
`;
