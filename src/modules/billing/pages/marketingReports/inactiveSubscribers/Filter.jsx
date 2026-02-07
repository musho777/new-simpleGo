import CustomDatePicker from 'common-ui/customDatePicker';
import dayjs from 'dayjs';
import { formatDateTime } from 'utils/dateUtils';

import { DataPickerContainer, FilterContainer, Title } from '../MarketingReports.styles';

const Filter = ({ onDateChange, selectedDate, totalAmount }) => {
  return (
    <FilterContainer>
      {selectedDate ? <Title>Պասիվ բաժանորդներ՝{totalAmount}</Title> : <div />}
      <DataPickerContainer>
        <CustomDatePicker
          disableFuture={true}
          clearable={false}
          className="calendar"
          maxDate={dayjs().subtract(1, 'day')}
          value={selectedDate || null}
          onChange={(newDate) => onDateChange(formatDateTime(newDate, true))}
        />
      </DataPickerContainer>
    </FilterContainer>
  );
};
export default Filter;
