import React, { FC } from 'react';
import { SListBody } from './Styles';
import ListItem from '../listItem/ListItem';
import { useAppSelector } from '../../../../../../../redux/store';
import { ITaskTreeItem } from '../../../../../../../ts/interfaces/projects';

interface IListBody {
  handleSelection: (id: number) => void;
  isSelectionMode: boolean;
  selectedTasks: Array<number>;
}

const ListBody: FC<IListBody> = ({
  handleSelection,
  isSelectionMode,
  selectedTasks,
}) => {
  const { tasksTree, currentProject } = useAppSelector(
    (store) => store.project,
  );

  return (
    <SListBody>
      {tasksTree?.map((task: ITaskTreeItem, index) => {
        return (
          <ListItem
            key={task.value.id}
            task={task}
            project={currentProject}
            itemIndex={index}
            hasDeadline={!!task.value.deadline}
            selectTask={handleSelection}
            isSelectionMode={isSelectionMode}
            selectedTasks={selectedTasks}
          />
        );
      })}
    </SListBody>
  );
};

export default ListBody;
