import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 1024px) {
    padding: 18px 18px;
    gap: 20px;
  }

  @media (max-width: 768px) {
    padding: 16px 16px;
    gap: 18px;
  }

  @media (max-width: 480px) {
    padding: 12px 12px;
    gap: 16px;
  }
`;

export const TabWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const PackageInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  button {
    width: max-content;
    @media (max-width: 768px) {
      font-size: 11px;
      padding: 0px 8px;
      height: 36px;
    }
  }
`;

export const BackToListBtn = styled.div`
  border-radius: 10px;
  border: 0.4px solid #d4d8dd;
  background: #fff;
  width: 100px;
  height: 40px;
  color: #1d3557;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 9px; /* 64.286% */

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;
