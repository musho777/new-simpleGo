import styled from 'styled-components';
import theme from 'styles/theme';

export const PendingRequestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

export const HeaderSection = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const FilterSection = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TableSection = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ActionsSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

export const ActionButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    > button {
      width: 100%;
    }
  }
`;

export const SelectionSummary = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;

  .count {
    color: ${theme.colors.primary};
    font-weight: 600;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;

  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #495057;
  }

  .description {
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const LoadingOverlay = styled.div`
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e9ecef;
    border-top: 4px solid ${theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Modal specific styles
export const ModalContent = styled.div`
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
`;

export const RequestItem = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  background: #f8f9fa;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const RequestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #dee2e6;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const EmployeeDetails = styled.div`
  .name {
    font-size: 16px;
    font-weight: 600;
    color: #495057;
    margin-bottom: 4px;
  }

  .role {
    font-size: 14px;
    color: #6c757d;
  }
`;

export const ItemDetails = styled.div`
  font-size: 14px;
  color: #495057;

  .category {
    font-weight: 600;
  }

  .item {
    margin-left: 8px;
  }
`;

export const QuantitySection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const QuantityWrapper = styled.div`
  margin: -16px;
  height: calc(100% + 32px);
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

export const NotesSection = styled.div`
  margin-bottom: 16px;

  .label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #495057;
    margin-bottom: 6px;
  }

  textarea {
    width: 100%;
    min-height: 60px;
    padding: 8px 12px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 14px;
    resize: vertical;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }
`;

export const RequestReason = styled.div`
  font-size: 13px;
  color: #6c757d;
  background: #fff;
  padding: 12px;
  border-radius: 4px;
  border-left: 4px solid #007bff;

  .label {
    font-weight: 600;
    margin-bottom: 4px;
  }

  .reason {
    line-height: 1.4;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid #dee2e6;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;

    > button {
      width: 100%;
    }
  }
`;

export const DeclineModalContent = styled.div`
  padding: 0 20px;
`;

export const DeclineModalText = styled.p`
  color: #6c757d;
  text-align: center;
  font-family: Nunito;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 20px;
`;

export const QuantityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 150px;
  padding: 22px 0px;
  flex: 1;
  justify-content: center;
  min-height: 100%;
  border-right: 1px solid #dee2e6;

  &:first-child {
    border-left: 1px solid #dee2e6;
  }
`;

export const QuantityItemLabel = styled.span`
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
`;

export const QuantityItemValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ $color }) => $color || '#212529'};
`;

export const EllipsisCell = styled.div`
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
