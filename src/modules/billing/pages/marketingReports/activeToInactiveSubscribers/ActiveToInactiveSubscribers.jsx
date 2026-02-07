import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import MuiTable from 'modules/billing/components/muiTable';
import { getActiveToInactiveSubscribers } from 'modules/billing/features/main/mainActions';
import {
  selectActiveToInactiveSubscribers,
  selectActiveToInactiveSubscribersCount,
  selectActiveToInactiveSubscribersLoading,
  selectActiveToInactiveSubscribersTotalAmount,
  selectActiveToInactiveSubscribersTotalPages,
} from 'modules/billing/features/main/mainSlice';

import { Container } from './ActiveToInactiveSubscribers.styles';
import Filter from './Filter';

const COLUMNS = [
  { id: 'number', label: 'Կոդ' },
  { id: 'tariffs', label: 'Տարիֆ' },
  { id: 'address', label: 'Հասցե' },
  { id: 'phoneNumbers', label: 'հեռախոսահամար' },
];

const ActiveToInactiveSubscribers = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState({
    currentPage: 0,
    rowCount: 10,
    selectedDate: null,
  });

  const activeToInactiveSubscribers = useSelector(selectActiveToInactiveSubscribers);
  const loading = useSelector(selectActiveToInactiveSubscribersLoading);
  const totalCount = useSelector(selectActiveToInactiveSubscribersCount);
  const totalPages = useSelector(selectActiveToInactiveSubscribersTotalPages);
  const totalAmount = useSelector(selectActiveToInactiveSubscribersTotalAmount);

  useEffect(() => {
    dispatch(
      getActiveToInactiveSubscribers({
        date: searchData.selectedDate,
        page: searchData.currentPage,
        size: searchData.rowCount,
        ...(searchData.sort && { sort: searchData.sort }),
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

  const handleSortClick = (order) => {
    setSearchData((prev) => ({ ...prev, sort: [order] }));
  };

  const displayCurrentPage = searchData.currentPage + 1;

  return (
    <Container>
      <Filter
        totalAmount={totalAmount}
        selectedDate={searchData.selectedDate}
        onDateChange={handleDateChange}
      />
      <MuiTable
        rowCount={searchData.rowCount}
        loading={loading}
        data={activeToInactiveSubscribers}
        columns={COLUMNS}
        totalPages={totalPages}
        currentPage={displayCurrentPage}
        handlePageChange={handlePageChange}
        handleRowCountChange={handleRowCountChange}
        handleSortClick={handleSortClick}
        dataCount={totalCount}
      />
    </Container>
  );
};
export default ActiveToInactiveSubscribers;
