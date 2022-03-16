import React, { FC } from 'react';
import {
  SListHeader,
  Choose,
  Task,
  Deadline,
  Performer,
  Status,
  Comments,
  Pins,
  Delete,
} from './Styles';
import HeaderDropdown from './headerDropdown/HeaderDropdown';
import { ReactComponent as BinIcon } from '../../../../../../../assets/icons/bin.svg';

interface IListHeader {
  isSelectionMode: boolean;
  setSelectionMode: (checked: boolean) => void;
  handleSelectAll: () => void;
  handleSelectFavorite: () => void;
  handleDeletion: () => void;
}

const ListHeader: FC<IListHeader> = ({
  isSelectionMode,
  setSelectionMode,
  handleDeletion,
  handleSelectAll,
  handleSelectFavorite,
}) => {
  return (
    <SListHeader>
      <Choose textAlign='start'>
        <HeaderDropdown
          setSelectionMode={setSelectionMode}
          isSelectionMode={isSelectionMode}
          handleSelectAll={handleSelectAll}
          handleSelectFavorite={handleSelectFavorite}
        />
      </Choose>
      <Task textAlign='start'>
        {isSelectionMode ? (
          <Delete onClick={handleDeletion}>
            <BinIcon />
            Удалить
          </Delete>
        ) : (
          'Задача'
        )}
      </Task>
      <Deadline>Дедлайн</Deadline>
      <Performer textAlign='center'>Исполнитель</Performer>
      <Status>Статус</Status>
      <Comments>Комментарии</Comments>
      <Pins>Вложения</Pins>
    </SListHeader>
  );
};

export default ListHeader;
