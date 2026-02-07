import { forwardRef, useEffect, useState } from 'react';

import Select, { components } from 'react-select';

import { ErrorText, Icon, Label } from 'common-ui/input/Input.styles';
import errorIcon from 'common-ui/input/assets/error.svg';
import Tooltip from 'common-ui/tooltip';
import Tag from 'pages/components/tag';
import styled from 'styled-components';
import { capitalizeFirstLetter, generateOptions } from 'utils';

import {
  Container,
  RemoveWrapper,
  SelectedCount,
  SelectedItemsContainer,
  customStyles,
} from './Select.styles';
import arrow from './arrow.svg';
import whiteArrow from './whiteArrow.svg';

const CustomSelect = styled(Select)`
  width: 100%;
`;

const CustomSelectComponent = forwardRef(
  (
    {
      $error,
      value,
      onChange,
      onInputChange,
      options,
      tooltip,
      placeholder,
      noOptionsMessage,
      isMulti,
      isClearable,
      label,
      req,
      isWhiteArrow = false,
      hideMultiContainer = false,
      noClearablePadding = false,
      styles = customStyles,
      menuPlacement = 'auto',
      maxMenuHeight,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const selectOptions = generateOptions(options);

    const CustomDropdownIndicator = (props) => {
      const { selectProps } = props;
      const isOpen = selectProps.menuIsOpen;

      useEffect(() => {
        isOpen ? setIsFocused(true) : setIsFocused(false);
      }, [isOpen]);

      return (
        <components.DropdownIndicator {...props}>
          <Icon
            src={isWhiteArrow ? whiteArrow : arrow}
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
        <CustomSelect
          ref={ref}
          menuPlacement={menuPlacement}
          menuShouldFocusOnMount={false}
          menuShouldFocusOnInput={false}
          components={{ DropdownIndicator: CustomDropdownIndicator }}
          value={value ? capitalizeFirstLetter(value) : null}
          onChange={onChange}
          onInputChange={onInputChange}
          options={selectOptions}
          isMulti={isMulti}
          placeholder={placeholder || 'Select value ...'}
          styles={{
            ...styles,
            control: (provided, state) => {
              const baseControl = styles.control(provided, {
                ...state,
                selectProps: { ...state.selectProps, $error },
              });

              if (noClearablePadding) {
                return {
                  ...baseControl,
                  padding: '0',
                };
              }

              return baseControl;
            },
            multiValue: (provided, state) => {
              const { data } = state;
              return {
                ...provided,
                backgroundColor: data.canDelete ? '#2D6CDF1A' : '#6C757D14',
                pointerEvents: data.canDelete ? 'auto' : 'none',
                padding: '2px 8px',
                display: 'none',
              };
            },
            multiValueRemove: (provided, state) => {
              const { data } = state;
              if (!data.canDelete) {
                return {
                  ...provided,
                  display: 'none',
                };
              }
              return provided;
            },
            menuList: (provided, state) => ({
              ...(styles.menuList ? styles.menuList(provided, state) : provided),
              ...(maxMenuHeight && { maxHeight: maxMenuHeight }),
            }),
          }}
          noOptionsMessage={() => noOptionsMessage || 'No options available'}
          isClearable={isClearable}
          {...props}
        />
        {$error?.length && (
          <ErrorText>
            <Icon src={errorIcon} alt="error" />
            {$error}
          </ErrorText>
        )}

        {isMulti && !hideMultiContainer && (
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

export default CustomSelectComponent;
