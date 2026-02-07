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

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

const PaymentReportFilters = () => {
  const { searchData, setPaymentReportSearchData, resetSearchData } =
    usePaymentReportSearchParams();

  const handleChange = (key, value) => {
    setPaymentReportSearchData({ [key]: Number(value) });
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
          value={searchData.fromMonth}
          onChange={(e) => handleChange('fromMonth', e.target.value)}
        >
          {MONTHS.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
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
          value={searchData.toMonth}
          onChange={(e) => handleChange('toMonth', e.target.value)}
        >
          {MONTHS.map((month) => (
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
