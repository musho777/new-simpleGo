import { useEffect, useMemo, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'common-ui/button';
import { changePhone } from 'features/auth/authActions';
import { resetSuccess, selectSuccessMainPhone } from 'features/auth/authSlice';
import { getUserProfileInfo } from 'features/profile/profileActions';
import { selectAdditionalInfo, selectMainPhone } from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import MyPhoneInput from 'pages/components/myPhoneInput';
import ProfileInfoTag from 'pages/components/profileInfoTag';
import { notifySuccess } from 'utils/notifyConfig';
import * as yup from 'yup';

import { PendingIcon, Row, Tooltip, TooltipWrapper, Wrapper } from './EditWorkPhone.styles';
import OtpValidation from './OtpValidation';
import pending from './pending.svg';

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .min(11, 'Phone number must be at least 11 digits.')
    .max(15, 'Phone number must not exceed 15 digits.')
    .required('Phone number is required.'),
});

const EditWorkPhone = () => {
  const mainPhone = useSelector(selectMainPhone);
  const success = useSelector(selectSuccessMainPhone);
  const [editMode, setEditMode] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const dispatch = useDispatch();
  const userType = localStorage.getItem('userType');
  const additionalInfo = useSelector(selectAdditionalInfo);
  const { uuid } = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phoneNumber: mainPhone.contact || '',
    },
  });

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

  const phoneNumber = watch('phoneNumber');

  const onEdit = () => {
    setEditMode(true);
  };

  const handleCancelEditMode = () => {
    setEditMode(false);
    reset();
  };

  const onSubmit = (data) => {
    if (data.phoneNumber !== mainPhone.contact) {
      setEditMode(false);
      setOtpModalOpen(true);
      dispatch(changePhone(data));
    }
    !otpModalOpen && setEditMode(false);
  };

  const handleCloseModal = () => {
    setOtpModalOpen(false);
    setEditMode(false);
    reset({ phoneNumber: mainPhone.contact });
  };

  const workPhoneData = [
    {
      leftItem: (
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <Wrapper>
              <MyPhoneInput
                {...field}
                readOnly={!editMode}
                error={errors.phoneNumber?.message}
                disabled={!editMode}
              />
              {mainPhone.pending &&
                (showUpdates ? (
                  <TooltipWrapper onClick={() => handleNavigateProfile(mainPhone.type)}>
                    <PendingIcon src={pending} alt="Pending" $eventsOff />
                    <Tooltip>Pending approval, click to proceed!</Tooltip>
                  </TooltipWrapper>
                ) : (
                  <TooltipWrapper>
                    <PendingIcon src={pending} alt="Pending" />
                  </TooltipWrapper>
                ))}
            </Wrapper>
          )}
        />
      ),
      rightItem: <ProfileInfoTag title="Highest" />,
      bordered: false,
    },
  ];

  useEffect(() => {
    reset({ phoneNumber: mainPhone.contact });
  }, [mainPhone.contact]);

  useEffect(() => {
    if (success) {
      notifySuccess('Changes successfully saved');
      dispatch(getUserProfileInfo());
    }

    dispatch(resetSuccess());
  }, [success]);

  return (
    <FieldItem
      title="Work phone number"
      data={workPhoneData}
      editable={!editMode && !uuid}
      onEdit={onEdit}
    >
      {editMode && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Button outlined className="w-80" onClick={handleCancelEditMode}>
              Cancel
            </Button>
            <Button secondary className="w-132" type="submit">
              Save changes
            </Button>
          </Row>
        </form>
      )}
      <OtpValidation
        isOpen={otpModalOpen}
        phoneNumber={phoneNumber}
        onClose={handleCloseModal}
      />
    </FieldItem>
  );
};

export default EditWorkPhone;
