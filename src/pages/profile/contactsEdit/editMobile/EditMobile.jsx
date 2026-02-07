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
  addProfileContactsPhone,
  deleteContacts,
  getUserProfileInfo,
  updateProfileContactsPhone,
} from 'features/profile/profileActions';
import {
  selectAdditionalInfo,
  selectCreateContactsNumbersSuccess,
  selectLoading,
  selectMobilePhones,
  selectUpdateContactsNumbersSuccess,
} from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import MyPhoneInput from 'pages/components/myPhoneInput';
import ProfileInfoTag from 'pages/components/profileInfoTag';
import { generateOptions } from 'utils';
import * as Yup from 'yup';

import pending from '../pending.svg';
import {
  AddPhoneLink,
  ButtonWrapper,
  Container,
  Form,
  Group,
  PendingIcon,
  Row,
  Tooltip,
  TooltipWrapper,
  TrashIcon,
} from './EditMobile.styles';

const infoTagOptions = [
  { value: 1, label: 'Low' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'High' },
];

const schema = Yup.object().shape({
  newPhones: Yup.array()
    .of(
      Yup.object().shape({
        priority: Yup.object().nullable().required('Priority is required'),
        phoneNumber: Yup.string()
          .matches(/^[0-9]+$/, 'Phone number is invalid')
          .min(11, 'Phone number should be at least 11 digits')
          .required('Phone number is required'),
        disabled: Yup.boolean(),
      })
    )
    .max(2, 'You can only add up to 2 phone numbers'),
});

const showTagOptions = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Highest' };

const EditMobile = () => {
  const [showEditAddButton, setShowEditAddButton] = useState(null);
  const mobileData = useSelector(selectMobilePhones);
  const additionalInfo = useSelector(selectAdditionalInfo);
  const navigate = useNavigate();
  const isLoading = useSelector(selectLoading);
  const userType = localStorage.getItem('userType');
  const { uuid } = useParams();
  const [rowCount, setRowCount] = useState(0);
  const createContactsNumbersSuccess = useSelector(selectCreateContactsNumbersSuccess);
  const updateContactsNumbersSuccess = useSelector(selectUpdateContactsNumbersSuccess);
  const [delateContact, setDelateContact] = useState([]);

  const showUpdates = useMemo(() => {
    return (
      (userType === 'Hr Manager' && !additionalInfo.isSuper) ||
      (userType === 'Super Admin' && additionalInfo.isSuper && !!uuid)
    );
  }, [userType, additionalInfo, uuid]);

  const generateFieldItemData = () => {
    return mobileData.map((item) => ({
      priority: infoTagOptions[item.priority - 1],
      phoneNumber: item.contact,
      disabled: item.disabled,
      contactId: item.uuid,
      pending: item.pending,
      type: item.type,
      isNew: item.type ? true : false,
    }));
  };
  const initialData = generateFieldItemData();

  const handleNavigateProfile = (type) => {
    if (type === 'add') {
      navigate(`/profile/new/${additionalInfo.uuid}`);
    } else if (type === 'update' || type === 'remove') {
      navigate(`/profile/updates/${additionalInfo.uuid}`);
    }
  };

  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      newPhones: initialData,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'newPhones',
  });

  const onSubmit = (data) => {
    const transformedData = data.newPhones.reduce((acc, item, index) => {
      const originalItem = initialData[index];

      if (!originalItem) {
        acc.push({
          priority: item.priority.value,
          phoneNumber: item.phoneNumber,
          disabled: item.disabled,
          isNew: item.type === 'add' ? true : false,
        });
      } else {
        const changes = {};

        if (originalItem.priority.value !== item.priority.value) {
          changes.newPriority = item.priority.value;
        }
        if (originalItem.phoneNumber !== item.phoneNumber) {
          changes.newPhone = item.phoneNumber;
        }
        if (originalItem.disabled !== item.disabled) {
          changes.disabled = item.disabled;
        }

        if (Object.keys(changes).length > 0) {
          acc.push({
            contactId: item.contactId,
            isNew: item.isNew,
            ...changes,
          });
        }
      }

      return acc;
    }, []);

    if (transformedData.length > 0) {
      if (showEditAddButton === 'add') {
        dispatch(
          addProfileContactsPhone({
            newPhones: transformedData,
            isMobile: true,
            userType,
            uuid,
          })
        );
      } else {
        dispatch(
          updateProfileContactsPhone({
            phoneChanges: transformedData,
            isMobile: true,
            userType,
            uuid,
          })
        );
      }
    }

    if (delateContact.length) {
      dispatch(deleteContacts({ contactIds: delateContact, userType, uuid }));
    }

    setShowEditAddButton(null);
  };

  const handleAddRow = () => {
    setShowEditAddButton('add');
    if (rowCount < 2) {
      append({ priority: null, phoneNumber: null, disabled: false });
      setRowCount(rowCount + 1);
    }
  };

  const onEdit = () => {
    setShowEditAddButton('edit');
  };

  const handleCancelForm = () => {
    reset();
    setShowEditAddButton(null);
    setRowCount(fields.length);
  };
  const handleRemoveRow = (index) => {
    const contactId = fields[index]?.contactId;

    if (contactId) {
      setDelateContact((prev) => [...prev, contactId]);
    }
    remove(index);
    setRowCount(rowCount - 1);
  };

  useEffect(() => {
    setRowCount(fields.length);
  }, [fields]);

  useEffect(() => {
    if (
      (createContactsNumbersSuccess || updateContactsNumbersSuccess) &&
      showEditAddButton === null &&
      !isLoading
    ) {
      if (uuid) {
        dispatch(getUserProfileInfo(uuid));
      } else {
        dispatch(getUserProfileInfo());
      }
    }
  }, [createContactsNumbersSuccess, updateContactsNumbersSuccess, showEditAddButton]);

  useEffect(() => {
    if (mobileData?.length > 0) {
      reset({
        newPhones: generateFieldItemData(),
      });
    }
  }, [mobileData, reset]);

  return (
    <FieldItem
      type="container"
      title="Mobile phone number"
      onEdit={onEdit}
      editable={!showEditAddButton && rowCount > 0}
      loading={isLoading}
    >
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <Row key={field.id}>
              <Group>
                <Controller
                  name={`newPhones[${index}].phoneNumber`}
                  control={control}
                  render={({ field }) => (
                    <MyPhoneInput
                      {...field}
                      label="Phone number"
                      error={errors.newPhones?.[index]?.phoneNumber?.message}
                      readOnly={!showEditAddButton}
                    />
                  )}
                />
                {showEditAddButton && (
                  <Controller
                    name={`newPhones[${index}].priority`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={generateOptions(infoTagOptions)}
                        label="Priority"
                        placeholder="Priority"
                        className="w-91"
                        isDisabled={!showEditAddButton}
                        $error={errors.newPhones?.[index]?.priority?.message}
                      />
                    )}
                  />
                )}
                {field.pending && (
                  <Controller
                    name={`newPhones[${index}].pending`}
                    control={control}
                    render={() =>
                      showUpdates ? (
                        <TooltipWrapper onClick={() => handleNavigateProfile(field.type)}>
                          <PendingIcon
                            src={field.type === 'remove' ? deletePending : pending}
                            alt="Pending"
                            $eventsOff
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
                {!!field.priority && !showEditAddButton && (
                  <ProfileInfoTag title={showTagOptions[field?.priority.value]} />
                )}
                <Controller
                  name={`newPhones[${index}].disabled`}
                  control={control}
                  render={({ field }) => (
                    <Switch
                      isOn={field.value}
                      onToggle={() => field.onChange(!field.value)}
                      disabled={!showEditAddButton}
                    />
                  )}
                />
                {showEditAddButton && field.type !== 'remove' && (
                  <TrashIcon
                    src={Trash}
                    alt="Remove row"
                    onClick={() => handleRemoveRow(index)}
                  />
                )}
              </Group>
            </Row>
          ))}
          {(showEditAddButton === 'add' || !showEditAddButton) && rowCount + 1 < 3 && (
            <AddPhoneLink onClick={handleAddRow}>+ Add phone number</AddPhoneLink>
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

export default EditMobile;
