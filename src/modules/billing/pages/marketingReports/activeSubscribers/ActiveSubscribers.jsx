import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import OneDayCard from 'modules/billing/components/oneDayCard';
import { getActivesCountByDate } from 'modules/billing/features/main/mainActions';
import {
  selectActivesCountByDate,
  selectActivesCountByDateSearchData,
  selectIsSecurityModalOpen,
  selectLoading,
} from 'modules/billing/features/main/mainSlice';

import b2b from '../../../assets/b2b.svg';
import group from '../../../assets/daily/group.svg';
import loadIcon from '../../../assets/loading.svg';
import {
  Container,
  LoadContainer,
  LoadingIcon,
  OneDayCardWrapper,
} from './ActiveSubscribers.styles';
import Filter from './Filter';

const ActiveSubscribers = () => {
  const dispatch = useDispatch();
  const activesCountData = useSelector(selectActivesCountByDate);
  const searchData = useSelector(selectActivesCountByDateSearchData);
  const loading = useSelector(selectLoading);
  const securityModalOpen = useSelector(selectIsSecurityModalOpen);
  const [secret, setSecret] = useState(null);

  useEffect(() => {
    if (secret) {
      dispatch(getActivesCountByDate(searchData));
    }
  }, [dispatch, searchData, secret]);

  useEffect(() => {
    setSecret(localStorage.getItem('securityCode'));
  }, []);

  if (loading.activesCountByDate) {
    return (
      <LoadContainer>
        <LoadingIcon src={loadIcon} alt="Loading..." />
      </LoadContainer>
    );
  }
  if (!securityModalOpen) {
    return (
      <Container>
        <Filter />
        {loading.activesCountByDate ? (
          <LoadContainer>
            <LoadingIcon src={loadIcon} alt="Loading..." />
          </LoadContainer>
        ) : (
          <OneDayCardWrapper>
            <OneDayCard
              title={'Ընդհանուր բաժանորդներ'}
              number={activesCountData?.allActivesCount || 0}
              icon={group}
              mood
              bgColor="#FF6A00"
            />
            <OneDayCard
              title={'B2B բաժանորդներ'}
              number={activesCountData?.b2bActivesCount || 0}
              bgColor={'#2D6CDF'}
              icon={b2b}
              mood
            />
          </OneDayCardWrapper>
        )}
      </Container>
    );
  }
};
export default ActiveSubscribers;
