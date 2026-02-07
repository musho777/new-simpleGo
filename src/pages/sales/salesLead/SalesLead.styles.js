import styled from 'styled-components';

export const ViewContainer = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media screen and (max-width: 500px) {
    padding: 10px 10px;
  }
`;

export const InfoCardWrapper = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  margin-bottom: 40px;

  > div {
    width: 32%;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 10px;

    > div {
      width: 100%;
    }
  }
`;

export const BackBox = styled.div`
  width: 150px;
  height: 38px;
  margin-top: 20px;
  margin-left: 1%;

  button {
    font-size: 14px;
    font-weight: 600;
  }
`;

export const Cardbody = styled.div`
  overflow-y: auto;
  height: 310px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    transition: background-color 0.3s;
    border-radius: 12px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #6c757d;
  }

  &:hover::-webkit-scrollbar-track {
    background: transparent;
  }

  &:hover::-webkit-scrollbar {
    width: 4px;
  }

  @media (max-width: 768px) {
    max-height: 70vh;
    overflow-y: auto;
  }
`;

export const AppointmentText = styled.p`
  font-weight: 700;
  font-style: Bold;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0px;
  vertical-align: middle;
  text-decoration: underline;
  text-decoration-style: solid;
  text-decoration-thickness: 0%;
  color: ${({ $color }) => $color || '#6c757d'};
  cursor: pointer;
  width: max-content;
`;

export const AppointmentWrapper = styled.div`
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  padding-top: 25px;
  padding-bottom: 45px;
`;

export const Header = styled.div`
  padding: 20px;
  border: 1px solid rgba(223, 223, 223, 1);
  background-color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  .h-38 {
    height: 38px;
    font-size: 14px;
    font-weight: 600;
  }

  @media (max-width: 533px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

export const HeaderText = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  color: #1d3557;
`;

export const Icon = styled.img`
  cursor: pointer;
`;

export const Acton = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const IconWrapper = styled.div`
  position: relative;
`;

export const Form = styled.form`
  .max-count-title {
    display: none;
  }
  @media (max-width: 365px) {
    max-width: 300px;
    margin: 0 auto;
  }
`;

export const CardWrapper = styled.div``;

export const NoteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

export const TableWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 1024px) {
    max-height: 75vh;
    overflow-y: auto;
  }
`;

export const OfferWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;
  height: 380px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const SearchTitle = styled.p`
  font-family: Nunito;
  font-weight: 700;
  font-style: Bold;
  font-size: 22px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  color: #212529;
`;

export const SearchDescription = styled.p`
  font-family: Nunito;
  font-weight: 400;
  font-style: Regular;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0%;
  text-align: center;
  color: #6c757d;
  @media (max-width: 390px) {
    max-width: 370px;
    margin: 0 auto;
  }
  @media (max-width: 365px) {
    max-width: 300px;
    margin: 0 auto;
  }
`;
export const SearchBox = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputWrapper = styled.div``;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const OrderInputWrapper = styled.div`
  width: 50%;
`;

export const BackTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1d3557;
  line-height: 9px;

  @media (max-width: 533px) {
    display: block;
    text-align: center;
    white-space: normal;
  }
`;

export const BackAction = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 117px;
  height: 40px;
  border-radius: 10px;
  border: 0.4px solid #d4d8dd;
  background: #fff;
  cursor: pointer;

  @media (max-width: 533px) {
    justify-content: center;
    width: 100%;
  }
`;

export const LoadContainer = styled.div`
  width: 100%;
  min-height: 500px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingIcon = styled.img`
  animation: rotate 1s linear infinite;
  width: 100px;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const NextContact = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 533px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;

    button {
      width: 100%;
    }
  }
`;
