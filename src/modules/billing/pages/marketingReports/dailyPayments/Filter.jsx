import { Checkbox } from '@mui/material';
import CustomDatePicker from 'common-ui/customDatePicker';
import dayjs from 'dayjs';
import { formatDateTime } from 'utils/dateUtils';

import { DataPickerContainer, FilterContainer, Title } from '../MarketingReports.styles';
import { CheckboxWrapper } from './DailyPayments.styles';

const Filter = ({ onDateChange, selectedDate, onIsPassive, isPassive, totalAmount }) => {
  return (
    <FilterContainer>
      {selectedDate ? <Title>Օրվա վճարումներ՝ {totalAmount}</Title> : <div />}
      <DataPickerContainer>
        {selectedDate && (
          <CheckboxWrapper>
            <Checkbox
              checked={!!isPassive}
              onChange={(e) => onIsPassive && onIsPassive(e.target.checked)}
            />
            <p>Պասիվ հաճախորդներ</p>
          </CheckboxWrapper>
        )}
        <CustomDatePicker
          disableFuture={true}
          maxDate={dayjs().subtract(1, 'day')}
          className="calendar"
          value={selectedDate || null}
          onChange={(newDate) => onDateChange(formatDateTime(newDate, true))}
        />
      </DataPickerContainer>
    </FilterContainer>
  );
};
export default Filter;
