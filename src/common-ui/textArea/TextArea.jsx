import React, { forwardRef, useEffect, useState } from 'react';

import { ErrorText, Icon } from 'common-ui/input/Input.styles';
import errorIcon from 'common-ui/input/assets/error.svg';
import Tooltip from 'common-ui/tooltip';
import PropTypes from 'prop-types';

import {
  CharacterCount,
  TextAreaField,
  TextAreaLabel,
  TextAreaWrapper,
} from './TextArea.styles';

const TextArea = forwardRef(
  (
    {
      label,
      error,
      value,
      onChange,
      placeholder,
      resizeVertical = true,
      resizeHorizontal = false,
      minLength,
      maxLength = 100,
      req,
      tooltip,
      ...props
    },
    ref
  ) => {
    const [textAreaValue, setTextAreaValue] = useState(value || '');
    const [pasteError, setPasteError] = useState('');

    useEffect(() => {
      setTextAreaValue(value || '');
    }, [value]);

    const handleChange = (event) => {
      setTextAreaValue(event.target.value);
      if (onChange) {
        onChange(event);
      }
    };

    const handlePaste = (event) => {
      const pastedText = event.clipboardData.getData('text');
      const currentText = textAreaValue || '';
      const cursorStart = event.target.selectionStart;
      const cursorEnd = event.target.selectionEnd;

      const textBeforeCursor = currentText.substring(0, cursorStart);
      const textAfterCursor = currentText.substring(cursorEnd);
      const resultText = textBeforeCursor + pastedText + textAfterCursor;

      if (resultText.length > maxLength) {
        setPasteError(
          `Text exceeds the maximum limit of ${maxLength} characters. Only the first ${maxLength} characters will be kept.`
        );

        setTimeout(() => {
          setPasteError('');
        }, 4000);
      }
    };

    return (
      <TextAreaWrapper>
        {label && (
          <TextAreaLabel>
            {label}
            {req && <span>*</span>}
            {tooltip && <Tooltip text={tooltip} />}
          </TextAreaLabel>
        )}
        <TextAreaField
          ref={ref}
          $error={error || pasteError}
          value={textAreaValue}
          onChange={handleChange}
          onPaste={handlePaste}
          placeholder={placeholder || 'Type your text...'}
          $resizeVertical={resizeVertical}
          $resizeHorizontal={resizeHorizontal}
          minLength={minLength}
          maxLength={maxLength}
          className="text-area-field"
          {...props}
        />
        <CharacterCount>
          {textAreaValue?.length}-{maxLength} characters
        </CharacterCount>
        {(error?.length || pasteError) && (
          <ErrorText>
            <Icon src={errorIcon} alt="error" />
            {error || pasteError}
          </ErrorText>
        )}
      </TextAreaWrapper>
    );
  }
);

TextArea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  resizeVertical: PropTypes.bool,
  resizeHorizontal: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
};

TextArea.defaultProps = {
  label: '',
  value: '',
  onChange: () => {},
  placeholder: '...',
  resizeVertical: false,
  resizeHorizontal: true,
};

export default TextArea;
