import React, { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import ApiClient from 'api/axiosClient';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { AsyncSelect, Select } from 'common-ui/select';
import TextArea from 'common-ui/textArea';
import { updateTeams } from 'features/teams/teamsActions';
import { selectHeads, selectTeams } from 'features/teams/teamsSlice';
import { generateOptions } from 'utils';
import { notifyError } from 'utils/notifyConfig';
import * as Yup from 'yup';

import { getModifiedKeys } from '../../../utils/index';
import { Form, Row } from '../Teams.styles';

const armenianNameRegex = /^[\u0530-\u058F\s\-_&/.0-9]+$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Team name is required')
    .matches(
      armenianNameRegex,
      'Only Armenian letters and numbers, starting with an uppercase'
    ),
  districtIds: Yup.array()
    .min(1, 'At least one district is required')
    .required('District is required'),
  city: Yup.array().min(1, 'At least one city is required').required('City is required'),
});

const EditTeamModal = ({ isOpen, onClose, id }) => {
  const [defaultOptionsCity, setDefaultOptionsCity] = useState([]);
  const [defaultOptionsDistrict, setDefaultOptionsDistrict] = useState([]);
  const [defaultUsers, setDefaultUsers] = useState([]);
  const dispatch = useDispatch();
  const teams = useSelector(selectTeams);
  const team = teams.find((item) => item.uuid === id);
  const members = team?.members?.map((item) => ({
    name: `${item.name}`,
    value: item.uuid,
  }));

  const defaultDistrictIds = team?.cities?.map((item) => item.uuid);

  const [districtId, setDistrictId] = useState(defaultDistrictIds);
  const { uuid } = useParams();
  const heads = useSelector(selectHeads);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: team?.name || '',
      description: team?.description || '',
      teamLeadId: team.lead
        ? {
            label: `${team?.lead?.name} ${team?.lead?.surname}`,
            value: team.lead?.uuid,
          }
        : null,
      city: generateOptions(team?.cities) || '',
      districtIds: generateOptions(team?.districts) || '',
      teamMemberIds: generateOptions(members) || '',
    },
  });

  const handleSubmitEdit = (data) => {
    const cleanData = {};

    cleanData.teamLeadId =
      data.teamLeadId === null
        ? null
        : Array.isArray(data.teamLeadId)
          ? data.teamLeadId[0]?.value
          : data.teamLeadId?.value;

    cleanData.name = data.name;
    cleanData.description = data.description;

    const currentDistrictIds = team.districts.map((district) => district.uuid);
    const updatedDistrictIds = data.districtIds.map((district) => district.value);

    const newDistrictIds = updatedDistrictIds.filter(
      (districtIds) => !currentDistrictIds.includes(districtIds)
    );
    const deletedDistrictIds = currentDistrictIds.filter(
      (districtIds) => !updatedDistrictIds.includes(districtIds)
    );

    const updatedMemberIds = data.teamMemberIds.map((member) => member.value);
    const currentMemberIds = team.members.map((member) => member.uuid);

    const newMemberIds = updatedMemberIds.filter(
      (memberIds) => !currentMemberIds.includes(memberIds)
    );
    const deletedMemberIds = currentMemberIds.filter(
      (memberIds) => !updatedMemberIds.includes(memberIds)
    );

    cleanData.newDistrictIds = newDistrictIds;
    cleanData.deletedDistrictIds = deletedDistrictIds;
    cleanData.newMemberIds = newMemberIds;
    cleanData.deletedMemberIds = deletedMemberIds;

    cleanData.uuid = id;

    dispatch(updateTeams(getModifiedKeys(cleanData, team)));
    onClose();
  };

  const fetchCityOptions = async (searchTerm) => {
    try {
      const url = searchTerm
        ? `/regions/branch-subregions/${uuid}?name=${encodeURIComponent(searchTerm)}`
        : `/regions/branch-subregions/${uuid}`;

      const response = await ApiClient.get(url);
      const options = generateOptions(response.branchSubregions || []);
      setDefaultOptionsCity(options);
      return options;
    } catch (error) {
      console.error('Error fetching district options:', error);
      notifyError('Getting district options failed');
    }
  };

  const fetchDistrictOptions = async (searchTerm) => {
    try {
      const query = Array.isArray(districtId)
        ? districtId
            .map((item) => `subregionIds=${encodeURIComponent(item.value || item)}`)
            .join('&')
        : `subregionIds=${encodeURIComponent(districtId?.value || districtId)}`;
      const url = searchTerm
        ? `/regions/subregion-districts?${query}&name=${encodeURIComponent(searchTerm)}`
        : `/regions/subregion-districts?${query}`;
      const response = await ApiClient.get(url);
      setDefaultOptionsDistrict(generateOptions(response.subregionDistricts));
      return generateOptions(response.subregionDistricts);
    } catch (error) {
      console.error('Error fetching district options:', error);
      notifyError('Getting district options failed');
    }
  };

  const fetchMembers = async (searchTerm) => {
    try {
      const url = searchTerm
        ? `/users/team-members?&name=${encodeURIComponent(searchTerm)}`
        : `/users/team-members`;
      const response = await ApiClient.get(url);
      setDefaultUsers(generateOptions(response.members));
      return generateOptions(response.members);
    } catch (error) {
      console.error('Error fetching member options:', error);
      notifyError('Getting member options failed');
    }
  };

  useEffect(() => {
    setDistrictId(defaultDistrictIds);

    reset({
      name: team?.name || '',
      description: team?.description || '',
      teamLeadId: team.lead
        ? {
            label: `${team?.lead?.name} ${team?.lead?.surname}`,
            value: team.lead?.uuid,
          }
        : null,
      city: generateOptions(team?.cities) || '',
      districtIds: generateOptions(team?.districts) || '',
      teamMemberIds: generateOptions(members) || '',
    });
  }, [team, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Team" height={'80%'}>
      <Form onSubmit={handleSubmit(handleSubmitEdit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Team name"
              error={errors.name?.message}
              required
              maxLength={50}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              label="Description"
              error={errors.description?.message}
              maxLength={100}
              tooltip="You can skip this step!"
            />
          )}
        />

        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <AsyncSelect
              {...field}
              label="City"
              $error={errors.city?.message}
              loadOptions={fetchCityOptions}
              onMenuOpen={fetchCityOptions}
              defaultOptions={defaultOptionsCity}
              onChange={(selectedOption) => {
                field.onChange(selectedOption);
                setDistrictId(selectedOption);
              }}
              req
              isMulti
            />
          )}
        />

        <Controller
          name="districtIds"
          control={control}
          render={({ field }) => (
            <AsyncSelect
              {...field}
              label="District"
              $error={errors.districtIds?.message}
              loadOptions={fetchDistrictOptions}
              onMenuOpen={fetchDistrictOptions}
              defaultOptions={defaultOptionsDistrict}
              isMulti={true}
              isDisabled={!districtId.length}
              req
            />
          )}
        />

        <Controller
          name="teamLeadId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Team Head"
              $error={errors.teamLeadId?.message}
              options={generateOptions(heads)}
              tooltip="You can skip this step!"
              isClearable
            />
          )}
        />

        <Controller
          name="teamMemberIds"
          control={control}
          render={({ field }) => (
            <AsyncSelect
              {...field}
              menuPlacement="top"
              label="Team Members"
              $error={errors.teamMemberIds?.message}
              tooltip="You can skip this step!"
              loadOptions={fetchMembers}
              onMenuOpen={fetchMembers}
              defaultOptions={defaultUsers}
              isMulti={true}
            />
          )}
        />

        <Row>
          <Button outlined onClick={onClose}>
            Cancel
          </Button>
          <Button secondary type="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditTeamModal;
