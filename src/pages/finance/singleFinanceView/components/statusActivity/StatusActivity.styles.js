import styled from 'styled-components';

export const ActivityContainer = styled.div`
  display: flex;
  gap: 16px;
  border-radius: 10px;
  border-left: 3px solid ${(props) => props.$borderColor || '#2d6cdf'};
  align-items: center;
  background: ${(props) => props.$backgroundColor || 'rgba(45, 108, 223, 0.1)'};
  padding: 10px 5px;
  max-width: 100%;
  padding-bottom: 15px;
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
  width: 20px;
  height: 20px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Title = styled.p`
  color: #212529;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`;

export const InfoText = styled.p`
  color: ${(props) => props.$textColor || '#2d6cdf'};
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  padding: 3px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(45, 108, 223, 0.05);
    transform: translateY(-1px);
  }

  &:active {
    background-color: rgba(45, 108, 223, 0.1);
    transform: translateY(0);
  }
`;

export const IconFile = styled.img`
  width: 50px;
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Notes = styled.p`
  color: #6c757d;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
`;

export const FileName = styled.p`
  color: #212529;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const FileSize = styled.p`
  color: #212529;
  font-size: 8px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
