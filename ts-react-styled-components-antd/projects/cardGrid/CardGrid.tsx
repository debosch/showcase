import {
  Card,
  CardStatusWrapper,
  CreatedTime,
  Deadline,
  DeadlineWrapper,
  InfoWrapper,
  ProjectName,
  ProjectsGridWrapper,
  Status,
} from './Styles';
import { UserImageWrapper } from '../../../../../components/ui/Style';
import { Link } from 'react-router-dom';
import PriorityArrow from '../../../../../components/priorityArrow/PriorityArrow';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import moment from 'moment';
import { ReactComponent as TimeIcon } from '../../../../../../assets/icons/Time.svg';
import mockUserImage from '../../../../../../assets/mockUserImage.jpeg';
import { setProject } from '../../../../../../redux/actions/project';

import routes from '../../../../../../nav/routes';

const CardGrid = () => {
  const projects = useAppSelector((state) => state.project.projects);
  const dispatch = useAppDispatch();

  const handleClick = (newProject) => {
    dispatch(setProject(newProject));
  };

  return (
    <ProjectsGridWrapper>
      {projects.map((project) => (
        <Card key={project.id}>
          <Link
            to={`${routes.editProject}/${project.id}`}
            onClick={() => handleClick(project)}
          >
            <CardStatusWrapper>
              <Status>{project.statusReadable}</Status>
              <PriorityArrow projectPriority={project.priority} />
              <CreatedTime>
                {moment(project.created_at).format('DD.MM.YYYY')}
              </CreatedTime>
            </CardStatusWrapper>
            <ProjectName>{project.name}</ProjectName>
            <InfoWrapper>
              <DeadlineWrapper>
                <TimeIcon />
                <Deadline>
                  {moment(project.deadline).format('DD.MM.YYYY')}
                </Deadline>
              </DeadlineWrapper>
              <UserImageWrapper>
                <img src={mockUserImage} alt='' />
              </UserImageWrapper>
            </InfoWrapper>
          </Link>
        </Card>
      ))}
    </ProjectsGridWrapper>
  );
};

export default CardGrid;
