import styled from 'styled-components';
import theme from 'styles/theme';

export const DefaultCard = styled.div`
  padding: 12px;
  width: 100%;
  height: auto;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  }
`;
export const Icon = styled.img``;

export const SubTasksAndEdit = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 0.4px solid #dfdfdf;
  padding-top: 15px;
`;
export const EditButtonBox = styled.div`
  cursor: pointer;
`;
export const SubTasksAndComments = styled.div`
  display: flex;
  justify-content: start;
  gap: 10px;
  width: 100%;
`;
export const SubTasksAndCommentsCount = styled.h3`
  font-size: 14px;
  font-weight: 500;
  line-height: 100%;
  letter-spacing: 0%;
  text-decoration: underline;
  display: flex;
  align-items: center;
  color: #6c757d;
  cursor: pointer;
`;
export const TicketInfoLine = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  min-height: 15px;
  .ticket-progress {
    min-height: 0;
    margin-top: -5px;
    border: none;
  }
`;
export const TicketInfoFlag = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const TicketNumber = styled.div`
  color: #6c757d;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0%;
`;
export const TicketName = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;
  display: flex;
  align-items: center;
  color: #000000;
`;

export const AllTickets = styled.div`
  border-radius: 10px;
  padding: 20px;
  background: #fff;

  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: none;
  gap: 30px;
  align-items: flex-start;

  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }
`;

export const DateOfTicket = styled.h3`
  color: #212529;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  display: flex;
  align-items: end;
`;

const statusBackgroundMap = {
  'To Do': theme.colors.todoBackground,
  'In Progress': theme.colors.inProgressBackground,
  Waiting: theme.colors.waitingBackground,
  Resolved: theme.colors.resolvedBackground,
  Closed: theme.colors.closedBackground,
  Rejected: theme.colors.RejectedBackground,
  Reopen: theme.colors.ReopenBackground,
};

const statusTextColorMap = {
  'To Do': theme.colors.todoColor,
  'In Progress': theme.colors.inProgressColor,
  Waiting: theme.colors.waitingColor,
  Resolved: theme.colors.resolvedColor,
  Closed: theme.colors.closedColor,
  Rejected: theme.colors.closedColor,
  Reopen: theme.colors.closedColor,
};

const ticketCardBackgroundMap = {
  'To Do': theme.colors.todoTicketCard,
  'In Progress': theme.colors.inProgressTicketCard,
  Waiting: theme.colors.waitingTicketCard,
  Resolved: theme.colors.resolvedTicketCard,
  Closed: theme.colors.closedTicketCard,
  Rejected: theme.colors.rejectedTicketCard,
  Reopen: theme.colors.reopenTicketCard,
};

export const TicketsMainBox = styled.div`
  background-color: ${({ $status }) => ticketCardBackgroundMap[$status] || '#fff'};
  border-radius: 8px;
  width: 100%;
  height: calc(100% - 40px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }
`;

export const StatusTag = styled.div`
  background-color: ${({ status }) => statusBackgroundMap[status] || theme.colors.lightGray};
  color: ${({ status }) => statusTextColorMap[status] || theme.colors.primaryText};
  font-size: ${theme.fontSizes.small};
  font-weight: ${theme.fontWeights.semiBold};
  padding: 5px 10px;
  border-radius: ${theme.borderRadius.small};
  text-align: center;
  width: max-content;
  display: inline-block;
`;

export const StatusBox = styled.div`
  background-color: ${({ $status }) => ticketCardBackgroundMap[$status] || '#fff'};
  border-radius: 8px;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
`;

export const StatusWrapper = styled.div`
  padding: 16px 0 0 16px;
`;

export const AssigneesName = styled.div`
  font-size: 14px;
  display: flex;
  align-items: start;
  gap: 5px;

  img {
    margin-top: 2px;
  }
`;

export const AssigneeHoverContainer = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  &:hover div {
    display: block;
  }
`;

export const HoverBox = styled.div`
  display: none;
  position: absolute;
  align-items: center;
  gap: 3px;
  min-width: 140px;
  margin-top: 7px;
  max-width: 100%;
  color: #1d3557;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 5px 10px;
`;

export const StyledSelect = styled.select`
  color: #212529;
  background-color: rgba(108, 117, 125, 0.1);
  border-radius: 10px;
  border: none;
  font-size: 13px;
  font-weight: 600;
  line-height: 100%;
  text-align: center;
  width: 70px;
  height: 27px;
`;

export const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  color: #212529;
  font-size: 14px;
  font-weight: 500;
`;

export const ProgressOptions = styled.div``;

export const StyledWrapper = styled.div`
  .custom-select__control {
    border-color: #ddd;
    font-size: 14px;
    overflow-y: none;
    width: 97px;
    height: 15px;
    margin-left: 5px;
    background-color: #f1f2f2;
    border: none;
    border-radius: 25px;
  }
  .custom-select__menu {
    position: absolute;
    border: 1px solid ${theme.colors.borderColor};
    border-radius: 10px;
    background-color: ${theme.colors.white};
    z-index: 1;
    width: 100%;
    max-height: 250px;
    margin-top: 8px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
    padding: 9px 3px 9px 10px;
    width: 137px;

    overflow-y: none;
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;

    &::-webkit-scrollbar {
      height: 8px;
      width: 2px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ccc;
      border-radius: 10px;
    }
  }
  .custom-select__option {
    padding: 10px;
    overflow-y: none;
  }
`;

export const AddTicketBtn = styled.button`
  background: transparent;
  border: none;
  color: #6c757d;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  display: flex;
  justify-content: start;
  width: 100%;
  margin-top: 11px;
`;
