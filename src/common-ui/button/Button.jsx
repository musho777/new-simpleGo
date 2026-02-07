import clearIcon from 'assets/clear-active.svg';
import filterActiveIcon from 'assets/filter-active.svg';
import filterIcon from 'assets/filter.svg';
import searchActiveIcon from 'assets/search-active.svg';
import searchIcon from 'assets/search.svg';

import {
  ClearBtn,
  ClearIcon,
  Icon,
  IconWrapper,
  LoadingIcon,
  LoadingWrapper,
  StyledButton,
} from './Button.styles';
import loadingIcon from './loading.svg';

const Button = ({
  width,
  loading,
  primary,
  secondary,
  outlined,
  children,
  onClick,
  icon,
  type,
  active,
  clearable,
  onClear,
  variant,
  ...rest
}) => {
  const handleClick = (e) => {
    if (loading) {
      return;
    } else {
      if (onClick) {
        onClick(e);
      }
      e.currentTarget.blur();
    }
  };

  let resolvedIcon = icon;

  if (!icon && variant) {
    if (variant === 'filter') {
      resolvedIcon = active ? filterActiveIcon : filterIcon;
    } else if (variant === 'search') {
      resolvedIcon = active ? searchActiveIcon : searchIcon;
    }
  }

  return (
    <StyledButton
      width={width}
      $primary={primary}
      $secondary={secondary}
      $outlined={outlined}
      $type={type}
      $active={active}
      disabled={loading}
      onClick={handleClick}
      {...rest}
    >
      {loading ? (
        <LoadingWrapper>
          <LoadingIcon alt="loading" src={loadingIcon} /> {children}
        </LoadingWrapper>
      ) : (
        <IconWrapper>
          {resolvedIcon && <Icon alt="icon" src={resolvedIcon} />}
          {children}
          {clearable && onClear && (
            <ClearBtn
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onClear(e);
              }}
            >
              <ClearIcon src={clearIcon} alt="clear" />
            </ClearBtn>
          )}
        </IconWrapper>
      )}
    </StyledButton>
  );
};

export default Button;
