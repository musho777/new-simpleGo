import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  selectActiveNotifications,
  setActiveNotifications,
} from 'features/notifications/notificationsSlice';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 9999px;
  width: fit-content;
  gap: 10px;
  margin-left: 7px;
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 5px 15px;
  border: ${({ $active }) => ($active ? 'none' : '0.5px solid #D4D8DD')};
  outline: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  background: ${({ $active }) => ($active ? '#e9effd' : 'transparent')};
  color: ${({ $active }) => ($active ? '#2563eb' : '#555')};
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.25);
  }
  @media (max-width: 320px) {
    flex: 0 1 auto;
    padding: 4px 10px;
    font-size: 11px;
  }
`;

const Toggle = ({ onChange }) => {
  const activeNotifications = useSelector(selectActiveNotifications);
  const dispatch = useDispatch();
  const handleToggle = (filter) => {
    let updatedFilters;

    if (filter === 'all') {
      updatedFilters = ['all'];
    } else {
      updatedFilters = activeNotifications.includes(filter)
        ? activeNotifications.filter((f) => f !== filter)
        : [...activeNotifications.filter((f) => f !== 'all'), filter];
    }

    dispatch(setActiveNotifications(updatedFilters));
    onChange(updatedFilters);
  };

  return (
    <ToggleContainer>
      <ToggleButton
        $active={activeNotifications.includes('all')}
        onClick={() => handleToggle('all')}
      >
        All
      </ToggleButton>
      <ToggleButton
        $active={activeNotifications.includes('financial')}
        onClick={() => handleToggle('financial')}
      >
        Finance
      </ToggleButton>
      {/* <ToggleButton
        $active={activeNotifications.includes('appointment')}
        onClick={() => handleToggle('appointment')}
      >
        Appointment
      </ToggleButton> */}

      <ToggleButton
        $active={activeNotifications.includes('sales')}
        onClick={() => handleToggle('sales')}
      >
        Sales
      </ToggleButton>
      <ToggleButton
        $active={activeNotifications.includes('unread')}
        onClick={() => handleToggle('unread')}
      >
        Unread
      </ToggleButton>
    </ToggleContainer>
  );
};

export default Toggle;
