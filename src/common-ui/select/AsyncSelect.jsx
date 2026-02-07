import React, { forwardRef, useEffect, useState } from 'react';

import { components } from 'react-select';
import AsyncSelect from 'react-select/async';

import { ErrorText, Icon, Label } from 'common-ui/input/Input.styles';
import errorIcon from 'common-ui/input/assets/error.svg';
import Tooltip from 'common-ui/tooltip';
import Tag from 'pages/components/tag';
import styled from 'styled-components';
import { capitalizeFirstLetter } from 'utils';

import {
  Container,
  RemoveWrapper,
  SelectedCount,
  SelectedItemsContainer,
  customStyles,
} from './Select.styles';
import arrow from './arrow.svg';

const CustomAsyncSelect = styled(AsyncSelect)`
  width: 100%;
`;

const CustomAsyncSelectComponent = forwardRef(
  (
    {
      label,
      value,
      $error,
      defaultValue,
      defaultOptions,
      tooltip,
      onChange,
      onInputChange,
      loadOptions,
      showItemsContainer = true,
      loadingMessage = 'Loading...',
      isMulti,
      isLoading,
      isClearable = false,
      placeholder,
      req,
      menuPlacement = 'auto',
      styles = customStyles,
      onMenuScrollToBottom,
      maxMenuHeight,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const CustomDropdownIndicator = (props) => {
      const { selectProps } = props;
      const isOpen = selectProps.menuIsOpen;

      useEffect(() => {
        isOpen ? setIsFocused(true) : setIsFocused(false);
      }, [isOpen]);

      return (
        <components.DropdownIndicator {...props}>
          <Icon
            src={arrow}
            alt="arrow"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-in-out',
            }}
          />
        </components.DropdownIndicator>
      );
    };

    const handleRemove = (removedItem) => {
      const updatedValue = value.filter((item) => item.value !== removedItem.value);
      onChange(updatedValue);
    };

    const handleRemoveAll = () => {
      onChange([]);
    };

    return (
      <Container className={props.className}>
        <Label>
          {label}
          {tooltip && <Tooltip text={tooltip} />}
          {req && <span>*</span>}
        </Label>
        {isMulti && value?.length > 0 && !isFocused && (
          <SelectedCount>({value?.length}) Selected</SelectedCount>
        )}

        <CustomAsyncSelect
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          menuPlacement={menuPlacement}
          menuShouldFocusOnMount={false}
          value={capitalizeFirstLetter(value)}
          components={{
            DropdownIndicator: CustomDropdownIndicator,
          }}
          onMenuScrollToBottom={onMenuScrollToBottom}
          defaultValue={defaultValue}
          defaultOptions={defaultOptions}
          onChange={onChange}
          onInputChange={onInputChange}
          loadOptions={loadOptions}
          loadingMessage={() => loadingMessage}
          isMulti={isMulti}
          isLoading={isLoading}
          isClearable={isClearable}
          placeholder={placeholder || 'Select value ...'}
          styles={{
            ...styles,
            control: (provided, state) =>
              styles.control(provided, {
                ...state,
                selectProps: { ...state.selectProps, $error },
              }),
            menuList: (provided, state) => ({
              ...(styles.menuList ? styles.menuList(provided, state) : provided),
              ...(maxMenuHeight && { maxHeight: maxMenuHeight }),
            }),
          }}
          {...props}
        />
        {$error?.length > 0 && (
          <ErrorText>
            <Icon src={errorIcon} alt="error" />
            {$error}
          </ErrorText>
        )}

        {isMulti && showItemsContainer && (
          <SelectedItemsContainer>
            {value?.length > 0 && (
              <RemoveWrapper>
                <div onClick={handleRemoveAll}>
                  <Tag type="statuses" variant="Remove all x" />
                </div>
              </RemoveWrapper>
            )}
            {value?.map((item) => (
              <div key={item.value} className="tag">
                {item.label}
                <span className="remove" onClick={() => handleRemove(item)}>
                  X
                </span>
              </div>
            ))}
          </SelectedItemsContainer>
        )}
      </Container>
    );
  }
);

export default CustomAsyncSelectComponent;
