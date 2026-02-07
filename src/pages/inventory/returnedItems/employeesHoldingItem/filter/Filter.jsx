import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AsyncSelect } from 'common-ui/select';
import {
  getEmployeesHoldingItem,
  getReturnRequestCategories,
  getReturnRequestItems,
} from 'features/inventory/inventoryActions';
import {
  resetEmployeesHoldingItem,
  selectReturnRequestCategories,
  selectReturnRequestItems,
} from 'features/inventory/inventorySlice';
import { generateOptions } from 'utils';

import { AsyncSelectWrapper, FilterContainer, FilterRow } from './Filter.styles';

const Filter = ({ onGetData }) => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState({
    offset: 0,
    limit: 100000,
  });
  const categories = useSelector(selectReturnRequestCategories);
  const items = useSelector(selectReturnRequestItems);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCategoryChange = (category) => {
    dispatch(resetEmployeesHoldingItem());
    setSelectedCategory(category);
    if (category) {
      dispatch(getReturnRequestItems({ categoryUuid: category.value }));
      setSelectedItem(null);
    }
  };

  const handleItemChange = (item) => {
    if (item?.value) {
      setSelectedItem(item);
      onGetData(item?.value, selectedCategory);
      dispatch(getEmployeesHoldingItem({ itemTypeUuid: item?.value }));
    } else {
      dispatch(resetEmployeesHoldingItem());
      setSelectedItem(null);
    }
  };

  const loadCategoryOptions = async (searchTerm) => {
    let data = await dispatch(
      getReturnRequestCategories({ ...searchData, search: searchTerm })
    );
    return generateOptions(data.payload);
  };

  const loadItemOptions = async (searchTerm) => {
    if (selectedCategory) {
      let data = dispatch(
        getReturnRequestItems({
          ...searchData,
          categoryUuid: selectedCategory.value,
          params: { search: searchTerm },
        })
      );
      return generateOptions(data.payload);
    }
  };
  return (
    <FilterContainer>
      <FilterRow>
        <AsyncSelectWrapper>
          <AsyncSelect
            placeholder="Select Category"
            label="‎"
            value={selectedCategory}
            onChange={handleCategoryChange}
            loadOptions={loadCategoryOptions}
            defaultOptions={generateOptions(categories)}
            cacheOptions={false}
            isClearable={!selectedItem?.value}
            onMenuOpen={() => dispatch(getReturnRequestCategories(searchData))}
          />

          <AsyncSelect
            placeholder="Select Item"
            value={selectedItem}
            onChange={handleItemChange}
            loadOptions={loadItemOptions}
            onMenuOpen={() =>
              dispatch(
                getReturnRequestItems({
                  ...searchData,
                  categoryUuid: selectedCategory.value,
                })
              )
            }
            label="‎"
            defaultOptions={generateOptions(items)}
            isClearable={true}
            cacheOptions={false}
            isDisabled={!selectedCategory}
          />
        </AsyncSelectWrapper>
        {/* 
        <ButtonWrapper>
          <Button
            secondary
            onClick={handleGetData}
            disabled={!selectedItem || loading.employeesHoldingItem}
            loading={loading.employeesHoldingItem}
          >
            Request item back
          </Button>
        </ButtonWrapper> */}
      </FilterRow>
    </FilterContainer>
  );
};

export default Filter;
