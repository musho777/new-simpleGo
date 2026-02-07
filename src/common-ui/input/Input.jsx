import { forwardRef, useEffect, useRef, useState } from 'react';

import { CharacterCount } from 'common-ui/textArea/TextArea.styles';
import Tooltip from 'common-ui/tooltip';

import {
  Container,
  ErrorText,
  Icon,
  IconWrapper,
  InputWrapper,
  Label,
  LeftIconWrapper,
  StyledInput,
  StyledInputWrapper,
  UnityWrapper,
} from './Input.styles';
import Close from './assets/close.svg';
import EditIcon from './assets/edit.svg';
import errorIcon from './assets/error.svg';
import HidePass from './assets/hide-pass.svg';
import ShowPass from './assets/show-pass.svg';

const Input = forwardRef(
  (
    {
      maxLength,
      label,
      required,
      tooltip,
      error,
      fullWidth,
      type = 'text',
      immutable = false,
      leftIcon,
      onClear,
      clearable,
      icon,
      readOnly,
      labelColor,
      unity,
      width,
      padding,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isEditable, setIsEditable] = useState(!immutable);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);
    const iconRef = useRef(null);

    const inputValue = rest.value || '';

    const handleClickShowPassword = () => {
      setShowPassword((prev) => !prev);
    };

    const handleClickEdit = () => {
      setIsEditable(true);
      inputRef.current?.focus();
    };

    const handleOutsideClick = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setIsEditable(false);
      }
    };

    const handleOutsideClickClear = (e) => {
      if (iconRef.current && !iconRef.current.contains(e.target)) {
        setFocused(false);
      }
    };

    useEffect(() => {
      if (clearable) {
        document.addEventListener('mousedown', handleOutsideClickClear);
      }
      return () => {
        document.removeEventListener('mousedown', handleOutsideClickClear);
      };
    }, [clearable]);

    useEffect(() => {
      if (immutable) {
        document.addEventListener('mousedown', handleOutsideClick);
      }
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, [immutable]);

    const inputType = type === 'password' && showPassword ? 'text' : type;
    return (
      <Container $readOnly={readOnly}>
        <Label customColor={labelColor}>
          {label}
          {required && <span>*</span>}
          {tooltip && <Tooltip text={tooltip} />}
        </Label>
        <InputWrapper $fullWidth={fullWidth}>
          <LeftIconWrapper
            $showLeftIcon={inputValue || focused}
            ref={iconRef}
            className="left-i-wr"
          >
            {leftIcon && <Icon src={leftIcon} alt="left icon" />}
          </LeftIconWrapper>
          <StyledInputWrapper style={{ position: 'relative' }}>
            {icon && (
              <LeftIconWrapper>
                <Icon src={icon} alt="left icon" />
              </LeftIconWrapper>
            )}
            <StyledInput
              ref={(el) => {
                inputRef.current = el;
                if (typeof ref === 'function') ref(el);
                else if (ref) ref.current = el;
              }}
              type={inputType}
              $error={error}
              maxLength={maxLength}
              readOnly={readOnly ?? (immutable && !isEditable)}
              onFocus={() => setFocused(true)}
              $width={width}
              $padding={padding}
              {...rest}
              value={rest.value ?? ''}
            />
            {unity && <UnityWrapper>{unity}</UnityWrapper>}
            {type === 'password' && !immutable && (
              <IconWrapper onClick={handleClickShowPassword}>
                {!showPassword ? (
                  <Icon src={HidePass} alt="eye" />
                ) : (
                  <Icon src={ShowPass} alt="eye" />
                )}
              </IconWrapper>
            )}
          </StyledInputWrapper>
          {error?.length && (
            <ErrorText>
              <Icon src={errorIcon} alt="error" />
              {error}
            </ErrorText>
          )}
          {maxLength && (
            <CharacterCount className="max-count-title">
              {inputValue?.length}-{maxLength} characters
            </CharacterCount>
          )}
          {clearable && inputValue && (
            <IconWrapper onClick={onClear}>
              <Icon className="close" src={Close} alt="clear" />
            </IconWrapper>
          )}
          {immutable && (
            <IconWrapper onClick={handleClickEdit}>
              <Icon src={EditIcon} alt="edit" />
            </IconWrapper>
          )}
        </InputWrapper>
      </Container>
    );
  }
);

export default Input;
