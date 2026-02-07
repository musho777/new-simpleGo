import React, { useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SearchSelect from 'modules/billing/components/searchSelect';
import {
  selectCity,
  selectPaymentsMethod,
  selectRegion,
  selectShowFilters,
  setShowFilters,
} from 'modules/billing/features/main/mainSlice';

import CloseSvg from '../../../assets/subscribers/close.svg';
import CloseHoverSvg from '../../../assets/subscribers/closeHover.svg';
import {
  ClearAllText,
  CloseIcon,
  FiltersSelect,
  FiltersWrapper,
  IconWrapper,
  RightSideContainer,
} from '../Payment.styles';
import { billingTypes } from '../billingConstants';
import { usePaymentSearchParams } from '../useSearchData';

const Filters = () => {
  const { searchData, setPaymentSearchData, resetSearchData } = usePaymentSearchParams();
  const [resetFilters, setResetFilters] = useState({
    region: [],
    city: [],
    oldStatus: [],
    currentStatus: [],
    paymentTypeId: [],
  });

  const [isHovered, setIsHovered] = useState(false);
  const showFilters = useSelector(selectShowFilters);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const mapSelectData = (data) => data?.map((item) => ({ uuid: item, name: item }));
  const region = useSelector(selectRegion);
  const city = useSelector(selectCity);
  const payments = useSelector(selectPaymentsMethod);
  const paymentsSelectData = payments.map(({ id, title }) => ({
    uuid: id,
    name: title,
  }));

  const handleFilterChange = (key, value) => {
    const updatedSearchData = { ...searchData };

    if (value.length === 0) {
      updatedSearchData[key] = [];
    } else if (value.length > 0) {
      updatedSearchData[key] = value;
    } else {
      delete updatedSearchData[key];
    }

    setPaymentSearchData(updatedSearchData);
  };

  const handleRegionSelect = (region) => handleFilterChange('region', region);
  const handleOldStatusSelect = (oldStatus) => handleFilterChange('oldStatus', oldStatus);
  const handleCurrentStatusSelect = (currentStatus) =>
    handleFilterChange('currentStatus', currentStatus);
  const regionSelectData = useMemo(() => mapSelectData(region), [region]);
  const citySelectData = useMemo(() => mapSelectData(city), [city]);
  const handleCitySelect = (city) => handleFilterChange('city', city);
  const handlePaymentsSelect = (paymentTypeId) =>
    handleFilterChange('paymentTypeId', paymentTypeId);
  const dispatch = useDispatch();
  const selectStatus = billingTypes.map((item, index) => {
    return { uuid: index, name: item };
  });

  const handleClickShowHideFilters = () => {
    dispatch(setShowFilters(!showFilters));
  };
  const handleResetAllFilters = () => {
    resetSearchData();
    setResetFilters({
      region: [],
      city: [],
      oldStatus: [],
      currentStatus: [],
      paymentTypeId: [],
    });
  };
  return (
    <FiltersWrapper $showFilters={showFilters}>
      <FiltersSelect>
        <SearchSelect
          id="Մարզեր"
          title="Մարզեր"
          allTitle="Բոլորը"
          options={regionSelectData}
          onSelect={handleRegionSelect}
          resetOptions={resetFilters.region}
          defaultValue={searchData.region}
          width="160px"
        />
        <SearchSelect
          id="Քաղաքներ"
          title="Քաղաքներ"
          allTitle="Բոլորը"
          options={citySelectData}
          onSelect={handleCitySelect}
          resetOptions={resetFilters.city}
          defaultValue={searchData.city}
          width="160px"
        />
        <SearchSelect
          id="Ըստ նախորդող ստատուսի"
          title="Ըստ նախորդող ստատուսի"
          allTitle="Բոլորը"
          options={selectStatus}
          onSelect={handleOldStatusSelect}
          resetOptions={resetFilters.oldStatus}
          width="236px"
        />
        <SearchSelect
          id="Ըստ ընթացիկ ստատուսի"
          title="Ըստ ընթացիկ ստատուսի"
          allTitle="Բոլորը"
          options={selectStatus}
          onSelect={handleCurrentStatusSelect}
          resetOptions={resetFilters.currentStatus}
          width="225px"
        />
        <SearchSelect
          id="Ըստ վճարման մեթոդի"
          title="Ըստ վճարման մեթոդի"
          allTitle="Բոլորը"
          options={paymentsSelectData}
          onSelect={handlePaymentsSelect}
          resetOptions={resetFilters.paymentTypeId}
          width="207px"
        />
      </FiltersSelect>

      <RightSideContainer>
        <IconWrapper
          onClick={handleClickShowHideFilters}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CloseIcon src={isHovered ? CloseHoverSvg : CloseSvg} alt="close" />
        </IconWrapper>
        <ClearAllText onClick={handleResetAllFilters}>Ջնջել բոլորը</ClearAllText>
      </RightSideContainer>
    </FiltersWrapper>
  );
};

export default Filters;
