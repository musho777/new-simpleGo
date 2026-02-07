import React, { useMemo } from 'react';

import {
  CheckboxContainer,
  DropdownSearch,
  OptionsContainer,
  StyledInput,
  StyledLabel,
  StyledOption,
} from './Checkbox.styles';
import search from './search.svg';

const Checkbox = ({
  options,
  selectedOptions,
  onSelect,
  allTitle = 'All',
  id,
  searchQuery,
  handleSearch,
  showSearch = false,
}) => {
  const allSelected = useMemo(() => {
    return selectedOptions?.length === 0 ? 'all' : '';
  }, [selectedOptions]);

  return (
    <OptionsContainer>
      {showSearch && (
        <DropdownSearch
          id={id}
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
          $icon={search}
        />
      )}
      <StyledOption key="all">
        <CheckboxContainer>
          <StyledInput
            type="checkbox"
            id="option-all"
            checked={allSelected}
            onChange={() => onSelect('all')}
          />
          <StyledLabel htmlFor="option-all" className={allSelected ? 'checked' : ''}>
            {allTitle}
          </StyledLabel>
        </CheckboxContainer>
      </StyledOption>
      {options?.map((option) => (
        <StyledOption key={option.id}>
          <CheckboxContainer>
            <StyledInput
              type="checkbox"
              id={`option-${option.id}`}
              checked={selectedOptions.some((selected) => selected.id === option.id)}
              onChange={() => onSelect(option)}
            />
            <StyledLabel
              htmlFor={`option-${option.id}`}
              className={
                selectedOptions.some((selected) => selected.id === option.id) ? 'checked' : ''
              }
            >
              {option.label}
            </StyledLabel>
          </CheckboxContainer>
        </StyledOption>
      ))}
    </OptionsContainer>
  );
};

export default Checkbox;
