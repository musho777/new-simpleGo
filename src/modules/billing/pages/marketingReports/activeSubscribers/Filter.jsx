import { useDispatch, useSelector } from 'react-redux';

import CustomDatePicker from 'common-ui/customDatePicker';
import dayjs from 'dayjs';
import {
  selectActivesCountByDateSearchData,
  setActivesCountByDateSearchData,
} from 'modules/billing/features/main/mainSlice';
import { formatDateTime, getPreviousDate } from 'utils/dateUtils';

import { DataPickerContainer, FilterContainer, Title } from '../MarketingReports.styles';

const Filter = () => {
  const dispatch = useDispatch();
  const searchData = useSelector(selectActivesCountByDateSearchData);

  return (
    <FilterContainer>
      <Title>Ակտիվ բաժանորդներ</Title>
      <DataPickerContainer>
        <CustomDatePicker
          disableFuture={true}
          maxDate={dayjs().subtract(1, 'day')}
          clearable={false}
          className="calendar"
          value={searchData?.date || getPreviousDate()}
          onChange={(newDate) =>
            dispatch(setActivesCountByDateSearchData({ date: formatDateTime(newDate, true) }))
          }
        />
      </DataPickerContainer>
    </FilterContainer>
  );
};
export default Filter;
