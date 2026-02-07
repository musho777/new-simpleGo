import styled from 'styled-components';

export const ResultsBox = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 48px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const ResultsIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${(props) =>
    props.$passed
      ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
      : 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)'};
  color: white;
  font-size: 48px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  box-shadow: 0 4px 12px
    ${(props) => (props.$passed ? 'rgba(17, 153, 142, 0.3)' : 'rgba(235, 51, 73, 0.3)')};
`;

export const ResultsTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: ${(props) => (props.$passed ? '#11998e' : '#eb3349')};
`;

export const ResultsMessage = styled.p`
  font-size: 18px;
  color: #666;
  margin: 0 0 32px 0;
  line-height: 1.6;
`;

export const ResultsScore = styled.div`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #333;

  .score {
    color: #667eea;
  }

  .divider {
    margin: 0 12px;
    color: #ccc;
  }

  .passing {
    color: #999;
    font-size: 36px;
  }
`;

export const ResultsDetails = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 32px;
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

export const DetailLabel = styled.span`
  font-size: 16px;
  color: #666;
  font-weight: 500;
`;

export const DetailValue = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 600;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

export const BackButton = styled.button`
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #667eea;
  background: transparent;
  border: 2px solid #667eea;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

export const RetakeButton = styled.button`
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
`;
