import styled from 'styled-components';

export const CardContainer = styled.div`
  background: ${(props) => props.$backgroundColor || 'white'};
  border-radius: 16px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: ${(props) => (props.onClick ? 'pointer' : 'default')};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.$color};
  border-radius: 14px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
`;

export const Icon = styled.img`
  width: 22px;
  height: 22px;
`;

export const Value = styled.div`
  font-weight: 700;
  font-size: 28px;
  line-height: 100%;
  color: ${(props) => props.$color};
  margin-bottom: 8px;
`;

export const Label = styled.div`
  color: #4a5565;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  margin: 10px 0;
`;
