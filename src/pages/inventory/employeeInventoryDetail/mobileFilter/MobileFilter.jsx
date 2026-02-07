import { useState } from 'react';

import { useSelector } from 'react-redux';

import CustomDatePicker from 'common-ui/customDatePicker';
import Input from 'common-ui/input';
import { AsyncSelect } from 'common-ui/select';
import { selectCategories } from 'features/inventory/inventorySlice';

import { useEmployeeInventoryDetailParams } from '../useSearchData';
import {
  AsyncSelectContainer,
  DateRangeContainer,
  FilterLabel,
  FormContainer,
  MobileFilterContainer,
  QuantityRangeContainer,
} from './MobileFilter.styles';

const MobileFilter = () => {
  const categories = useSelector(selectCategories);
  const { searchData, setInventorySearchData } = useEmployeeInventoryDetailParams();

  const [search, setSearch] = useState(searchData.search || '');
  const [quantityFrom, setQuantityFrom] = useState(searchData.quantityFrom || '');
  const [quantityTo, setQuantityTo] = useState(searchData.quantityTo || '');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setInventorySearchData({ search: value });
  };

  const handleQuantityFromChange = (e) => {
    const value = e.target.value;
    setQuantityFrom(value);
    setInventorySearchData({ quantityFrom: value });
  };

  const handleQuantityToChange = (e) => {
    const value = e.target.value;
    setQuantityTo(value);
    setInventorySearchData({ quantityTo: value });
  };

  const handleCategoryChange = (selectedOptions) => {
    const categoryIds = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setInventorySearchData({ categoryIds });
  };

  const handleItemChange = (selectedOptions) => {
    const itemIds = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setInventorySearchData({ itemIds });
  };

  const handleProvidedDateFromChange = (date) => {
    setInventorySearchData({ providedDateFrom: date || '' });
  };

  const handleProvidedDateToChange = (date) => {
    setInventorySearchData({ providedDateTo: date || '' });
  };

  const handleExpiryDateFromChange = (date) => {
    setInventorySearchData({ expiryDateFrom: date || '' });
  };

  const handleExpiryDateToChange = (date) => {
    setInventorySearchData({ expiryDateTo: date || '' });
  };

  const loadCategoryOptions = (inputValue) => {
    const filteredOptions = categories
      .filter((category) => category.name.toLowerCase().includes(inputValue.toLowerCase()))
      .map((category) => ({
        value: category.uuid,
        label: category.name,
      }));
    return Promise.resolve(filteredOptions);
  };

  const loadItemOptions = () => {
    return Promise.resolve([]);
  };

  return (
    <MobileFilterContainer>
      <FormContainer>
        <Input
          label="Search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search items..."
          clearable
          onClear={() => {
            setSearch('');
            setInventorySearchData({ search: '' });
          }}
        />

        <AsyncSelectContainer>
          <FilterLabel>Item Category</FilterLabel>
          <AsyncSelect
            isMulti
            loadOptions={loadCategoryOptions}
            defaultOptions
            value={searchData.categoryIds
              .map((id) => {
                const category = categories.find((c) => c.uuid === id);
                return category ? { value: category.uuid, label: category.name } : null;
              })
              .filter(Boolean)}
            onChange={handleCategoryChange}
            placeholder="Select categories..."
            isClearable
          />
        </AsyncSelectContainer>

        <AsyncSelectContainer>
          <FilterLabel>Item Name</FilterLabel>
          <AsyncSelect
            isMulti
            loadOptions={loadItemOptions}
            defaultOptions={[]}
            value={searchData.itemIds.map((id) => ({ value: id, label: id }))}
            onChange={handleItemChange}
            placeholder="Select items..."
            isClearable
          />
        </AsyncSelectContainer>

        <DateRangeContainer>
          <FilterLabel>Provided Date Range</FilterLabel>
          <CustomDatePicker
            label=""
            value={searchData.providedDateFrom}
            onChange={handleProvidedDateFromChange}
            placeholder="From date"
            height="38px"
          />
          <span className="range-separator">to</span>
          <CustomDatePicker
            label=""
            value={searchData.providedDateTo}
            onChange={handleProvidedDateToChange}
            placeholder="To date"
            height="38px"
          />
        </DateRangeContainer>

        <DateRangeContainer>
          <FilterLabel>Expiry Date Range</FilterLabel>
          <CustomDatePicker
            label=""
            value={searchData.expiryDateFrom}
            onChange={handleExpiryDateFromChange}
            placeholder="From date"
            height="38px"
          />
          <span className="range-separator">to</span>
          <CustomDatePicker
            label=""
            value={searchData.expiryDateTo}
            onChange={handleExpiryDateToChange}
            placeholder="To date"
            height="38px"
          />
        </DateRangeContainer>

        <QuantityRangeContainer>
          <FilterLabel>Quantity Range</FilterLabel>
          <Input
            label=""
            value={quantityFrom}
            onChange={handleQuantityFromChange}
            placeholder="From"
            type="number"
          />
          <span className="range-separator">to</span>
          <Input
            label=""
            value={quantityTo}
            onChange={handleQuantityToChange}
            placeholder="To"
            type="number"
          />
        </QuantityRangeContainer>
      </FormContainer>
    </MobileFilterContainer>
  );
};

export default MobileFilter;
