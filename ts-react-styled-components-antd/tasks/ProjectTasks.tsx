import React, { FC, useEffect } from 'react';
import style, { ProjectTasks as SCProjectTasks } from './Styles';
import TasksFilter from './filter/Filter';
import TasksList from './tasksList/TasksList';
import { useAppDispatch, useAppSelector } from '../../../../../redux/store';
import { doGetProjectTasks } from '../../../../../redux/actions/project';
import Modal from '../../../../components/modal/Modal';
import { setShowCreateTaskModal } from '../../../../../redux/actions/modal';
import CreateTaskForm from '../../../../containers/createTaskForm/CreateTaskForm';

const ProjectTasks: FC = () => {
  const dispatch = useAppDispatch();
  const { showCreateTaskModal, currentProject } = useAppSelector((state) => ({
    showCreateTaskModal: state.modal.showCreateTaskModal,
    currentProject: state.project.currentProject,
  }));

  useEffect(() => {
    if (currentProject.id) {
      dispatch(doGetProjectTasks(currentProject.id));
    }
  }, [dispatch, currentProject.id]);

  return (
    <SCProjectTasks>
      <Modal
        className={style.modal}
        visible={showCreateTaskModal}
        centered={false}
        onCancel={() => dispatch(setShowCreateTaskModal(false))}
        modalWidth='87%'
      >
        <CreateTaskForm />
      </Modal>
      <TasksFilter />
      <TasksList />
    </SCProjectTasks>
  );
};

export default ProjectTasks;
