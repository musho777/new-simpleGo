import styled from 'styled-components';

export const DiagramsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding-bottom: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (max-width: 768px) {
    gap: 12px;
    padding: 12px 0;
  }

  @media (max-width: 480px) {
    gap: 8px;
    padding: 8px 0;
  }
`;

export const DiagramCard = styled.div`
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0 22px 0 rgba(0, 0, 0, 0.15);
  padding: 20px;
  min-height: 306px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 16px;
    min-height: 280px;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    min-height: 250px;
    border-radius: 6px;
  }
`;

export const DiagramTitle = styled.h3`
  color: #6c757d;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const DiagramText = styled.h3`
  color: #6c757d;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const DiagramPlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
`;

export const ChartLabel = styled.div`
  color: ${({ color }) => color || '#5cdcb4'};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  height: 300px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: stretch;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

export const ChartLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 8px;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

export const DateFilterWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: end;
`;

export const DatePickerWrapper = styled.div`
  width: 180px;
  .MuiFormControl-root {
    background-color: white;
    border-radius: 8px;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1d3557;
  margin: 0;
`;

export const PageWrapper = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  @media screen and (max-width: 500px) {
    padding: 10px 10px;
  }
`;
