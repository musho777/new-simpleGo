import React, { useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SearchSelect from 'modules/billing/components/searchSelect';
import {
  selectCity,
  selectProcessStatus,
  selectProcessType,
  selectRegion,
  selectShowFilters,
  setShowFilters,
} from 'modules/billing/features/main/mainSlice';

import CloseSvg from '../../../assets/subscribers/close.svg';
import CloseHoverSvg from '../../../assets/subscribers/closeHover.svg';
import {
  ClearAllText,
  CloseIcon,
  CloseTitle,
  FiltersSelect,
  FiltersWrapper,
  IconWrapper,
  RightSideContainer,
} from '../Request.styles';
import { useRequestSearchParams } from '../useSearchData';

const Filters = () => {
  const { searchData, setRequestSearchData, resetSearchData } = useRequestSearchParams();
  const [resetFilters, setResetFilters] = useState({
    region: [],
    city: [],
    statusIds: [],
    typeIds: [],
  });
  const [isHovered, setIsHovered] = useState(false);
  const showFilters = useSelector(selectShowFilters);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const mapSelectData = (data) => data?.map((item) => ({ uuid: item, name: item }));
  const region = useSelector(selectRegion);
  const city = useSelector(selectCity);
  const processStatus = useSelector(selectProcessStatus);
  const processType = useSelector(selectProcessType);
  const processStatusSelectData = processStatus.map(({ id, title }) => ({
    uuid: id,
    name: title,
  }));
  const processTypeSelectData = processType.map(({ id, title }) => ({
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

    setRequestSearchData(updatedSearchData);
  };

  const handleRegionSelect = (region) => handleFilterChange('region', region);
  const handleStatusSelect = (statusIds) => handleFilterChange('statusIds', statusIds);
  const handleTypeSelect = (typeIds) => handleFilterChange('typeIds', typeIds);
  const regionSelectData = useMemo(() => mapSelectData(region), [region]);
  const citySelectData = useMemo(() => mapSelectData(city), [city]);
  const handleCitySelect = (city) => handleFilterChange('city', city);
  const dispatch = useDispatch();

  const handleClickShowHideFilters = () => {
    dispatch(setShowFilters(!showFilters));
  };
  const handleResetAllFilters = () => {
    resetSearchData();
    setResetFilters({
      region: [],
      city: [],
      typeIds: [],
      statusIds: [],
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
          id="Ըստ հարցման տեսակի"
          title="Ըստ հարցման տեսակի"
          allTitle="Բոլորը"
          options={processTypeSelectData}
          onSelect={handleTypeSelect}
          resetOptions={resetFilters.typeIds}
          width="214px"
        />
        <SearchSelect
          id="Ըստ հարցման կարգավիճակի"
          title="Ըստ հարցման կարգավիճակի"
          allTitle="Բոլորը"
          options={processStatusSelectData}
          onSelect={handleStatusSelect}
          resetOptions={resetFilters.statusIds}
          width="256px"
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
