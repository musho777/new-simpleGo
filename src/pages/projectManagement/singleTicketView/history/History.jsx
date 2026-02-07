import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { differenceInDays, format, formatDistanceToNow } from 'date-fns';
import { selectSingleTicket } from 'features/projectManagement/ProjectManagementSlice';
import { stripHtmlTags } from 'utils';
import { formatDateTime } from 'utils/dateUtils';

import {
  CommentArea,
  Content,
  Dropdown,
  DropdownItem,
  DynamicTitle,
  FilterTrigger,
  GroupWrapper,
  Header,
  HeaderIcon,
  HeaderTitle,
  HeaderWrapper,
  HistoryWrapper,
  Icon,
  InfoTitle,
  InfoWrapper,
  LeftSide,
  Main,
  Sentence,
  StatusInfo,
  Title,
} from './History.styles';
import all from './all.svg';
import appt from './appt.svg';
import attach from './attach.svg';
import ellipse from './ellipse.svg';
import filter from './filter.svg';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const daysDiff = differenceInDays(new Date(), date);

  if (daysDiff < 1) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else {
    return format(date, 'dd.MM.yyyy');
  }
};

const History = () => {
  const [isFilterDropDownOpen, setIsFilterDropDownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const ticket = useSelector(selectSingleTicket);
  const historyData = ticket.history;
  const filterRef = useRef(null);
  const bottomRef = useRef(null);

  const location = useLocation();
  const hasScrolledRef = useRef(false);

  const filteredHistory = historyData
    ?.map((group) =>
      group.filter((item) =>
        selectedFilter === 'All'
          ? true
          : selectedFilter === 'Attachments'
            ? item.type === 'File'
            : selectedFilter === 'Appointments'
              ? item.type.includes('Appointment') || item.type.includes('Frequency')
              : false
      )
    )
    .filter((group) => group.length > 0);

  useEffect(() => {
    if (location.state?.scrollToLastUpdate && bottomRef.current && !hasScrolledRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      hasScrolledRef.current = true;
    }
  }, [location, filteredHistory]);

  const renderChange = (entry) => {
    const isDateChange =
      entry.type === 'Start date' || entry.type === 'End date' || entry.type === 'One-Time';

    return (
      <LeftSide key={`${entry.time}-${entry.type}`}>
        <Icon src={ellipse} style={{ marginTop: '10px' }} />
        <Sentence>
          <Title>{entry.type} </Title>
          {entry.oldValue && entry.newValue && <Title> {entry.action} from </Title>}

          {entry.oldValue && entry.newValue ? (
            <>
              <DynamicTitle as="span" type={entry.oldValue}>
                {isDateChange ? formatDateTime(entry.oldValue, true) : entry.oldValue}
              </DynamicTitle>
              <Title> to </Title>
              <StatusInfo as="span" type={entry.newValue}>
                {isDateChange ? formatDateTime(entry.newValue, true) : entry.newValue}
              </StatusInfo>
            </>
          ) : entry.newValue ? (
            <DynamicTitle as="span" type={entry.newValue}>
              {isDateChange ? formatDateTime(entry.newValue, true) : entry.newValue}
            </DynamicTitle>
          ) : entry.oldValue ? (
            <DynamicTitle as="span" type={entry.oldValue}>
              {isDateChange ? formatDateTime(entry.oldValue, true) : entry.oldValue}
            </DynamicTitle>
          ) : null}

          {(!entry.oldValue || !entry.newValue) && <Title> {entry.action}</Title>}
        </Sentence>
      </LeftSide>
    );
  };

  const renderGroup = (group) => (
    <Fragment key={group[0].createdAt}>
      <Main>
        <GroupWrapper>{group.map((entry) => renderChange(entry))}</GroupWrapper>
        {stripHtmlTags(group[0].comment) !== 'null' &&
          stripHtmlTags(group[0].comment).length > 0 && (
            <CommentArea>
              <div dangerouslySetInnerHTML={{ __html: group[0].comment }} />
            </CommentArea>
          )}
        <InfoWrapper>
          <InfoTitle>{formatDate(group[0].createdAt)}</InfoTitle>
          <InfoTitle>by {group[0].cratedBy}</InfoTitle>
        </InfoWrapper>
      </Main>
    </Fragment>
  );

  const renderDropdown = () => (
    <Dropdown id="dropdown-filter">
      <DropdownItem onClick={() => setSelectedFilter('All')}>
        <Icon src={all} alt="all" className="menu-icon" />
        All
      </DropdownItem>
      <DropdownItem onClick={() => setSelectedFilter('Attachments')}>
        <Icon src={attach} alt="attachments" className="menu-icon" />
        Attachments
      </DropdownItem>
      <DropdownItem onClick={() => setSelectedFilter('Appointments')}>
        <Icon src={appt} alt="appointments" className="menu-icon" />
        Appointments
      </DropdownItem>
    </Dropdown>
  );

  const handleClickOutside = useCallback((event) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target) &&
      !event.target.closest('#dropdown-filter')
    ) {
      setIsFilterDropDownOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      setIsFilterDropDownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isFilterDropDownOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFilterDropDownOpen, handleClickOutside, handleKeyDown]);

  return (
    <Content>
      <HeaderWrapper>
        <Header>
          <HeaderTitle>History</HeaderTitle>
          <FilterTrigger ref={filterRef} onClick={() => setIsFilterDropDownOpen(true)}>
            <HeaderIcon src={filter} />
          </FilterTrigger>
          {isFilterDropDownOpen && createPortal(renderDropdown(), document.body)}
        </Header>
      </HeaderWrapper>

      <HistoryWrapper>
        {filteredHistory?.map((entry, index) =>
          Array.isArray(entry) ? (
            renderGroup(entry)
          ) : (
            <Fragment key={entry.createdAt || index}>
              <Main>
                <GroupWrapper>{renderChange(entry)}</GroupWrapper>
                {stripHtmlTags(entry.comment) && (
                  <CommentArea>
                    <div dangerouslySetInnerHTML={{ __html: entry.comment }} />
                  </CommentArea>
                )}
                <InfoWrapper>
                  <InfoTitle>{formatDate(entry.createdAt)}</InfoTitle>
                  <InfoTitle>by {entry.cratedBy}</InfoTitle>
                </InfoWrapper>
              </Main>
            </Fragment>
          )
        )}
      </HistoryWrapper>

      <div ref={bottomRef} />
    </Content>
  );
};

export default History;
