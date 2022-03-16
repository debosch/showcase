import { styles } from './Styles';
import React, { FC, useState } from 'react';
import { Select } from 'antd';
import { IProjectTask } from '../../../../../../ts/interfaces/projects';
import { doUpdateTaskStatus } from '../../../../../../redux/actions/project';
import { useAppDispatch } from '../../../../../../redux/store';

interface IStatusSelect {
  onChange: (status: number, statusReadable?: string) => void;
  task: IProjectTask;
}

const StatusSelect: FC<IStatusSelect> = ({ task, onChange }) => {
  const [activeStatus, setActiveStatus] = useState<number>(task.status);
  const dispatch = useAppDispatch();

  const handleChange = (status, statusReadable) => {
    onChange(status, statusReadable.children);
    setActiveStatus(status);
    dispatch(
      doUpdateTaskStatus({ taskId: task.id, status: status.toString() }),
    );
  };

  return (
    <Select
      value={activeStatus}
      onChange={handleChange}
      css={[styles.select.main, styles.select[activeStatus]]}
    >
      <Select.Option value={0}>Запланировано</Select.Option>
      <Select.Option value={1}>В работе</Select.Option>
      <Select.Option value={2}>На проверке</Select.Option>
      <Select.Option value={3}>Завершено</Select.Option>
    </Select>
  );
};

export default StatusSelect;
