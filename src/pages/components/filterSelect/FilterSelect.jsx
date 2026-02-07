import React, { useEffect, useMemo, useRef, useState } from 'react';

import Checkbox from 'common-ui/checkbox';

import {
  Icon,
  IconContainer,
  SelectContainer,
  SelectedValue,
  ViewTitle,
} from './FilterSelect.styles';
import ArrowActive from './arrow-active.svg';
import ArrowDown from './arrow.svg';

const FilterSelect = ({
  options,
  onSelect,
  resetRegions,
  title,
  icon,
  allTitle,
  id,
  defaultValue = [],
  showSearch,
  isActive = false,
}) => {
  const [selectedRegions, setSelectedRegions] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const selectRef = useRef(null);

  const normalizeOption = (option) => ({
    id: option.uuid || option.value,
    label: option.name || option.label,
    isTeam: option.isTeam,
  });

  const handleSelect = (region) => {
    let updatedSelectedRegions;

    if (region === 'all') {
      updatedSelectedRegions = [];
    } else {
      const isAlreadySelected = selectedRegions.some((selected) => selected.id === region.id);
      if (isAlreadySelected) {
        updatedSelectedRegions = selectedRegions.filter(
          (selected) => selected.id !== region.id
        );
      } else {
        updatedSelectedRegions = [...selectedRegions, region];
      }
    }

    setSelectedRegions(updatedSelectedRegions);
    onSelect(
      updatedSelectedRegions.map((r) => r.id),
      updatedSelectedRegions
    );
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const displaySelectedRegions = () => {
    if (selectedRegions.length === 0) {
      return `${title}`;
    } else {
      return `${title} (${selectedRegions.length})`;
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOptions = useMemo(() => {
    const selectedIds = new Set(selectedRegions.map((r) => r.id));

    return options
      .filter((option) =>
        (option.name || option.label)?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const aSelected = selectedIds.has(a.uuid || a.value);
        const bSelected = selectedIds.has(b.uuid || b.value);

        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;

        const labelA = (a.name || a.label)?.toLowerCase();
        const labelB = (b.name || b.label)?.toLowerCase();
        return labelA.localeCompare(labelB);
      });
  }, [searchQuery, options, selectedRegions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);

  useEffect(() => {
    if (resetRegions?.length === 0) {
      setSelectedRegions([]);
    }
  }, [resetRegions]);

  useEffect(() => {
    if (defaultValue?.length > 0) {
      setSelectedRegions(defaultValue);
    }
  }, [defaultValue]);

  return (
    <SelectContainer ref={selectRef}>
      <SelectedValue onClick={toggleDropdown} $isOpen={isOpen} $isActive={isActive}>
        <ViewTitle>
          {icon && <Icon src={icon} alt="icon" />}
          {displaySelectedRegions()}
        </ViewTitle>
        <IconContainer
          $isOpen={isOpen}
          src={isActive ? ArrowActive : ArrowDown}
          alt="dropdown arrow"
        />
      </SelectedValue>

      {isOpen && (
        <Checkbox
          id={id}
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          options={filteredOptions.map(normalizeOption)}
          selectedOptions={selectedRegions}
          onSelect={handleSelect}
          allTitle={allTitle}
          showSearch={showSearch}
        />
      )}
    </SelectContainer>
  );
};

export default FilterSelect;
