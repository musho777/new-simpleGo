import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Input from 'common-ui/input';
import Pagination from 'common-ui/table/Pagination';
import { getProjects } from 'features/projectManagement/ProjectManagementActions';
import { selectProjects } from 'features/projectManagement/ProjectManagementSlice';
import useDebounce from 'hooks/useDebounce';

import {
  AllTicketCount,
  Container,
  Content,
  Header,
  Label,
  ProjectCard,
  ProjectTitle,
  Row,
  TicketCount,
  Value,
} from './ProjectManagement.styles';
import { useProjectManagementSearchParams } from './useSearchData';

const ProjectManagement = () => {
  const { searchData, setProjectManagementSearchParams } = useProjectManagementSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState(searchData.name || '');
  const [first, setFirst] = useState(false);
  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 16)) + 1;
  }, [searchData.offset, searchData.limit]);
  const projectsData = useSelector(selectProjects);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const projects = projectsData?.projects;
  const pagesCount = Math.ceil(projectsData?.count / 16);
  const onPaginationChange = (page) => {
    const offset = (page - 1) * 16;
    setProjectManagementSearchParams({ offset });
  };

  const handleNavigateToAllTickets = () => {
    navigate('/project-management/tickets');
  };

  const handleNavigateProjectTickets = (uuid) => {
    navigate(`/project-management/tickets/${uuid}`, {
      state: { projectUuid: uuid },
    });
  };

  const handleSearchValueChange = (e) => {
    setFirst(true);
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (first) setProjectManagementSearchParams({ name: debouncedSearchValue });
  }, [debouncedSearchValue]);

  useEffect(() => {
    dispatch(getProjects(searchData));
  }, [JSON.stringify(searchData)]);

  return (
    <Container>
      <Header>
        <AllTicketCount onClick={handleNavigateToAllTickets}>
          <p>All tickets</p>
          <p>{projectsData?.allTickets}</p>
        </AllTicketCount>
        <Input
          value={searchValue}
          placeholder="Search..."
          onChange={handleSearchValueChange}
        />
      </Header>
      <Content>
        {projects?.map((item, index) => (
          <ProjectCard
            key={`project-card-${index}`}
            $color={item?.color}
            onClick={() => handleNavigateProjectTickets(item.uuid)}
          >
            <ProjectTitle>{item.name}</ProjectTitle>
            <Row>
              <Label>Owner:</Label>
              <Value>{item.owner?.name ?? '-'}</Value>
            </Row>
            <TicketCount>
              <ProjectTitle>{item.tickets} tickets</ProjectTitle>
            </TicketCount>
          </ProjectCard>
        ))}
      </Content>
      {pagesCount > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagesCount}
          onPageChange={onPaginationChange}
        />
      )}
    </Container>
  );
};

export default ProjectManagement;
