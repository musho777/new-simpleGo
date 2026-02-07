import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import calendar from 'assets/TicketCard/calendar.svg';
import flag from 'assets/TicketCard/flag.svg';
import progress from 'assets/TicketCard/progress.svg';
import subtasks from 'assets/TicketCard/subtasks.svg';
import user from 'assets/TicketCard/user.svg';
import write from 'assets/TicketCard/write.svg';
import comments from 'assets/comment.svg';
import { TICKET_STATUS_OPTIONS } from 'constants/constants';
import {
  getTicketsGrid,
  updateTicketStatusApi,
} from 'features/projectManagement/ProjectManagementActions.js';
import {
  selectLoading,
  selectTicketType,
  updateTicketStatus,
} from 'features/projectManagement/ProjectManagementSlice.js';
import AvatarGroup from 'pages/components/avatarGroup';
import Tag from 'pages/components/tag';
import { formatDateTime } from 'utils/dateUtils';

import CustomSelectComponent from '../../../common-ui/select/Select';
import { useTicketSearchParams } from '../tickets/filter/useSearchData';
import parent from '../tickets/parent.svg';
import {
  AddTicketBtn,
  AllTickets,
  DateOfTicket,
  DefaultCard,
  EditButtonBox,
  Icon,
  StatusBox,
  StatusWrapper,
  StyledWrapper,
  SubTasksAndComments,
  SubTasksAndCommentsCount,
  SubTasksAndEdit,
  TicketInfoFlag,
  TicketInfoLine,
  TicketName,
  TicketNumber,
  TicketsMainBox,
} from './TicketCard.styles';

const TicketCard = () => {
  const data = useSelector(selectTicketType);
  const loading = useSelector(selectLoading);
  const { uuid } = useParams();
  const [columns, setColumns] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const projectUuid = location.state?.projectUuid;
  const { searchData } = useTicketSearchParams();
  const [pages, setPages] = useState({
    'To Do': 0,
    'In Progress': 0,
    Waiting: 0,
    Resolved: 0,
    Closed: 0,
    Rejected: 0,
    Reopen: 0,
  });

  useEffect(() => {
    TICKET_STATUS_OPTIONS.map((elm) => {
      dispatch(getTicketsGrid({ ...searchData, status: [elm.label], uuid, restart: true }));
    });
  }, [searchData]);
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    let destinationCopy = TICKET_STATUS_OPTIONS.find(
      (elm) => elm.value === destination.droppableId
    );

    let sourceCopy = TICKET_STATUS_OPTIONS.find((elm) => elm.value === source.droppableId);

    dispatch(updateTicketStatus({ ticketId: draggableId, newStatus: destinationCopy.label }));
    dispatch(updateTicketStatusApi({ uuid: draggableId, status: destinationCopy.label }));

    if (sourceCopy.value === destinationCopy.value && source.index === destination.index) {
      return;
    }

    const sourceItems = Array.from(columns[sourceCopy.value]);
    const [movedItem] = sourceItems.splice(source.index, 1);

    const destItems =
      sourceCopy.value === destinationCopy.value
        ? sourceItems
        : Array.from(columns[destinationCopy.value]);

    destItems.splice(destination.index, 0, movedItem);

    setColumns((prev) => ({
      ...prev,
      [sourceCopy.value]: sourceCopy.value === destinationCopy.value ? destItems : sourceItems,
      [destinationCopy.value]: destItems,
    }));
  };
  const progressOptions = Array.from({ length: 11 }, (_, i) => ({
    value: i * 10,
    label: `${i * 10}%`,
    canDelete: true,
  }));

  const handleNavigateEdit = (uuid, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/project-management/tickets/create-edit/${uuid}`);
  };
  const handleCreateNavigate = () => {
    navigate('/project-management/tickets/create-edit');
  };

  const handleNavigateSingleTicket = (uuid) => {
    navigate(`/project-management/ticket/${uuid}`, { state: { projectUuid } });
  };

  useEffect(() => {
    setColumns(data);
  }, [data]);

  const handleScroll = ({ scrollOffset }, label, length) => {
    if (!length || loading.tickets) return;

    const itemSize = 240;
    const listHeight = 600;
    const totalContentHeight = length * itemSize;

    const visibleBottom = scrollOffset + listHeight;
    const buffer = 10;

    const reachedBottom = visibleBottom >= totalContentHeight - buffer;
    if (reachedBottom) {
      const nextOffset = pages[label] + 10;
      if (length <= pages[label]) return;

      const newPages = { ...pages, [label]: nextOffset };
      setPages(newPages);

      dispatch(getTicketsGrid({ ...searchData, offset: nextOffset, status: [label], uuid }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AllTickets>
        {TICKET_STATUS_OPTIONS.map(({ value, label }, index) => (
          <StatusBox $status={label} key={`index-${index}-${label}`}>
            <StatusWrapper>
              <Tag type="ticketStatuses" variant={label} widthParent={110} />
            </StatusWrapper>
            <Droppable
              droppableId={value}
              key={value}
              mode="virtual"
              renderClone={(provided, snapshot, rubric) => {
                const ticket = columns[value][rubric.source.index];
                return (
                  <DefaultCard
                    onClick={() => handleNavigateSingleTicket(ticket.uuid)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      userSelect: 'none',
                      background: snapshot.isDragging ? '#f0f8ff' : '#fff',
                    }}
                  >
                    <TicketNumber>#{ticket.id}</TicketNumber>
                    <TicketName>
                      {ticket.subtasks > 0 && (
                        <Icon src={parent} alt="p" style={{ marginRight: '5px' }} />
                      )}
                      {ticket.title.length > 15
                        ? `${ticket.title.slice(0, 15)}...`
                        : ticket.title}
                    </TicketName>
                    <TicketInfoLine>
                      <Icon src={user} alt="Assigned user" />
                      <AvatarGroup data={ticket?.assignees || []} index={index} />
                    </TicketInfoLine>

                    {ticket.startDate || ticket.dueDate ? (
                      <TicketInfoLine>
                        <Icon src={calendar} alt="calendar" />
                        <DateOfTicket>
                          {ticket.startDate && ticket.dueDate
                            ? `${formatDateTime(ticket.startDate, true)} - ${formatDateTime(ticket.dueDate, true)}`
                            : ticket.startDate
                              ? `Start Date - ${formatDateTime(ticket.startDate, true)}`
                              : `End Date - ${formatDateTime(ticket.dueDate, true)}`}
                        </DateOfTicket>
                      </TicketInfoLine>
                    ) : (
                      <TicketInfoLine />
                    )}

                    {/* <TicketInfoLine>
                            <Icon src={progress} alt="progress" />

                            <StyledWrapper>
                              <CustomSelectComponent
                                classNamePrefix="custom-select"
                                className="ticket-progress"
                                options={progressOptions}
                                value={progressOptions.find(
                                  (opt) => opt.value === ticket.progress
                                )}
                                onChange={(selectedOption) => {
                                  dispatch(
                                    updateTicketStatusApi({
                                      uuid: ticket.uuid,
                                      progress: selectedOption.value,
                                    })
                                  );
                                }}
                                placeholder="Progress"
                                hideMultiContainer
                              />
                            </StyledWrapper>
                          </TicketInfoLine> */}

                    <TicketInfoFlag>
                      <Icon src={flag} alt="priority flag" />
                      <Tag type="ticketPriority" variant={ticket.priority} />
                    </TicketInfoFlag>

                    <SubTasksAndEdit>
                      <SubTasksAndComments>
                        {ticket.subtasks > 0 && (
                          <SubTasksAndCommentsCount>
                            <Icon
                              src={subtasks}
                              alt="subtasks"
                              style={{ marginRight: '5px' }}
                            />
                            Subtasks: {ticket.subtasks ?? 0}
                          </SubTasksAndCommentsCount>
                        )}
                        {ticket.comments > 0 && (
                          <SubTasksAndCommentsCount style={{ marginLeft: '4px' }}>
                            <Icon
                              src={comments}
                              alt="comments"
                              style={{ marginRight: '5px' }}
                            />
                            Comments: {ticket.comments ?? 0}
                          </SubTasksAndCommentsCount>
                        )}
                      </SubTasksAndComments>
                      <EditButtonBox>
                        <Icon
                          src={write}
                          alt="edit"
                          onClick={(e) => handleNavigateEdit(ticket.uuid, e)}
                        />
                      </EditButtonBox>
                    </SubTasksAndEdit>
                  </DefaultCard>
                );
              }}
            >
              {(provided) => (
                <TicketsMainBox
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  $status={label}
                >
                  <List
                    height={600}
                    itemCount={columns[value]?.length || 0}
                    itemSize={240}
                    width="100%"
                    outerRef={provided.innerRef}
                    itemData={columns[value]}
                    onScroll={(e) => handleScroll(e, label, columns[value]?.length, value)}
                  >
                    {({ index, style }) => {
                      const ticket = columns[value][index];
                      return (
                        <div style={{ ...style, padding: 16 }}>
                          <Draggable
                            style={style}
                            draggableId={ticket.uuid}
                            index={index}
                            key={`${ticket.id}-${ticket.uuid}-${index}`}
                          >
                            {(provided, snapshot) => (
                              <DefaultCard
                                onClick={() => handleNavigateSingleTicket(ticket.uuid)}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  userSelect: 'none',
                                  background: snapshot.isDragging ? '#f0f8ff' : '#fff',
                                }}
                              >
                                <TicketNumber>#{ticket.id}</TicketNumber>
                                <TicketName>
                                  {ticket.subtasks > 0 && (
                                    <Icon
                                      src={parent}
                                      alt="p"
                                      style={{ marginRight: '5px' }}
                                    />
                                  )}
                                  {ticket.title.length > 15
                                    ? `${ticket.title.slice(0, 15)}...`
                                    : ticket.title}
                                </TicketName>
                                <TicketInfoLine>
                                  <Icon src={user} alt="Assigned user" />
                                  <AvatarGroup data={ticket?.assignees || []} index={index} />
                                </TicketInfoLine>

                                {ticket.startDate || ticket.dueDate ? (
                                  <TicketInfoLine>
                                    <Icon src={calendar} alt="calendar" />
                                    <DateOfTicket>
                                      {ticket.startDate && ticket.dueDate
                                        ? `${formatDateTime(ticket.startDate, true)} - ${formatDateTime(ticket.dueDate, true)}`
                                        : ticket.startDate
                                          ? `Start Date - ${formatDateTime(ticket.startDate, true)}`
                                          : `End Date - ${formatDateTime(ticket.dueDate, true)}`}
                                    </DateOfTicket>
                                  </TicketInfoLine>
                                ) : (
                                  <TicketInfoLine />
                                )}

                                {/* <TicketInfoLine>
                            <Icon src={progress} alt="progress" />

                            <StyledWrapper>
                              <CustomSelectComponent
                                classNamePrefix="custom-select"
                                className="ticket-progress"
                                options={progressOptions}
                                value={progressOptions.find(
                                  (opt) => opt.value === ticket.progress
                                )}
                                onChange={(selectedOption) => {
                                  dispatch(
                                    updateTicketStatusApi({
                                      uuid: ticket.uuid,
                                      progress: selectedOption.value,
                                    })
                                  );
                                }}
                                placeholder="Progress"
                                hideMultiContainer
                              />
                            </StyledWrapper>
                          </TicketInfoLine> */}

                                <TicketInfoFlag>
                                  <Icon src={flag} alt="priority flag" />
                                  <Tag type="ticketPriority" variant={ticket.priority} />
                                </TicketInfoFlag>

                                <SubTasksAndEdit>
                                  <SubTasksAndComments>
                                    {ticket.subtasks > 0 && (
                                      <SubTasksAndCommentsCount>
                                        <Icon
                                          src={subtasks}
                                          alt="subtasks"
                                          style={{ marginRight: '5px' }}
                                        />
                                        {ticket.subtasks ?? 0} subtasks
                                      </SubTasksAndCommentsCount>
                                    )}
                                    {ticket.comments > 0 && (
                                      <SubTasksAndCommentsCount style={{ marginLeft: '4px' }}>
                                        <Icon
                                          src={comments}
                                          alt="comments"
                                          style={{ marginRight: '5px' }}
                                        />
                                        Comments: {ticket.comments ?? 0}
                                      </SubTasksAndCommentsCount>
                                    )}
                                  </SubTasksAndComments>
                                  <EditButtonBox>
                                    <Icon
                                      src={write}
                                      alt="edit"
                                      onClick={(e) => handleNavigateEdit(ticket.uuid, e)}
                                    />
                                  </EditButtonBox>
                                </SubTasksAndEdit>
                              </DefaultCard>
                            )}
                          </Draggable>
                        </div>
                      );
                    }}
                  </List>
                  {/* {provided.placeholder} */}
                  {/* <AddTicketBtn onClick={handleCreateNavigate}>+ Add ticket</AddTicketBtn> */}
                </TicketsMainBox>
              )}
            </Droppable>
          </StatusBox>
        ))}
      </AllTickets>
    </DragDropContext>
  );
};

export default TicketCard;
