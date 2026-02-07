import ResetButton from 'common-ui/resetButton';

import { usePaymentReportSearchParams } from '../usePaymentReportSearchParams';
import {
  FilterGroup,
  FilterLabel,
  FiltersWrapper,
  Select,
  Separator,
} from './PaymentReportFilters.styles';

const MONTHS = [
  { value: 1, label: 'Հունվար' },
  { value: 2, label: 'Փետրվար' },
  { value: 3, label: 'Մարտ' },
  { value: 4, label: 'Ապրիլ' },
  { value: 5, label: 'Մայիս' },
  { value: 6, label: 'Հունիս' },
  { value: 7, label: 'Հուլիս' },
  { value: 8, label: 'Օգոստոս' },
  { value: 9, label: 'Սեպտեմբեր' },
  { value: 10, label: 'Հոկտեմբեր' },
  { value: 11, label: 'Նոյեմբեր' },
  { value: 12, label: 'Դեկտեմբեր' },
];

const YEARS = [2023, 2024, 2025];

const PaymentReportFilters = () => {
  const { searchData, setPaymentReportSearchData, resetSearchData } =
    usePaymentReportSearchParams();

  const handleChange = (key, value) => {
    setPaymentReportSearchData({ [key]: value === '' ? '' : Number(value) });
  };

  const fromYears =
    searchData.toYear !== '' ? YEARS.filter((y) => y <= searchData.toYear) : YEARS;

  const toYears =
    searchData.fromYear !== '' ? YEARS.filter((y) => y >= searchData.fromYear) : YEARS;

  const sameYear = searchData.fromYear !== '' && searchData.fromYear === searchData.toYear;

  const fromMonths =
    sameYear && searchData.toMonth !== ''
      ? MONTHS.filter((m) => m.value <= searchData.toMonth)
      : MONTHS;

  const toMonths =
    sameYear && searchData.fromMonth !== ''
      ? MONTHS.filter((m) => m.value >= searchData.fromMonth)
      : MONTHS;

  return (
    <FiltersWrapper>
      <FilterGroup>
        <FilterLabel>{'Սկիզբ'}</FilterLabel>
        <Select
          value={searchData.fromYear}
          onChange={(e) => handleChange('fromYear', e.target.value)}
        >
          <option value="">{'Տարի'}</option>
          {fromYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Select
          value={searchData.fromMonth}
          onChange={(e) => handleChange('fromMonth', e.target.value)}
        >
          <option value="">{'Ամիս'}</option>
          {fromMonths.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </Select>
      </FilterGroup>

      <Separator>{'—'}</Separator>

      <FilterGroup>
        <FilterLabel>{'Ավարտ'}</FilterLabel>
        <Select
          value={searchData.toYear}
          onChange={(e) => handleChange('toYear', e.target.value)}
        >
          <option value="">{'Տարի'}</option>
          {toYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Select
          value={searchData.toMonth}
          onChange={(e) => handleChange('toMonth', e.target.value)}
        >
          <option value="">{'Ամիս'}</option>
          {toMonths.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </Select>
      </FilterGroup>

      <ResetButton onClick={resetSearchData} title="" />
    </FiltersWrapper>
  );
};

export default PaymentReportFilters;
