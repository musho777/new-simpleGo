import React from 'react';

import AllCustomersFilter from './AllCustomersFilter';
import ComparativePeriodsFilter from './ComparativePeriodsFilter';
import JoinedServiceFilter from './JoinedServiceFilter';
import PaidBothMonthsFilter from './PaidBothMonthsFilter';
import PaidPreviousInactiveFilter from './PaidPreviousInactiveFilter';
import PaidPreviousMonthFilter from './PaidPreviousMonthFilter';
import PaidPreviousNotPaidCurrentFilter from './PaidPreviousNotPaidCurrentFilter';
import PaidPreviousRefusedFilter from './PaidPreviousRefusedFilter';
import PaidSelectedMonthFilter from './PaidSelectedMonthFilter';
import RefusedSelectedMonthFilter from './RefusedSelectedMonthFilter';
import VivaSubscribersFilter from './VivaSubscribersFilter';

const FilterActions = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <PaidPreviousMonthFilter />
      <PaidBothMonthsFilter />
      <PaidPreviousInactiveFilter />
      <PaidPreviousRefusedFilter />
      <PaidPreviousNotPaidCurrentFilter />
      <PaidSelectedMonthFilter />
      <RefusedSelectedMonthFilter />
      <JoinedServiceFilter />
      <ComparativePeriodsFilter />
      <VivaSubscribersFilter />
      <AllCustomersFilter />
    </div>
  );
};

export default FilterActions;
