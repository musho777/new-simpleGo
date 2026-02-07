import {
  Container,
  InputWrapper,
  Label,
  RightIconsWrapper,
  StyledInput,
} from './CustomInput.styles';

const CustomInput = ({
  label,
  required,
  value,
  disabled,
  width,
  rightIcons = [],
  onChange,
  placeholder,
  type = 'text',
  ...rest
}) => {
  return (
    <Container $readOnly={disabled}>
      {label && (
        <Label>
          {label}
          {required && <span>*</span>}
        </Label>
      )}
      <InputWrapper>
        <StyledInput
          type={type}
          value={value}
          disabled={disabled}
          $width={width}
          $hasRightIcons={rightIcons.length > 0}
          onChange={onChange}
          placeholder={placeholder}
          {...rest}
        />
        {rightIcons.length > 0 && (
          <RightIconsWrapper>
            {rightIcons.map((icon, index) => (
              <img key={index} src={icon.src} alt={icon.alt} onClick={icon.onClick} />
            ))}
          </RightIconsWrapper>
        )}
      </InputWrapper>
    </Container>
  );
};

export default CustomInput;
