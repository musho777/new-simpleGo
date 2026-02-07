import { useEffect, useMemo, useState } from 'react';

import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import deletePending from 'assets/deletePending.svg';
import Trash from 'assets/profile/trash.svg';
import Button from 'common-ui/button';
import { Select } from 'common-ui/select';
import Switch from 'common-ui/switch';
import {
  createLanguages,
  deleteLanguages,
  editLanguages,
  getUserProfileInfo,
} from 'features/profile/profileActions';
import {
  selectAdditionalInfo,
  selectCreateLanguagesSuccess,
  selectLanguages,
  selectLoading,
  selectUpdateLanguagesSuccess,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import ProfileInfoTag from 'pages/components/profileInfoTag';
import { generateOptions } from 'utils';
import * as Yup from 'yup';

import {
  AddLanguage,
  ButtonWrapper,
  Container,
  Form,
  Group,
  PendingIcon,
  Row,
  SelectLanguageBox,
  Tooltip,
  TooltipWrapper,
  TrashIcon,
} from './LanguagesEdit.styles';
import pending from './pending.svg';

const infoTagOptions = [
  { value: 1, label: 'Low' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'High' },
  { value: 4, label: 'Highest' },
];

const infoLevelOptions = [
  { value: 1, label: 'Native' },
  { value: 2, label: 'Advanced (C2)' },
  { value: 3, label: 'Upper - Intermediate (C1)' },
  { value: 4, label: 'Intermediate (B2)' },
  { value: 5, label: 'Pre-Intermediate (B1)' },
  { value: 6, label: 'Elementary (A2)' },
  { value: 7, label: 'Beginner (A1)' },
];

const infoLanguageOptions = [
  { value: 1, label: 'English US' },
  { value: 2, label: 'English UK' },
  { value: 3, label: 'Spanish' },
  { value: 4, label: 'Russian' },
  { value: 5, label: 'Armenian' },
];

const showTagOptions = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Highest' };

const schema = Yup.object().shape({
  languages: Yup.array().of(
    Yup.object().shape({
      priority: Yup.object().required('Priority is required'),
      language: Yup.object().required('Language is required'),
      level: Yup.object().required('Level is required'),
      disabled: Yup.boolean(),
    })
  ),
});

const LanguagesEdit = () => {
  const [rowCount, setRowCount] = useState(0);
  const [showEditAddButton, setShowEditAddButton] = useState(null);

  const data = useSelector(selectLanguages);
  const additionalInfo = useSelector(selectAdditionalInfo);
  const updateLanguagesSuccess = useSelector(selectUpdateLanguagesSuccess);
  const createLanguagesSuccess = useSelector(selectCreateLanguagesSuccess);
  const isLoading = useSelector(selectLoading);

  const navigate = useNavigate();
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const userType = localStorage.getItem('userType');

  const initialData = () => {
    return data.map((item) => ({
      priority: infoTagOptions[item.priority - 1],
      language: infoLanguageOptions.find((i) => i.label === item.language) || null,
      disabled: item.disabled,
      level: infoLevelOptions[item?.level - 1],
      pending: item.pending,
      type: item.type,
      languageId: item.uuid,
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

  const languagesData = initialData();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      languages: languagesData,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages',
  });

  const onSubmit = (data) => {
    const newLanguages = [];
    const updatedLanguages = [];

    data.languages.forEach((item) => {
      const original = languagesData.find((lang) => lang.languageId === item.languageId);

      if (!item.languageId) {
        newLanguages.push({
          priority: item.priority?.value,
          language: item.language?.label,
          level: item.level?.value,
          disabled: item.disabled,
          isNew: item.type === 'add' ? true : false,
        });
      } else if (original) {
        const updatedFields = {};

        if (item.priority?.value !== original.priority?.value) {
          updatedFields.priority = item.priority?.value;
        }
        if (item.language?.label !== original.language?.label) {
          updatedFields.language = item.language?.label;
        }
        if (item.level?.value !== original.level?.value) {
          updatedFields.level = item.level?.value;
        }
        if (item.disabled !== original.disabled) {
          updatedFields.disabled = item.disabled;
        }

        if (Object.keys(updatedFields).length > 0) {
          updatedLanguages.push({
            isNew: item.type === 'add' ? true : false,
            languageId: item.languageId,
            ...updatedFields,
          });
        }
      }
    });

    if (showEditAddButton === 'add') {
      dispatch(createLanguages({ languages: newLanguages, userType, uuid }));
    }

    if (showEditAddButton === 'edit') {
      dispatch(editLanguages({ languageChanges: updatedLanguages, userType, uuid }));
    }

    setShowEditAddButton(null);
  };

  const handleAddRow = () => {
    setShowEditAddButton('add');
    if (rowCount < 5) {
      append({ priority: null, language: null, disabled: false, level: null });
      setRowCount(rowCount + 1);
    }
  };

  const handleRemoveRow = (index) => {
    const languageId = fields[index]?.languageId;

    if (languageId) {
      dispatch(deleteLanguages({ languageIds: [languageId], userType, uuid }));
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

  const editLanguage = (data) => {
    const updatedLanguages = [
      {
        disabled: !data.disabled,
        isNew: data.isNew,
        languageId: data.languageId,
      },
    ];

    dispatch(editLanguages({ languageChanges: updatedLanguages, userType, uuid }));
  };

  useEffect(() => {
    setRowCount(fields.length);
  }, [fields]);

  useEffect(() => {
    if (
      (createLanguagesSuccess || updateLanguagesSuccess) &&
      showEditAddButton === null &&
      !isLoading
    ) {
      if (uuid) {
        dispatch(getUserProfileInfo(uuid));
      } else {
        dispatch(getUserProfileInfo());
      }
    }
  }, [createLanguagesSuccess, updateLanguagesSuccess, showEditAddButton]);

  useEffect(() => {
    if (data?.length > 0) {
      reset({
        languages: initialData(),
      });
    }
  }, [data, reset]);

  const watchedLanguages = useWatch({
    control,
    name: 'languages',
  });

  return (
    <FieldItem
      type="container"
      title="Languages"
      editable={!showEditAddButton && rowCount > 0}
      onEdit={onEdit}
      loading={isLoading}
    >
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => {
            const selectedValues = watchedLanguages
              ?.filter((_, idx) => idx !== index)
              ?.map((item) => item?.language?.value)
              ?.filter(Boolean);

            const languageOptions = infoLanguageOptions.filter(
              (option) => !selectedValues.includes(option.value)
            );

            return (
              <Row
                key={field.id}
                $eventsOff={
                  field.type === 'remove' || (field.languageId && showEditAddButton !== 'edit')
                }
              >
                <Group>
                  <Controller
                    name={`languages[${index}].language`}
                    control={control}
                    render={({ field }) => (
                      <SelectLanguageBox>
                        <Select
                          {...field}
                          options={languageOptions}
                          label="Choose language"
                          placeholder="Choose language"
                          className={`w-270 ${showEditAddButton === 'edit' ? 'disabled-select' : ''}`}
                          $error={errors.languages?.[index]?.language?.message}
                          req
                          menuPlacement={index > 1 ? 'top' : 'bottom'}
                        />
                      </SelectLanguageBox>
                    )}
                  />

                  {showEditAddButton && (
                    <Controller
                      name={`languages[${index}].level`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={generateOptions(infoLevelOptions)}
                          label="Level"
                          placeholder="Level"
                          className="w-183"
                          menuPlacement={index > 1 ? 'top' : 'bottom'}
                          $error={errors.languages?.[index]?.level?.message}
                          req
                        />
                      )}
                    />
                  )}

                  {showEditAddButton && (
                    <Controller
                      name={`languages[${index}].priority`}
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={generateOptions(infoTagOptions)}
                          label="Priority"
                          placeholder="Priority"
                          className="w-91"
                          $error={errors.languages?.[index]?.priority?.message}
                          req
                          menuPlacement={index > 1 ? 'top' : 'bottom'}
                        />
                      )}
                    />
                  )}

                  {field.pending && (
                    <Controller
                      name={`languages[${index}].pending`}
                      control={control}
                      render={() => {
                        return showUpdates ? (
                          <TooltipWrapper onClick={() => handleNavigateProfile(field.type)}>
                            <PendingIcon
                              src={field.type === 'remove' ? deletePending : pending}
                              alt="Pending"
                              className="cursor-pointer"
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
                        );
                      }}
                    />
                  )}
                </Group>

                <Group>
                  {!!field.level && !showEditAddButton && (
                    <ProfileInfoTag title={field.level.label} />
                  )}
                  {!!field.priority && !showEditAddButton && (
                    <ProfileInfoTag title={showTagOptions[field?.priority.value]} />
                  )}
                  <Controller
                    name={`languages[${index}].disabled`}
                    control={control}
                    render={({ field }) => (
                      <Switch
                        isOn={field.value}
                        onToggle={() => {
                          !showEditAddButton && editLanguage(fields[index]);
                          field.onChange(!field.value);
                        }}
                      />
                    )}
                  />
                  {((showEditAddButton === 'add' && !field.languageId) ||
                    showEditAddButton === 'edit') && (
                    <TrashIcon
                      src={Trash}
                      alt="Remove row"
                      onClick={() => handleRemoveRow(index)}
                    />
                  )}
                </Group>
              </Row>
            );
          })}

          {(showEditAddButton === 'add' || !showEditAddButton) && rowCount < 5 && (
            <AddLanguage onClick={handleAddRow}>+ Add language</AddLanguage>
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
      </Container>
    </FieldItem>
  );
};

export default LanguagesEdit;
