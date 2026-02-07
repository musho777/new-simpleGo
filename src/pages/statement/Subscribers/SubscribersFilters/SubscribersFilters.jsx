import ResetButton from 'common-ui/resetButton';

import { useSubscribersSearchParams } from '../useSubscribersSearchParams';
import {
  FilterGroup,
  FilterLabel,
  FiltersWrapper,
  Select,
  Separator,
} from './SubscribersFilters.styles';

const SEMESTERS = [
  { value: 1, label: '1-ին կիսամյակ' },
  { value: 2, label: '2-րդ կիսամյակ' },
];

const YEARS = [2023, 2024, 2025];

const SubscribersFilters = () => {
  const { searchData, setSubscribersSearchData, resetSearchData } =
    useSubscribersSearchParams();

  const handleChange = (key, value) => {
    setSubscribersSearchData({ [key]: value === '' ? '' : Number(value) });
  };

  const fromYears =
    searchData.toYear !== '' ? YEARS.filter((y) => y <= searchData.toYear) : YEARS;

  const toYears =
    searchData.fromYear !== '' ? YEARS.filter((y) => y >= searchData.fromYear) : YEARS;

  const sameYear = searchData.fromYear !== '' && searchData.fromYear === searchData.toYear;

  const fromSemesters =
    sameYear && searchData.toHalfYear !== ''
      ? SEMESTERS.filter((s) => s.value <= searchData.toHalfYear)
      : SEMESTERS;

  const toSemesters =
    sameYear && searchData.fromHalfYear !== ''
      ? SEMESTERS.filter((s) => s.value >= searchData.fromHalfYear)
      : SEMESTERS;

  return (
    <FiltersWrapper>
      <FilterGroup>
        <FilterLabel>Սկիզբ</FilterLabel>
        <Select
          value={searchData.fromYear}
          onChange={(e) => handleChange('fromYear', e.target.value)}
        >
          <option value="">Տարի</option>
          {fromYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Select
          value={searchData.fromHalfYear}
          onChange={(e) => handleChange('fromHalfYear', e.target.value)}
        >
          <option value="">Կիսամյակ</option>
          {fromSemesters.map((semester) => (
            <option key={semester.value} value={semester.value}>
              {semester.label}
            </option>
          ))}
        </Select>
      </FilterGroup>

      <Separator>—</Separator>

      <FilterGroup>
        <FilterLabel>Ավարտ</FilterLabel>
        <Select
          value={searchData.toYear}
          onChange={(e) => handleChange('toYear', e.target.value)}
        >
          <option value="">Տարի</option>
          {toYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Select
          value={searchData.toHalfYear}
          onChange={(e) => handleChange('toHalfYear', e.target.value)}
        >
          <option value="">Կիսամյակ</option>
          {toSemesters.map((semester) => (
            <option key={semester.value} value={semester.value}>
              {semester.label}
            </option>
          ))}
        </Select>
      </FilterGroup>

      <ResetButton onClick={resetSearchData} title="" />
    </FiltersWrapper>
  );
};

export default SubscribersFilters;
