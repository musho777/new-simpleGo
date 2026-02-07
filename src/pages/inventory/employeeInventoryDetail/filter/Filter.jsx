import { useEffect, useState } from 'react';

import ApiClient from 'api/axiosClient';
import Input from 'common-ui/input';
import ResetButton from 'common-ui/resetButton';
import { AsyncSelect } from 'common-ui/select';
import useDebounce from 'hooks/useDebounce';
import DatePicker from 'modules/billing/components/datePicker';
import { generateOptions } from 'utils';

import {
  DatePickerBox,
  DatePickerWrapper,
  FilterContainer,
  FilterLabel,
  Filters,
  InputWrapper,
  ItemName,
  QuantityRangeContainer,
  ResetButtonWrapper,
} from './Filter.styles';

const Filter = ({ searchData, setInventorySearchData, resetSearchData }) => {
  const [minQuantity, setMinQuantity] = useState(searchData.minQuantity || '');
  const [itemName, setItemName] = useState(searchData.itemName);
  const [maxQuantity, setMaxQuantity] = useState(searchData.maxQuantity || '');
  const [categories, setCategories] = useState([]);
  const [loadingMoreCategories, setLoadingMoreCategories] = useState(false);

  const [categorySearchTerm, setCategorySearchTerm] = useState('');

  const [categoryOffset, setCategoryOffset] = useState(0);

  const [hasMoreCategories, setHasMoreCategories] = useState(true);
  const debouncedItemName = useDebounce(itemName, 500);
  const debouncedQuantityFrom = useDebounce(minQuantity, 500);
  const debouncedQuantityTo = useDebounce(maxQuantity, 500);

  const handleResetAllFilters = () => {
    setItemName('');
    setMaxQuantity('');
    setMinQuantity('');
    resetSearchData();
  };
  const handleCategoryChange = (selectedOptions) => {
    setInventorySearchData({ categoryId: selectedOptions?.value });
  };

  const handleProvidedDateFromChange = ({ from, to }) => {
    if (from) {
      setInventorySearchData({ expiryFromDate: from || from });
    } else {
      setInventorySearchData({ expiryToDate: to || to });
    }
  };

  const handleExpiryDateFromChange = ({ from, to }) => {
    if (from) {
      setInventorySearchData({ providedFromDate: from || from });
    } else {
      setInventorySearchData({ providedToDate: to || to });
    }
  };

  const handleCategoryMenuScrollToBottom = async () => {
    if (!hasMoreCategories || loadingMoreCategories) return;

    setLoadingMoreCategories(true);
    const newOffset = categoryOffset + 10;
    setCategoryOffset(newOffset);
    await getCategoryOptions(categorySearchTerm, newOffset, true);
    setLoadingMoreCategories(false);
  };

  const getCategoryOptions = async (searchTerm, offset = 0, append = false) => {
    try {
      const limit = 10;
      const url = searchTerm
        ? `/inventory/category?limit=${limit}&offset=${offset}&name=${encodeURIComponent(searchTerm)}`
        : `/inventory/category?limit=${limit}&offset=${offset}`;

      const response = await ApiClient.get(url);
      const newOptions = generateOptions(response.categories || []);
      if (append) {
        const updatedOptions = [...categories, ...newOptions];
        setCategories(updatedOptions);
        setHasMoreCategories(newOptions.length === limit);
        return updatedOptions;
      } else {
        setCategories(newOptions);
        setHasMoreCategories(newOptions.length === limit);
        setCategoryOffset(0);
        setCategorySearchTerm(searchTerm || '');
        return newOptions;
      }
    } catch (error) {
      console.error('Error fetching options:', error);
      return append ? categories : [];
    }
  };

  useEffect(() => {
    setInventorySearchData({ itemName: debouncedItemName });
  }, [debouncedItemName]);

  useEffect(() => {
    setInventorySearchData({ minQuantity: debouncedQuantityFrom });
  }, [debouncedQuantityFrom]);

  useEffect(() => {
    setInventorySearchData({ maxQuantity: debouncedQuantityTo });
  }, [debouncedQuantityTo]);

  useEffect(() => {
    if (searchData.categoryId) {
      getCategoryOptions();
    }
  }, [searchData.categoryId]);
  return (
    <FilterContainer>
      <Filters>
        <AsyncSelect
          menuPlacement="bottom"
          className="payroll-department-filter"
          minHeight="38px"
          label="‎"
          placeholder="Select category"
          loadOptions={(searchTerm) => getCategoryOptions(searchTerm)}
          onMenuOpen={() => getCategoryOptions()}
          value={categories.find((opt) => opt.value === searchData.categoryId) || null}
          defaultOptions={categories}
          onChange={(selectedCategory) => handleCategoryChange(selectedCategory)}
          onMenuScrollToBottom={handleCategoryMenuScrollToBottom}
          cacheOptions={false}
          isClearable={true}
        />
        <ItemName>
          <Input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name"
            label="‎"
            className="quantity-input"
          />
        </ItemName>
        <DatePickerBox>
          <DatePickerWrapper>
            <FilterLabel>Expiry date range</FilterLabel>
            <DatePicker
              onDateChange={handleProvidedDateFromChange}
              label="Expiry date range"
              height="38px"
              defaultFrom={searchData.expiryFromDate}
              defaultTo={searchData.expiryToDate}
            />
          </DatePickerWrapper>
          <DatePickerWrapper>
            <FilterLabel>Provided date range</FilterLabel>
            <DatePicker
              onDateChange={handleExpiryDateFromChange}
              label="Provided date range"
              defaultFrom={searchData.providedFromDate}
              defaultTo={searchData.providedToDate}
            />
          </DatePickerWrapper>
        </DatePickerBox>

        <QuantityRangeContainer>
          <FilterLabel>Quantity Range</FilterLabel>
          <InputWrapper>
            <Input
              value={minQuantity}
              onChange={(e) => setMinQuantity(e.target.value)}
              placeholder="From"
              type="number"
              className="quantity-input"
            />
            <Input
              value={maxQuantity}
              onChange={(e) => setMaxQuantity(e.target.value)}
              placeholder="To"
              type="number"
              className="quantity-input"
            />
          </InputWrapper>
        </QuantityRangeContainer>
      </Filters>
      <ResetButtonWrapper>
        <ResetButton onClick={() => handleResetAllFilters()} />
      </ResetButtonWrapper>
    </FilterContainer>
  );
};

export default Filter;
