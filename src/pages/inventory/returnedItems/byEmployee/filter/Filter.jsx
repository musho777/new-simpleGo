import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { BadgeButton } from 'common-ui/badgeButton/BadgeButton';
import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import { EMPLOYEE_RETURN_STATUS } from 'constants/constants';
import useDebounce from 'hooks/useDebounce';
import StatusDropdown from 'pages/components/statusDropdown';

import { FilterContainer, Filters, ItemName } from './Filter.styles';

const Filter = ({ searchData, setSearchData }) => {
  const navigate = useNavigate();
  const debouncedByEmployeeName = useDebounce(searchData.employeeName, 300);
  const debouncedItemName = useDebounce(searchData.itemName, 300);

  const handleNavigate = () => {
    navigate('/inventory/returnedItems/employee/pending');
  };

  useEffect(() => {
    if (debouncedByEmployeeName !== searchData.employeeName) {
      setSearchData({ employeeName: debouncedByEmployeeName });
    }
  }, [debouncedByEmployeeName]);

  useEffect(() => {
    if (debouncedItemName !== searchData.itemName) {
      setSearchData({ itemName: debouncedItemName });
    }
  }, [debouncedItemName]);

  return (
    <FilterContainer>
      <Filters>
        <ItemName>
          <Input
            value={searchData.employeeName}
            onChange={(e) => setSearchData({ employeeName: e.target.value })}
            placeholder="Search by employee name"
            className="quantity-input"
          />
        </ItemName>
        <ItemName>
          <Input
            value={searchData.itemName}
            onChange={(e) => setSearchData({ itemName: e.target.value })}
            placeholder="Item name"
            className="quantity-input"
          />
        </ItemName>

        <StatusDropdown
          type="status"
          options={EMPLOYEE_RETURN_STATUS}
          onStatusClick={(status) => setSearchData({ status })}
          activeStatus={searchData.status}
        />
        <div>
          <CustomDatePicker
            value={searchData.returnedToDate}
            onChange={(date) => setSearchData({ returnedToDate: date })}
            placeholder="Returned to date"
          />
        </div>
      </Filters>

      <BadgeButton onPress={handleNavigate} title="New Return Requests" count={0} />
    </FilterContainer>
  );
};

export default Filter;
