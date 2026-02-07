import React from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { selectAdditionalInfo } from 'features/profile/profileSlice';
import FieldItem from 'pages/components/fieldItem';
import ProfileInfoTag from 'pages/components/profileInfoTag';

import { Wrapper } from '../personalInfoEdit/PersonalInfoEdit.styles';

const WorkPhone = () => {
  const additionalInfo = useSelector(selectAdditionalInfo);
  const navigate = useNavigate();
  const { uuid } = useParams();

  const onEdit = () => {
    navigate('/profile/contacts/edit');
  };

  const workPhoneData = [
    {
      leftItem: <Wrapper>{additionalInfo?.phoneNumber}</Wrapper>,
      rightItem: <ProfileInfoTag title="Highest" />,
      bordered: true,
    },
  ];
  return (
    <FieldItem
      title="Work phone number"
      onEdit={onEdit}
      data={workPhoneData}
      editable={!uuid}
    />
  );
};

export default WorkPhone;
