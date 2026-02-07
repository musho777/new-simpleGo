import styled from 'styled-components';

export const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e8e9ea;
  position: relative;
  transition: box-shadow 0.2s ease;
  width: 100%;
  min-width: 0;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.4;
  flex: 1;
  margin-right: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  position: relative;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid #f0f0f0;
  padding-top: 5px;
  width: 100%;
`;

export const IconButton = styled.img`
  cursor: pointer;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.column {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

export const ActionWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export const Label = styled.span`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

export const Value = styled.span`
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 400;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-size: 16px;
  color: #666;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 16px;
`;

export const ModalText = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
