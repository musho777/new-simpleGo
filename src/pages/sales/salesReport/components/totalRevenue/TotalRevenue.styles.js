import styled from 'styled-components';

export const RevenueContainer = styled.div`
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  min-height: 140px;
  background: linear-gradient(135deg, #00c950 0%, #096 100%);
  display: flex;
  flex-direction: column;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const Icon = styled.img`
  width: 15px;
  height: 24px;
`;

export const Value = styled.div`
  color: #fff;
  font-size: 38px;
  font-weight: 700;
  line-height: 48px;
`;

export const Label = styled.div`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
`;

export const TrendIndicator = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.$trend === 'up' ? '#10B981' : '#EF4444')};
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Text = styled.div`
  color: #dcfce7;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const IconWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
