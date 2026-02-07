import styled from 'styled-components';

export const QuestionCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const QuestionNumber = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const QuestionText = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin: 0 0 24px 0;
  line-height: 1.6;
`;

export const AnswersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AnswerOption = styled.div`
  padding: 16px 20px;
  border: 2px solid ${(props) => (props.$selected ? '#667eea' : '#e0e0e0')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) => (props.$selected ? '#f0f4ff' : '#ffffff')};
  position: relative;
  display: flex;
  align-items: center;

  ${(props) =>
    props.$multiple &&
    `
    &:before {
      content: '';
      width: 20px;
      height: 20px;
      border: 2px solid ${props.$selected ? '#667eea' : '#ccc'};
      border-radius: 4px;
      margin-right: 12px;
      background-color: ${props.$selected ? '#667eea' : 'transparent'};
      flex-shrink: 0;
      transition: all 0.2s ease;
      position: relative;
    }

    ${
      props.$selected
        ? `
      &:after {
        content: '✓';
        position: absolute;
        left: 24px;
        color: white;
        font-size: 14px;
        font-weight: bold;
      }
    `
        : ''
    }
  `}

  ${(props) =>
    !props.$multiple &&
    `
    &:before {
      content: '';
      width: 20px;
      height: 20px;
      border: 2px solid ${props.$selected ? '#667eea' : '#ccc'};
      border-radius: 50%;
      margin-right: 12px;
      background-color: transparent;
      flex-shrink: 0;
      transition: all 0.2s ease;
      position: relative;
    }

    ${
      props.$selected
        ? `
      &:after {
        content: '';
        position: absolute;
        left: 26px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #667eea;
      }
    `
        : ''
    }
  `}

  &:hover {
    border-color: #667eea;
    background-color: ${(props) => (props.$selected ? '#f0f4ff' : '#fafbff')};
  }

  span {
    font-size: 16px;
    color: #333;
    line-height: 1.5;
  }
`;
