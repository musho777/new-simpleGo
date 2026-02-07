import styled from 'styled-components';
import theme from 'styles/theme';

export const ViewContainer = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  @media screen and (max-width: 500px) {
    padding: 10px 10px;
  }
`;

export const Header = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #666666;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    border-color: #d0d0d0;
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333333;
  margin: 0 0 20px 0;
`;

export const EmployeeInfo = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.span`
  font-weight: 600;
  color: #495057;
  min-width: 120px;
  margin-right: 12px;
`;

export const Value = styled.span`
  color: #212529;
  flex: 1;
`;

export const BtnWrapperTop = styled.div`
  max-width: 200px;
`;

export const Icon = styled.img``;

export const ExportWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 10px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: ${(props) => (props.disabled ? 0.6 : 0.8)};
  }
`;

export const ExportText = styled.p`
  color: #2d6cdf;
  font-family: Nunito;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;

export const ExpandableWrapper = styled.div`
  border: 0.5px solid #dfdfdf80;
  border-right: none;
  border-left: none;
  padding: 17px 0;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ExpandedLabel = styled.p`
  color: #6c757d;
  font-size: 14px;
  word-break: break-word;
  min-width: 75px;
`;

export const ExpandedValue = styled.p`
  color: ${({ $highlight }) => ($highlight ? '#E63946' : '#212529')};
  text-align: right;
  word-break: break-word;
  font-size: 14px;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px 0;
  align-items: center;
  gap: 12px;
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

export const EllipsisCell = styled.div`
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
