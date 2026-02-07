import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 40px;
  background-color: transparent;
  min-height: 100vh;
`;

export const BackButton = styled.button`
  border-radius: 10px;
  border: 0.4px solid #d4d8dd;
  background: #fff;
  padding: 0 12px;
  height: 40px;
  color: #1d3557;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const QuizInfoSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
`;

export const Header = styled.div`
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const QuizInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const QuizInfoItem = styled.div`
  font-size: 14px;
  color: #666;

  strong {
    color: #333;
    display: block;
    margin-bottom: 4px;
  }
`;

export const QuestionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const QuestionBox = styled.div`
  position: relative;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    box-shadow: 0 4px 8px rgba(21, 199, 167, 0.15);
  }
`;

export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #667eea;
    margin: 0;
  }
`;

export const QuestionInfo = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #888;

  span {
    background: #f5f5f5;
    padding: 4px 12px;
    border-radius: 12px;
  }
`;

export const MultipleCorrectBadge = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
  margin-left: auto;
  color: #ffffff;
`;

export const QuestionText = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  line-height: 1.6;
  margin: 10px 0 20px 0;
`;

export const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${(props) => (props.$isSelected ? '#e3f2fd' : '#f8f9fa')};
  border: 2px solid ${(props) => (props.$isSelected ? '#667eea' : '#e0e0e0')};
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  cursor: ${(props) => (props.$timeExpired ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.$timeExpired ? '0.5' : '1')};
  pointer-events: ${(props) => (props.$timeExpired ? 'none' : 'auto')};
  transition: all 0.2s ease;

  &:hover {
    border-color: #667eea;
    background: ${(props) => (props.$isSelected ? '#e3f2fd' : '#f0f0f0')};
  }

  span:first-child {
    font-weight: 700;
    color: ${(props) => (props.$isSelected ? '#667eea' : '#666')};
    min-width: 24px;
  }

  span:nth-child(2) {
    flex: 1;
  }
`;

export const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 40px;
  background: #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
`;

export const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;

export const NavigationButtons = styled.div`
  margin-top: 32px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
`;

export const PreviousButton = styled.button`
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  color: #667eea;
  background: transparent;
  border: 2px solid #667eea;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #667eea;
    color: white;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const NextButton = styled.button`
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

export const FinishButton = styled.button`
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

export const StartQuizSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 48px;
  margin-top: 32px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
`;

export const StartQuizButton = styled.button`
  padding: 16px 48px;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 24px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const TimerDisplay = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: ${(props) =>
    props.$timeExpired
      ? 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'
      : props.$timeWarning
        ? 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  animation: ${(props) => (props.$timeWarning ? 'pulse 1s infinite' : 'none')};

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  &::before {
    content: '⏱';
    font-size: 18px;
  }
`;

export const TimeExpiredMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(231, 76, 60, 0.95);
  color: #ffffff;
  padding: 32px 64px;
  border-radius: 12px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: fadeInScale 0.3s ease;

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

export const ErrorMessage = styled.div`
  background: #fff5f5;
  border: 1px solid #fc8181;
  border-radius: 12px;
  padding: 12px 12px;
  margin: 12px auto;
  max-width: 500px;
  text-align: center;
  color: #c53030;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(197, 48, 48, 0.1);
`;

export const QuizTimerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const QuizTimerDisplay = styled.div`
  background: ${(props) =>
    props.$timeExpired
      ? 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'
      : props.$timeWarning
        ? 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: #ffffff;
  padding: 12px 25px;
  border-radius: 12px;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  animation: ${(props) => (props.$timeWarning ? 'quizTimerPulse 1s infinite' : 'none')};

  @keyframes quizTimerPulse {
    0%,
    100% {
      transform: scale(1);
      box-shadow: 0 4px 16px rgba(243, 156, 18, 0.3);
    }
    50% {
      transform: scale(1.02);
      box-shadow: 0 6px 24px rgba(243, 156, 18, 0.5);
    }
  }

  &::before {
    content: '⏱';
    font-size: 28px;
  }
`;
