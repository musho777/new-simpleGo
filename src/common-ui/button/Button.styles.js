import styled, { css } from 'styled-components';
import theme from 'styles/theme';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  padding: ${({ $type }) => ($type === 'link' ? '0' : '10px 16px')};
  border: ${({ $type, $primary, $outlined }) =>
    $type === 'link'
      ? 'none'
      : $primary
        ? 'none'
        : $outlined
          ? `1px solid ${theme.colors.outlined}`
          : '0.5px solid #1948664D'};
  border-radius: ${({ $type }) => ($type === 'link' ? '0' : '12px')};
  background-color: ${({ $type, $primary, $secondary, $outlined }) =>
    $type === 'link'
      ? 'transparent'
      : $primary
        ? theme.colors.primary
        : $secondary
          ? theme.colors.secondary
          : $outlined
            ? 'transparent'
            : '#F8F8F8'};
  color: ${({ $type, $primary, $secondary, $outlined }) =>
    $type === 'link'
      ? '#000000'
      : $primary || $secondary
        ? 'white'
        : $outlined
          ? theme.colors.outlined
          : '#194866'};
  font-size: 16px;
  font-weight: ${({ $outlined, $type }) =>
    $type === 'link' ? '500' : $outlined ? '600' : '700'};
  font-family: ${theme.fonts.main};

  text-decoration: ${({ $type }) => $type === 'link' && 'underline'};

  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s,
    color 0.3s;

  &:hover {
    background-color: ${({ $type, $primary, $secondary, $outlined }) =>
      $type === 'link'
        ? 'transparent'
        : $primary
          ? theme.colors.primaryHovered
          : $secondary
            ? theme.colors.primaryHovered
            : $outlined
              ? 'transparent'
              : '#F8F8F8'};
    color: ${({ $type }) => ($type === 'link' ? theme.colors.primaryHovered : '')};
    box-shadow: ${({ $outlined }) => ($outlined ? '0px 0px 7px 0px rgba(0, 0, 0, 0.25)' : '')};
  }
  &:focus {
    outline: none;
    background-color: ${({ $type, $primary, $secondary, $outlined }) =>
      $type === 'link'
        ? 'transparent'
        : $primary
          ? theme.colors.primaryPressed
          : $secondary
            ? theme.colors.primaryPressed
            : $outlined
              ? theme.colors.primaryPressed
              : ''};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $active }) =>
    $active &&
    css`
      border-color: #2d6cdf;
      color: #2d6cdf !important;
      background-color: #2d6cdf1a;
    `}
`;

export const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

export const Icon = styled.img``;

export const LoadingIcon = styled.img`
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ClearBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 9999px;
  width: 26px !important;
  height: 26px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 4px;

  &:hover {
    background: rgba(45, 108, 223, 0.2);
  }
`;

export const ClearIcon = styled.img`
  width: 16px;
  height: 16px;
`;
