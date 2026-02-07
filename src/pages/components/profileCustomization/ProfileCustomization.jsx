import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import EmptyIcon from 'assets/profile/emptyIcon.svg';
import Button from 'common-ui/button';

import { Container, Description, Icon, Title } from './ProfileCustomization.styles';

const ProfileCustomization = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${pathname}/edit`);
  };

  return (
    <Container>
      <Icon src={EmptyIcon} alt="Profile icon" />
      <Title>Your profile is ready to be customized</Title>
      <Description>
        It looks like your profile is still a blank canvas. Start adding your personal details
        to make the most out of your experience.
      </Description>
      <Button width="229px" secondary onClick={handleClick}>
        Add personal information
      </Button>
    </Container>
  );
};

export default ProfileCustomization;
