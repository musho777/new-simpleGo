import React, { useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SearchSelect from 'modules/billing/components/searchSelect';
import {
  selectActiveTariff,
  selectAllTariff,
  selectCity,
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
} from '../Subscribers.styles';
import { billingTypes } from '../billingConstants';
import { useSubscribersSearchParams } from '../useSearchData';

const Filters = () => {
  const { searchData, setSubscribersSearchData, resetSearchData } =
    useSubscribersSearchParams();
  const [resetFilters, setResetFilters] = useState({
    region: [],
    city: [],
    oldTariff: [],
    currentTariff: [],
    oldStatus: [],
    currentStatus: [],
  });
  const [isHovered, setIsHovered] = useState(false);
  const showFilters = useSelector(selectShowFilters);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const mapSelectData = (data) => data?.map((item) => ({ uuid: item, name: item }));
  const region = useSelector(selectRegion);
  const city = useSelector(selectCity);
  const activeTariff = useSelector(selectActiveTariff);
  const allTariff = useSelector(selectAllTariff);
  const handleFilterChange = (key, value) => {
    const updatedSearchData = { ...searchData };

    if (value.length === 0) {
      updatedSearchData[key] = [];
    } else if (value.length > 0) {
      updatedSearchData[key] = value;
    } else {
      delete updatedSearchData[key];
    }

    setSubscribersSearchData(updatedSearchData);
  };

  const handleRegionSelect = (region) => handleFilterChange('region', region);
  const handleAllTariffSelect = (oldTariff) => handleFilterChange('oldTariff', oldTariff);
  const handleActiveTariffSelect = (currentTariff) =>
    handleFilterChange('currentTariff', currentTariff);
  const handleOldStatusSelect = (oldStatus) => handleFilterChange('oldStatus', oldStatus);
  const handleCurrentStatusSelect = (currentStatus) =>
    handleFilterChange('currentStatus', currentStatus);
  const regionSelectData = useMemo(() => mapSelectData(region), [region]);
  const citySelectData = useMemo(() => mapSelectData(city), [city]);
  const activeTariffSelectData = useMemo(() => mapSelectData(activeTariff), [activeTariff]);
  const allTariffSelectData = useMemo(() => mapSelectData(allTariff), [allTariff]);
  const handleCitySelect = (city) => handleFilterChange('city', city);
  const dispatch = useDispatch();
  const selectStatus = billingTypes.map((item, index) => {
    return { uuid: index, name: item };
  });

  const handleClickShowHideFilters = () => {
    dispatch(setShowFilters(!showFilters));
  };
  const handleResetFilters = () => {
    resetSearchData();
    setResetFilters({
      region: [],
      city: [],
      oldTariff: [],
      currentTariff: [],
      oldStatus: [],
      currentStatus: [],
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
          defaultValue={searchData.region}
          onSelect={handleRegionSelect}
          resetOptions={resetFilters.region}
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
          id="Ըստ հին տարիֆի"
          title="Ըստ հին տարիֆի"
          allTitle="Բոլորը"
          options={activeTariffSelectData}
          onSelect={handleAllTariffSelect}
          resetOptions={resetFilters.oldTariff}
          defaultValue={searchData.oldTariff}
          width="180px"
        />
        <SearchSelect
          id="Ըստ ընթացիկ տարիֆի"
          title="Ըստ ընթացիկ տարիֆի"
          allTitle="Բոլորը"
          options={allTariffSelectData}
          onSelect={handleActiveTariffSelect}
          resetOptions={resetFilters.currentTariff}
          defaultValue={searchData.currentTariff}
          width="214px"
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
      </FiltersSelect>
      <RightSideContainer>
        <IconWrapper
          onClick={handleClickShowHideFilters}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CloseIcon src={isHovered ? CloseHoverSvg : CloseSvg} alt="close" />
        </IconWrapper>
        <ClearAllText onClick={handleResetFilters}>Ջնջել բոլորը</ClearAllText>
      </RightSideContainer>
    </FiltersWrapper>
  );
};

export default Filters;
