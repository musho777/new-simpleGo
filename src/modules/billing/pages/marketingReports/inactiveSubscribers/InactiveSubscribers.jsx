import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import MuiTable from 'modules/billing/components/muiTable';
import { getInactiveSubscribers } from 'modules/billing/features/main/mainActions';
import {
  selectInactiveSubscribers,
  selectInactiveSubscribersCount,
  selectInactiveSubscribersLoading,
  selectInactiveSubscribersTotalAmount,
  selectInactiveSubscribersTotalPages,
} from 'modules/billing/features/main/mainSlice';

import Filter from './Filter';
import { Container } from './InactiveSubscribers.styles';

const COLUMNS = [
  { id: 'number', label: 'Կոդ' },
  { id: 'phoneNumbers', label: 'հեռախոսահամար' },
  { id: 'tariffs', label: 'Տարիֆ' },
  { id: 'address', label: 'Հասցե' },
  { id: 'statusDate', label: 'Երբ է դարձել պասիվ' },
];

const InactiveSubscribers = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState({
    currentPage: 0,
    rowCount: 10,
    selectedDate: null,
  });

  const inactiveSubscribers = useSelector(selectInactiveSubscribers);
  const loading = useSelector(selectInactiveSubscribersLoading);
  const totalCount = useSelector(selectInactiveSubscribersCount);
  const totalPages = useSelector(selectInactiveSubscribersTotalPages);
  const totalAmount = useSelector(selectInactiveSubscribersTotalAmount);
  useEffect(() => {
    dispatch(
      getInactiveSubscribers({
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
        data={inactiveSubscribers}
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
export default InactiveSubscribers;
