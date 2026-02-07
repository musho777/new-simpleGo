import styled, { createGlobalStyle } from 'styled-components';

export const OfferInfoModalStyles = createGlobalStyle`
  .offer-info-modal {
    padding: 20px 0;

    /* Target the close icon specifically */
    > div > div > img,
    div[class*="CloseWrapper"] img,
    div[class*="CloseButton"] img,
    div[class*="CloseIcon"] {
      padding: 0 10px;
    }
  }
`;

export const ModalContent = styled.div``;

export const OfferField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  &:last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const OfferLabel = styled.div`
  color: #212529;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

export const OfferValue = styled.div`
  font-size: 14px;
  color: #212529;
`;

export const OfferHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #ecf1fb;
  padding: 15px 20px;
  p {
    font-size: 14px;
    color: #212529;
  }
  > div {
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;

export const Icon = styled.img`
  width: 16px;
  height: 16px;
`;
