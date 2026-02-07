import styled from 'styled-components';

export const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 12px;
  box-sizing: border-box;

  &:first-of-type {
    margin-top: 8px;
  }
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 14px;
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
  font-size: 14px;
  border: 1px solid ${(props) => (props.$error ? '#e74c3c' : '#e0e0e0')};
  border-radius: 8px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$error ? '#e74c3c' : '#667eea')};
  }

  &::placeholder {
    color: #999;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid ${(props) => (props.$error ? '#e74c3c' : '#e0e0e0')};
  border-radius: 8px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
  resize: none;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.$error ? '#e74c3c' : '#667eea')};
  }

  &::placeholder {
    color: #999;
  }
`;

export const ModalContent = styled.div`
  width: 100%;
  padding: 0 8px;
  box-sizing: border-box;
`;

export const ConfirmMessage = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin: 0 0 24px 0;
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;

  strong {
    color: #e74c3c;
    font-weight: 600;
  }
`;

export const ErrorText = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;
