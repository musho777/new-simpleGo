import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 30px;
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 22px;
  padding: 0 30px;

  @media (max-width: 922px) {
    flex-direction: column;
    gap: 12px;
    align-items: start;
    padding: 5px;
  }
`;

export const Content = styled.div`
  width: 48%;
  border-radius: 20px;
  background: #fff;
  min-height: 250px;
  max-height: 80vh;
  padding: 24px 30px;
  display: flex;
  flex-direction: column;
  .max-count-title {
    display: none;
  }
  @media (max-width: 769px) {
    width: 100%;
  }
  visibility: ${({ $isVisible }) => ($isVisible ? 'hidden' : 'visible')};
`;

export const TitleWrapper = styled.div`
  width: 100%;
  padding-bottom: 14px;
  margin-bottom: 20px;
  border-bottom: 0.5px solid #dfdfdf;

  color: #212529;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
`;

export const BtnWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  padding-top: 16px;
  margin-top: auto;

  button {
    max-width: 107px;
  }
`;

export const Icon = styled.img``;

export const LimitDiv = styled.div`
  max-width: 140px;
  width: 100%;
`;

export const ChooseDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 500px;
  overflow-y: auto;
  flex-direction: column;
`;

export const ChooseText = styled.h2`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #6c757d;
  margin-top: 10px;
`;

export const SelectBox = styled.div`
  font-size: 16px;
`;
