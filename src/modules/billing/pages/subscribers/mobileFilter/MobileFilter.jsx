import { useState } from 'react';

import { useSelector } from 'react-redux';

import SearchSelect from 'modules/billing/components/searchSelect';
import {
  selectActiveTariff,
  selectAllTariff,
  selectCity,
  selectRegion,
} from 'modules/billing/features/main/mainSlice';

import line from '../../../assets/line.svg';
import { ClearAllText } from '../Subscribers.styles';
import { billingTypes } from '../billingConstants';
import { useSubscribersSearchParams } from '../useSearchData';
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
  const mapSelectData = (data) => data?.map((item) => ({ uuid: item, name: item }));
  const region = useSelector(selectRegion);
  const city = useSelector(selectCity);
  const activeTariff = useSelector(selectActiveTariff);
  const allTariff = useSelector(selectAllTariff);
  const regionSelectData = mapSelectData(region);
  const citySelectData = mapSelectData(city);
  const activeTariffSelectData = mapSelectData(activeTariff);
  const allTariffSelectData = mapSelectData(allTariff);
  const handleFilterChange = (key, value) => {
    let updatedSearchData =
      value.length > 0
        ? { ...searchData, [key]: value }
        : Object.fromEntries(Object.entries(searchData).filter(([k]) => k !== key));

    setSubscribersSearchData(updatedSearchData);
  };
  const handleRegionSelect = (region) => handleFilterChange('region', region);
  const handleCitySelect = (city) => handleFilterChange('city', city);
  const handleAllTariffSelect = (oldTariff) => handleFilterChange('oldTariff', oldTariff);
  const handleActiveTariffSelect = (currentTariff) =>
    handleFilterChange('currentTariff', currentTariff);
  const handleOldStatusSelect = (oldStatus) => handleFilterChange('oldStatus', oldStatus);
  const handleCurrentStatusSelect = (currentStatus) =>
    handleFilterChange('currentStatus', currentStatus);

  const selectStatus = billingTypes.map((item, index) => {
    return { uuid: index, name: item };
  });

  const handleResetAllFilters = () => {
    setResetFilters({
      region: [],
      city: [],
      oldTariff: [],
      currentTariff: [],
      oldStatus: [],
      currentStatus: [],
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
              id="Ըստ հին տարիֆի"
              title="Ըստ հին տարիֆի"
              allTitle="Բոլորը"
              options={activeTariffSelectData}
              onSelect={handleAllTariffSelect}
              resetOptions={resetFilters.oldTariff}
              defaultValue={searchData.oldTariff}
            />

            <SearchSelect
              id="Ըստ ընթացիկ տարիֆի"
              title="Ըստ ընթացիկ տարիֆի"
              allTitle="Բոլորը"
              options={allTariffSelectData}
              onSelect={handleActiveTariffSelect}
              resetOptions={resetFilters.currentTariff}
              defaultValue={searchData.currentTariff}
            />
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
            <ResultButton onClick={handleCloseFilter}>Show results</ResultButton>
          </FiltersWrapper>
        </BottomSheet>
      )}
    </>
  );
};

export default MobileFilter;
