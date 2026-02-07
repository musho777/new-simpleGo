import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import MuiTable from 'modules/billing/components/muiTable';
import { getUnsubscribedSubscribers } from 'modules/billing/features/main/mainActions';
import {
  selectUnsubscribedSubscribers,
  selectUnsubscribedSubscribersCount,
  selectUnsubscribedSubscribersLoading,
  selectUnsubscribedSubscribersTotalAmount,
  selectUnsubscribedSubscribersTotalPages,
} from 'modules/billing/features/main/mainSlice';

import Filter from './Filter';
import { Container } from './UnsubscribedSubscribers.styles';

const COLUMNS = [
  { id: 'phoneNumbers', label: 'հեռախոսահամար' },
  { id: 'tariffs', label: 'Տարիֆ' },
  { id: 'address', label: 'Հասցե' },
  { id: 'number', label: 'Կոդ' },
];

const UnsubscribedSubscribers = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState({
    currentPage: 0,
    rowCount: 10,
    selectedDate: null,
    isB2B: false,
  });

  const unsubscribedSubscribers = useSelector(selectUnsubscribedSubscribers);
  const loading = useSelector(selectUnsubscribedSubscribersLoading);
  const totalCount = useSelector(selectUnsubscribedSubscribersCount);
  const totalPages = useSelector(selectUnsubscribedSubscribersTotalPages);
  const totalAmount = useSelector(selectUnsubscribedSubscribersTotalAmount);

  useEffect(() => {
    dispatch(
      getUnsubscribedSubscribers({
        date: searchData.selectedDate,
        page: searchData.currentPage,
        size: searchData.rowCount,
        isB2B: searchData.isB2B,
      })
    );
  }, [searchData, dispatch]);

  const handlePageChange = (page) => {
    setSearchData((prev) => ({ ...prev, currentPage: page - 1 }));
  };

  const handleRowCountChange = (count) => {
    setSearchData((prev) => ({ ...prev, rowCount: count, currentPage: 0 }));
  };

  const handleDateChange = (date) => {
    setSearchData((prev) => ({ ...prev, selectedDate: date, currentPage: 0 }));
  };

  const handleB2BChange = (isB2B) => {
    setSearchData((prev) => ({ ...prev, isB2B, currentPage: 0 }));
  };

  const displayCurrentPage = searchData.currentPage + 1;

  return (
    <Container>
      <Filter
        totalAmount={totalAmount}
        selectedDate={searchData.selectedDate}
        onDateChange={handleDateChange}
        isB2B={searchData.isB2B}
        onB2BChange={handleB2BChange}
      />
      <MuiTable
        rowCount={searchData.rowCount}
        loading={loading}
        data={unsubscribedSubscribers}
        columns={COLUMNS}
        totalPages={totalPages}
        currentPage={displayCurrentPage}
        handlePageChange={handlePageChange}
        handleRowCountChange={handleRowCountChange}
        dataCount={totalCount}
      />
    </Container>
  );
};
export default UnsubscribedSubscribers;
