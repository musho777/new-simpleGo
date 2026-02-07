import { useEffect } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import Modal from 'common-ui/modal';
import { Select } from 'common-ui/select';
import TextArea from 'common-ui/textArea';
import { updateBranches } from 'features/branches/branchesActions';
import { selectBranches, selectHeads } from 'features/branches/branchesSlice';
import { selectRegions } from 'features/regions/regionsSlice';
import { generateOptions, getModifiedKeys } from 'utils';
import * as Yup from 'yup';

import { Form, Row } from '../Branches.styles';

const armenianNameRegex = /^[\u0530-\u058F\s\-_&/.0-9]+$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Branch name is required')
    .matches(armenianNameRegex, 'Name must contain only Armenian letters and numbers'),
  regionIds: Yup.array()
    .min(1, 'At least one region is required')
    .required('Region is required'),
});

const EditBranchModal = ({ isOpen, onClose, id }) => {
  const dispatch = useDispatch();
  const branches = useSelector(selectBranches);
  const branch = branches.find((item) => item.uuid === id);
  const regions = useSelector(selectRegions);

  const mergedRegions = regions.map((region) => {
    const selectedRegion = branch?.regions.find((branch) => branch.uuid === region.uuid);

    if (selectedRegion) {
      return {
        ...region,
        value: selectedRegion.uuid,
        label: selectedRegion.name,
        canDelete: selectedRegion.canDelete,
      };
    }
    return {
      ...region,
      value: region.uuid,
      label: region.name,
      canDelete: true,
    };
  });

  const heads = useSelector(selectHeads);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: branch?.name || '',
      description: branch?.description || '',
      branchHeadId: branch.head
        ? {
            label: `${branch?.head?.name} ${branch?.head?.surname}`,
            value: branch.head?.uuid,
          }
        : null,
      regionIds: generateOptions(mergedRegions) || '',
    },
  });

  const handleSubmitEdit = (data) => {
    const cleanData = {};

    cleanData.branchHeadId =
      data.branchHeadId === null
        ? null
        : Array.isArray(data.branchHeadId)
          ? data.branchHeadId[0]?.value
          : data.branchHeadId?.value;

    cleanData.name = data.name;
    cleanData.description = data.description;

    const currentRegionIds = branch.regions.map((region) => region.uuid);
    const updatedRegionIds = data.regionIds.map((region) => region.value);

    const newRegionIds = updatedRegionIds.filter(
      (regionId) => !currentRegionIds.includes(regionId)
    );
    const deletedRegionIds = currentRegionIds.filter(
      (regionId) => !updatedRegionIds.includes(regionId)
    );

    cleanData.newRegionIds = newRegionIds;
    cleanData.deletedRegionIds = deletedRegionIds;

    cleanData.uuid = id;

    dispatch(updateBranches(getModifiedKeys(cleanData, branch)));
    onClose();
  };

  useEffect(() => {
    reset({
      name: branch?.name || '',
      description: branch?.description || '',
      branchHeadId: branch?.head
        ? {
            label: `${branch?.head?.name} ${branch?.head?.surname}`,
            value: branch.head?.uuid,
          }
        : null,
      regionIds: generateOptions(branch.regions) || '',
    });
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Branch">
      <Form onSubmit={handleSubmit(handleSubmitEdit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Branch name"
              error={errors.name?.message}
              placeholder="Enter name"
              maxLength={50}
              required
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              placeholder="Describe branch"
              label="Description"
              error={errors.description?.message}
              tooltip="You can skip this step!"
              resizeVertical={false}
              resizeHorizontal={false}
            />
          )}
        />

        <Controller
          name="branchHeadId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Branch Head"
              $error={errors.branchHeadId?.message}
              tooltip="You can skip this step!"
              options={generateOptions(heads)}
              isClearable
            />
          )}
        />

        <Controller
          name="regionIds"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              isClearable={false}
              label="Regions"
              menuPlacement="top"
              $error={errors.regionIds?.message}
              options={generateOptions(mergedRegions)}
              req
            />
          )}
        />

        <Row>
          <Button outlined onClick={onClose}>
            Cancel
          </Button>
          <Button secondary type="submit">
            Edit
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditBranchModal;
