import { Checkbox } from '@mui/material';
import CustomDatePicker from 'common-ui/customDatePicker';
import dayjs from 'dayjs';
import { formatDateTime } from 'utils/dateUtils';

import { DataPickerContainer, FilterContainer, Title } from '../MarketingReports.styles';
import { CheckboxWrapper } from '../dailyPayments/DailyPayments.styles';

const Filter = ({ onDateChange, selectedDate, isB2B, onB2BChange, totalAmount }) => {
  return (
    <FilterContainer>
      {selectedDate ? <Title>Հրաժարված բաժանորդներ {totalAmount}</Title> : <div />}
      <DataPickerContainer>
        {selectedDate && (
          <CheckboxWrapper>
            <Checkbox
              checked={!!isB2B}
              onChange={(e) => onB2BChange && onB2BChange(e.target.checked)}
            />
            <p>B2B</p>
          </CheckboxWrapper>
        )}
        <CustomDatePicker
          maxDate={dayjs().subtract(1, 'day')}
          disableFuture={true}
          className="calendar"
          clearable={false}
          value={selectedDate || null}
          onChange={(newDate) => onDateChange(formatDateTime(newDate, true))}
        />
      </DataPickerContainer>
    </FilterContainer>
  );
};
export default Filter;
