import styled from 'styled-components';

export const CardWrapper = styled.div`
  border-radius: 10px;
  border-left: 3px solid
    ${(props) => (props.$borderColor ? props.$borderColor : 'var(--accent-orange, #ff6a00)')};
  background: #fff;
  height: 120px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const Title = styled.div`
  color: ${(props) => (props.$textColor ? props.$textColor : 'var(--accent-orange, #ff6a00)')};
  font-size: 23px;
  font-style: normal;
  font-weight: 700;

  @media (max-width: 1500px) {
    font-size: 18px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
export const Status = styled.div`
  color: #6c757d;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: 9px;
`;
