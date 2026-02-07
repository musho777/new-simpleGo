import React from 'react';

import { ErrorText, Icon, Label } from 'common-ui/input/Input.styles';
import errorIcon from 'common-ui/input/assets/error.svg';
import styled from 'styled-components';

const NumberInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || '100%'};
  position: relative;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  height: ${(props) => props.height || '44px'};
  padding: 0 50px 0 10px;
  border: 1px solid ${(props) => (props.error ? '#E63946' : '#D4D8DD')};
  border-radius: 10px;
  background: #fff;
  font-size: 12px;
  color: #212529;
  font-weight: 500;
  outline: none;

  &:focus {
    border-color: #2d6cdf;
  }

  &::placeholder {
    color: #6c757d;
  }

  /* Hide native number input arrows */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const ArrowButtonsContainer = styled.div`
  position: absolute;
  right: 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ArrowButton = styled.button`
  width: 20px;
  height: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #6c757d;
  border-radius: 2px;

  &:hover {
    background-color: #f8f9fa;
    color: #2d6cdf;
  }

  &:active {
    background-color: #e9ecef;
  }
`;

const NumberInput = React.forwardRef(
  (
    {
      label,
      placeholder,
      value,
      onChange,
      error,
      required,
      width,
      height,
      min = 0,
      max = 999,
      ...props
    },
    ref
  ) => {
    const handleIncrement = () => {
      const currentValue = parseInt(value || '0', 10);
      const newValue = Math.min(currentValue + 1, max);
      onChange({ target: { value: newValue.toString() } });
    };

    const handleDecrement = () => {
      const currentValue = parseInt(value || '0', 10);
      const newValue = Math.max(currentValue - 1, min);
      onChange({ target: { value: newValue.toString() } });
    };

    const handleInputChange = (e) => {
      let inputValue = e.target.value;

      // Allow empty string
      if (inputValue === '') {
        onChange(e);
        return;
      }

      // Parse and validate number
      const numValue = parseInt(inputValue, 10);
      if (!isNaN(numValue)) {
        const clampedValue = Math.max(min, Math.min(numValue, max));
        onChange({ target: { value: clampedValue.toString() } });
      }
    };

    return (
      <NumberInputWrapper width={width}>
        {label && (
          <Label>
            {label}
            {required && <span style={{ color: '#E63946' }}> *</span>}
          </Label>
        )}
        <InputContainer>
          <StyledInput
            ref={ref}
            type="number"
            value={value || ''}
            onChange={handleInputChange}
            placeholder={placeholder}
            error={error}
            height={height}
            min={min}
            max={max}
            {...props}
          />
          <ArrowButtonsContainer>
            <ArrowButton type="button" onClick={handleIncrement}>
              ▲
            </ArrowButton>
            <ArrowButton type="button" onClick={handleDecrement}>
              ▼
            </ArrowButton>
          </ArrowButtonsContainer>
        </InputContainer>
        {error && (
          <ErrorText>
            <Icon src={errorIcon} alt="error" />
            {error}
          </ErrorText>
        )}
      </NumberInputWrapper>
    );
  }
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
