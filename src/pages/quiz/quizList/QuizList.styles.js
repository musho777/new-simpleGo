import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0 0 32px 0;
  text-align: center;
`;

export const QuizGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

export const QuizBox = styled.div`
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  min-height: 180px;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: #667eea;
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(21, 199, 167, 0.2);
  }

  &:active {
    transform: translateY(-2px);
  }
`;

export const QuizTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
`;

export const Description = styled.p`
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 16px 0;
  flex-grow: 1;
`;

export const QuizTime = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #667eea;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
`;

export const TimeLabel = styled.span`
  font-weight: 500;
  color: #999;
`;
