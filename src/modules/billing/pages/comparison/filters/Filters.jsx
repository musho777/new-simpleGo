import React, { useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SearchSelect from 'modules/billing/components/searchSelect';
import {
  selectAllTariff,
  selectCity,
  selectRegion,
  selectShowFilters,
  setContractSearchData,
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
} from '../Comparison.styles';

const Filters = ({ searchData }) => {
  const [resetFilters, setResetFilters] = useState({
    region: [],
    city: [],
    activeTariff: [],
  });
  const [isHovered, setIsHovered] = useState(false);
  const showFilters = useSelector(selectShowFilters);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const mapSelectData = (data) => data?.map((item) => ({ uuid: item, name: item }));
  const region = useSelector(selectRegion);
  const city = useSelector(selectCity);
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

    dispatch(setContractSearchData(updatedSearchData));
  };

  const handleRegionSelect = (region) => handleFilterChange('region', region);
  const handleActiveTariffSelect = (currentTariff) =>
    handleFilterChange('currentTariff', currentTariff);
  const regionSelectData = useMemo(() => mapSelectData(region), [region]);
  const citySelectData = useMemo(() => mapSelectData(city), [city]);
  const allTariffSelectData = useMemo(() => mapSelectData(allTariff), [allTariff]);
  const handleCitySelect = (city) => handleFilterChange('city', city);
  const dispatch = useDispatch();

  const handleClickShowHideFilters = () => {
    dispatch(setShowFilters(!showFilters));
  };
  const handleResetFilters = () => {
    setResetFilters({
      region: [],
      city: [],
      activeTariff: [],
    });

    dispatch(
      setContractSearchData({
        limit: 10,
        offset: 0,
        size: 10,
        region: [],
        city: [],
        currentTariff: [],
      })
    );
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
          id="Ըստ տարիֆի"
          title="Ըստ տարիֆի"
          allTitle="Բոլորը"
          options={allTariffSelectData}
          onSelect={handleActiveTariffSelect}
          resetOptions={resetFilters.activeTariff}
          defaultValue={searchData.currentTariff}
          width="160px"
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
