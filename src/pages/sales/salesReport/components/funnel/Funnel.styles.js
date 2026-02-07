import styled from 'styled-components';

export const FunnelDiv = styled.div`
  width: 100%;
  height: 90px;
  border-radius: 10px;
  position: relative;
  display: flex;
  overflow: hidden;
`;

export const Lead = styled.div`
  background: ${(props) =>
    props.$background || 'linear-gradient(90deg, #2b7fff 0%, #155dfc 100%)'};
  width: ${(props) => props.$width || '100%'};
  height: 100%;
  padding: 0px 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const Status = styled.p`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`;

export const Value = styled.p`
  color: #fff;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
`;

export const Description = styled.p`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

export const Icon = styled.img`
  width: 24px;
`;

export const Card = styled.div`
  border-radius: 14px;
  border: 1px solid #f3f4f6;
  background: #fff;
  padding: 16px;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.1);
`;

export const CardLabel = styled.p`
  font-size: 14px;
  margin-bottom: 4px;
  font-weight: 400;
  color: #4a5565;
`;

export const CardValue = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 2px;
  color: ${(props) => props.$color || '#666'};
`;
