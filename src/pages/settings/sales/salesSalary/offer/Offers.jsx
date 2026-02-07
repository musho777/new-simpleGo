import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import EditIcon from 'assets/edit.svg';
import Button from 'common-ui/button';
import Input from 'common-ui/input';
import MobileList from 'common-ui/mobileList';
import ResetButton from 'common-ui/resetButton';
import { AsyncSelect } from 'common-ui/select';
import { Table } from 'common-ui/table';
import { getOffers } from 'features/sales/salesActions';
import { selectOffers, selectOffersLoading } from 'features/sales/salesSlice';
import useDebounce from 'hooks/useDebounce';
import Tag from 'pages/components/tag';
import { FilterBox, ResetBox } from 'pages/inventory/categorySinglePage/filter/Filter.styles';
import { formatDateTime } from 'utils/dateUtils';

import {
  BtnWrapper,
  EllipsisCell,
  FilterSelectBox,
  LeadFilterBox,
  LeadSourceFilter,
  ShiftControl,
} from '../Sales.styles';
import Create from './Create';
import useSearchData from './useSearchData';

const Offers = () => {
  const dispatch = useDispatch();
  const { searchData, setSearchData } = useSearchData();

  const [searchTerm, setSearchTerm] = useState(searchData.search || '');
  const userType = localStorage.getItem('userType');
  const access = userType === 'Super Admin' || userType === 'General Manager';
  const [first, setFirst] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const debouncedName = useDebounce(searchTerm, 500);

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
              <ShiftControl
                onClick={() => {
                  setEditData(row);
                  setShowModal(true);
                }}
              >
                <img alt="Edit icon" src={EditIcon} />
              </ShiftControl>
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
  const data = useSelector(selectOffers);
  const isLoading = useSelector(selectOffersLoading);

  const handlePaginationChange = (page) => {
    setSearchData({ page });
  };

  const handleChangeName = (e) => {
    setFirst(true);
    setSearchTerm(e.target.value);
  };

  const handleResetFilters = () => {
    setFirst(false);
    setSearchData({
      search: '',
      status: 'all',
      page: 1,
    });

    setSearchTerm('');
  };

  const handleChange = (selectedOption) => {
    setFirst(true);
    setSearchData({
      status: selectedOption?.value || 'all',
    });
  };

  const handleCloseModal = () => {
    setEditData(null);
    setShowModal(false);
  };

  const handleCreateOffer = () => {
    setEditData(null);
    setShowModal(true);
  };

  useEffect(() => {
    if (first) setSearchData({ search: debouncedName });
  }, [debouncedName]);

  useEffect(() => {
    dispatch(getOffers(searchData));
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

        {access && (
          <BtnWrapper>
            <Button secondary onClick={handleCreateOffer} className="h-38">
              + Add Offer
            </Button>
          </BtnWrapper>
        )}
      </LeadSourceFilter>

      <MobileList
        columns={mobileColumns}
        data={data.offers}
        expandable={renderExpandableContent}
        currentPage={searchData.page}
        totalPages={data?.totalPages}
        onPaginationChange={handlePaginationChange}
      />
      <Table
        data={data.offers}
        columns={COLUMNS}
        currentPage={searchData.page}
        totalPages={data?.totalPages}
        onPaginationChange={handlePaginationChange}
        loading={isLoading.offers}
        emptyText="No offers found"
      />

      {showModal && (
        <Create
          isEdit={!!editData}
          initialData={editData}
          activeTab="Offers"
          onCloseEdit={handleCloseModal}
          hideButton={true}
        />
      )}
    </>
  );
};

export default Offers;
