import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import useDebounce from 'hooks/useDebounce';

import Select from './Select';

const TypeToSearchSelect = forwardRef(
  (
    {
      label,
      value,
      $error,
      onChange,
      loadOptions,
      debounceDelay = 500,
      isClearable = true,
      placeholder = 'Type to search...',
      isDisabled,
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isUserTyping = useRef(false);
    const hasSelectedValue = useRef(false);

    const debouncedInputValue = useDebounce(inputValue, debounceDelay);

    const handleInputChange = useCallback((newValue, actionMeta) => {
      if (actionMeta.action === 'input-change') {
        isUserTyping.current = true;
        hasSelectedValue.current = false;
        setInputValue(newValue);
      } else if (actionMeta.action === 'menu-close' || actionMeta.action === 'input-blur') {
        isUserTyping.current = false;
      }
    }, []);

    useEffect(() => {
      const fetchOptions = async () => {
        if (!isUserTyping.current || !debouncedInputValue || debouncedInputValue.length < 1) {
          if (!value) {
            setOptions([]);
          }
          setMenuIsOpen(false);
          setIsLoading(false);
          return;
        }

        if (!loadOptions) {
          return;
        }

        setIsLoading(true);

        try {
          const results = await loadOptions(debouncedInputValue);

          setOptions(results || []);
          setMenuIsOpen(true);
        } catch (error) {
          console.error('Error loading options:', error);
          setOptions([]);
          setMenuIsOpen(false);
        } finally {
          setIsLoading(false);
        }
      };

      fetchOptions();
    }, [debouncedInputValue, loadOptions, value]);

    const handleChange = useCallback(
      (newValue, actionMeta) => {
        hasSelectedValue.current = true;
        setMenuIsOpen(false);
        isUserTyping.current = false;
        setInputValue('');
        setOptions([]);

        if (onChange) {
          onChange(newValue, actionMeta);
        }
      },
      [onChange]
    );

    const handleFocus = useCallback(() => {
      setMenuIsOpen(false);
    }, []);

    const handleBlur = useCallback(() => {
      isUserTyping.current = false;
      setTimeout(() => {
        if (!hasSelectedValue.current) {
          setMenuIsOpen(false);
          setOptions([]);
          setInputValue('');
        }
      }, 200);
    }, []);

    const handleMenuClose = useCallback(() => {
      setMenuIsOpen(false);
      isUserTyping.current = false;
      setOptions([]);
      setInputValue('');
    }, []);

    useEffect(() => {
      if (value) {
        setMenuIsOpen(false);
        setInputValue('');
        setOptions([]);
        isUserTyping.current = false;
        hasSelectedValue.current = false;
      } else {
        setOptions([]);
      }
    }, [value]);
    return (
      <Select
        ref={ref}
        label={label}
        value={value}
        inputValue={inputValue}
        $error={$error}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMenuClose={handleMenuClose}
        menuIsOpen={menuIsOpen}
        options={options}
        isClearable={isClearable}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isLoading={isLoading}
        blurInputOnSelect={true}
        filterOption={() => true}
        components={{
          DropdownIndicator: () => null,
        }}
        {...props}
      />
    );
  }
);

TypeToSearchSelect.displayName = 'TypeToSearchSelect';

export default TypeToSearchSelect;
