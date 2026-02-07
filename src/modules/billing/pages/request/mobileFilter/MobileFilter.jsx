import { useState } from 'react';

import { useSelector } from 'react-redux';

import SearchSelect from 'modules/billing/components/searchSelect';
import {
  selectCity,
  selectProcessStatus,
  selectProcessType,
  selectRegion,
} from 'modules/billing/features/main/mainSlice';

import line from '../../../assets/line.svg';
import { ClearAllText } from '../Request.styles';
import { useRequestSearchParams } from '../useSearchData';
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
  const { searchData, setRequestSearchData, resetSearchData } = useRequestSearchParams();
  const [resetFilters, setResetFilters] = useState({
    region: [],
    city: [],
    statusIds: [],
    typeIds: [],
  });
  const mapSelectData = (data) => data?.map((item) => ({ uuid: item, name: item }));
  const region = useSelector(selectRegion);
  const city = useSelector(selectCity);
  const regionSelectData = mapSelectData(region);
  const citySelectData = mapSelectData(city);
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
  const handleStatusSelect = (statusIds) => handleFilterChange('statusIds', statusIds);
  const handleTypeSelect = (typeIds) => handleFilterChange('typeIds', typeIds);
  const handleFilterChange = (key, value) => {
    let updatedSearchData =
      value.length > 0
        ? { ...searchData, [key]: value }
        : Object.fromEntries(Object.entries(searchData).filter(([k]) => k !== key));

    setRequestSearchData(updatedSearchData);
  };
  const handleRegionSelect = (region) => handleFilterChange('region', region);
  const handleCitySelect = (city) => handleFilterChange('city', city);

  const handleResetAllFilters = () => {
    setResetFilters({
      region: [],
      city: [],
      typeIds: [],
      statusIds: [],
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
              id="Ըստ հարցման տեսակի"
              title="Ըստ հարցման տեսակի"
              allTitle="Բոլորը"
              options={processTypeSelectData}
              onSelect={handleTypeSelect}
              resetOptions={resetFilters.typeIds}
            />
            <SearchSelect
              id="Ըստ հարցման կարգավիճակի"
              title="Ըստ հարցման կարգավիճակի"
              allTitle="Բոլորը"
              options={processStatusSelectData}
              onSelect={handleStatusSelect}
              resetOptions={resetFilters.statusIds}
            />
            <ResultButton onClick={handleCloseFilter}>Show results</ResultButton>
          </FiltersWrapper>
        </BottomSheet>
      )}
    </>
  );
};

export default MobileFilter;
