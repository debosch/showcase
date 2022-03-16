import React, { FC, useRef, useState } from 'react';
import {
  styles,
  SListItem,
  SCheckbox,
  ListItemContent,
  OpenButton,
  StarButton,
  ListItemText,
  TaskProject,
  TaskTitle,
  Subtasks,
  TaskDetails,
  Selection,
  Performer,
  Deadline,
  Status,
  Comments,
  Pins,
  Open,
  Favorite,
  OpenButtonIcon,
  ListSubTasks,
} from './Styles';
import { ReactComponent as ArrowIcon } from '../../../../../../../assets/icons/backIcon.svg';
import { ReactComponent as StarIcon } from '../../../../../../../assets/icons/star.svg';
import { ReactComponent as PinIcon } from '../../../../../../../assets/icons/pin.svg';
import { ReactComponent as ChatIcon } from '../../../../../../../assets/icons/chat.svg';
import {
  ITaskTreeItem,
  IProject,
} from '../../../../../../../ts/interfaces/projects';
import { subtaskDeclination } from '../../../../../../../utils/projects/declinationOfNum';
import StatusSelect from '../../statusSelect/StatusSelect';
import moment from 'moment';

interface IListItemProps {
  task: ITaskTreeItem;
  project: IProject;
  itemIndex: number;
  hasDeadline?: boolean;
  isFavorite?: boolean;
  isSelectionMode?: boolean;
  selectTask: (id: number) => void;
  selectedTasks: Array<number>;
  parentName?: string;
}

const ListItem: FC<IListItemProps> = ({
  task,
  project,
  itemIndex,
  hasDeadline,
  isFavorite,
  isSelectionMode,
  selectTask,
  selectedTasks,
  parentName,
}) => {
  const [showSubTask, setShowSubTask] = useState<boolean>(false);
  const subTree = useRef<HTMLUListElement>(null);

  const handleOpening = (): void => {
    setShowSubTask(!showSubTask);
  };

  const handleFavorite = (): void => {
    console.log('Favorite button clicked');
  };

  const handleSelectionChange = (): void => {
    selectTask(task.value.id);
  };

  const statusChange = (status: number, statusReadable?: string): void => {
    console.log('Status changed to', statusReadable);
  };

  const isSelected = selectedTasks.indexOf(task.value.id) >= 0;

  return (
    <SListItem>
      <ListItemContent
        tabIndex={0}
        isEven={!(itemIndex % 2)}
        hasDeadline={hasDeadline}
        isSelected={isSelected}
      >
        <Selection>
          <SCheckbox
            checked={isSelected}
            onChange={handleSelectionChange}
            css={styles.checkbox}
            isSelectionMode={isSelectionMode}
          />
        </Selection>

        <Open textAlign='start'>
          <OpenButton disabled={!task.children} onClick={handleOpening}>
            <OpenButtonIcon showSubTask={showSubTask}>
              <ArrowIcon />
            </OpenButtonIcon>
          </OpenButton>
        </Open>

        {isFavorite && (
          <Favorite>
            <StarButton onClick={handleFavorite}>
              <StarIcon />
            </StarButton>
          </Favorite>
        )}

        <TaskDetails textAlign='start'>
          <TaskProject>{parentName ? parentName : ''}</TaskProject>
          <TaskTitle>{task.value.name}</TaskTitle>
          <Subtasks>{subtaskDeclination(task.children?.length || 0)}</Subtasks>
        </TaskDetails>

        <Deadline>
          {task.value.deadline
            ? moment(task.value.deadline).format('DD.MM.YYYY')
            : 'Не установлен'}
        </Deadline>

        <Performer>{task.value.employee_id || 'Исполнитель'}</Performer>

        <Status>
          <StatusSelect onChange={statusChange} task={task.value} />
        </Status>

        <Comments textAlign='center'>
          <ListItemText>
            {task.value.comments_count}
            <ChatIcon />
          </ListItemText>
        </Comments>

        <Pins textAlign='center'>
          <ListItemText>
            {task.value.media_count}
            <PinIcon />
          </ListItemText>
        </Pins>
      </ListItemContent>
      {task.children && (
        <ListSubTasks
          ref={subTree}
          isOpen={showSubTask}
          height={subTree.current?.scrollHeight}
        >
          {task.children.map((subTask, index) => {
            return (
              <ListItem
                key={subTask.value.id}
                task={subTask}
                project={project}
                itemIndex={index}
                hasDeadline={!!subTask.value.deadline}
                selectTask={selectTask}
                isSelectionMode={isSelectionMode}
                selectedTasks={selectedTasks}
                parentName={task.value.name}
              />
            );
          })}
        </ListSubTasks>
      )}
    </SListItem>
  );
};

export default ListItem;
