import { useEffect, useMemo, useState } from 'react';

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import ApiClient from 'api/axiosClient';
import deletePending from 'assets/deletePending.svg';
import Trash from 'assets/profile/trash.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import { Select } from 'common-ui/select';
import Switch from 'common-ui/switch';
import {
  addProfileContactsEmail,
  deleteContacts,
  getUserProfileInfo,
  updateProfileContactsEmail,
} from 'features/profile/profileActions';
import {
  selectAdditionalInfo,
  selectCreateContactsEmailSuccess,
  selectEmails,
  selectLoading,
  selectUpdateContactsEmailSuccess,
} from 'features/profile/profileSlice';
import useDebounce from 'hooks/useDebounce';
import FieldItem from 'pages/components/fieldItem';
import ProfileInfoTag from 'pages/components/profileInfoTag';
import { generateOptions } from 'utils';
import * as Yup from 'yup';

import pending from '../pending.svg';
import {
  AddEmailLink,
  ButtonWrapper,
  Container,
  Form,
  Group,
  PendingIcon,
  Row,
  Tooltip,
  TooltipWrapper,
  TrashIcon,
} from './EditEmail.styles';

const infoTagOptions = [
  { value: 1, label: 'Low' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'High' },
];

const showTagOptions = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Highest' };

const schema = Yup.object().shape({
  newEmails: Yup.array()
    .of(
      Yup.object().shape({
        priority: Yup.object().required('Priority is required'),
        email: Yup.string()
          .required('Email is required')
          .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
        disabled: Yup.boolean(),
      })
    )
    .max(2, 'You can only add up to 2 email addresses')
    .test('emails-not-match', 'Duplicate emails found', function (emails) {
      if (emails && emails.length === 2) {
        const [email1, email2] = emails;
        if (email1.email === email2.email) {
          return this.createError({
            path: 'newEmails[0].email',
            message: 'Duplicate emails found',
          });
        }
      }
      return true;
    }),
});
const EditEmail = () => {
  const [rowCount, setRowCount] = useState(0);
  const [showEditAddButton, setShowEditAddButton] = useState(null);
  const isLoading = useSelector(selectLoading);
  const data = useSelector(selectEmails);
  const additionalInfo = useSelector(selectAdditionalInfo);
  const createContactsEmailSuccess = useSelector(selectCreateContactsEmailSuccess);
  const updateContactsEmailSuccess = useSelector(selectUpdateContactsEmailSuccess);
  const navigate = useNavigate();
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const userType = localStorage.getItem('userType');

  const initialData = () => {
    return data.map((item) => ({
      priority: infoTagOptions[item.priority - 1],
      email: item.contact,
      disabled: item.disabled,
      contactId: item.uuid,
      pending: item.pending,
      type: item.type,
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
  const emailsData = initialData();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      newEmails: emailsData,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'newEmails',
  });
  const firstaditionalMail = useDebounce(watch('newEmails[0].email'), 500);
  const seccondaditionalMail = useDebounce(watch('newEmails[1].email'), 500);
  const [delatexontact, setDelatexontact] = useState([]);
  const onSubmit = (data) => {
    const newEmails = [];
    const updatedEmails = [];

    data.newEmails.forEach((item) => {
      const original = emailsData.find((email) => email.contactId === item.contactId);
      if (!item.contactId) {
        newEmails.push({
          priority: item.priority.value,
          email: item.email,
          disabled: item.disabled,
          isNew: item.isNew,
        });
      } else if (original) {
        const updatedFields = {};

        if (original.priority.value !== item.priority.value) {
          updatedFields.newPriority = item.priority.value;
        }
        if (original.email !== item.email) {
          updatedFields.newEmail = item.email;
        }
        if (original.disabled !== item.disabled) {
          updatedFields.disabled = item.disabled;
        }

        if (Object.keys(updatedFields).length > 0) {
          updatedEmails.push({
            contactId: item.contactId,
            isNew: item.isNew,
            ...updatedFields,
          });
        }
      }
    });

    if (showEditAddButton === 'add') {
      dispatch(addProfileContactsEmail({ newEmails: newEmails, userType, uuid }));
    }

    if (showEditAddButton === 'edit') {
      dispatch(updateProfileContactsEmail({ emailChanges: updatedEmails, userType, uuid }));
    }
    if (delatexontact.length) {
      dispatch(deleteContacts({ contactIds: delatexontact, userType, uuid }));
    }
    setShowEditAddButton(null);
  };

  const handleAddRow = () => {
    setShowEditAddButton('add');
    if (rowCount < 2) {
      append({ priority: null, email: '', disabled: false });
      setRowCount(rowCount + 1);
    }
  };

  const handleRemoveRow = (index) => {
    const contactId = fields[index]?.contactId;

    if (contactId && showEditAddButton === 'edit') {
      setDelatexontact((prev) => [...prev, contactId]);
      setRowCount(rowCount - 1);
    }
    remove(index);
    if (showEditAddButton === 'add') {
      setRowCount(rowCount - 1);
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

  useEffect(() => {
    setRowCount(fields.length);
  }, [fields]);

  useEffect(() => {
    if (
      (createContactsEmailSuccess || updateContactsEmailSuccess) &&
      showEditAddButton === null &&
      !isLoading
    ) {
      if (uuid) {
        dispatch(getUserProfileInfo(uuid));
      } else {
        dispatch(getUserProfileInfo());
      }
    }
  }, [createContactsEmailSuccess, updateContactsEmailSuccess, showEditAddButton]);

  useEffect(() => {
    if (data?.length > 0) {
      reset({
        newEmails: initialData(),
      });
    }
  }, [data, reset]);

  const checkEmailExists = async (email, i) => {
    try {
      const response = await ApiClient.get(`/users/email-check?email=${email}`);
      if (response) {
        setError(`newEmails[${i}].email`, {
          type: 'manual',
          message: 'Email is already taken',
        });
        clearErrors(`newEmails[${i}].email`);
      } else {
        setError(`newEmails[${i}].email`, {
          type: 'manual',
          message: 'Email is already taken',
        });
      }
    } catch (error) {
      clearErrors(`newEmails[${i}].email`);
    }
  };
  useEffect(() => {
    const index = data.findIndex((item) => item.contact === firstaditionalMail);
    if (
      firstaditionalMail &&
      !errors.newEmails?.[0]?.email?.message &&
      firstaditionalMail !== data?.[index]?.contact
    ) {
      checkEmailExists(firstaditionalMail, 0);
    }
    if (
      seccondaditionalMail &&
      !errors.newEmails?.[1]?.email?.message &&
      seccondaditionalMail !== data?.[1]?.contact
    ) {
      checkEmailExists(seccondaditionalMail, 1);
    }
  }, [firstaditionalMail, seccondaditionalMail]);

  return (
    <FieldItem
      type="container"
      title="Email Address"
      onEdit={onEdit}
      editable={!showEditAddButton && rowCount > 0}
      loading={isLoading}
    >
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row style={{ marginBottom: '24px' }}>
            {additionalInfo.email && (
              <Input
                readOnly
                value={additionalInfo.email}
                label="Work email address"
                className="m-b-20"
              />
            )}
            <ProfileInfoTag title="Highest" />
          </Row>

          {fields.map((field, index) => (
            <Row
              key={field.id}
              $eventsOff={
                showEditAddButton === null || (showEditAddButton === 'add' && field.skillId)
              }
            >
              <Group>
                <Controller
                  name={`newEmails[${index}].email`}
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        label="Email address"
                        readOnly={!showEditAddButton}
                        error={errors.newEmails?.[index]?.email?.message}
                      />
                    </>
                  )}
                />
                {showEditAddButton && (
                  <Controller
                    name={`newEmails[${index}].priority`}
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={generateOptions(infoTagOptions)}
                        label="Priority"
                        placeholder="Priority"
                        className="w-91"
                        isDisabled={!showEditAddButton}
                        $error={errors.newEmails?.[index]?.priority?.message}
                      />
                    )}
                  />
                )}
                {field.pending && (
                  <Controller
                    name={`newEmails[${index}].pending`}
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
                {!!field.priority && !showEditAddButton && (
                  <>
                    <ProfileInfoTag title={showTagOptions[field?.priority.value]} />
                  </>
                )}
                <Controller
                  name={`newEmails[${index}].disabled`}
                  control={control}
                  render={({ field }) => (
                    <Switch
                      isOn={field.value}
                      onToggle={() => field.onChange(!field.value)}
                      disabled={!showEditAddButton}
                    />
                  )}
                />
                {showEditAddButton && (
                  <TrashIcon
                    src={Trash}
                    alt="Remove row"
                    onClick={() => handleRemoveRow(index)}
                  />
                )}
              </Group>
            </Row>
          ))}

          {(showEditAddButton === 'add' || !showEditAddButton) && rowCount < 2 && (
            <AddEmailLink onClick={handleAddRow}>+ Add email address</AddEmailLink>
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

export default EditEmail;
