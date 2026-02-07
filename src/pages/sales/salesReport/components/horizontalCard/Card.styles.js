import styled from 'styled-components';

export const CardContainer = styled.div`
  background: 'white';
  border-radius: 14px;
  padding: 20px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  &:hover {
    transform: ${(props) => (props.onClick ? 'translateY(-2px)' : 'none')};
    box-shadow: ${(props) =>
      props.onClick ? '0 4px 16px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 12px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const Title = styled.h3`
  color: #101828;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 22px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const Content = styled.div`
  flex: 1;
  color: #4a5565;
`;

export const Footer = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
`;

export const Index = styled.div`
  border-radius: 14px;
  background: ${(props) => {
    switch (props.$index) {
      case 0:
        return 'linear-gradient(135deg, #FDC700 0%, #F0B100 100%)';
      case 1:
        return 'linear-gradient(135deg, #D1D5DC 0%, #99A1AF 100%)';
      case 2:
        return 'linear-gradient(135deg, #FF8904 0%, #FF6900 100%)';
      default:
        return 'linear-gradient(135deg, #51A2FF 0%, #2B7FFF 100%)';
    }
  }};
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 14px;
    line-height: 20px;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 12px;
    line-height: 18px;
  }
`;

export const LeftSide = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 12px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const InfoBadge = styled.div`
  background-color: ${(props) => props.$bg || '#dcfce7'};
  border-radius: 10px;
  display: flex;
  padding: 4px 10px;
  align-items: center;
  width: max-content;
  > p {
    color: ${(props) => props.$color || '#008236'};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  }

  @media (max-width: 768px) {
    padding: 3px 8px;
    > p {
      font-size: 14px;
      line-height: 20px;
    }
  }

  @media (max-width: 480px) {
    padding: 2px 6px;
    > p {
      font-size: 12px;
      line-height: 18px;
    }
  }
`;

export const InfoBadgeWrapper = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 6px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    align-items: flex-start;
  }
`;

export const RightSidePrice = styled.p`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px;
  color: #00a63e;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const RightSideLabel = styled.p`
  color: #4a5565;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: right;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    line-height: 18px;
  }
`;
