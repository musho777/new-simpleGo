import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import choose from 'assets/choose-a.svg';
import left from 'assets/left.svg';
import right from 'assets/right.svg';
import Button from 'common-ui/button';
import { AsyncSelect } from 'common-ui/select';
import { getSubprojects } from 'features/projects/projectsActions';
import { selectSubProjects } from 'features/projects/projectsSlice';
import {
  assignSubprojectSources,
  getLeadSources,
  getSubprojectSources,
  removeSubprojectSources,
} from 'features/sales/salesActions';
import {
  moveSourcesToAttached,
  moveSourcesToUnattached,
  selectAssignSuccess,
  selectLeadSources,
  selectLeadSourcesLoading,
  selectRemoveSuccess,
  selectSubprojectSources,
  setResetAssignSuccess,
  setResetSubprojectSources,
} from 'features/sales/salesSlice';
import useDebounce from 'hooks/useDebounce';
import SelectableColumn from 'pages/components/selectableColumn';
import { generateOptions } from 'utils';

import {
  BtnWrapper,
  ChooseDiv,
  ChooseText,
  Container,
  Content,
  Icon,
  SelectBox,
  TitleWrapper,
} from './AssignSources.styles';

const AssignSources = () => {
  const dispatch = useDispatch();

  const assignSuccess = useSelector(selectAssignSuccess);
  const removeSuccess = useSelector(selectRemoveSuccess);
  const subprojects = useSelector(selectSubProjects);
  const subprojectSources = useSelector(selectSubprojectSources);
  const leadSources = useSelector(selectLeadSources);
  const isLoading = useSelector(selectLeadSourcesLoading);

  const [selectedSubproject, setSelectedSubproject] = useState(null);
  const [selectedSourcedIds, setSelectedSourcedIds] = useState([]);
  const [selectedUnattachedSourceIds, setSelectedUnattachedSourceIds] = useState([]);
  const [dataToAttachSearchName, setDataToAttachSearchName] = useState('');
  const [attachedSearchValue, setAttachedSearchValue] = useState('');

  const debouncedDataToAttachSearchName = useDebounce(dataToAttachSearchName, 500);
  const debouncedAttachedSearchValue = useDebounce(attachedSearchValue, 500);

  const handleSubprojectLoadOptions = (name) => {
    return new Promise((resolve) => {
      dispatch(getSubprojects({ disabled: false, name }));
      setTimeout(() => {
        resolve(generateOptions(subprojects));
      }, 500);
    });
  };

  const handleLeadSourcesLoadOptions = (name) => {
    return new Promise((resolve) => {
      dispatch(getLeadSources({ name }));
      setTimeout(() => {
        resolve(generateOptions(leadSources?.items || []));
      }, 500);
    });
  };

  const handleAssign = () => {
    if (!selectedSubproject) return;
    dispatch(
      assignSubprojectSources({
        uuid: selectedSubproject.value,
        sourceIds: selectedUnattachedSourceIds,
      })
    );
  };

  const handleUnassign = () => {
    if (!selectedSubproject) return;
    dispatch(
      removeSubprojectSources({
        uuid: selectedSubproject.value,
        sourceIds: selectedSourcedIds,
      })
    );
  };

  const handleSourcedCheckboxClick = (uuid, selectAll = null) => {
    setSelectedSourcedIds((prev) =>
      selectAll !== null
        ? selectAll
          ? uuid
          : []
        : prev.includes(uuid)
          ? prev.filter((id) => id !== uuid)
          : [...prev, uuid]
    );
  };

  const handleUnattachedSourceCheckboxClick = (uuid, selectAll = null) => {
    setSelectedUnattachedSourceIds((prev) =>
      selectAll !== null
        ? selectAll
          ? uuid
          : []
        : prev.includes(uuid)
          ? prev.filter((id) => id !== uuid)
          : [...prev, uuid]
    );
  };

  const onAttachedSearch = (value) => {
    setAttachedSearchValue(value);
  };

  useEffect(() => {
    if (selectedSubproject) {
      dispatch(
        getSubprojectSources({
          uuid: selectedSubproject.value,
          query: { name: debouncedAttachedSearchValue },
        })
      );
      dispatch(getLeadSources({ name: debouncedDataToAttachSearchName }));
    }

    setSelectedSourcedIds([]);
    setSelectedUnattachedSourceIds([]);
  }, [selectedSubproject, debouncedAttachedSearchValue, debouncedDataToAttachSearchName]);

  useEffect(() => {
    if (assignSuccess) {
      dispatch(moveSourcesToAttached(selectedUnattachedSourceIds));
      dispatch(setResetAssignSuccess());
      setSelectedUnattachedSourceIds([]);
    }
  }, [assignSuccess]);

  useEffect(() => {
    if (removeSuccess) {
      dispatch(moveSourcesToUnattached(selectedSourcedIds));
      dispatch(setResetAssignSuccess());
      setSelectedSourcedIds([]);
    }
  }, [removeSuccess]);

  useEffect(() => {
    return () => {
      dispatch(setResetSubprojectSources());
    };
  }, []);

  return (
    <Container>
      <Content>
        <TitleWrapper>Subproject</TitleWrapper>
        <SelectBox>
          <AsyncSelect
            onMenuOpen={handleSubprojectLoadOptions}
            loadOptions={handleSubprojectLoadOptions}
            defaultOptions={generateOptions(subprojects)}
            onChange={setSelectedSubproject}
            maxLength={50}
          />
        </SelectBox>

        <SelectableColumn
          data={subprojectSources.attachedSources}
          handleCheckboxClick={handleSourcedCheckboxClick}
          selectedItems={selectedSourcedIds}
          onSearch={onAttachedSearch}
          $empty={!selectedSubproject}
        />
        {!selectedSubproject && (
          <ChooseDiv>
            <Icon width="99px" height="89px" src={choose} />
            <ChooseText>Choose a subproject to get started</ChooseText>
          </ChooseDiv>
        )}
        <BtnWrapper>
          <Button
            secondary
            onClick={handleUnassign}
            loading={isLoading}
            disabled={selectedSourcedIds.length === 0}
          >
            Remove
            <Icon src={right} />
          </Button>
        </BtnWrapper>
      </Content>

      <Content $isVisible={!selectedSubproject}>
        <TitleWrapper>Sources</TitleWrapper>
        <SelectableColumn
          data={subprojectSources.unattachedSources}
          handleCheckboxClick={handleUnattachedSourceCheckboxClick}
          selectedItems={selectedUnattachedSourceIds}
          $empty={!selectedSubproject}
        />

        <BtnWrapper>
          <Button
            secondary
            onClick={handleAssign}
            loading={isLoading}
            disabled={selectedUnattachedSourceIds.length === 0}
          >
            <Icon src={left} />
            Assign
          </Button>
        </BtnWrapper>
      </Content>
    </Container>
  );
};

export default AssignSources;
