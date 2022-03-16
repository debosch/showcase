import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button, Checkbox } from 'antd';
import { breakpoints } from '../../../../../../components/ui/Style';

export const styles = {
  checkbox: css`
    margin-right: 6px;
  `,
};

export const SListItem = styled.li``;

interface IListSubTasks {
  isOpen?: boolean;
  height?: number;
}

export const ListSubTasks = styled.ul<IListSubTasks>`
  padding: 0;
  list-style: none;
  margin-left: 8px;
  transition: all 0.5s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  max-height: ${({ isOpen, height }) => (isOpen ? `${height}px` : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
`;

interface IListItemContent {
  isEven?: boolean;
  hasDeadline?: boolean;
  isSelected?: boolean;
}

export const ListItemContent = styled.div<IListItemContent>`
  background-color: ${({ theme, isEven }) =>
    isEven ? theme.colors.grayBlue : theme.colors.whiteMain};
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.lightBlue : null};
  position: relative;
  padding: 20px 20px 20px 0;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: repeat(4, auto);
  row-gap: 5px;
  align-items: center;
  transition: max-height 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme, isEven }) =>
      isEven ? theme.colors.whiteListItem : theme.colors.blueListItem};

    background-color: ${({ theme, isSelected }) =>
      isSelected ? theme.colors.lightBlue : theme.colors.blueListItem};
  }

  &:focus,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.blueLight};
    outline: none;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    inset: 0 auto 0 0;
    width: 5px;
    border-radius: 4px;
    background-color: ${({ theme, hasDeadline }) =>
      hasDeadline ? theme.colors.redLight : theme.colors.greenLight};
  }
`;

interface IOpenButtonIcon {
  showSubTask?: boolean;
}

export const OpenButtonIcon = styled.span<IOpenButtonIcon>`
  svg {
    display: inline;
    width: fit-content;
    height: 100%;
    vertical-align: middle;
    transform: ${({ showSubTask }) =>
      showSubTask ? 'rotate(-90deg)' : 'rotate(180deg)'};
  }

  svg > path {
    fill: ${({ theme }) => theme.colors.blackDark};
  }
`;

export const OpenButton = styled(Button)`
  width: fit-content;
  height: fit-content;
  background-color: ${({ theme }) => theme.colors.transparent};
  border: none;
  padding: 0;
  text-align: center;
  line-height: 15px;

  &:hover,
  &:active,
  &:focus,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.transparent};
    transform: scale(1.2);
  }

  &:disabled {
    background: none;

    svg > path {
      fill: ${({ theme }) => theme.colors.graySimple};
    }
  }

  &:hover&:disabled {
    transform: scale(1);
  }
`;

export const StarButton = styled(Button)`
  width: 20px;
  height: 20px;
  border: none;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.transparent};
  vertical-align: middle;

  &:hover,
  &:active,
  &:focus,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.transparent};
    transform: scale(1.2);

    svg > path {
      fill: ${({ theme }) => theme.colors.yellowDark};
    }
  }
`;

interface IListItemCol {
  textAlign?: 'center' | 'start' | 'end';
}

export const ListItemCol = styled.div<IListItemCol>`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.graySimple};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
`;

export const ListItemText = styled.p`
  display: inline;
  margin-right: 3px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blackDark};
  font-size: 0.875rem;
  line-height: 0.875rem;

  svg {
    vertical-align: middle;
    margin-left: 3px;
  }
`;

export const Selection = styled(ListItemCol)`
  grid-column: 1;

  @media (max-width: ${breakpoints.laptopM}) {
    grid-row: 2;
    grid-column: 2;
  }

  @media (max-width: ${breakpoints.laptop}) {
    grid-row: 2;
    grid-column: 2;
  }
`;

interface ISCheckbox {
  isSelectionMode?: boolean;
}

export const SCheckbox = styled(Checkbox)<ISCheckbox>`
  visibility: ${({ isSelectionMode }) =>
    isSelectionMode ? 'visible' : 'hidden'};
  opacity: ${({ isSelectionMode }) => (isSelectionMode ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

export const Open = styled(ListItemCol)`
  grid-column: 2;

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: 3;
  }
`;

export const Favorite = styled(ListItemCol)`
  grid-column: 3;

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: 5;
  }
`;

export const TaskDetails = styled(ListItemCol)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 20px 1fr;
  grid-column: 4 / 12;

  @media (max-width: ${breakpoints.laptop}) {
    grid-column: 5 / 15;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: 7 / 25;
  }
`;

export const TaskTitle = styled.p`
  grid-row: 2;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.blackDark};
  margin-right: 15px;
`;

export const TaskProject = styled.p`
  margin: 0;
  grid-row: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Subtasks = styled.p`
  grid-row: 2;
`;

export const Deadline = styled(ListItemCol)`
  grid-column: 12 / 15;

  @media (max-width: ${breakpoints.laptop}) {
    grid-column: 15 / 20;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: 20 / 25;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-row: 3;
    grid-column: 15 / 25;
  }
`;

export const Performer = styled(ListItemCol)`
  grid-column: 15 / 17;

  @media (max-width: ${breakpoints.laptopM}) {
    grid-column: 17 / 20;
  }

  @media (max-width: ${breakpoints.laptop}) {
    grid-column: 20 / 25;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-row: 4;
    grid-column: 14 / 25;
  }
`;

export const Status = styled(ListItemCol)`
  grid-column: 17 / 23;

  @media (max-width: ${breakpoints.laptopM}) {
    grid-column: 20 / 25;
  }

  @media (max-width: ${breakpoints.laptop}) {
    grid-row: 3;
    grid-column: 4 / 10;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: 4 / 15;
  }
`;

export const Comments = styled(ListItemCol)`
  grid-column: 23;

  @media (max-width: ${breakpoints.laptopM}) {
    grid-row: 4;
    grid-column: 4 / 6;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: 4 / 8;
  }

  @media (max-width: ${breakpoints.mobileL}) {
    grid-column: 4 / 10;
  }
`;

export const Pins = styled(ListItemCol)`
  grid-column: 24;

  @media (max-width: ${breakpoints.laptopM}) {
    grid-row: 4;
    grid-column: 6 / 8;
  }

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: 8 / 12;
  }

  @media (max-width: ${breakpoints.mobileL}) {
    grid-column: 10 / 14;
  }
`;
