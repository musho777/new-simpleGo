import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;
  background-color: transparent;
  min-height: 100vh;
`;

export const BackButton = styled.button`
  border-radius: 10px;
  border: 0.4px solid #d4d8dd;
  background: #fff;
  width: 100px;
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
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

  h1 {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin: 0 0 16px 0;
  }
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

export const FormGroup = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;

  .required {
    color: #e74c3c;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #999;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #999;
  }
`;

export const OptionsSection = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0 0 16px 0;
  }
`;

export const OptionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const RadioButton = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
`;

export const OptionContainer = styled.div`
  display: flex;
  gap: 8px;
  flex: 1;
`;

export const OptionInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #999;
  }
`;

export const RemoveOptionButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #e74c3c;
  background: transparent;
  border: 2px solid #e74c3c;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e74c3c;
    color: white;
  }
`;

export const AddOptionButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
  background: transparent;
  border: 2px solid #667eea;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;

  &:hover {
    background: #667eea;
    color: white;
  }
`;

export const CreateButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  font-size: 18px;
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

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const QuestionsListSection = styled.div`
  margin-top: 48px;
  padding-top: 32px;
  border-top: 2px solid #e0e0e0;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin: 0 0 24px 0;
  }
`;

export const QuestionCard = styled.div`
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    box-shadow: 0 4px 8px rgba(102, 126, 234, 0.15);
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
    margin: 0 0 8px 0;
  }
`;

export const QuestionMetaInfo = styled.div`
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

export const QuestionBody = styled.div`
  margin-bottom: 16px;

  p {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    line-height: 1.6;
    margin: 0;
  }
`;

export const QuestionOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const QuestionOptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: ${(props) => (props.$isCorrect ? '#d4edda' : '#f8f9fa')};
  border: 2px solid ${(props) => (props.$isCorrect ? '#15C7A7' : '#e0e0e0')};
  border-radius: 8px;
  font-size: 15px;
  color: #333;

  span:first-child {
    font-weight: 700;
    color: ${(props) => (props.$isCorrect ? '#15C7A7' : '#666')};
    min-width: 24px;
  }

  span:nth-child(2) {
    flex: 1;
  }

  ${(props) =>
    props.$isCorrect &&
    `
    &::after {
      content: '✓ Correct';
      font-size: 12px;
      font-weight: 600;
      color: #15C7A7;
      background: #ffffff;
      padding: 4px 8px;
      border-radius: 4px;
    }
  `}
`;

export const QuestionsButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const EditQuestionButton = styled(IconButton)``;

export const DeleteQuestionButton = styled(IconButton)`
  svg {
    width: 30px;
    height: 30px;
  }
`;

export const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 12px 16px;
  color: #dc2626;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '⚠';
    font-size: 16px;
  }
`;
