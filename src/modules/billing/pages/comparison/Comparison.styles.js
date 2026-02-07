import styled from 'styled-components';
import theme from 'styles/theme';

export const ViewContainer = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${theme.colors.white};
  border-radius: 8px 8px 0 0;
`;

export const FilterActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ $isTablet }) => $isTablet && '10px'};
  flex-direction: ${({ $isTablet }) => $isTablet && 'column'};
  width: 100%;
  padding: ${({ $isTablet }) => ($isTablet ? '16px 12px' : '22px 30px')};
  align-items: ${({ $isTablet }) => !$isTablet && 'center'};

  .button {
    height: 38px;
    font-size: 14px;
    max-width: 476px;
  }
`;

export const DatePickerWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const ClearAllText = styled.span`
  cursor: pointer;
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  width: 90px;
  text-decoration: underline;
  white-space: nowrap;
`;

export const CloseIcon = styled.img`
  width: 10px;
  height: 10px;
`;

export const CloseTitle = styled.p`
  font-size: 12px;
  color: ${theme.colors.primaryText};
`;

export const FiltersSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const FiltersWrapper = styled.div`
  border-top: 1px solid #dfdfdf80;
  display: ${({ $showFilters }) => ($showFilters ? 'flex' : 'none')};
  align-items: center;
  padding: 10px 20px;
  justify-content: space-between;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 2px 1px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 12px;
  padding: 10px;
  color: #212529;
  cursor: pointer;

  &:hover {
    background-color: #2c4a72;

    ${CloseTitle} {
      color: #ffffff;
    }
  }
`;

export const RightSideContainer = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
  gap: 10px;
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: ${({ $isTablet }) => $isTablet && 'column'};
  gap: 20px;
  margin: 0 20px;
`;

export const LoadContainer = styled.div`
  width: 100%;
  min-height: 500px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingIcon = styled.img`
  animation: rotate 1s linear infinite;
  width: 100px;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
