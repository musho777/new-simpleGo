import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Input from 'common-ui/input';
import MobileList from 'common-ui/mobileList';
import ResetButton from 'common-ui/resetButton';
import { AsyncSelect } from 'common-ui/select';
import { Table } from 'common-ui/table';
import { getUserPrivileges } from 'features/sales/salesActions';
import { selectUserPrivileges, selectUserPrivilegesLoading } from 'features/sales/salesSlice';
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

const UserPrivilege = () => {
  const dispatch = useDispatch();
  const { searchData, setSearchData } = useSearchData();
  const userType = localStorage.getItem('userType');
  const access = userType === 'Super Admin' || userType === 'General Manager';
  const [searchTerm, setSearchTerm] = useState(searchData.name || '');
  const [first, setFirst] = useState(false);

  const debouncedName = useDebounce(searchTerm, 500);

  const data = useSelector(selectUserPrivileges);
  const isLoading = useSelector(selectUserPrivilegesLoading);

  const statusOptions = [
    { label: 'All', value: 'all' },
    { label: 'Enabled', value: 'enabled' },
    { label: 'Disabled', value: 'disabled' },
  ];

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
      width: '100',
      key: 'isEnabled',
      render: (val) => <Tag type="statuses" variant={val ? 'Enabled' : 'Disabled'} />,
    },
    {
      title: 'Edit',
      key: 'edit',
      width: '100',
      render: (_, row) => (
        <Create activeTab="User Privilege" isEdit={true} initialData={row} />
      ),
    },
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
      render: (val) => <Tag type="statuses" variant={val ? 'Enabled' : 'Disabled'} />,
    },
  ];

  const renderExpandableContent = (row) => (
    <div>
      <strong>Created At:</strong> {formatDateTime(row.createdAt)}
    </div>
  );

  const handlePaginationChange = (page) => {
    setSearchData({ page });
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

  const handleResetFilters = () => {
    setFirst(false);
    setSearchTerm('');
    setSearchData({
      name: '',
      status: 'all',
      page: 1,
    });
  };

  useEffect(() => {
    if (first) {
      setSearchData({ search: debouncedName });
    }
  }, [debouncedName]);

  useEffect(() => {
    if (access) {
      dispatch(getUserPrivileges(searchData));
    }
  }, [searchData, dispatch, access]);

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

        {access && <Create activeTab="User Privilege" />}
      </LeadSourceFilter>

      <MobileList
        columns={mobileColumns}
        data={data.data}
        expandable={renderExpandableContent}
        currentPage={searchData.page}
        totalPages={data?.totalPages}
        onPaginationChange={handlePaginationChange}
      />

      <Table
        data={data.data}
        columns={COLUMNS}
        currentPage={searchData.page}
        totalPages={data?.totalPages}
        onPaginationChange={handlePaginationChange}
        loading={isLoading.data}
        emptyText="No user privileges found"
      />
    </>
  );
};

export default UserPrivilege;
