import backImageMobile from 'assets/notFound/404Mobile.png';
import backImageTablet from 'assets/notFound/404Tablet.png';
import backImageWeb from 'assets/notFound/404Web.png';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: #1d3557;
  width: 100%;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: start;
  align-items: center;
  background-image: url(${backImageWeb});
  background-size: contain;
  background-position: right center;
  background-repeat: no-repeat;
  @media screen and (max-width: 1200px) {
    background-image: url(${backImageWeb});
    background-size: cover;
  }
  @media screen and (max-width: 991px) {
    background-image: url(${backImageTablet});
    background-position: top;
    justify-content: center;
    align-items: flex-end;
  }
  @media screen and (max-width: 567px) {
    background-image: url(${backImageMobile});
    background-size: cover;
  }
  @media screen and (max-width: 400px) {
    background-size: contain;
  }
`;

export const ButtonBox = styled.div`
  min-width: 120px;
  max-width: 120px;
  @media screen and (max-width: 991px) {
    min-width: 120px;
    margin: 0 auto;
  }
  @media screen and (max-width: 930px) {
    margin-bottom: 30px;
  }
  @media screen and (max-width: 791px) {
    margin-bottom: 90px;
  }
  @media screen and (max-width: 791px) {
    margin-bottom: 90px;
  }
  @media screen and (max-width: 567px) {
    margin-bottom: 150px;
  }
`;

export const NotFoundMessage = styled.p`
  color: #d7d7d7;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.65px;
  line-height: 24px;
  font-style: normal;
`;

export const PageNotFoundMessage = styled.h3`
  color: #ffffff;
  font-weight: 400;
  font-size: 28px;
  line-height: 42px;
  font-style: normal;
`;

export const WrongUrlMessage = styled.h2`
  color: #ffffff;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const LeftBack = styled.div`
  margin-left: 200px;
  max-width: 400px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 16px;
  @media screen and (max-width: 1300px) {
    margin-left: 50px;
  }
  @media screen and (max-width: 1050px) {
    max-width: 300px;
  }
  @media screen and (max-width: 991px) {
    margin-left: 0;
    text-align: center;
    gap: 5px;
    max-width: 600px;
  }
  @media screen and (max-width: 590px) {
    max-width: 330px;
    gap: 10px;
  }
`;
