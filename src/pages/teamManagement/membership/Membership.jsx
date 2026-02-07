import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import user from 'assets/header/user.svg';
import left from 'assets/left.svg';
import right from 'assets/right.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { AsyncSelect } from 'common-ui/select';
import {
  getAttachedMembers,
  getTeamMembers,
  getTeams,
  memberAssignToTeam,
  memberDeleteFromTeam,
} from 'features/teamManagement/teamManagementActions';
import {
  resetTeamsState,
  selectAttachedTeamMembers,
  selectLoading,
  selectSuccess,
  selectTeamMembers,
  selectTeams,
} from 'features/teamManagement/teamManagementSlice';
import useDebounce from 'hooks/useDebounce';
import Navigation from 'pages/components/navigation';
import SelectableColumn from 'pages/components/selectableColumn';
import Tag from 'pages/components/tag';
import { generateOptions } from 'utils';

import {
  Avatar,
  BtnWrapper,
  Container,
  Content,
  Header,
  Icon,
  TitleWrapper,
} from './Membership.styles';

const TABS = [
  { path: '/team-management', name: 'Team' },
  { path: '/team-management/membership', name: 'Team membership' },
];

const Membership = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTeamIds, setSelectedTeamIds] = useState([]);
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);
  const [memberToAttachSearchName, setMemberToAttachSearchName] = useState('');
  const [attachedMemberSearchName, setAttachedMemberSearchName] = useState('');

  const teams = useSelector(selectTeams);
  const filteredDisabledTeams = teams?.filter((item) => item.disabled === false);
  const singleTeam = teams.find((item) => item.uuid === selectedTeam?.value);

  const teamMembers = useSelector(selectTeamMembers);
  const attachedTeamMembers = useSelector(selectAttachedTeamMembers);
  const isLoading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);
  const debouncedMemberToAttachSearchName = useDebounce(memberToAttachSearchName, 500);
  const debouncedAttachedMemberName = useDebounce(attachedMemberSearchName, 500);

  const attachedMembers = attachedTeamMembers?.map((item) => {
    return {
      uuid: item.uuid,
      name: item.name,
      avatar: (
        <>
          <Avatar src={item.photo ?? user} />
        </>
      ),
    };
  });

  const membersToAttach = teamMembers?.map((item) => {
    return {
      uuid: item.uuid,
      name: item.name,
      avatar: (
        <>
          <Avatar src={item.photo ?? user} />
        </>
      ),
    };
  });

  const attachedMembersHeaderData = singleTeam?.lead && (
    <>
      <Avatar src={singleTeam?.lead?.photo ?? user} />
      {`${singleTeam?.lead?.name ?? 'Name'} ${singleTeam?.lead?.surname ?? 'Surname'}`}
      <Tag type="roles" variant="Team Lead" />
    </>
  );

  const dispatch = useDispatch();

  const handleLoadTeamOptions = (name) => {
    dispatch(getTeams({ disabled: false, name }));

    return new Promise((resolve, reject) => {
      dispatch(getTeams({ disabled: false, name }));

      setTimeout(() => {
        const data = teams;
        resolve(generateOptions(data));
      }, 500);
    });
  };

  const handleTeamCheckboxClick = (uuids, selectAll = null) => {
    setSelectedTeamIds((prevSelected) => {
      if (selectAll !== null) {
        return selectAll ? uuids : [];
      }

      return prevSelected.includes(uuids)
        ? prevSelected.filter((id) => id !== uuids)
        : [...prevSelected, uuids];
    });
  };

  const handleMemberCheckboxClick = (uuids, selectAll = null) => {
    setSelectedMemberIds((prevSelected) => {
      if (selectAll !== null) {
        return selectAll ? uuids : [];
      }

      return prevSelected.includes(uuids)
        ? prevSelected.filter((id) => id !== uuids)
        : [...prevSelected, uuids];
    });
  };

  const handleAttachMember = () => {
    const params = {
      uuid: selectedTeam.value,
      memberIds: selectedMemberIds,
    };

    dispatch(memberAssignToTeam(params));
  };

  const handleRemoveMember = () => {
    const params = {
      uuid: selectedTeam.value,
      memberIds: selectedTeamIds,
    };

    dispatch(memberDeleteFromTeam(params));
  };

  const onAttachedSearch = (value) => {
    setAttachedMemberSearchName(value);
  };

  useEffect(() => {
    const params = {
      name: debouncedMemberToAttachSearchName,
    };

    const attachedParams = {
      name: debouncedAttachedMemberName,
    };

    if (selectedTeam) {
      dispatch(getTeamMembers({ uuid: selectedTeam.value, params }));
      dispatch(getAttachedMembers({ uuid: selectedTeam.value, params: attachedParams }));
    }

    setSelectedTeamIds([]);
    setSelectedMemberIds([]);
  }, [selectedTeam, debouncedMemberToAttachSearchName, debouncedAttachedMemberName, success]);

  useEffect(() => {
    dispatch(resetTeamsState());
    setSelectedTeam(null);
  }, []);

  return (
    <>
      <Header>
        <Navigation tabs={TABS} />
      </Header>
      <Container>
        <Content>
          <TitleWrapper>Team</TitleWrapper>
          <AsyncSelect
            placeholder="search..."
            onMenuOpen={handleLoadTeamOptions}
            loadOptions={handleLoadTeamOptions}
            defaultOptions={generateOptions(filteredDisabledTeams)}
            onChange={setSelectedTeam}
            maxLength={50}
          />
          <SelectableColumn
            data={attachedMembers}
            handleCheckboxClick={handleTeamCheckboxClick}
            selectedItems={selectedTeamIds}
            headerData={selectedTeam ? attachedMembersHeaderData : false}
            onSearch={onAttachedSearch}
            loading={isLoading.attachedMembers}
            searchInputValue={memberToAttachSearchName}
            searchable
          />
          <BtnWrapper>
            <Button
              secondary
              onClick={handleRemoveMember}
              loading={isLoading.memberDeleteFromTeam}
              disabled={selectedTeamIds?.length === 0}
            >
              Remove
              <Icon src={right} />
            </Button>
          </BtnWrapper>
        </Content>

        <Content $isVisible={!selectedTeam}>
          <TitleWrapper>Members</TitleWrapper>
          <Input
            placeholder="search..."
            onChange={(e) => setMemberToAttachSearchName(e.target.value)}
            disabled={!selectedTeam}
            onClear={() => setMemberToAttachSearchName('')}
            value={memberToAttachSearchName}
            maxLength={50}
            clearable
          />

          <SelectableColumn
            data={membersToAttach}
            handleCheckboxClick={handleMemberCheckboxClick}
            loading={isLoading.members}
            selectedItems={selectedMemberIds}
          />
          <BtnWrapper>
            <Button
              secondary
              onClick={handleAttachMember}
              disabled={selectedMemberIds?.length === 0}
              loading={isLoading.memberAssignToTeam}
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

export default Membership;
