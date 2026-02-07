import styled from 'styled-components';

const getStatusColor = (status) => {
  switch (status) {
    case 'correct':
      return '#15C7A7';
    case 'partial':
      return '#FAA11C';
    case 'incorrect':
      return '#E63946';
    case 'timed_out':
      return '#FAA11C';
    case 'not_answered':
      return '#6c757d';
    default:
      return '#6c757d';
  }
};

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

  &:hover {
    background: #f8f9fa;
  }
`;

export const Header = styled.div`
  margin-bottom: 32px;

  p {
    color: #666;
    font-size: 18px;
    margin-top: 8px;
    font-weight: 500;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const SummaryCard = styled.div`
  background: #ffffff;
  border: 2px solid ${(props) => (props.$passed ? '#15C7A7' : '#E63946')};
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
`;

export const UserInfo = styled.div`
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;

  div {
    font-size: 14px;
    color: #666;
    margin-top: 4px;
  }
`;

export const UserName = styled.div`
  font-size: 18px !important;
  font-weight: 600;
  color: #333 !important;
  margin-bottom: 4px !important;
`;

export const AttemptSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
`;

export const SummaryItem = styled.div`
  text-align: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
`;

export const SummaryLabel = styled.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
`;

export const SummaryValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.$color || '#333'};
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  background: ${(props) => (props.$passed ? '#15C7A7' : '#E63946')};
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const QuestionsSection = styled.div`
  margin-top: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

export const QuestionCard = styled.div`
  background: #ffffff;
  border: 2px solid ${(props) => getStatusColor(props.$status)};
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
`;

export const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
  flex-wrap: wrap;
  gap: 12px;
`;

export const QuestionNumber = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #666;
  background: #f0f0f0;
  padding: 6px 14px;
  border-radius: 6px;
`;

export const QuestionStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
  background: ${(props) => getStatusColor(props.$status)};
  border-radius: 6px;
  text-transform: uppercase;
`;

export const TimedOutBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  color: #faa11c;
  background: rgba(253, 126, 20, 0.1);
  border: 1px solid #faa11c;
  border-radius: 4px;
`;

export const NotAnsweredBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  color: #6c757d;
  background: rgba(108, 117, 125, 0.1);
  border: 1px solid #6c757d;
  border-radius: 4px;
`;

export const PartialBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  color: #faa11c;
  background: rgba(253, 126, 20, 0.1);
  border: 1px solid #faa11c;
  border-radius: 4px;
`;

export const QuestionText = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.5;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OptionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 16px;
  border-radius: 8px;
  border: 2px solid
    ${(props) => {
      if (props.$isCorrectAnswer && props.$isUserSelection) return '#15C7A7';
      if (props.$isCorrectAnswer) return '#15C7A7';
      if (props.$isUserSelection && !props.$isCorrectAnswer) return '#E63946';
      return '#e5e7eb';
    }};
  background: ${(props) => {
    if (props.$isCorrectAnswer && props.$isUserSelection) return 'rgba(21, 199, 167, 0.15)';
    if (props.$isCorrectAnswer) return 'rgba(21, 199, 167, 0.08)';
    if (props.$isUserSelection && !props.$isCorrectAnswer) return 'rgba(220, 53, 69, 0.1)';
    return '#fff';
  }};
  transition: all 0.2s ease;
`;

export const OptionLetter = styled.span`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  border-radius: 50%;
  margin-right: 14px;
  flex-shrink: 0;
  background: ${(props) => {
    if (props.$isCorrectAnswer && props.$isUserSelection) return '#15C7A7';
    if (props.$isCorrectAnswer) return '#15C7A7';
    if (props.$isUserSelection && !props.$isCorrectAnswer) return '#E63946';
    return '#e5e7eb';
  }};
  color: ${(props) => {
    if (props.$isCorrectAnswer || (props.$isUserSelection && !props.$isCorrectAnswer))
      return '#fff';
    return '#666';
  }};
`;

export const OptionText = styled.span`
  flex: 1;
  font-size: 15px;
  color: #333;
  line-height: 1.4;
`;

export const OptionIndicator = styled.span`
  font-size: 11px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 4px;
  margin-left: 12px;
  white-space: nowrap;
  background: ${(props) => (props.$type === 'correct' ? '#15C7A7' : '#E63946')};
  color: #fff;
`;

export const QuestionMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
  font-size: 13px;
  color: #666;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 80px 40px;
  font-size: 18px;
  color: #666;
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 80px 40px;
  font-size: 18px;
  color: #e63946;
`;
