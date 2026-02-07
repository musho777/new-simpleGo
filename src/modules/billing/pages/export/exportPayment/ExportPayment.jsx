import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Navigation from 'modules/billing/components/navigation';
import {
  selectExportPaymentSearchData,
  selectIsSecurityModalOpen,
  setExportPaymentSearchData,
} from 'modules/billing/features/main/mainSlice';

import { FilterContainer, NavWrapper, Row, ViewContainer } from './ExportPayment.styles';
import FilterActions from './filterActions';

const TABS = [
  { name: 'Բաժանորդներ', path: `/billing/export` },
  { name: 'Վճարումներ', path: `/billing/export/payment` },
];

const ExportReport = () => {
  const [resetFilters, setResetFilters] = useState({
    oldStatus: [],
    currentAbsentStatus: [],
    currentStatus: [],
  });
  const securityModalOpen = useSelector(selectIsSecurityModalOpen);
  const searchData = useSelector(selectExportPaymentSearchData);
  const dispatch = useDispatch();

  const handleResetAllFilters = () => {
    setResetFilters({
      oldStatus: [],
      currentAbsentStatus: [],
      currentStatus: [],
      dates: [],
    });
    dispatch(
      setExportPaymentSearchData({
        oldStatus: null,
        currentAbsentStatus: null,
        currentStatus: null,
        from: null,
        to: null,
      })
    );
  };

  return (
    !securityModalOpen && (
      <>
        <ViewContainer>
          <Row>
            <NavWrapper>
              <Navigation className="nav" tabs={TABS} />
            </NavWrapper>
          </Row>
          <FilterContainer>
            <FilterActions
              searchData={searchData}
              resetFilters={resetFilters}
              handleResetAllFilters={handleResetAllFilters}
            />
          </FilterContainer>
        </ViewContainer>
      </>
    )
  );
};

export default ExportReport;
