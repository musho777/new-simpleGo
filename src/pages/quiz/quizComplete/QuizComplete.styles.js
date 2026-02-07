import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  background-color: transparent;
  max-height: 100vh;
`;

export const ResultsCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StatusIcon = styled.div`
  font-size: 64px;
  margin-bottom: 24px;
  margin-top: -20px;
`;

export const Title = styled.h1`
  font-size: 25px;
  font-weight: 600;
  color: ${(props) => (props.$passed ? '#15C7A7' : '#E63946')};
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 32px 0;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${(props) => props.$color || '#333'};
`;

export const PercentageCircle = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${(props) =>
    props.$passed
      ? 'conic-gradient(#15C7A7 0% ' +
        props.$percentage +
        '%, #e9ecef ' +
        props.$percentage +
        '% 100%)'
      : 'conic-gradient(#E63946 0% ' +
        props.$percentage +
        '%, #e9ecef ' +
        props.$percentage +
        '% 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 90px;
    height: 90px;
    background: white;
    border-radius: 50%;
  }
`;

export const PercentageText = styled.div`
  position: relative;
  z-index: 1;
  font-size: 25px;
  font-weight: 700;
  color: ${(props) => (props.$passed ? '#15C7A7' : '#E63946')};
`;

export const QuizTitle = styled.div`
  font-size: 20px;
  color: #333;
  font-weight: 600;
  margin-bottom: 24px;
  margin-top: -20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e9ecef;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 32px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const BackButton = styled.button`
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
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

export const TimedOutBanner = styled.div`
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &::before {
    content: '⏱';
    font-size: 18px;
  }
`;
