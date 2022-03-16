import { Icon, SButton, styles } from './Styles';
import React, { FC } from 'react';
import { Checkbox, Dropdown, Menu } from 'antd';
import { ReactComponent as ArrowIcon } from '../../../../../../../../assets/icons/backIcon.svg';
import { CheckboxEventType } from '../../../../../../../../ts/types/input.type';

interface IHeaderDropdown {
  handleSelectAll: () => void;
  handleSelectFavorite: () => void;
  setSelectionMode: (checked: boolean) => void;
  isSelectionMode: boolean;
}

const HeaderDropdown: FC<IHeaderDropdown> = ({
  handleSelectAll,
  handleSelectFavorite,
  setSelectionMode,
  isSelectionMode,
}) => {
  const handleSelectionModeChange = (event: CheckboxEventType) => {
    setSelectionMode(event.target.checked);
  };

  return (
    <Dropdown
      overlay={
        <Menu css={styles.overlay}>
          <Menu.Item key={1} css={styles.dropdownItem}>
            <SButton onClick={handleSelectAll}>Все</SButton>
          </Menu.Item>
          <Menu.Item key={2} css={styles.dropdownItem}>
            <SButton onClick={handleSelectFavorite}>Важные</SButton>
          </Menu.Item>
        </Menu>
      }
      css={styles.dropdown}
      openClassName='dropdown_opened'
    >
      <SButton>
        <Checkbox
          onChange={handleSelectionModeChange}
          checked={isSelectionMode}
          css={styles.checkbox}
        />
        Выбрать
        <Icon>
          <ArrowIcon />
        </Icon>
      </SButton>
    </Dropdown>
  );
};

export default HeaderDropdown;
