import React, { useState } from 'react';
import { STasksList } from './Styles';
import ListHeader from './listHeader/ListHeader';
import ListBody from './listBody/ListBody';
import { useAppSelector } from '../../../../../../redux/store';
import { getTasksId } from '../../../../../../utils/projects/getTasksField';

const TasksList = () => {
  const [selectedTasks, setSelectedTasks] = useState<Array<number>>([]);
  const [isSelectionMode, setSelectionMode] = useState<boolean>(false);
  const { tasksTree } = useAppSelector((state) => state.project);

  const handleSelection = (id: number): void => {
    const tasks = [...selectedTasks];
    const idIndex = tasks.indexOf(id);

    if (idIndex < 0) {
      tasks.push(id);
    } else {
      tasks.splice(idIndex, 1);
    }

    setSelectedTasks(tasks);
  };

  const handleSelectionModeChange = (checked: boolean) => {
    setSelectionMode(checked);

    if (!checked) {
      setSelectedTasks([]);
    }
  };

  const handleSelectAll = () => {
    const ids = getTasksId(tasksTree);
    console.log(ids);

    setSelectedTasks(ids);

    if (!isSelectionMode) {
      setSelectionMode(true);
    }
  };

  const handleSelectFavorite = () => {
    return true;
  };

  const handleDeletion = () => {
    return true;
  };

  return (
    <STasksList>
      <ListHeader
        isSelectionMode={isSelectionMode}
        setSelectionMode={handleSelectionModeChange}
        handleDeletion={handleDeletion}
        handleSelectAll={handleSelectAll}
        handleSelectFavorite={handleSelectFavorite}
      />
      <ListBody
        selectedTasks={selectedTasks}
        handleSelection={handleSelection}
        isSelectionMode={isSelectionMode}
      />
    </STasksList>
  );
};

export default TasksList;
