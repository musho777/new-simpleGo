import CustomDatePicker from 'common-ui/customDatePicker';
import dayjs from 'dayjs';
import { formatDateTime } from 'utils/dateUtils';

import { DataPickerContainer, FilterContainer, Title } from '../MarketingReports.styles';

const Filter = ({ onDateChange, selectedDate, totalAmount }) => {
  return (
    <FilterContainer>
      {selectedDate ? <Title>Ակտիվից պասիվ բաժանորդներ՝ {totalAmount}</Title> : <div />}
      <DataPickerContainer>
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
