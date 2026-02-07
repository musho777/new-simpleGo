import React from 'react';

import CanceledSubscribers from './CanceledSubscribers';
import ComparativePeriodsFilter from './ComparativePeriodsFilter';
import ComprehensiveDb from './ComprehensiveDb';
import FromActiveToOther from './FromActiveToOther';
import FromPassiveToActive from './FromPassiveToActive';
import NewSubscribers from './NewSubscribers';
import PaidBothMonthsFilter from './PaidBothMonthsFilter';
import PaidPreviousInactiveFilter from './PaidPreviousInactiveFilter';
import PaidPreviousNotPaidCurrentFilter from './PaidPreviousNotPaidCurrentFilter';
import WeeklyCollections from './WeeklyCollections';

const FilterActions = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ComprehensiveDb />
      <WeeklyCollections />
      <PaidBothMonthsFilter />
      <PaidPreviousInactiveFilter />
      <PaidPreviousNotPaidCurrentFilter />
      <ComparativePeriodsFilter />
      <FromActiveToOther />
      <FromPassiveToActive />
      <NewSubscribers />
      <CanceledSubscribers />
    </div>
  );
};

export default FilterActions;
