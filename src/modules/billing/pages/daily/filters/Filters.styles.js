import styled from 'styled-components';
import theme from 'styles/theme';

export const FiltersWrapper = styled.div`
  width: 100%;
  display: ${({ $showFilters }) => ($showFilters ? 'flex' : 'none')};
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  justify-content: space-between;
`;

export const FiltersSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .select {
    min-width: 138px;
  }
`;

export const RightSideContainer = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
  gap: 10px;
`;

export const CloseTitle = styled.p`
  font-size: 12px;
  color: ${theme.colors.primaryText};
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

export const CloseIcon = styled.img`
  width: 10px;
  height: 10px;
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
