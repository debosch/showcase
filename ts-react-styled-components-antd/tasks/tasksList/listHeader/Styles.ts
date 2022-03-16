import styled from '@emotion/styled';
import { breakpoints } from '../../../../../../components/ui/Style';
import { Button } from 'antd';

export const SListHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  align-items: center;
`;

export const ListHeaderRow = styled.div`
  grid-column: 1 / 25;
`;

interface IListCol {
  textAlign?: 'center' | 'start' | 'end';
}

export const ListHeaderCol = styled.div<IListCol>`
  color: ${({ theme }) => theme.colors.grayListHeader};
  font-weight: 700;
  padding: 5px;
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
`;

export const Choose = styled(ListHeaderCol)`
  grid-column: 1 / 4;

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: 4 / 10;
  }
`;

export const Task = styled(ListHeaderCol)`
  grid-column: 4 / 12;

  @media (max-width: ${breakpoints.laptop}) {
    grid-column: 5 / 15;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: 12 / 25;
  }
`;

export const Deadline = styled(ListHeaderCol)`
  grid-column: 12 / 15;

  @media (max-width: ${breakpoints.laptop}) {
    grid-column: 15 / 20;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: 20 / 25;
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export const Performer = styled(ListHeaderCol)`
  grid-column: 15 / 17;

  @media (max-width: ${breakpoints.laptopM}) {
    grid-column: 17 / 20;
  }

  @media (max-width: ${breakpoints.laptop}) {
    grid-column: 20 / 25;
  }

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export const Status = styled(ListHeaderCol)`
  grid-column: 17 / 23;

  @media (max-width: ${breakpoints.laptopM}) {
    grid-column: 20 / 25;
  }

  @media (max-width: ${breakpoints.laptop}) {
    display: none;
  }
`;

export const Comments = styled(ListHeaderCol)`
  grid-column: 23 / 24;

  @media (max-width: ${breakpoints.laptopM}) {
    display: none;
  }
`;

export const Pins = styled(ListHeaderCol)`
  grid-column: 24 / 25;

  @media (max-width: ${breakpoints.laptopM}) {
    display: none;
  }
`;

export const Delete = styled(Button)`
  border: none;
  box-shadow: none;
  padding: 4px;
  font-weight: 700;

  svg {
    vertical-align: middle;
    margin-right: 5px;
  }

  svg > path {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  &:hover,
  &:active,
  &:focus,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.transparent};

    svg > path {
      fill: ${({ theme }) => theme.colors.blueMain};
    }
  }

  &:disabled {
    background: none;

    svg > path {
      fill: ${({ theme }) => theme.colors.graySimple};
    }
  }
`;
