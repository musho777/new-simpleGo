import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { differenceInDays, format, formatDistanceToNow } from 'date-fns';
import {
  selectFinanceRequestHistory,
  selectFinanceRequestHistoryLoading,
} from 'features/financeRequest/financeRequestSlice';
import { formatDateTime } from 'utils/dateUtils';

import {
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
} from './FinanceHistory.styles';
import all from './all.svg';
import appt from './appt.svg';
import attach from './attach.svg';
import ellipse from './ellipse.svg';
import filter from './filter.svg';

const formatDate = (dateString) => {
  if (!dateString) return 'Unknown date';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid date';

    const daysDiff = differenceInDays(new Date(), date);

    if (daysDiff < 1) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return format(date, 'dd.MM.yyyy');
    }
  } catch (error) {
    return 'Invalid date';
  }
};

const camelCaseToNormal = (str) => {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .toLowerCase()
    .replace(/^./, (str) => str.toUpperCase());
};

const FinanceHistory = ({
  historyData: propHistoryData,
  historyLoading: propHistoryLoading,
}) => {
  const [isFilterDropDownOpen, setIsFilterDropDownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const reduxHistoryData = useSelector(selectFinanceRequestHistory);
  const reduxHistoryLoading = useSelector(selectFinanceRequestHistoryLoading);
  const filterRef = useRef(null);
  const bottomRef = useRef(null);

  // Use props data if provided, otherwise use Redux data
  const historyData = propHistoryData !== undefined ? propHistoryData : reduxHistoryData;
  const historyLoading =
    propHistoryLoading !== undefined ? propHistoryLoading : reduxHistoryLoading;

  const location = useLocation();
  const hasScrolledRef = useRef(false);

  const filteredHistory = historyData?.filter((item) =>
    selectedFilter === 'All'
      ? true
      : selectedFilter === 'Attachments'
        ? item.changeType === 'attachment' || item.changeType === 'file'
        : selectedFilter === 'Status Changes'
          ? item.changeType === 'status'
          : false
  );

  useEffect(() => {
    if (location.state?.scrollToLastUpdate && bottomRef.current && !hasScrolledRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      hasScrolledRef.current = true;
    }
  }, [location, filteredHistory]);

  const renderChange = (entry) => {
    if (!entry || !entry.changeType) return null;

    const isDateChange = entry.isDate;
    const isAmountChange = entry.changeType === 'amount';
    const changeTypeDisplay = camelCaseToNormal(entry.changeType);

    return (
      <LeftSide key={`${entry.uuid}-${entry.changeType}`}>
        <Icon src={ellipse} style={{ marginTop: '10px' }} />
        <Sentence>
          <Title>{changeTypeDisplay} </Title>
          {entry.oldValue && entry.newValue && <Title>changed from </Title>}

          {entry.oldValue && entry.newValue ? (
            <>
              <DynamicTitle as="span" type={entry.oldValue}>
                {isDateChange
                  ? formatDateTime(entry.oldValue, true)
                  : isAmountChange
                    ? `${entry.oldValue} AMD`
                    : entry.oldValue}
              </DynamicTitle>
              <Title> to </Title>
              <StatusInfo as="span" type={entry.newValue}>
                {isDateChange
                  ? formatDateTime(entry.newValue, true)
                  : isAmountChange
                    ? `${entry.newValue} AMD`
                    : entry.newValue}
              </StatusInfo>
            </>
          ) : entry.newValue ? (
            <>
              <Title>set to </Title>
              <DynamicTitle as="span" type={entry.newValue}>
                {isDateChange
                  ? formatDateTime(entry.newValue, true)
                  : isAmountChange
                    ? `${entry.newValue} AMD`
                    : entry.newValue}
              </DynamicTitle>
            </>
          ) : entry.oldValue ? (
            <>
              <Title>removed </Title>
              <DynamicTitle as="span" type={entry.oldValue}>
                {isDateChange
                  ? formatDateTime(entry.oldValue, true)
                  : isAmountChange
                    ? `${entry.oldValue} AMD`
                    : entry.oldValue}
              </DynamicTitle>
            </>
          ) : (
            <Title>was updated</Title>
          )}
        </Sentence>
      </LeftSide>
    );
  };

  const renderHistoryItem = (entry) => {
    if (!entry) return null;

    return (
      <Fragment key={entry.uuid || `entry-${Math.random()}`}>
        <Main>
          <GroupWrapper>{renderChange(entry)}</GroupWrapper>
          <InfoWrapper>
            <InfoTitle>{formatDate(entry.createdAt)}</InfoTitle>
            <InfoTitle>
              by {entry.changedBy?.name || 'Unknown'} {entry.changedBy?.surname || ''}
            </InfoTitle>
          </InfoWrapper>
        </Main>
      </Fragment>
    );
  };

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
      <DropdownItem onClick={() => setSelectedFilter('Status Changes')}>
        <Icon src={appt} alt="status changes" className="menu-icon" />
        Status Changes
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

  const displayHistory =
    historyData && historyData.length > 0 && filteredHistory
      ? filteredHistory.filter((entry) => entry && entry.changeType)
      : [];

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
        {historyLoading ? (
          <div>Loading history...</div>
        ) : (
          displayHistory?.map((entry) => renderHistoryItem(entry))
        )}
      </HistoryWrapper>

      <div ref={bottomRef} />
    </Content>
  );
};

export default FinanceHistory;
