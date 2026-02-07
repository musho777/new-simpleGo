import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
`;

export const OvertimeHoursP = styled.div`
  color: #27ae60;
`;

export const DeductionHoursP = styled.div`
  color: #e63946;
`;

export const CheckinCheckoutCircle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ $color }) => $color};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const FilterContainer = styled.div`
  border-radius: 8px;
  background: #fff;
  min-height: 82px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
`;

export const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .payroll-department-filter {
    width: 100%;
    min-width: 150px;
    max-width: 175px;
    min-height: 0;

    @media (max-width: 768px) {
      max-width: none;
      min-width: 120px;
    }

    label {
      display: none;
    }
  }
`;

export const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 175px;

  @media (max-width: 768px) {
    max-width: none;
    min-width: 120px;
  }
`;

export const ViewPayrollDetails = styled.p`
  color: #212529;
  font-size: 12px;
  font-weight: 500;
  text-decoration-line: underline;
`;

export const ViewPayrollMobileDetails = styled.p`
  color: #212529;
  font-size: 12px;
  font-weight: 500;
  text-decoration-line: underline;
  text-align: center;
  cursor: pointer;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 33px;
`;

export const PayrollLabel = styled.p`
  color: #6c757d;
  font-size: 14px;
  font-weight: 600;
`;

export const PayrollValue = styled.p`
  color: ${({ $type }) => {
    if ($type === 'positive') return '#27AE60';
    if ($type === 'negative') return '#E63946';
    return '#212529';
  }};
  font-size: 14px;
  font-weight: 600;
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
  color: ${({ $type }) => {
    if ($type === 'positive') return '#27AE60';
    if ($type === 'negative') return '#E63946';
    return '#212529';
  }};
  text-align: right;
  word-break: break-word;
  font-size: 14px;
`;

export const ExpandedRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px 0;
  align-items: center;
  gap: 12px;
`;

export const ActionsMobileWrapper = styled.div``;
