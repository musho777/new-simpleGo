import styled from 'styled-components';

export const Container = styled.div`
  padding: 27px 30px 25px 30px;
  margin: 20px 20% 20px 20px;
  background-color: #fff;
  border-radius: 10px;

  @media screen and (max-width: 1400px) {
    flex-direction: column;
    margin: 20px !important;
  }
`;

export const Title = styled.h1`
  color: #212529;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 16px;
`;

export const Wrapper = styled.div`
  border-top: 0.4px solid #dfdfdf;
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  padding: 20px 0;
  width: 100%;
  gap: 80px;

  @media screen and (max-width: 950px) {
    flex-direction: column;
  }
`;

export const LeftContent = styled.div`
  width: 45%;
  max-width: 45%;
  min-width: 45%;
  @media screen and (max-width: 950px) {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
`;

export const RightContent = styled.div`
  width: 45%;
  max-width: 45%;
  min-width: 45%;
  @media screen and (max-width: 950px) {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
`;

export const Row = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .select-option {
    width: 100%;
  }
`;

export const TimeSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  .w-75 {
    width: 130px;
    min-height: 60px !important;
  }

  p {
    color: #6c757d;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
  }
`;

export const Label = styled.div`
  color: #212529;
  font-size: 13px;
  font-weight: 600;
  padding-top: 18px;
`;

export const Form = styled.form``;

export const BtnWrapper = styled.div`
  display: flex;
  padding: 30px 0;
  gap: 32px;
  justify-content: end;

  button {
    max-width: 200px;
  }
`;

export const SwitchWrapper = styled.div`
  display: flex;
  padding: 10px 0;
  gap: 10px;
  justify-content: end;
  font-size: 13px;
  line-height: 24px;
  font-style: normal;
  font-weight: bold;
  color: #212529;
`;

export const AppointmentOpenCloseText = styled.p`
  color: #1d3557;
  color: ${({ $isOpen }) => ($isOpen ? '#1d3557' : '#2D6CDF')};
  font-size: 16px;
  font-weight: 700;
  text-decoration-line: underline;
  cursor: pointer;
  margin-bottom: 30px;
  margin-top: 30px;
  width: fit-content;

  &:hover {
    opacity: 0.7;
  }
`;

export const TextEditorWrapper = styled.div`
  margin-bottom: 18px;
`;

export const Icon = styled.img``;

export const UploadWrapper = styled.div`
  mask-image: linear-gradient(#000, #000);
  -webkit-mask-image: linear-gradient(#000, #000);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  overflow-y: auto;
  max-height: 350px;
`;
