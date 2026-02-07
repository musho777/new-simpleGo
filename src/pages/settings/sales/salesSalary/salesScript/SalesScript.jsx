import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Input from 'common-ui/input';
import MobileList from 'common-ui/mobileList';
import ResetButton from 'common-ui/resetButton';
import { AsyncSelect } from 'common-ui/select';
import { Table } from 'common-ui/table';
import { getSalesScripts } from 'features/sales/salesActions';
import { selectSalesScripts, selectSalesScriptsLoading } from 'features/sales/salesSlice';
import useDebounce from 'hooks/useDebounce';
import Tag from 'pages/components/tag';
import { FilterBox, ResetBox } from 'pages/inventory/categorySinglePage/filter/Filter.styles';
import { formatDateTime } from 'utils/dateUtils';

import {
  EllipsisCell,
  FilterSelectBox,
  LeadFilterBox,
  LeadSourceFilter,
} from '../Sales.styles';
import Create from './Create';
import useSearchData from './useSearchData';

const SalesScript = () => {
  const dispatch = useDispatch();
  const { searchData, setSearchData } = useSearchData();
  const [first, setFirst] = useState(false);

  const [searchTerm, setSearchTerm] = useState(searchData.search || '');
  const userType = localStorage.getItem('userType');
  const access = userType === 'Super Admin' || userType === 'General Manager';

  const COLUMNS = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      renderTooltip: (text) => text?.length > 16 && <span>{text}</span>,
      render: (val) => <EllipsisCell>{val}</EllipsisCell>,
    },
    {
      title: 'Status',
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      width: '100',
      render: (val) => <Tag type="statuses" variant={val ? 'Enabled' : 'Disabled'} />,
    },
    ...(access
      ? [
          {
            title: 'Edit',
            key: 'edit',
            width: '100',
            render: (_, row) => (
              <Create isEdit={true} initialData={row} activeTab="Sales Script" />
            ),
          },
        ]
      : []),
  ];

  const mobileColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, row) => <EllipsisCell>{row.name}</EllipsisCell>,
    },
    {
      title: 'Status',
      dataIndex: 'isEnabled',
      render: (_, row) => (
        <EllipsisCell>{row.isEnabled ? 'Enabled' : 'Disabled'}</EllipsisCell>
      ),
    },
  ];

  const statusOptions = [
    { label: 'All', value: 'all' },
    { label: 'Enabled', value: 'enabled' },
    { label: 'Disabled', value: 'disabled' },
  ];

  const renderExpandableContent = (row) => (
    <>
      <div>
        <strong>Status:</strong> {row.isEnabled ? 'Enabled' : 'Disabled'}
      </div>
      <div>
        <strong>Created At:</strong> {formatDateTime(row.createdAt)}
      </div>
    </>
  );
  const data = useSelector(selectSalesScripts);
  const isLoading = useSelector(selectSalesScriptsLoading);
  const debouncedName = useDebounce(searchTerm, 500);

  const handlePaginationChange = (page) => {
    setSearchData({ page });
  };

  const handleResetFilters = () => {
    setFirst(true);
    setSearchData({
      search: '',
      status: 'all',
      page: 1,
    });

    setSearchTerm('');
  };
  const handleChangeName = (e) => {
    setFirst(true);
    setSearchTerm(e.target.value);
  };

  const handleChange = (selectedOption) => {
    setFirst(true);
    setSearchData({
      status: selectedOption?.value || 'all',
    });
  };

  useEffect(() => {
    if (first) setSearchData({ search: debouncedName });
  }, [debouncedName]);

  useEffect(() => {
    dispatch(getSalesScripts(searchData));
  }, [searchData]);

  return (
    <>
      <LeadSourceFilter>
        <LeadFilterBox>
          <FilterBox>
            <Input
              placeholder="Search..."
              maxLength="50"
              value={searchTerm}
              onChange={handleChangeName}
            />
          </FilterBox>
          <FilterSelectBox>
            <AsyncSelect
              className="async-status"
              value={statusOptions.find((opt) => opt.value === searchData.status)}
              options={statusOptions}
              isClearable={false}
              placeholder="Select status"
              onChange={handleChange}
              loadOptions={undefined}
              defaultOptions={statusOptions}
            />
          </FilterSelectBox>
          <ResetBox>
            <ResetButton onClick={handleResetFilters} />
          </ResetBox>
        </LeadFilterBox>

        {access && <Create activeTab="Sales Script" />}
      </LeadSourceFilter>

      <MobileList
        columns={mobileColumns}
        data={data.salesScripts}
        expandable={renderExpandableContent}
        currentPage={searchData.page}
        totalPages={data?.totalPages}
        onPaginationChange={handlePaginationChange}
      />
      <Table
        data={data.salesScripts}
        columns={COLUMNS}
        currentPage={searchData.page}
        totalPages={data?.totalPages}
        onPaginationChange={handlePaginationChange}
        loading={isLoading.salesScripts}
        emptyText="No sales scripts found"
      />
    </>
  );
};

export default SalesScript;
