import { styles, Performers, HiddenPerformers, ListItemText } from './Styles';
import React, { useState } from 'react';
import img from '../../../../../../assets/mockImageSmall.png';
import { Dropdown, Menu } from 'antd';
import Performer from './performer/Performer';

const performers = [
  {
    id: 1,
    src: img,
    name: 'Константин Константинович',
  },
  {
    id: 2,
    src: img,
    name: 'Константин Константинович',
  },
  {
    id: 3,
    src: img,
    name: 'Константин Константинович',
  },
  {
    id: 4,
    src: img,
    name: 'Константин Константинович',
  },
  {
    id: 5,
    src: img,
    name: 'Константин Константинович',
  },
  {
    id: 6,
    src: img,
    name: 'Константин Константинович',
  },
  {
    id: 7,
    src: img,
    name: 'Константин Константинович',
  },
  {
    id: 8,
    src: img,
    name: 'Константин Константинович',
  },
  {
    id: 9,
    src: img,
    name: 'Константин Константинович',
  },
];

const PerformersList = () => {
  const [selectedPerformers, setSelectedPerformers] = useState<Array<number>>(
    [],
  );

  const visiblePerformers = performers.slice(0, 4);
  const hiddenPerformers = performers.slice(4);

  const handlePerformerSelection = (id: number): void => {
    const performers = [...selectedPerformers];
    const idIndex = performers.indexOf(id);

    if (idIndex < 0) {
      performers.push(id);
    } else {
      performers.splice(idIndex, 1);
    }

    setSelectedPerformers(performers);
  };

  return (
    <Performers>
      {visiblePerformers.map((performer, index) => (
        <Performer
          onChange={handlePerformerSelection}
          key={performer.id}
          performer={performer}
          index={index}
        />
      ))}
      {hiddenPerformers.length > 0 && (
        <Dropdown
          placement='bottomLeft'
          overlay={
            <Menu css={styles.menu}>
              {hiddenPerformers.map((performer) => (
                <Menu.Item key={performer.id}>
                  <Performer
                    onChange={handlePerformerSelection}
                    key={performer.id}
                    performer={performer}
                    isDropdownItem
                  />
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <HiddenPerformers>
            <ListItemText>+{hiddenPerformers.length}</ListItemText>
          </HiddenPerformers>
        </Dropdown>
      )}
    </Performers>
  );
};

export default PerformersList;
