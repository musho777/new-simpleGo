import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  background-color: #f5f5f5;
`;

export const Header = styled.div`
  max-width: 900px;
  margin: 0 auto 32px;
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  color: #667eea;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 0;
  margin-bottom: 16px;
  transition: color 0.2s ease;

  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;

export const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const Content = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 32px 0 16px 0;
`;

export const QuestionCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  border: ${(props) => (props.$saved ? '2px solid #e0e0e0' : 'none')};
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
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

export const QuestionInput = styled.textarea`
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

export const Select = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

export const AnswersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
`;

export const AnswerItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Radio = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
`;

export const AnswerInput = styled.input`
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
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const DeleteButton = styled(IconButton)`
  svg {
    width: 30px;
    height: 30px;
  }
`;

export const AddAnswerButton = styled.button`
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
  background: transparent;
  border: 2px dashed #667eea;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: #f0f4ff;
  }
`;

export const SaveButton = styled.button`
  width: 100%;
  padding: 14px 24px;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  background: ${(props) =>
    props.$primary
      ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: ${(props) => (props.$primary ? '32px' : '0')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px
      ${(props) => (props.$primary ? 'rgba(17, 153, 142, 0.4)' : 'rgba(102, 126, 234, 0.4)')};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const QuestionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;
