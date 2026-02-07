import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import MuiTable from 'modules/billing/components/muiTable';
import TagMethod from 'modules/billing/components/tagMethod';
import { getDailyPayments } from 'modules/billing/features/main/mainActions';
import {
  selectDailyPayments,
  selectDailyPaymentsCount,
  selectDailyPaymentsLoading,
  selectDailyPaymentsTotalAmount,
  selectDailyPaymentsTotalPages,
} from 'modules/billing/features/main/mainSlice';

import { Container } from './DailyPayments.styles';
import Filter from './Filter';

const COLUMNS = [
  { id: 'number', label: 'Կոդ' },
  { id: 'tariffs', label: 'Տարիֆ' },
  { id: 'address', label: 'Հասցե' },
  { id: 'phoneNumbers', label: 'հեռախոսահամար' },
  {
    id: 'paymentTypes',
    label: 'Վճարման մեթոդ',
    render: (paymentTypes) => <TagMethod type={paymentTypes} />,
  },
];

const DailyPayments = () => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState({
    currentPage: 0,
    rowCount: 10,
    selectedDate: null,
    isPassive: false,
  });

  const dailyPayments = useSelector(selectDailyPayments);
  const loading = useSelector(selectDailyPaymentsLoading);
  const totalCount = useSelector(selectDailyPaymentsCount);
  const totalPages = useSelector(selectDailyPaymentsTotalPages);
  const totalAmount = useSelector(selectDailyPaymentsTotalAmount);

  useEffect(() => {
    dispatch(
      getDailyPayments({
        date: searchData.selectedDate,
        page: searchData.currentPage,
        size: searchData.rowCount,
        hasBeenPassive: searchData.isPassive,
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
  const handlePassiveChange = (isPassive) => {
    setSearchData((prev) => ({ ...prev, isPassive, currentPage: 0 }));
  };

  const displayCurrentPage = searchData.currentPage + 1;

  return (
    <Container>
      <Filter
        isPassive={searchData.isPassive}
        onIsPassive={handlePassiveChange}
        selectedDate={searchData.selectedDate}
        onDateChange={handleDateChange}
        totalAmount={totalAmount}
      />
      <MuiTable
        rowCount={searchData.rowCount}
        loading={loading}
        data={dailyPayments}
        columns={COLUMNS}
        totalPages={totalPages}
        currentPage={displayCurrentPage}
        handlePageChange={handlePageChange}
        handleRowCountChange={handleRowCountChange}
        handleSortClick={handleSortClick}
        dataCount={totalCount}
        count={totalCount.toString()}
      />
    </Container>
  );
};
export default DailyPayments;
