import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import choose from 'assets/choose-a.svg';
import left from 'assets/left.svg';
import right from 'assets/right.svg';
import Button from 'common-ui/button';
import { AsyncSelect } from 'common-ui/select';
import { getProjects } from 'features/projects/projectsActions';
import { selectProjects } from 'features/projects/projectsSlice';
import {
  assignProjectOffers,
  getOffers,
  getProjectOffers,
  removeProjectOffers,
} from 'features/sales/salesActions';
import {
  moveOffersToAttached,
  moveOffersToUnattached,
  selectAssignSuccess,
  selectOffers,
  selectOffersLoading,
  selectProjectOffers,
  selectRemoveSuccess,
  setResetAssignSuccess,
  setResetProjectOffer,
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
} from './AssignOffer.styles';

const AssignOffers = () => {
  const dispatch = useDispatch();

  const assignSuccess = useSelector(selectAssignSuccess);
  const removeSuccess = useSelector(selectRemoveSuccess);
  const projects = useSelector(selectProjects);
  const projectOffers = useSelector(selectProjectOffers);

  const isLoading = useSelector(selectOffersLoading);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedAttachedIds, setSelectedAttachedIds] = useState([]);
  const [selectedUnattachedIds, setSelectedUnattachedIds] = useState([]);
  const [attachSearch, setAttachSearch] = useState('');
  const [attachedSearch, setAttachedSearch] = useState('');

  const debouncedAttachSearch = useDebounce(attachSearch, 500);
  const debouncedAttachedSearch = useDebounce(attachedSearch, 500);

  const handleProjectLoadOptions = (name) => {
    return new Promise((resolve) => {
      dispatch(getProjects({ disabled: false, name }));
      setTimeout(() => {
        resolve(generateOptions(projects));
      }, 500);
    });
  };

  const handleAssign = () => {
    if (!selectedProject) return;
    dispatch(
      assignProjectOffers({
        uuid: selectedProject.value,
        offerIds: selectedUnattachedIds,
      })
    );
  };

  const handleUnassign = () => {
    if (!selectedProject) return;
    dispatch(
      removeProjectOffers({
        uuid: selectedProject.value,
        offerIds: selectedAttachedIds,
      })
    );
  };

  const handleAttachedCheckboxClick = (uuid, selectAll = null) => {
    setSelectedAttachedIds((prev) =>
      selectAll !== null
        ? selectAll
          ? uuid
          : []
        : prev.includes(uuid)
          ? prev.filter((id) => id !== uuid)
          : [...prev, uuid]
    );
  };

  const handleUnattachedCheckboxClick = (uuid, selectAll = null) => {
    setSelectedUnattachedIds((prev) =>
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
    setAttachedSearch(value);
  };

  useEffect(() => {
    if (selectedProject) {
      dispatch(
        getProjectOffers({
          uuid: selectedProject.value,
          query: { name: debouncedAttachedSearch },
        })
      );
      dispatch(getOffers({ name: debouncedAttachSearch }));
    }

    setSelectedAttachedIds([]);
    setSelectedUnattachedIds([]);
  }, [selectedProject, debouncedAttachSearch, debouncedAttachedSearch]);

  useEffect(() => {
    if (assignSuccess) {
      dispatch(moveOffersToAttached(selectedUnattachedIds));
      dispatch(setResetAssignSuccess());
      setSelectedUnattachedIds([]);
    }
  }, [assignSuccess]);

  useEffect(() => {
    if (removeSuccess) {
      dispatch(moveOffersToUnattached(selectedAttachedIds));
      dispatch(setResetAssignSuccess());
      setSelectedAttachedIds([]);
    }
  }, [removeSuccess]);

  useEffect(() => {
    return () => {
      dispatch(setResetProjectOffer());
    };
  }, []);

  return (
    <Container>
      <Content>
        <TitleWrapper>Project</TitleWrapper>
        <SelectBox>
          <AsyncSelect
            onMenuOpen={handleProjectLoadOptions}
            loadOptions={handleProjectLoadOptions}
            defaultOptions={generateOptions(projects)}
            onChange={setSelectedProject}
            maxLength={50}
          />
        </SelectBox>

        <SelectableColumn
          data={projectOffers.attachedOffers}
          handleCheckboxClick={handleAttachedCheckboxClick}
          selectedItems={selectedAttachedIds}
          onSearch={onAttachedSearch}
          $empty={!selectedProject}
        />
        {!selectedProject && (
          <ChooseDiv>
            <Icon width="99px" height="89px" src={choose} />
            <ChooseText>Choose a project to get started</ChooseText>
          </ChooseDiv>
        )}
        <BtnWrapper>
          <Button
            secondary
            onClick={handleUnassign}
            loading={isLoading}
            disabled={selectedAttachedIds.length === 0}
          >
            Remove
            <Icon src={right} />
          </Button>
        </BtnWrapper>
      </Content>

      <Content $isVisible={!selectedProject}>
        <TitleWrapper>Offers</TitleWrapper>
        <SelectableColumn
          data={projectOffers.unattachedOffers}
          handleCheckboxClick={handleUnattachedCheckboxClick}
          selectedItems={selectedUnattachedIds}
          $empty={!selectedProject}
        />
        <BtnWrapper>
          <Button
            secondary
            onClick={handleAssign}
            loading={isLoading}
            disabled={selectedUnattachedIds.length === 0}
          >
            <Icon src={left} />
            Assign
          </Button>
        </BtnWrapper>
      </Content>
    </Container>
  );
};

export default AssignOffers;
