import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: ${({ $bgColor, $mood }) => ($mood ? '#FFF' : $bgColor || '#2d6cdf')};
  color: ${({ $mood }) => ($mood ? '#000' : 'white')};
  border-radius: 10px;
  border-left: ${({ $mood, $bgColor }) =>
    $mood ? `3px solid ${$bgColor || '#2d6cdf'}` : 'none'};
  padding: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-start;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Number = styled.span`
  font-size: 28px;
  font-weight: 600;
  color: ${({ $mood, $bgColor }) => ($mood ? $bgColor || '#2d6cdf' : 'inherit')};
`;

export const IconContainer = styled.img``;
