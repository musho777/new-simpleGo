import { useEffect, useState } from 'react';

import Input from 'common-ui/input';
import { EMPLOYEE_RETURN_STATUS } from 'constants/constants';
import useDebounce from 'hooks/useDebounce';
import DatePicker from 'modules/billing/components/datePicker';
import StatusDropdown from 'pages/components/statusDropdown';

import { FilterContainer, Filters, ItemName } from './RequestHistoryTab.styles';

const Filter = ({ searchData, setSearchData }) => {
  const [itemName, setItemName] = useState(searchData.itemName);
  const [activeStatus, setActiveStatus] = useState(searchData.status || 'Status');

  const debouncedItemName = useDebounce(itemName, 500);

  const handleProvidedDateFromChange = ({ from, to }) => {
    if (from) {
      setSearchData({ requestedFromDate: from || from });
    } else {
      setSearchData({ requestedToDate: to || to });
    }
  };

  const handleExpiryDateFromChange = ({ from, to }) => {
    if (from) {
      setSearchData({ returnedFromDate: from || from });
    } else {
      setSearchData({ returnedToDate: to || to });
    }
  };

  const handelChangeStatus = (status) => {
    setActiveStatus(status);
    setSearchData({ status });
  };

  useEffect(() => {
    setSearchData({ itemName: debouncedItemName });
  }, [debouncedItemName]);

  return (
    <FilterContainer>
      <Filters>
        <ItemName>
          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Search by item name"
            className="quantity-input"
          />
        </ItemName>
        <StatusDropdown
          type="status"
          options={EMPLOYEE_RETURN_STATUS}
          onStatusClick={handelChangeStatus}
          activeStatus={activeStatus}
        />
        <DatePicker
          onDateChange={handleProvidedDateFromChange}
          label="Expiry date range"
          height="38px"
          defaultFrom={searchData.expiryFromDate}
          defaultTo={searchData.expiryToDate}
        />
        <DatePicker
          onDateChange={handleExpiryDateFromChange}
          label="Provided date range"
          defaultFrom={searchData.providedDateFrom}
          defaultTo={searchData.providedToDate}
        />
      </Filters>
    </FilterContainer>
  );
};

export default Filter;
