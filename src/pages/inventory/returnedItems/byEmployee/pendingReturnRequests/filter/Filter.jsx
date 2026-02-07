import { useEffect } from 'react';

import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import useDebounce from 'hooks/useDebounce';

import { FilterContainer, Filters, ItemName } from './Filter.styles';

const Filter = ({ searchData, setSearchData }) => {
  const debouncedEmployeeName = useDebounce(searchData.employeeName, 300);
  const debouncedItemName = useDebounce(searchData.itemName, 300);

  useEffect(() => {
    setSearchData({ employeeName: debouncedEmployeeName });
  }, [debouncedEmployeeName]);

  useEffect(() => {
    setSearchData({ itemName: debouncedItemName });
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
        <div>
          <CustomDatePicker
            value={searchData.returnedFromDate}
            onChange={(date) => setSearchData({ returnedFromDate: date })}
            placeholder="Request date"
          />
        </div>
      </Filters>
    </FilterContainer>
  );
};

export default Filter;
