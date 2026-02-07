import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import choose from 'assets/choose-a.svg';
import left from 'assets/left.svg';
import right from 'assets/right.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { AsyncSelect } from 'common-ui/select';
import {
  assignTeamToSubproject,
  getAttachedTeams,
  getProjectSubprojects,
  getProjects,
  getSubprojects,
  getSubprojectsToAssign,
  getTeamsToAssign,
  projectsAssignSubproject,
  projectsUnAssignSubproject,
  unassignTeamFromSubproject,
} from 'features/projects/projectsActions';
import {
  resetProjectsState,
  selectLoading,
  selectProjectSubprojects,
  selectProjects,
  selectSubProjects,
  selectSubprojectsToAssign,
  selectSuccess,
  selectTeamSubprojects,
  selectTeamsToAssign,
} from 'features/projects/projectsSlice';
import useDebounce from 'hooks/useDebounce';
import Navigation from 'pages/components/navigation';
import SelectableColumn from 'pages/components/selectableColumn';
import { generateOptions } from 'utils';

import {
  BtnWrapper,
  ChooseDiv,
  ChooseText,
  Container,
  Content,
  Header,
  Icon,
  LimitDiv,
  TitleWrapper,
} from './Assign.styles';

const TABS_PROJECT = [{ path: '/project/projects', name: '< Back to list' }];

const TABS_SUBPROJECT = [{ path: '/project/projects/sub', name: '< Back to list' }];

const Assign = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedAssignedIds, setSelectedAssignedIds] = useState([]);
  const [selectedUnassignedIds, setSelectedUnassignedIds] = useState([]);
  const [dataToAttachSearchName, setDataToAttachSearchName] = useState('');
  const [attachedSearchValue, setAttachedSearchValue] = useState('');

  const projects = useSelector(selectProjects);
  const subprojects = useSelector(selectSubprojectsToAssign);
  const projectSubprojects = useSelector(selectProjectSubprojects);
  const isLoading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const teamSubprojects = useSelector(selectTeamSubprojects);
  const teamsToAssign = useSelector(selectTeamsToAssign);
  const mainSubProjects = useSelector(selectSubProjects);
  const debouncedDataToAttachSearchName = useDebounce(dataToAttachSearchName, 500);
  const debouncedAttachedSearchValue = useDebounce(attachedSearchValue, 500);

  const { pathname } = useLocation();

  const TABS = pathname === '/project/projects/assign' ? TABS_PROJECT : TABS_SUBPROJECT;
  const isAssigningToProject = pathname === '/project/projects/assign';

  const dispatch = useDispatch();

  const handleLoadOptions = (name) => {
    return new Promise((resolve, reject) => {
      if (isAssigningToProject) {
        dispatch(getProjects({ disabled: false, name }));
      } else {
        dispatch(getSubprojects({ disabled: false, name }));
      }

      setTimeout(() => {
        const data = isAssigningToProject ? projects : mainSubProjects;
        resolve(generateOptions(data));
      }, 500);
    });
  };

  const handleAssign = () => {
    const params = {
      uuid: selectedItem.value,
      [isAssigningToProject ? 'subprojectIds' : 'teamIds']: selectedUnassignedIds,
    };

    if (isAssigningToProject) {
      dispatch(projectsAssignSubproject(params));
    } else {
      dispatch(assignTeamToSubproject(params));
    }
  };

  const handleUnassign = () => {
    const params = {
      uuid: selectedItem.value,
      [isAssigningToProject ? 'subprojectIds' : 'teamIds']: selectedAssignedIds,
    };

    if (isAssigningToProject) {
      dispatch(projectsUnAssignSubproject(params));
    } else {
      dispatch(unassignTeamFromSubproject(params));
    }
  };

  const handleAssignedCheckboxClick = (uuids, selectAll = null) => {
    setSelectedAssignedIds((prevSelected) => {
      if (selectAll !== null) {
        return selectAll ? uuids : [];
      }

      return prevSelected.includes(uuids)
        ? prevSelected.filter((id) => id !== uuids)
        : [...prevSelected, uuids];
    });
  };

  const handleUnAssignedCheckboxClick = (uuids, selectAll = null) => {
    setSelectedUnassignedIds((prevSelected) => {
      if (selectAll !== null) {
        return selectAll ? uuids : [];
      }

      return prevSelected.includes(uuids)
        ? prevSelected.filter((id) => id !== uuids)
        : [...prevSelected, uuids];
    });
  };

  const onAttachedSearch = (value) => {
    setAttachedSearchValue(value);
  };

  useEffect(() => {
    if (selectedItem) {
      const attachedQuery = { name: debouncedAttachedSearchValue };
      const toAttachQuery = { name: debouncedDataToAttachSearchName };

      const params = { uuid: selectedItem.value };

      if (isAssigningToProject) {
        dispatch(getProjectSubprojects({ ...params, query: attachedQuery }));
        dispatch(getSubprojectsToAssign({ ...params, query: toAttachQuery }));
      } else {
        dispatch(getAttachedTeams({ uuid: selectedItem.value, query: attachedQuery }));
        dispatch(getTeamsToAssign({ uuid: selectedItem.value, query: toAttachQuery }));
      }
    }

    setSelectedAssignedIds([]);
    setSelectedUnassignedIds([]);
  }, [selectedItem, debouncedAttachedSearchValue, debouncedDataToAttachSearchName, success]);

  useEffect(() => {
    setSelectedItem(null);
    dispatch(resetProjectsState());
  }, []);

  return (
    <>
      <Header>
        <LimitDiv>
          <Navigation tabs={TABS} />
        </LimitDiv>
      </Header>
      <Container>
        <Content>
          <TitleWrapper>{isAssigningToProject ? 'Project' : 'Subproject'}</TitleWrapper>
          <AsyncSelect
            placeholder="search..."
            onMenuOpen={handleLoadOptions}
            loadOptions={handleLoadOptions}
            defaultOptions={generateOptions(isAssigningToProject ? projects : mainSubProjects)}
            onChange={setSelectedItem}
            maxLength={50}
          />
          <SelectableColumn
            data={isAssigningToProject ? projectSubprojects : teamSubprojects}
            handleCheckboxClick={handleAssignedCheckboxClick}
            selectedItems={selectedAssignedIds}
            searchable
            onSearch={onAttachedSearch}
            $empty={!selectedItem}
          />
          {!selectedItem && (
            <ChooseDiv>
              <Icon width={'99px'} height={'89px'} src={choose} />
              <ChooseText>
                Choose a {isAssigningToProject ? 'project' : 'subproject'} to get started
              </ChooseText>
            </ChooseDiv>
          )}
          <BtnWrapper>
            <Button
              secondary
              onClick={handleUnassign}
              loading={isLoading.unassignAction || isLoading.unassignTeamFromSubproject}
              disabled={selectedAssignedIds.length === 0}
            >
              Remove
              <Icon src={right} />
            </Button>
          </BtnWrapper>
        </Content>

        <Content $isVisible={!selectedItem}>
          <TitleWrapper>{isAssigningToProject ? 'Subproject' : 'Team'}</TitleWrapper>
          <Input
            placeholder="search..."
            onChange={(e) => setDataToAttachSearchName(e.target.value)}
            value={dataToAttachSearchName}
            disabled={!selectedItem}
            onClear={() => setDataToAttachSearchName('')}
            maxLength={50}
            clearable
          />
          <SelectableColumn
            data={isAssigningToProject ? subprojects : teamsToAssign}
            handleCheckboxClick={handleUnAssignedCheckboxClick}
            selectedItems={selectedUnassignedIds}
            $empty={!selectedItem}
          />
          <BtnWrapper>
            <Button
              secondary
              onClick={handleAssign}
              loading={isLoading.assignAction || isLoading.assignTeamToSubproject}
              disabled={selectedUnassignedIds.length === 0}
            >
              <Icon src={left} />
              Assign
            </Button>
          </BtnWrapper>
        </Content>
      </Container>
    </>
  );
};

export default Assign;
