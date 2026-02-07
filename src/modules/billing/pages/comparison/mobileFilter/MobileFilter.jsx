import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import SearchSelect from 'modules/billing/components/searchSelect';
import {
  selectAllTariff,
  selectCity,
  selectRegion,
  setContractSearchData,
} from 'modules/billing/features/main/mainSlice';

import line from '../../../assets/line.svg';
import {
  BottomSheet,
  ClearAllText,
  DescLabel,
  FiltersWrapper,
  FirstWrapper,
  Icon,
  LineWrapper,
  ResultButton,
  TitleWrapper,
} from './MobileFilter.styles';

const MobileFilter = ({ isFilterOpen, searchData, handleCloseFilter }) => {
  const [resetFilters, setResetFilters] = useState({
    region: [],
    city: [],
    activeTariff: [],
  });
  const dispatch = useDispatch();
  const mapSelectData = (data) => data?.map((item) => ({ uuid: item, name: item }));
  const region = useSelector(selectRegion);
  const city = useSelector(selectCity);
  const allTariff = useSelector(selectAllTariff);
  const regionSelectData = mapSelectData(region);
  const citySelectData = mapSelectData(city);
  const allTariffSelectData = mapSelectData(allTariff);
  const handleFilterChange = (key, value) => {
    let updatedSearchData =
      value.length > 0
        ? { ...searchData, [key]: value }
        : Object.fromEntries(Object.entries(searchData).filter(([k]) => k !== key));

    dispatch(setContractSearchData(updatedSearchData));
  };
  const handleRegionSelect = (region) => handleFilterChange('region', region);
  const handleCitySelect = (city) => handleFilterChange('city', city);
  const handleActiveTariffSelect = (currentTariff) =>
    handleFilterChange('currentTariff', currentTariff);

  const handleResetAllFilters = () => {
    setResetFilters({
      regions: [],
      cities: [],
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
                resetOptions={resetFilters.regions}
              />
              <SearchSelect
                id="Քաղաքներ"
                title="Քաղաքներ"
                allTitle="Բոլորը"
                options={citySelectData}
                onSelect={handleCitySelect}
                resetOptions={resetFilters.cities}
              />
            </FirstWrapper>
            <SearchSelect
              id="Ըստ տարիֆի"
              title="Ըստ տարիֆի"
              allTitle="Բոլորը"
              options={allTariffSelectData}
              onSelect={handleActiveTariffSelect}
              resetOptions={resetFilters?.activeTariff}
            />
            <ResultButton onClick={handleCloseFilter}>Show results</ResultButton>
          </FiltersWrapper>
        </BottomSheet>
      )}
    </>
  );
};

export default MobileFilter;
