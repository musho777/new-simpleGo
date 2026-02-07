import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import actions from 'assets/actions.svg';
import remove from 'assets/del.svg';
import edit from 'assets/edit.svg';
import Button from 'common-ui/button';
import CustomDatePicker from 'common-ui/customDatePicker';
import MobileList from 'common-ui/mobileList';
import ResetButton from 'common-ui/resetButton';
import { Table } from 'common-ui/table';
import dayjs from 'dayjs';
import { deleteItemRequests, getPersonalRequests } from 'features/inventory/inventoryActions';
import {
  selectLoading,
  selectPersonalRequests,
  selectSuccess,
  setResetRequestItemSuccess,
} from 'features/inventory/inventorySlice';
import Navigation from 'pages/components/navigation';
import Tag from 'pages/components/tag';
import { capitalizeFirstLetter } from 'utils';
import { formatDateTime, getTimeFromDate } from 'utils/dateUtils';

import AwaitingReceipt from '../awaitingReceipt';
import RequestItem from '../requestItem';
import DeleteRequestModal from './DeleteRequestModal';
import {
  BackAndFilter,
  CalendarWrapper,
  Container,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  EditBox,
  FilterOfRequestHistory,
  Image,
  LightTooltip,
  MobileItemRowBox,
  Row,
  TruncatedText,
} from './PersonalRequests.styles';
import { usePersonalRequestsSearch } from './useSearchData';

const PersonalRequests = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const data = useSelector(selectPersonalRequests);
  const isLoading = useSelector(selectLoading);
  const success = useSelector(selectSuccess);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [createdAtDate, setCreatedAtDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const { uuid } = useParams();

  const { searchData, setPersonalRequestsSearchData } = usePersonalRequestsSearch();

  const TABS = [
    { name: 'Request History', path: '/personal-requests' },
    { name: 'Awaiting Receipt Confirmation', path: '/personal-requests/awaiting' },
  ];

  const isAwaitingTab = location.pathname.includes('/awaiting');

  const currentPage = useMemo(() => {
    return Math.floor((searchData.offset || 0) / (searchData.limit || 10)) + 1;
  }, [searchData.offset, searchData.limit]);

  const totalPages = Math.ceil(data.count / 10);

  const handleCloseEditModal = () => setIsEditOpen(false);

  const onPaginationChange = (page) => {
    const offset = (page - 1) * 10;
    setPersonalRequestsSearchData({ offset });
  };

  const handleDateChange = (type, date) => {
    const parsedDate = new Date(date);
    if (type === 'from') {
      parsedDate.setHours(0, 0, 0, 0);
      const iso = date ? parsedDate.toISOString() : null;
      setCreatedAtDate(iso);
      setPersonalRequestsSearchData({ startDate: iso });
    } else {
      parsedDate.setHours(23, 59, 59, 999);
      const iso = date ? parsedDate.toISOString() : null;
      setToDate(iso);
      setPersonalRequestsSearchData({ endDate: iso });
    }
  };

  const handleConfirmDelete = () => {
    dispatch(deleteItemRequests(selectedRequest.uuid)).then(() => {
      dispatch(getPersonalRequests({ ...searchData, uuid }));
      setIsDeleteOpen(false);
      setSelectedRequest(null);
    });
  };

  const handleResetAllFilters = () => {
    setCreatedAtDate(null);
    setToDate(null);
    setPersonalRequestsSearchData({
      startDate: null,
      endDate: null,
      offset: 0,
    });
  };

  const handleClickBackToProfileItems = () => {
    if (uuid) {
      navigate(-1);
    } else {
      navigate('/personal/inventory?limit=10&offset=0&usage=Personal+use&view=list');
    }
  };

  useEffect(() => {
    if (!isAwaitingTab) {
      dispatch(getPersonalRequests({ ...searchData, uuid }));
    }
  }, [dispatch, searchData, isAwaitingTab, uuid]);

  useEffect(() => {
    if (success.editItemRequest || success.requestItem) {
      dispatch(getPersonalRequests({ ...searchData, uuid }));
      dispatch(setResetRequestItemSuccess());
      setSelectedRequest(null);
      setIsEditOpen(false);
    }
  }, [success.editItemRequest, success.requestItem]);

  const COLUMNS = [
    {
      title: 'item name',
      dataIndex: 'item',
      key: 'item',
      render: (item) => item?.name,
    },
    { title: 'provided count', dataIndex: 'processedQuantity', key: 'processedQuantity' },
    { title: 'requested count', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'usage',
      dataIndex: 'usage',
      key: 'usage',
      render: (usage) => <Tag type="usage" variant={usage} />,
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag
          type="status"
          variant={
            status === 'awaiting_receipt_confirmation'
              ? 'Awaiting receipt confirmation'
              : status === 'receipt_declined'
                ? 'Receipt declined'
                : capitalizeFirstLetter(status)
          }
        />
      ),
    },
    {
      title: 'reason',
      dataIndex: 'reason',
      key: 'reason',
      render: (reason) => (
        <LightTooltip title={reason.length > 25 ? `${reason}` : ''} placement="top-start">
          <TruncatedText>{reason}</TruncatedText>
        </LightTooltip>
      ),
    },
    { title: 'date', dataIndex: 'date', key: 'date', render: (date) => formatDateTime(date) },
    {
      title: '',
      key: 'actions',
      render: (_, record) =>
        record.status === 'pending' ? (
          <EditBox>
            <Image src={actions} alt="Actions" style={{ cursor: 'pointer' }} />
            <DropdownMenu className="dropdown">
              <DropdownItem
                onClick={() => {
                  setSelectedRequest(record);
                  setIsEditOpen(true);
                }}
              >
                <Image style={{ width: 20 }} src={edit} alt="Edit" />
                <DropdownLabel>Edit</DropdownLabel>
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  setSelectedRequest(record);
                  setIsDeleteOpen(true);
                }}
              >
                <Image src={remove} alt="Delete" />
                <DropdownLabel>Delete</DropdownLabel>
              </DropdownItem>
            </DropdownMenu>
          </EditBox>
        ) : null,
    },
  ];

  const mobileColumns = [
    {
      title: 'Item Name',
      dataIndex: 'item',
      render: (item) => item?.name,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (q) => q,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => <Tag type="status" variant={capitalizeFirstLetter(status)} />,
    },
  ];

  const renderExpandableContent = (row) => (
    <>
      <MobileItemRowBox>
        <strong>Usage:</strong> <Tag type="usage" variant={row.usage} />
      </MobileItemRowBox>
      <MobileItemRowBox>
        <strong>Reason:</strong> {row.reason}
      </MobileItemRowBox>
      <MobileItemRowBox>
        <strong>Date:</strong> {formatDateTime(row.date)}
      </MobileItemRowBox>
      <MobileItemRowBox>
        <strong>Time:</strong> {getTimeFromDate(row.date)}
      </MobileItemRowBox>
      {row.status === 'pending' && (
        <MobileItemRowBox>
          <img
            onClick={() => {
              setSelectedRequest(row);
              setIsEditOpen(true);
            }}
            src={edit}
            alt="Edit"
          />

          <img
            onClick={() => {
              setSelectedRequest(row);
              setIsDeleteOpen(true);
            }}
            src={remove}
            alt="Delete"
            style={{ width: '17px', marginLeft: '2px' }}
          />
        </MobileItemRowBox>
      )}
    </>
  );

  return (
    <>
      <DeleteRequestModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        request={selectedRequest}
        onConfirm={handleConfirmDelete}
      />

      <RequestItem
        initialData={selectedRequest}
        isOpen={isEditOpen}
        onClose={handleCloseEditModal}
        isLoading={isLoading}
      />

      <Container>
        <Row>
          <Button onClick={handleClickBackToProfileItems}>
            {!uuid ? '< Back to items' : '< Back to profile'}
          </Button>
        </Row>
        {isAwaitingTab ? (
          <>
            <Navigation className="nav" tabs={TABS} />
            <AwaitingReceipt />
          </>
        ) : (
          <>
            <BackAndFilter>
              {!uuid ? <Navigation className="nav" tabs={TABS} /> : <div />}
              <FilterOfRequestHistory>
                <CalendarWrapper>
                  <CustomDatePicker
                    height="38px"
                    placeholder="Date from"
                    onChange={(date) => handleDateChange('from', date)}
                    value={createdAtDate ? dayjs(createdAtDate) : null}
                    maxDate={toDate ? dayjs(toDate) : null}
                  />
                  <CustomDatePicker
                    height="38px"
                    placeholder="Date to"
                    minDate={createdAtDate ? dayjs(createdAtDate) : null}
                    value={toDate ? dayjs(toDate) : null}
                    onChange={(date) => handleDateChange('to', date)}
                  />
                </CalendarWrapper>
                <ResetButton onClick={handleResetAllFilters} />
              </FilterOfRequestHistory>
            </BackAndFilter>

            <MobileList
              columns={mobileColumns}
              data={data?.requests}
              expandable={renderExpandableContent}
              currentPage={currentPage}
              totalPages={totalPages}
              onPaginationChange={onPaginationChange}
            />

            <Table
              data={data?.requests}
              columns={COLUMNS}
              loading={isLoading.personalRequests}
              currentPage={currentPage}
              totalPages={totalPages}
              onPaginationChange={onPaginationChange}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default PersonalRequests;
