import { forwardRef, useImperativeHandle, useRef } from 'react';

import PhoneInput from 'react-phone-input-2';

import Tooltip from 'common-ui/tooltip';
import PropTypes from 'prop-types';

import { Container, ErrorText, Icon, Label } from './MyPhoneInput.styles';
import errorIcon from './error.svg';

const MyPhoneInput = forwardRef(
  (
    {
      value,
      label,
      required,
      tooltip,
      onChange,
      readOnly,
      error = '',
      country = 'am',
      placeholder = 'Enter phone number',
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
    }));

    return (
      <Container $error={error} $readOnly={readOnly}>
        <Label>
          {label}
          {required && <span>*</span>}
          {tooltip && <Tooltip text={tooltip} />}
        </Label>
        <PhoneInput
          inputRef={inputRef}
          value={value}
          onChange={onChange}
          country={country}
          countryCodeEditable={false}
          placeholder={placeholder}
          inputProps={{
            'data-error': !!error,
            ...rest.inputProps,
          }}
          {...rest}
        />
        {error && (
          <ErrorText>
            <Icon src={errorIcon} alt="error" />
            {error}
          </ErrorText>
        )}
      </Container>
    );
  }
);

MyPhoneInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
  country: PropTypes.string,
  placeholder: PropTypes.string,
};

MyPhoneInput.defaultProps = {
  error: '',
  country: 'am',
  placeholder: 'Enter phone number',
};

export default MyPhoneInput;
