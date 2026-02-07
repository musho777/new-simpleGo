import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import ApiClient from 'api/axiosClient';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { AsyncSelect } from 'common-ui/select';
import Select from 'common-ui/select/Select';
import TextArea from 'common-ui/textArea';
import { createTeam } from 'features/teams/teamsActions';
import { selectHeads, setCreatedTeamName } from 'features/teams/teamsSlice';
import { generateOptions } from 'utils';
import { notifyError } from 'utils/notifyConfig';
import * as Yup from 'yup';

import { BtnWrapper, Form } from './Teams.styles';

const cleanAndTransformObject = (obj, keyToRemove) => {
  const cleanedEntries = Object.entries(obj).filter(
    ([key, value]) =>
      key !== keyToRemove && value !== null && value !== undefined && value !== ''
  );

  const transformedEntries = cleanedEntries.map(([key, value]) => {
    if (key === 'districtIds' && Array.isArray(value)) {
      return [
        key,
        value.map((district) =>
          typeof district === 'object' && district.value ? district.value : district
        ),
      ];
    }
    if (key === 'teamMemberIds' && Array.isArray(value)) {
      return [
        key,
        value.map((member) =>
          typeof member === 'object' && member.value ? member.value : member
        ),
      ];
    }
    if (key === 'teamLeadId' && typeof value === 'object' && value.value) {
      return [key, value.value];
    }
    return [key, value];
  });

  return Object.fromEntries(transformedEntries);
};

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

const Create = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultOptionsCity, setDefaultOptionsCity] = useState([]);
  const [districtId, setDistrictId] = useState(null);
  const [defaultOptionsDistrict, setDefaultOptionsDistrict] = useState([]);
  const [modalWidth, setModalWidth] = useState('430px');
  const [defaultUsers, setDefaultUsers] = useState([]);
  const heads = useSelector(selectHeads);
  const { uuid } = useParams();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      city: null,
      districtIds: null,
      teamLeadId: null,
      teamMemberIds: null,
      branchId: uuid,
    },
  });

  const handleOpenCreateTeamModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    dispatch(createTeam(cleanAndTransformObject(data, 'city')));
    handleCloseModal();
    dispatch(setCreatedTeamName(data?.name));
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
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setModalWidth('370px');
      } else {
        setModalWidth('430px');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <BtnWrapper>
        <Button secondary onClick={handleOpenCreateTeamModal} className="h-38">
          + Create Team
        </Button>
      </BtnWrapper>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Create Team"
        width={modalWidth}
        footer={true}
        onOk={handleSubmit(onSubmit)}
        height={'80%'}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Team name"
                placeholder="Enter name"
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
                resizeVertical={false}
                resizeHorizontal={false}
                {...field}
                label="Description"
                placeholder="Describe branch"
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
                placeholder="Attach location"
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
                placeholder="Attach location"
                $error={errors.districtIds?.message}
                loadOptions={fetchDistrictOptions}
                onMenuOpen={fetchDistrictOptions}
                defaultOptions={defaultOptionsDistrict}
                isMulti={true}
                isDisabled={!districtId?.length}
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
                placeholder="Assign team head"
                $error={errors.teamLeadId?.message}
                options={generateOptions(heads)}
                tooltip="You can skip this step!"
              />
            )}
          />

          <Controller
            name="teamMemberIds"
            control={control}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                label="Team Members"
                placeholder="Add team members"
                $error={errors.teamMemberIds?.message}
                tooltip="You can skip this step!"
                loadOptions={fetchMembers}
                onMenuOpen={fetchMembers}
                defaultOptions={defaultUsers}
                menuPlacement="top"
                isMulti={true}
              />
            )}
          />
        </Form>
      </Modal>
    </>
  );
};

export default Create;
