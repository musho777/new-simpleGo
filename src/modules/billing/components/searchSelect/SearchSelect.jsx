import React, { useEffect, useMemo, useRef, useState } from 'react';

import search from '../../assets/search.svg';
import select from '../../assets/select.svg';
import selected from '../../assets/selected.svg';
import {
  Checkbox,
  DropdownContainer,
  DropdownHeader,
  DropdownHeaderContent,
  DropdownItem,
  DropdownList,
  DropdownSearch,
  DropdownSearchWrapper,
  SelectIcon,
} from './SearchSelect.styles';

const SearchSelect = ({
  options,
  onSelect,
  title,
  allTitle = 'All',
  id,
  resetOptions,
  isSingleSelect = false,
  className,
  defaultValue = [],
  width,
}) => {
  const transformedDefaultValue = defaultValue.map((item) => ({
    uuid: item,
    name: item,
  }));
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(transformedDefaultValue);
  const [isSelected, setIsSelected] = useState(false);

  const allSelected = useMemo(() => {
    return selectedOptions.length === 0 ? allTitle : '';
  }, [selectedOptions]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setIsSelected(!isSelected);
  };

  const dropdownRef = useRef(null);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOptionClick = (option) => {
    let updatedSelection;

    if (isSingleSelect) {
      if (option === allTitle) {
        updatedSelection = [];
      } else {
        updatedSelection = selectedOptions.some((selected) => selected.uuid === option.uuid)
          ? []
          : [option];
      }
    } else {
      if (option === allTitle) {
        updatedSelection = [];
      } else {
        const isAlreadySelected = selectedOptions.some(
          (selected) => selected.uuid === option.uuid
        );
        if (isAlreadySelected) {
          updatedSelection = selectedOptions.filter(
            (selected) => selected.uuid !== option.uuid
          );
        } else {
          updatedSelection = [...selectedOptions, option];
        }
      }
    }

    setSelectedOptions(updatedSelection);
    onSelect(updatedSelection.map((r) => r.uuid));
  };

  const filteredOptions = options.filter((option) =>
    option.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displaySelectedOptions = () => {
    if (selectedOptions.length === 0) {
      return `${title}`;
    } else if (selectedOptions.length === 1) {
      return selectedOptions[0].name;
    } else {
      return `${title} (${selectedOptions.length})`;
    }
  };

  useEffect(() => {
    if (resetOptions?.length === 0) {
      setSelectedOptions([]);
    }
  }, [resetOptions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsSelected(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (defaultValue?.length > 0) {
      setSelectedOptions(transformedDefaultValue);
    }
  }, [defaultValue]);

  return (
    <DropdownContainer ref={dropdownRef} className={className} $width={width}>
      <DropdownHeader
        $isSelected={isSelected || !!selectedOptions.length}
        onClick={toggleDropdown}
      >
        <DropdownHeaderContent>{displaySelectedOptions()}</DropdownHeaderContent>
        <SelectIcon src={isSelected ? selected : select} alt="Select Icon" />
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          <DropdownSearchWrapper>
            <DropdownSearch
              id={id}
              type="text"
              $isSelected={isSelected}
              placeholder="Որոնում"
              value={searchQuery}
              onChange={handleSearch}
              $icon={search}
            />
          </DropdownSearchWrapper>
          {!isSingleSelect && (
            <DropdownItem key="All">
              <Checkbox
                type="checkbox"
                checked={allSelected === allTitle}
                onChange={() => handleOptionClick(allTitle)}
              />
              {allTitle}
            </DropdownItem>
          )}
          {filteredOptions.map((option) => (
            <DropdownItem key={option.uuid}>
              <Checkbox
                type="checkbox"
                checked={selectedOptions.some((selected) => selected.uuid === option.uuid)}
                onChange={() => handleOptionClick(option)}
              />
              {option.name}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default SearchSelect;
