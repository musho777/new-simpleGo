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

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

const SubscribersFilters = () => {
  const { searchData, setSubscribersSearchData, resetSearchData } =
    useSubscribersSearchParams();

  const handleChange = (key, value) => {
    setSubscribersSearchData({ [key]: Number(value) });
  };

  return (
    <FiltersWrapper>
      <FilterGroup>
        <FilterLabel>Սկիզբ</FilterLabel>
        <Select
          value={searchData.fromYear}
          onChange={(e) => handleChange('fromYear', e.target.value)}
        >
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Select
          value={searchData.fromHalfYear}
          onChange={(e) => handleChange('fromHalfYear', e.target.value)}
        >
          {SEMESTERS.map((semester) => (
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
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Select
          value={searchData.toHalfYear}
          onChange={(e) => handleChange('toHalfYear', e.target.value)}
        >
          {SEMESTERS.map((semester) => (
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
