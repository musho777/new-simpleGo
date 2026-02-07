import styled from 'styled-components';
import theme from 'styles/theme';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 16px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
  border-radius: 8px;
  padding: 20px;
  > div {
    min-height: 0;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  flex: 1;
`;

export const BackButton = styled.button`
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e5e5e5;
    color: #333;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  background: white;
  border-radius: 8px;
  overflow: hidden;
`;

export const BackButtonWrapper = styled.div`
  margin-bottom: 20px;
`;

export const QuantityGroup = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  height: 100%;
  margin: 0;

  .input-group {
    display: flex;
    align-items: center;
    gap: 8px;

    input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 14px;

      &:focus {
        outline: none;
        border-color: ${theme.colors.primary};
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      }

      &:disabled {
        background-color: #e9ecef;
        cursor: not-allowed;
      }
    }

    .unit {
      font-size: 12px;
      color: #6c757d;
      font-weight: 500;
      min-width: 40px;
    }
  }
`;

export const QuantityWrapper = styled.div`
  margin: -16px;
  height: calc(100% + 32px);
`;
