import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getMonthlyPayments } from 'features/statement/statementActions';
import {
  selectMonthlyPayments,
  selectStatementError,
  selectStatementLoading,
} from 'features/statement/statementSlice';
import MuiTable from 'modules/billing/components/muiTable/MuiTable';
import Tag from 'modules/billing/components/tag';

import {
  Title,
  ViewContainer,
} from '../../../modules/billing/pages/subscribers/Subscribers.styles';
import PaymentReportFilters from './PaymentReportFilters';
import { FilterContainerPayment } from './PaymentReportFilters/PaymentReportFilters.styles';
import { usePaymentReportSearchParams } from './usePaymentReportSearchParams';

const PaymentReport = () => {
  const { searchData: paymentSearchData, setPaymentReportSearchData } =
    usePaymentReportSearchParams();

  const handlePageChange = (page) => {
    setPaymentReportSearchData({ page: page - 1 });
  };

  const data = useSelector(selectMonthlyPayments);
  const loading = useSelector(selectStatementLoading);

  const error = useSelector(selectStatementError);
  const dispatch = useDispatch();

  const columns = [
    { id: 'year', label: 'Տարի' },
    {
      id: 'month',
      label: 'Ամիս',
    },
    { id: 'b2b', label: 'B2B' },
    { id: 'b2c', label: 'B2C' },
    { id: 'total', label: 'Ընդհանուր' },
  ];

  const mobileColumns = [
    {
      title: 'ԲԱԺԱՆՈՐԴԻ ID',
      dataIndex: 'contractId',
      sortable: true,
    },
    {
      title: 'Ընթացիկ ստատուս',
      dataIndex: 'currentStatus',
      render: (currentStatus) => <Tag type={currentStatus} />,
    },
    {
      title: 'Վճարման ենթակա գումար',
      dataIndex: 'amount',
    },
  ];

  useEffect(() => {
    dispatch(getMonthlyPayments(paymentSearchData));
  }, [paymentSearchData, dispatch]);

  return (
    <>
      <ViewContainer>
        <PaymentReportFilters />
        <FilterContainerPayment>
          {!loading.monthlyPayments && (
            <Title className="inline_title ">
              Ընդհանուր վճարված գումարը՝
              {Number(data.totalAmount).toLocaleString('hy-AM')}
            </Title>
          )}
        </FilterContainerPayment>
        <MuiTable
          rowCount={paymentSearchData.size}
          data={data?.data?.content || []}
          loading={loading.monthlyPayments}
          columns={columns}
          totalPages={data.data?.totalPages}
          currentPage={paymentSearchData.page + 1}
          handlePageChange={handlePageChange}
          dataCount={data.data?.totalElements}
        />
        {/* {isMobile && (
          <MobileList
            columns={mobileColumns}
            data={data}
            expandable={renderExpandableContent}
            onPaginationChange={handlePageChange}
            currentPage={searchData.page + 1}
            loading={isLoading.invoices}
            totalPages={pagesCount}
            handleSortClick={handleSortClick}
            sortable={true}
          />
        )} */}
      </ViewContainer>
    </>
  );
};

export default PaymentReport;
