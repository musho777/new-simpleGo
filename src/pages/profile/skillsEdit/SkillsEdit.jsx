import { useEffect, useMemo, useState } from 'react';

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import deletePending from 'assets/deletePending.svg';
import Trash from 'assets/profile/trash.svg';
import Button from 'common-ui/button';
import { Select } from 'common-ui/select';
import Switch from 'common-ui/switch';
import {
  createSkills,
  deleteSkills,
  editSkills,
  getUserProfileInfo,
} from 'features/profile/profileActions';
import {
  selectAdditionalInfo,
  selectCreateSuccess,
  selectLoading,
  selectSkills,
  selectUpdateSkillsSuccess,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import { generateOptions } from 'utils';
import * as Yup from 'yup';

import {
  AddSkillsLink,
  ButtonWrapper,
  Form,
  Group,
  PendingIcon,
  Row,
  Tooltip,
  TooltipWrapper,
  TrashIcon,
  TrashWrapper,
} from './SkillsEdit.styles';
import pending from './pending.svg';

const infoTagOptions = [
  { value: 1, label: 'Intern' },
  { value: 2, label: 'Junior' },
  { value: 3, label: 'Middle' },
  { value: 4, label: 'Senior' },
  { value: 5, label: 'Master' },
];

const infoSkillOptions = [
  { value: 'developer', label: 'Developer' },
  { value: 'manager', label: 'Manager' },
  { value: 'qa', label: 'QA' },
  { value: 'pm', label: 'PM' },
  { value: 'designer', label: 'Designer' },
];

const processAndFilterSkills = (options, fields) => {
  const chosenOptions = fields?.map((item) => item.skill);

  const filteredOptions = options?.filter(
    (item) => !chosenOptions?.some((removeItem) => removeItem?.value === item?.value)
  );

  return filteredOptions;
};

const schema = Yup.object().shape({
  skills: Yup.array().of(
    Yup.object().shape({
      skill: Yup.object().required('Skill is required'),
      level: Yup.object().required('Level is required'),
      disabled: Yup.boolean(),
    })
  ),
});

const SkillsEdit = () => {
  const [rowCount, setRowCount] = useState(0);
  const [showEditAddButton, setShowEditAddButton] = useState(null);
  const isLoading = useSelector(selectLoading);
  const data = useSelector(selectSkills);
  const additionalInfo = useSelector(selectAdditionalInfo);
  const createSuccess = useSelector(selectCreateSuccess);
  const updateSkillsSuccess = useSelector(selectUpdateSkillsSuccess);

  const navigate = useNavigate();
  const { uuid } = useParams();
  const dispatch = useDispatch();

  const userType = localStorage.getItem('userType');

  const initialData = () => {
    return data.map((item) => ({
      skill: infoSkillOptions.find((i) => i.value === item.skill) || null,
      disabled: item.disabled,
      level: infoTagOptions[item?.level - 1],
      pending: item.pending,
      type: item.type,
      skillId: item.uuid,
      isNew: item.type === 'add' ? true : false,
    }));
  };

  const showUpdates = useMemo(() => {
    return (
      (userType === 'Hr Manager' && !additionalInfo.isSuper) ||
      (userType === 'Super Admin' && additionalInfo.isSuper && !!uuid)
    );
  }, [userType, additionalInfo, uuid]);

  const handleNavigateProfile = (type) => {
    if (type === 'add') {
      navigate(`/profile/new/${additionalInfo.uuid}`);
    } else if (type === 'update' || type === 'remove') {
      navigate(`/profile/updates/${additionalInfo.uuid}`);
    }
  };

  const skillsData = initialData();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      skills: skillsData,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const onSubmit = (data) => {
    const newSkills = [];
    const updatedSkills = [];

    data.skills.forEach((item) => {
      const original = skillsData.find((skill) => skill.skillId === item.skillId);

      if (!item.skillId) {
        newSkills.push({
          skill: item.skill?.value,
          level: item.level?.value,
          isNew: item.type === 'add' ? true : false,
          disabled: item.disabled,
        });
      } else if (original) {
        const updatedFields = {};

        if (item.skill?.value !== original.skill?.value) {
          updatedFields.skill = item.skill?.value;
        }
        if (item.level?.value !== original.level?.value) {
          updatedFields.level = item.level?.value;
        }
        if (item.disabled !== original.disabled) {
          updatedFields.disabled = item.disabled;
        }

        if (Object.keys(updatedFields).length > 0) {
          updatedSkills.push({
            isNew: item.type === 'add' ? true : false,
            skillId: item.skillId,
            ...updatedFields,
          });
        }
      }
    });

    if (showEditAddButton === 'add') {
      dispatch(createSkills({ skills: newSkills, userType, uuid }));
    }

    if (showEditAddButton === 'edit') {
      dispatch(editSkills({ skillChanges: updatedSkills, userType, uuid }));
    }

    setShowEditAddButton(null);
  };

  const handleAddRow = () => {
    setShowEditAddButton('add');
    if (rowCount < 5) {
      append({ level: null, skills: null, disabled: false });
      setRowCount(rowCount + 1);
    }
  };

  const handleRemoveRow = (index) => {
    const skillId = fields[index]?.skillId;

    if (skillId) {
      dispatch(deleteSkills({ skillIds: [skillId], userType, uuid }));
    }

    remove(index);
  };

  const onEdit = () => {
    setShowEditAddButton('edit');
  };

  const handleCancelForm = () => {
    reset();
    setShowEditAddButton(null);
    setRowCount(fields.length);
  };

  useEffect(() => {
    setRowCount(fields.length);
  }, [fields]);

  useEffect(() => {
    if ((createSuccess || updateSkillsSuccess) && showEditAddButton === null && !isLoading) {
      if (uuid) {
        dispatch(getUserProfileInfo(uuid));
      } else {
        dispatch(getUserProfileInfo());
      }
    }
  }, [createSuccess, updateSkillsSuccess, showEditAddButton]);

  useEffect(() => {
    if (data?.length > 0) {
      reset({
        skills: initialData(),
      });
    }
  }, [data, reset]);

  return (
    <FieldItem
      type="container"
      title="Personal skills"
      editable={!showEditAddButton && rowCount > 0}
      onEdit={onEdit}
      loading={isLoading}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <Row
            key={field.id}
            $eventsOff={
              field.type === 'remove' || (field.skillId && showEditAddButton !== 'edit')
            }
          >
            <Group>
              <Controller
                name={`skills[${index}].skill`}
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={processAndFilterSkills(infoSkillOptions, fields)}
                      label="Choose skill"
                      placeholder="Choose skill"
                      menuPlacement={index > 2 ? 'top' : 'auto'}
                      className={`w-270 ${showEditAddButton === 'edit' ? 'disabled-select' : ''}`}
                      $error={errors.skills?.[index]?.skill?.message}
                      req
                    />
                  </>
                )}
              />
              <Controller
                name={`skills[${index}].level`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={generateOptions(infoTagOptions)}
                    label="Level"
                    placeholder="Level"
                    menuPlacement={index > 2 ? 'top' : 'auto'}
                    className="w-91"
                    $error={errors.skills?.[index]?.level?.message}
                    req
                  />
                )}
              />
              {field.pending && (
                <Controller
                  name={`languages[${index}].pending`}
                  control={control}
                  render={() =>
                    showUpdates ? (
                      <TooltipWrapper
                        onClick={() => handleNavigateProfile(field.type)}
                        className="cursor-pointer"
                      >
                        <PendingIcon
                          src={field.type === 'remove' ? deletePending : pending}
                          alt="Pending"
                        />
                        <Tooltip>Pending approval, click to proceed!</Tooltip>
                      </TooltipWrapper>
                    ) : (
                      <TooltipWrapper>
                        <PendingIcon
                          src={field.type === 'remove' ? deletePending : pending}
                          alt="Pending"
                        />
                        <Tooltip>Pending</Tooltip>
                      </TooltipWrapper>
                    )
                  }
                />
              )}
            </Group>
            <Group>
              <Controller
                name={`skills[${index}].disabled`}
                control={control}
                render={({ field }) => (
                  <Switch
                    isOn={field.value}
                    onToggle={() => field.onChange(!field.value)}
                    disabled={!showEditAddButton}
                  />
                )}
              />
              {((showEditAddButton === 'add' && !field.skillId) ||
                showEditAddButton === 'edit') && (
                <TrashWrapper disabled={field.pending} onClick={() => handleRemoveRow(index)}>
                  <TrashIcon src={Trash} alt="Remove row" />
                </TrashWrapper>
              )}
            </Group>
          </Row>
        ))}

        {(showEditAddButton === 'add' || !showEditAddButton) && rowCount < 5 && (
          <AddSkillsLink onClick={handleAddRow}>+ Add skills</AddSkillsLink>
        )}
        {showEditAddButton && (
          <ButtonWrapper>
            <Button outlined className="w-80" onClick={handleCancelForm}>
              Cancel
            </Button>
            <Button secondary type="submit" className="w-132">
              Save changes
            </Button>
          </ButtonWrapper>
        )}
      </Form>
    </FieldItem>
  );
};

export default SkillsEdit;
