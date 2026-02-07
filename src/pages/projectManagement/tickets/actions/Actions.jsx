import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import edit from 'assets/edit.svg';
import info from 'assets/info.svg';
import more from 'assets/more.svg';
import Modal from 'common-ui/modal';
import {
  ContactLabel,
  ContactValue,
  InfoWrapper,
} from 'pages/userManagement/UserManagement.styles';
import { formatDateTime } from 'utils/dateUtils';

import { Container, Dropdown, Icon, Option } from './Actions.styles';

const Actions = ({ id, row: ticket, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const location = useLocation();
  const projectUuid = location.state?.projectUuid;

  const navigate = useNavigate();

  const handleNavigateSingleTicketEdit = () => {
    navigate(`/project-management/tickets/create-edit/${id}`, { state: { projectUuid } });
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
  };

  const handleOpenDetailsModal = () => {
    setIsDetailsModalOpen(true);
  };

  return (
    <Container
      className="container"
      $isOpen={isOpen && !isMobile}
      $relative={isOpen}
      $isMobile={isMobile}
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      {!isMobile && <Icon src={more} alt="more options" />}
      {isOpen && !isMobile && (
        <Dropdown className="dropdown">
          <Option onClick={handleOpenDetailsModal}>
            <Icon src={info} alt="Enable" />
            Details
          </Option>
          <Option onClick={handleNavigateSingleTicketEdit}>
            <Icon src={edit} alt="e" />
            Edit
          </Option>
        </Dropdown>
      )}

      {isMobile && (
        <>
          <div onClick={handleNavigateSingleTicketEdit}>
            <Icon src={edit} alt="e" />
          </div>
        </>
      )}

      <Modal onClose={handleCloseModal} isOpen={isDetailsModalOpen} closeIcon>
        <InfoWrapper>
          <div>
            <ContactLabel>Progress</ContactLabel>
            <ContactValue>{ticket.progress}</ContactValue>
          </div>
          {ticket.startDate && (
            <div>
              <ContactLabel>Start date</ContactLabel>
              <ContactValue>{formatDateTime(ticket.startDate)}</ContactValue>
            </div>
          )}
          <div>
            <ContactLabel>Tracker</ContactLabel>
            <ContactValue>{ticket.tracker}</ContactValue>
          </div>
          <div>
            <ContactLabel>Created by</ContactLabel>
            <ContactValue>{ticket.createdBy?.name}</ContactValue>
          </div>
        </InfoWrapper>
      </Modal>
    </Container>
  );
};

export default Actions;
