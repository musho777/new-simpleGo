import { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import { Portal } from '@mui/material';
import edit from 'assets/edit.svg';
import checked from 'assets/finance/checked.svg';
import markAsDone from 'assets/finance/mark_as_done.svg';
import reject from 'assets/finance/rejectMenu.svg';
import split from 'assets/finance/split.svg';
import { selectUserInfo } from 'features/auth/authSlice';

import ApproveModal from '../../../singleFinanceView/components/ApproveModal/ApproveModal';
import MarkAsDoneModal from '../../../singleFinanceView/components/MarkAsDoneModal/MarkAsDoneModal';
import RejectTicketModal from '../../../singleFinanceView/components/RejectModal/RejectTicketModal';
import SplitExpenseModal from '../../../singleFinanceView/components/splitExpenseModal/SplitExpenseModal';
import {
  ApproveImg,
  Container,
  Dropdown,
  Icon,
  MenuIcon,
  MobileEdit,
  Option,
} from './Actions.styles';
import more from './assets/more.svg';
import view from './assets/view.svg';

const Actions = ({
  id,
  record,
  onView,
  onEdit,
  onApprove,
  onReject,
  onMarkAsDone,
  onMarkAsSeen,
  onSplit,
  isMobile = false,
  iconClassName,
  grid = false,
  dropdownPosition = 'down',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isMarkAsDoneModalOpen, setIsMarkAsDoneModalOpen] = useState(false);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [isSplitLoading, setIsSplitLoading] = useState(false);
  const [isRejectLoading, setIsRejectLoading] = useState(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [isMarkAsDoneLoading, setIsMarkAsDoneLoading] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const containerRef = useRef(null);
  const userType = localStorage.getItem('userType');
  const user = useSelector(selectUserInfo);
  const calculateDropdownPosition = () => {
    if (!containerRef.current) return {};

    const rect = containerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    let optionCount = 1;

    if (record?.requester?.uuid === user.uuid) optionCount++;
    if (
      record?.status === 'Pending Approval' &&
      (userType === 'General Manager' || userType === 'Super Admin')
    ) {
      optionCount += 3;
    }
    if (userType === 'Accounting Staff' && record?.status === 'Approved') optionCount++; // Mark as Done
    if (
      record?.status === 'Completed' &&
      (userType === 'General Manager' || userType === 'Super Admin')
    )
      optionCount++;

    const optionHeight = 36;
    const padding = 26;
    const actualDropdownHeight = optionCount * optionHeight + padding;

    const dropdownWidth = 160;

    let top =
      dropdownPosition === 'up' ? rect.top - actualDropdownHeight + 15 : rect.bottom + 5;
    let left = rect.right - dropdownWidth;

    if (left < 0) {
      left = rect.left;
    }

    if (left + dropdownWidth > viewportWidth) {
      left = viewportWidth - dropdownWidth - 10;
    }

    return { top: top - 10, left: left + 10 };
  };

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => {
      if (!prev) {
        setDropdownStyle(calculateDropdownPosition());
      }
      return !prev;
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setDropdownStyle(calculateDropdownPosition());
      }
    };

    const handleResize = () => {
      if (isOpen) {
        setDropdownStyle(calculateDropdownPosition());
      }
    };

    if (isOpen) {
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isOpen]);

  const handleView = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onView?.(id, record);
    setIsOpen(false);
  };

  const handleEdit = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onEdit?.(id, record);
    setIsOpen(false);
  };

  const handleApproveClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsApproveModalOpen(true);
    setIsOpen(false);
  };

  const handleRejectClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsRejectModalOpen(true);
    setIsOpen(false);
  };

  const handleMarkAsDoneClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsMarkAsDoneModalOpen(true);
    setIsOpen(false);
  };

  const handleMarkAsSeenClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onMarkAsSeen?.(record.uuid || record.id);
    setIsOpen(false);
  };

  const handleApproveModalClose = () => {
    setIsApproveModalOpen(false);
  };

  const handleRejectModalClose = () => {
    setIsRejectModalOpen(false);
  };

  const handleMarkAsDoneModalClose = () => {
    setIsMarkAsDoneModalOpen(false);
  };

  const handleSplitClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsSplitModalOpen(true);
    setIsOpen(false);
  };

  const handleSplitModalClose = () => {
    setIsSplitModalOpen(false);
  };

  const handleApproveTicket = async (approvalData) => {
    try {
      setIsApproveLoading(true);
      await onApprove?.(record.uuid, approvalData);
      setIsApproveModalOpen(false);
    } catch (error) {
      console.error('Error approving ticket:', error);
    } finally {
      setIsApproveLoading(false);
    }
  };

  const handleRejectTicket = async (rejectionReason) => {
    try {
      setIsRejectLoading(true);
      await onReject(record.uuid, rejectionReason);
      setIsRejectModalOpen(false);
    } catch (error) {
      console.error('Error rejecting ticket:', error);
    } finally {
      setIsRejectLoading(false);
    }
  };

  const handleMarkAsDone = async (doneData) => {
    try {
      setIsMarkAsDoneLoading(true);
      await onMarkAsDone?.(record.uuid, doneData);
      setIsMarkAsDoneModalOpen(false);
    } catch (error) {
      console.error('Error marking as done:', error);
    } finally {
      setIsMarkAsDoneLoading(false);
    }
  };

  const handleSplitExpense = async (splitData) => {
    try {
      setIsSplitLoading(true);
      await onSplit?.(record.uuid, splitData);
      setIsSplitModalOpen(false);
    } catch (error) {
      console.error('Error splitting expense:', error);
    } finally {
      setIsSplitLoading(false);
    }
  };
  return (
    <Container
      ref={containerRef}
      className="container"
      $isOpen={isOpen && !isMobile}
      $relative={isOpen}
      $isMobile={isMobile}
      $position={dropdownPosition}
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
    >
      {!isMobile && <Icon src={more} alt="more options" className={iconClassName} />}
      {isOpen && !isMobile && (
        <Portal>
          <Dropdown
            className="dropdown"
            $grid={grid}
            $position={dropdownPosition}
            style={dropdownStyle}
          >
            <Option onClick={handleView}>
              <MenuIcon src={view} alt="View" />
              <p>View</p>
            </Option>
            {record?.requester?.uuid === user.uuid &&
              record?.status !== 'Completed' &&
              record?.status !== 'Seen' &&
              record?.status !== 'Rejected' && (
                <Option onClick={handleEdit}>
                  <MenuIcon src={edit} alt="Edit" />
                  <p>Edit</p>
                </Option>
              )}
            {record?.status === 'Pending Approval' &&
              (userType === 'General Manager' || userType === 'Super Admin') && (
                <Option onClick={handleApproveClick}>
                  <ApproveImg src={checked} alt="Approve" />
                  <p>Approve</p>
                </Option>
              )}
            {record?.status === 'Pending Approval' &&
              (userType === 'General Manager' || userType === 'Super Admin') && (
                <Option onClick={handleSplitClick}>
                  <MenuIcon size="17px" src={split} alt="Split" />
                  <p>Split</p>
                </Option>
              )}
            {record?.status === 'Pending Approval' &&
              (userType === 'General Manager' || userType === 'Super Admin') && (
                <Option onClick={handleRejectClick}>
                  <MenuIcon size={'40px'} src={reject} alt="reject" />
                  <p>Reject</p>
                </Option>
              )}
            {userType === 'Accounting Staff' && record?.status === 'Approved' && (
              <Option onClick={handleMarkAsDoneClick}>
                <MenuIcon size={'17px'} src={markAsDone} alt="Mark as Done" />
                <p>Mark as Done</p>
              </Option>
            )}
            {record?.status === 'Completed' &&
              (userType === 'General Manager' || userType === 'Super Admin') && (
                <Option onClick={handleMarkAsSeenClick}>
                  <MenuIcon size={'17px'} src={checked} alt="Mark as Seen" />
                  <p>Mark as Seen</p>
                </Option>
              )}
          </Dropdown>
        </Portal>
      )}
      {isMobile && (
        <MobileEdit>
          <Icon onClick={handleView} src={view} alt="View" />
          {record?.requester?.uuid === user.uuid &&
            record?.status !== 'Completed' &&
            record?.status !== 'Seen' &&
            record?.status !== 'Rejected' && (
              <MenuIcon onClick={handleEdit} src={edit} alt="Edit" />
            )}
        </MobileEdit>
      )}
      {isApproveModalOpen && (
        <ApproveModal
          isOpen={isApproveModalOpen}
          onClose={handleApproveModalClose}
          onApprove={handleApproveTicket}
          financeRequest={record}
          loading={isApproveLoading}
        />
      )}
      {isRejectModalOpen && (
        <RejectTicketModal
          isOpen={isRejectModalOpen}
          onClose={handleRejectModalClose}
          onReject={handleRejectTicket}
          loading={isRejectLoading}
        />
      )}
      {isMarkAsDoneModalOpen && (
        <MarkAsDoneModal
          isOpen={isMarkAsDoneModalOpen}
          onClose={handleMarkAsDoneModalClose}
          onMarkAsDone={handleMarkAsDone}
          financeRequest={record}
          loading={isMarkAsDoneLoading}
        />
      )}
      {isSplitModalOpen && (
        <SplitExpenseModal
          isOpen={isSplitModalOpen}
          onClose={handleSplitModalClose}
          onApprove={handleSplitExpense}
          financeRequest={record}
          loading={isSplitLoading}
        />
      )}
    </Container>
  );
};

export default Actions;
