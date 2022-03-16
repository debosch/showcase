import React, { FC, useState } from 'react';
import {
  SCTasksFilter,
  ControlsContainer,
  DrawerFilter,
  styles,
} from './Styles';
import { Drawer } from 'antd';
import FilterList from './filterList/FilterList';
import DisplayType from '../displayType/DisplayType';
import { InputEventType } from '../../../../../../ts/types/input.type';
import FilterListMobile from './filterListMobile/FilterListMobile';

const TasksFilter: FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleShowDrawer = (): void => {
    setShowDrawer(true);
  };

  const handleCloseDrawer = (): void => {
    setShowDrawer(false);
  };

  const handleDisplayTypeChange = (event: InputEventType): void => {
    console.log(event.target.value);
  };

  return (
    <SCTasksFilter>
      <Drawer
        visible={showDrawer}
        onClose={handleCloseDrawer}
        maskStyle={styles.drawerMask}
        drawerStyle={styles.drawer}
        width={313}
      >
        <DrawerFilter>
          <FilterListMobile />
        </DrawerFilter>
      </Drawer>
      <ControlsContainer>
        <FilterList onDrawerOpen={handleShowDrawer} />
        <DisplayType name='displayType' onChange={handleDisplayTypeChange} />
      </ControlsContainer>
    </SCTasksFilter>
  );
};

export default TasksFilter;
