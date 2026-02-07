import React, { useMemo, useState } from 'react';

import { useSelector } from 'react-redux';

import SearchSelect from 'modules/billing/components/searchSelect';
import {
  selectCitiesOneDay,
  selectRegionsOneDay,
  selectStatuesOneDay,
  selectTariffsOneDay,
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
} from './Filters.styles';

export const billingTypes = [
  'Ակտիվ',
  'Անջատում',
  'Անջատված',
  'Փակված',
  'Կասեցված',
  'Միացման մեջ',
  'Միացված չէ',
  'Վճարված չէ',
  'Վերականգնված',
];

const Filters = ({
  showLeftFilters,
  showRightFilters,
  handleClickRightShowHideFilters,
  handleClickShowHideFilters,
  showStatus = false,
  handleFilterChange,
  handleResetFilters,
  resetFilters,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const mapSelectData = (data) => data?.map((item) => ({ uuid: item, name: item }));
  const regions = useSelector(selectRegionsOneDay);
  const cities = useSelector(selectCitiesOneDay);
  const tariffs = useSelector(selectTariffsOneDay);
  const statuses = useSelector(selectStatuesOneDay);

  const statusSelectData = useMemo(
    () =>
      statuses?.map((num) => ({
        uuid: num,
        name: billingTypes[num],
      })),
    [statuses]
  );

  const handleRegionsSelect = (region) => handleFilterChange('region', region);
  const handleCitiesSelect = (city) => handleFilterChange('city', city);
  const handleTariffsSelect = (tariff) => handleFilterChange('tariff', tariff);
  const handleStatusSelect = (status) => handleFilterChange('status', status);

  const regionSelectData = useMemo(() => mapSelectData(regions), [regions]);
  const citySelectData = useMemo(() => mapSelectData(cities), [cities]);
  const activeTariffSelectData = useMemo(() => mapSelectData(tariffs), [tariffs]);

  return (
    <FiltersWrapper $showFilters={showLeftFilters || showRightFilters}>
      <FiltersSelect>
        <SearchSelect
          id="Մարզեր"
          title="Մարզեր"
          allTitle="Բոլորը"
          options={regionSelectData}
          onSelect={handleRegionsSelect}
          resetOptions={resetFilters.region}
          className="select"
          width="155px"
        />
        <SearchSelect
          id="Քաղաքներ"
          title="Քաղաքներ"
          allTitle="Բոլորը"
          options={citySelectData}
          onSelect={handleCitiesSelect}
          resetOptions={resetFilters.city}
          className="select"
          width="155px"
        />
        <SearchSelect
          id="Տարիֆ"
          title="Տարիֆ"
          allTitle="Բոլորը"
          options={activeTariffSelectData}
          onSelect={handleTariffsSelect}
          resetOptions={resetFilters.tariff}
          className="select"
          width="155px"
        />
        {showStatus && (
          <SearchSelect
            id="Ստատուս"
            title="Ստատուս"
            allTitle="Բոլորը"
            options={statusSelectData}
            onSelect={handleStatusSelect}
            resetOptions={resetFilters.status}
            className="select"
            width="155px"
          />
        )}
      </FiltersSelect>
      <RightSideContainer>
        <IconWrapper
          onClick={handleClickRightShowHideFilters || handleClickShowHideFilters}
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
