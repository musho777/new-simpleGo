import { forwardRef, useRef } from 'react';

import { InputContainer, StyledInput } from './CodeInput.styles';

const CodeInput = forwardRef(({ codeCount = 4, value = [], onChange, error }, ref) => {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const { value: inputValue } = e.target;

    if (/^[0-9]$/.test(inputValue) || inputValue === '') {
      const newValues = [...value];
      newValues[index] = inputValue;

      if (typeof onChange === 'function') {
        onChange(newValues);
      }

      if (inputValue && index < codeCount - 1) {
        inputRefs.current[index + 1]?.focus();
      } else if (inputValue === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').split('');

    const newValues = Array(codeCount).fill('');
    pastedData.forEach((digit, i) => {
      if (i < codeCount && /^[0-9]$/.test(digit)) {
        newValues[i] = digit;
      }
    });

    if (typeof onChange === 'function') {
      onChange(newValues);
    }

    inputRefs.current[Math.min(pastedData.length, codeCount - 1)]?.focus();
  };

  return (
    <InputContainer>
      {Array.from({ length: codeCount }).map((_, index) => (
        <StyledInput
          $error={error && !value[index]}
          $success={!!value[index]}
          key={`code-input-${index}`}
          ref={(el) => {
            inputRefs.current[index] = el;
            if (ref) {
              if (typeof ref === 'function') {
                ref(el);
              } else {
                ref.current[index] = el;
              }
            }
          }}
          value={value[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          maxLength="1"
        />
      ))}
    </InputContainer>
  );
});

export default CodeInput;
