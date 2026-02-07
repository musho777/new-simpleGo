import React, { useCallback, useMemo } from 'react';

import MobileList from 'common-ui/mobileList/MobileList';
import { Table } from 'common-ui/table';
import { MONTH_NAMES } from 'constants/constants';

import { MonthBadge, TablePriceColum } from '../Components.styles';
import {
  ExpandableWrapper,
  ExpandedLabel,
  ExpandedValue,
  Row,
} from './ErbContractBalance.styles';
import Filter from './Filter';
import { useErbContractBalanceSearchData } from './useSearchData';

const columns = [
  {
    title: 'Month',
    dataIndex: 'month',
    key: 'month',
    render: (month) => <MonthBadge>{MONTH_NAMES[month - 1] || month}</MonthBadge>,
  },
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
  },
  {
    title: 'Opening Balance',
    dataIndex: 'openingBalance',
    key: 'openingBalance',
  },
  {
    title: 'Income',
    dataIndex: 'income',
    key: 'income',
    render: (value) => (
      <TablePriceColum>
        {value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </TablePriceColum>
    ),
  },
  {
    title: 'Accrued Amount',
    dataIndex: 'accruedAmount',
    key: 'accruedAmount',
    render: (value) => (
      <TablePriceColum $color="#2D6CDF">
        {value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </TablePriceColum>
    ),
  },
  {
    title: 'Expense',
    dataIndex: 'expense',
    key: 'expense',
    render: (value) => (
      <TablePriceColum $color="#E63946">
        {value.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </TablePriceColum>
    ),
  },
  {
    title: 'Closing Balance',
    dataIndex: 'closingBalance',
    key: 'closingBalance',
    render: (value) =>
      `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
];

const ErbContractBalance = ({ data }) => {
  const { searchData, setErbContractBalanceSearchData } = useErbContractBalanceSearchData();
  const handleFilterChange = (newFilterData) => {
    setErbContractBalanceSearchData(newFilterData);
  };

  const onPaginationChange = (page) => {
    setErbContractBalanceSearchData({ page: page - 1 });
  };

  const mobileColumns = useMemo(
    () => [
      {
        title: 'Month',
        dataIndex: 'month',
        key: 'month',
        render: (month) => <MonthBadge>{MONTH_NAMES[month - 1] || month}</MonthBadge>,
      },
      {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
      },
      {
        title: 'Closing Balance',
        dataIndex: 'closingBalance',
        key: 'closingBalance',
        render: (value) =>
          `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
    ],
    []
  );

  const renderExpandableContent = useCallback((row) => {
    return (
      <ExpandableWrapper>
        <Row>
          <ExpandedLabel>Opening Balance</ExpandedLabel>
          <ExpandedValue>{row.openingBalance}</ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Income</ExpandedLabel>
          <ExpandedValue>
            <TablePriceColum>
              {row.income.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TablePriceColum>
          </ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Accrued Amount</ExpandedLabel>
          <ExpandedValue>
            <TablePriceColum $color="#2D6CDF">
              {row.accruedAmount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TablePriceColum>
          </ExpandedValue>
        </Row>
        <Row>
          <ExpandedLabel>Expense</ExpandedLabel>
          <ExpandedValue>
            <TablePriceColum $color="#E63946">
              {row.expense.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </TablePriceColum>
          </ExpandedValue>
        </Row>
      </ExpandableWrapper>
    );
  }, []);

  return (
    <>
      <Filter filterData={searchData} onFilterChange={handleFilterChange} />
      <Table
        onPaginationChange={onPaginationChange}
        columns={columns || []}
        data={data?.content}
        currentPage={searchData.page + 1}
        totalPages={data?.totalPages}
      />
      <MobileList
        columns={mobileColumns}
        data={data?.content}
        expandable={renderExpandableContent}
        onPaginationChange={onPaginationChange}
        currentPage={searchData.page + 1}
        totalPages={data?.totalPages}
      />
    </>
  );
};

export default ErbContractBalance;
