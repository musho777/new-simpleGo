import styled from 'styled-components';

export const Container = styled.div`
  padding: 25px;

  .back-button {
    width: 145px;
    margin-top: 20px;

    color: #1d3557;
    font-size: 14px;

    span {
      margin-right: -3px;
    }
  }
`;

export const Content = styled.div`
  margin-top: 17px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  align-items: start;

  @media (max-width: 767px) {
    flex-direction: column-reverse;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 16px;
  align-items: start;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
export const PersonalFLex = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PersonalAndServiceBox = styled.div`
  margin-top: 1rem;
`;

export const ButtonWrapper = styled.div`
  margin-top: 16px;
  button {
    width: 100px;
    height: 40px;

    font-size: 14px;
    font-weight: 600;
    line-height: 9px;

    color: #1d3557;
    background: #fff;
  }
`;

export const PersonalInventoryWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
  > button {
    width: max-content;
  }
`;

export const ModalContent = styled.div`
  padding: 20px;
  text-align: center;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 20px;
`;

export const ModalText = styled.p`
  margin-bottom: 30px;
`;
