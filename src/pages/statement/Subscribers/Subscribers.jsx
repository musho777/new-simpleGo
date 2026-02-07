import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getHalfYearlySubscribers } from 'features/statement/statementActions';
import {
  selectHalfYearlySubscribers,
  selectStatementLoading,
} from 'features/statement/statementSlice';
import MuiTable from 'modules/billing/components/muiTable/MuiTable';

import {
  Title,
  ViewContainer,
} from '../../../modules/billing/pages/subscribers/Subscribers.styles';
import SubscribersFilters from './SubscribersFilters';
import { FilterContainerSubscribers } from './SubscribersFilters/SubscribersFilters.styles';
import { useSubscribersSearchParams } from './useSubscribersSearchParams';

const Subscribers = () => {
  const { searchData: subscribersSearchData, setSubscribersSearchData } =
    useSubscribersSearchParams();

  const handlePageChange = (page) => {
    setSubscribersSearchData({ page: page - 1 });
  };

  const data = useSelector(selectHalfYearlySubscribers);
  const loading = useSelector(selectStatementLoading);
  const dispatch = useDispatch();

  const columns = [
    { id: 'year', label: 'Տարի' },
    {
      id: 'halfYear',
      label: 'Կիսամյակ',
    },
    { id: 'internet', label: 'Համացանց' },
    { id: 'tv', label: 'TV' },
    { id: 'domophone', label: 'Դոմոֆոն' },
    { id: 'total', label: 'Ընդհանուր' },
  ];

  const hasAllFilters =
    subscribersSearchData.fromYear !== '' && subscribersSearchData.toYear !== '';
  useEffect(() => {
    dispatch(getHalfYearlySubscribers(subscribersSearchData));
  }, [subscribersSearchData, dispatch]);

  return (
    <>
      <ViewContainer>
        <SubscribersFilters />
        {hasAllFilters && (
          <FilterContainerSubscribers>
            {!loading.halfYearlySubscribers && (
              <Title className="inline_title ">
                Ընդհանուր բաժանորդների քանակը՝
                {Number(data.totalAmount).toLocaleString('hy-AM')}
              </Title>
            )}
          </FilterContainerSubscribers>
        )}
        <MuiTable
          rowCount={subscribersSearchData.size}
          data={data?.data || []}
          loading={loading.halfYearlySubscribers}
          columns={columns}
          showPagination={false}
          handlePageChange={handlePageChange}
        />
      </ViewContainer>
    </>
  );
};

export default Subscribers;
