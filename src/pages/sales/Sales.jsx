import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import projectIcon from 'assets/Not Found illustration.png';
import { CustomTooltip } from 'common-ui/table/CustomTooltip';
import loadIcon from 'common-ui/table/loading.svg';
import { getSalesProjects } from 'features/sales/salesActions';
import { selectSalesProjects, selectSalesProjectsLoading } from 'features/sales/salesSlice';
import EmptyView from 'pages/components/emptyView';

import {
  Container,
  Header,
  LoadContainer,
  LoadingIcon,
  ProjectBox,
  ProjectFlex,
  ProjectInfo,
  ProjectInfoName,
  ProjectName,
  ProjectNameBox,
  ProjectType,
  ProjectsContainer,
  SubProjectCount,
} from './Sales.styles';

const Sales = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projects = useSelector(selectSalesProjects);
  const isLoading = useSelector(selectSalesProjectsLoading);

  const handleNavigate = (projectId) => {
    navigate(`/products/${projectId}`);
  };

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  const renderTruncatedText = (text, maxLength) => {
    if (!text || text.length <= maxLength) {
      return text;
    }

    return (
      <CustomTooltip title={text}>
        <span>{truncateText(text, maxLength)}</span>
      </CustomTooltip>
    );
  };

  useEffect(() => {
    dispatch(getSalesProjects({ query: {} }));
  }, [dispatch]);
  if (isLoading) {
    return (
      <Container>
        <Header>
          <ProjectNameBox>Projects</ProjectNameBox>
        </Header>
        <LoadContainer>
          <LoadingIcon src={loadIcon} alt="Loading..." />
        </LoadContainer>
      </Container>
    );
  }

  if (!isLoading && projects.length === 0) {
    return (
      <Container>
        <Header>
          <ProjectNameBox>Projects</ProjectNameBox>
        </Header>
        <EmptyView
          icon={projectIcon}
          title="No Projects Found"
          description="There are no sales projects available at the moment."
        />
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Header>
          <ProjectNameBox>Projects</ProjectNameBox>
        </Header>
        <ProjectsContainer>
          {projects.map((project) => (
            <ProjectBox
              key={project.projectId}
              onClick={() => handleNavigate(project.projectId)}
            >
              <ProjectFlex>
                <ProjectName>{project.projectName}</ProjectName>
                <ProjectType>
                  {renderTruncatedText(project.projectType || '—', 10)}
                </ProjectType>
              </ProjectFlex>
              <ProjectFlex>
                <ProjectInfoName>Project description</ProjectInfoName>
                <ProjectInfo>
                  {renderTruncatedText(project.projectDescription || '—', 15)}
                </ProjectInfo>
              </ProjectFlex>
              <ProjectFlex>
                <ProjectInfoName>Subprojects</ProjectInfoName>
                <SubProjectCount>{project.subprojectsWithLeadsCount || 0}</SubProjectCount>
              </ProjectFlex>
            </ProjectBox>
          ))}
        </ProjectsContainer>
      </Container>
    </>
  );
};

export default Sales;
