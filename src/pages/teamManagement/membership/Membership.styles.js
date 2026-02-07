import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  width: 100%;

  @media screen and (max-width: 500px) {
    padding: 10px;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 22px;
  padding: 0 20px;

  @media screen and (max-width: 500px) {
    padding: 0 10px;
  }

  @media (max-width: 922px) {
    flex-direction: column;
    gap: 12px;
    align-items: start;
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
  @media screen and (max-width: 922px) {
    width: 100%;
  }
  .max-count-title {
    display: none;
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

export const Avatar = styled.img`
  border-radius: 9999px;
  width: 36px;
  height: 36px;
`;
