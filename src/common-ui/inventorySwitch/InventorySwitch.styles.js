import styled from 'styled-components';

export const SwitchWrapper = styled.div`
  display: inline-flex;
  background-color: white;
  padding: 4px;
  border-radius: 5px;
  width: 270px;
  height: 50px;
  align-items: center;
  gap: 15px;
  justify-content: center;
  margin-left: 16px;
  @media (max-width: 769px) {
    margin-left: 0px;
  }
`;

export const SwitchButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  line-height: 100%;
  cursor: pointer;
  color: ${(props) => (props.$active ? '#2563eb' : '#6b7280')};
  background-color: ${(props) => (props.$active ? 'rgba(45, 108, 223, 0.1)' : 'transparent')};
  box-shadow: ${(props) => (props.$active ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none')};
  transition: all 0.2s ease;

  &:hover {
    color: #2563eb;
  }

  &:active {
    transform: scale(0.97);
  }
`;
