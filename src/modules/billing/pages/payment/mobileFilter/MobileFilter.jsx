import { useState } from 'react';

import { useSelector } from 'react-redux';

import SearchSelect from 'modules/billing/components/searchSelect';
import {
  selectCity,
  selectPaymentsMethod,
  selectRegion,
} from 'modules/billing/features/main/mainSlice';

import line from '../../../assets/line.svg';
import { ClearAllText } from '../Payment.styles';
import { billingTypes } from '../billingConstants';
import { usePaymentSearchParams } from '../useSearchData';
import {
  BottomSheet,
  DescLabel,
  FiltersWrapper,
  FirstWrapper,
  Icon,
  LineWrapper,
  ResultButton,
  TitleWrapper,
} from './MobileFilter.styles';

const MobileFilter = ({ isFilterOpen, handleCloseFilter }) => {
  const { searchData, setPaymentSearchData, resetSearchData } = usePaymentSearchParams();
  const [resetFilters, setResetFilters] = useState({
    region: [],
    city: [],
    oldStatus: [],
    currentStatus: [],
    paymentTypeId: [],
  });
  const mapSelectData = (data) => data?.map((item) => ({ uuid: item, name: item }));
  const region = useSelector(selectRegion);
  const city = useSelector(selectCity);
  const payments = useSelector(selectPaymentsMethod);
  const regionSelectData = mapSelectData(region);
  const citySelectData = mapSelectData(city);
  const handleFilterChange = (key, value) => {
    let updatedSearchData =
      value.length > 0
        ? { ...searchData, [key]: value }
        : Object.fromEntries(Object.entries(searchData).filter(([k]) => k !== key));

    setPaymentSearchData(updatedSearchData);
  };
  const handleRegionSelect = (region) => handleFilterChange('region', region);
  const handleCitySelect = (city) => handleFilterChange('city', city);
  const handleOldStatusSelect = (oldStatus) => handleFilterChange('oldStatus', oldStatus);
  const handleCurrentStatusSelect = (currentStatus) =>
    handleFilterChange('currentStatus', currentStatus);
  const handlePaymentsSelect = (payments) => handleFilterChange('paymentTypeId', payments);
  const paymentsSelectData = payments.map(({ id, title }) => ({
    uuid: id,
    name: title,
  }));
  const selectStatus = billingTypes.map((item, index) => {
    return { uuid: index, name: item };
  });

  const handleResetAllFilters = () => {
    setResetFilters({
      region: [],
      city: [],
      oldStatus: [],
      currentStatus: [],
      paymentTypeId: [],
    });
    resetSearchData();
  };
  return (
    <>
      {isFilterOpen && (
        <BottomSheet>
          <LineWrapper>
            <Icon src={line} onClick={handleCloseFilter} />
          </LineWrapper>
          <TitleWrapper>
            <DescLabel>Ֆիլտրում</DescLabel>
            <ClearAllText onClick={handleResetAllFilters}>Ջնջել բոլորը</ClearAllText>
          </TitleWrapper>
          <FiltersWrapper>
            <FirstWrapper>
              <SearchSelect
                id="Մարզեր"
                title="Մարզեր"
                allTitle="Բոլորը"
                options={regionSelectData}
                onSelect={handleRegionSelect}
                resetOptions={resetFilters.region}
                defaultValue={searchData.region}
              />
              <SearchSelect
                id="Քաղաքներ"
                title="Քաղաքներ"
                allTitle="Բոլորը"
                options={citySelectData}
                onSelect={handleCitySelect}
                resetOptions={resetFilters.city}
                defaultValue={searchData.city}
              />
            </FirstWrapper>
            <SearchSelect
              id="Ըստ նախորդող ստատուսի"
              title="Ըստ նախորդող ստատուսի"
              allTitle="Բոլորը"
              options={selectStatus}
              onSelect={handleOldStatusSelect}
              resetOptions={resetFilters.oldStatus}
            />
            <SearchSelect
              id="Ըստ ընթացիկ ստատուսի"
              title="Ըստ ընթացիկ ստատուսի"
              allTitle="Բոլորը"
              options={selectStatus}
              onSelect={handleCurrentStatusSelect}
              resetOptions={resetFilters.currentStatus}
            />
            <SearchSelect
              id="Ըստ վճարման մեթոդի"
              title="Ըստ վճարման մեթոդի"
              allTitle="Բոլորը"
              options={paymentsSelectData}
              onSelect={handlePaymentsSelect}
              resetOptions={resetFilters.paymentTypeId}
            />
            <ResultButton onClick={handleCloseFilter}>Show results</ResultButton>
          </FiltersWrapper>
        </BottomSheet>
      )}
    </>
  );
};

export default MobileFilter;
