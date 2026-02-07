import styled from 'styled-components';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 12px;
  }
`;

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CardContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  min-height: 120px;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 480px) {
    min-height: 100px;
  }
`;

export const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
  @media (max-width: 480px) {
    padding: 16px;
    gap: 8px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const CardBody = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const ItemCount = styled.div`
  font-size: 14px;
  color: #6c757d;
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid #f1f3f4;
`;

export const CreatedDate = styled.div`
  font-size: 12px;
  color: #868e96;
  font-weight: 400;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  min-height: 200px;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;

  p {
    color: #dc3545;
    margin-bottom: 16px;
    font-size: 16px;
  }

  button {
    background: #2d6cdf;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background: #1c4ed8;
    }
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #6c757d;

  p {
    margin: 0;
    font-size: 16px;

    &:first-child {
      font-weight: 500;
      margin-bottom: 8px;
    }

    &:last-child {
      font-size: 14px;
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.img``;

export const ModalText = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  color: #6c757d;
  text-align: center;
  font-family: Nunito;
  font-style: normal;
  margin-bottom: 24px;
`;
