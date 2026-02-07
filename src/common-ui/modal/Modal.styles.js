import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  @media (max-width: 375px) {
    padding: 25px;
  }
  @media (max-width: 320px) {
    padding: 20px;
  }
`;
export const Content = styled.div`
  position: relative;
  background-color: white;
  padding: 24px 30px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: ${({ width }) => width || '430px'};
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media screen and (max-width: 375px) {
    padding: 16px 18px;
  }

  @media screen and (max-width: 320px) {
    padding: 12px 14px;
  }

  @media screen and (max-width: 768px) {
    max-width: 370px !important;
  }

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

  mask-image: linear-gradient(#000, #000);
  -webkit-mask-image: linear-gradient(#000, #000);
`;

export const Body = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  margin-bottom: 16px;
`;

export const Title = styled.h2`
  color: #212529;
  font-size: 20px;
  font-weight: 700;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 28px;
  gap: 10px;
`;

export const CloseIcon = styled.img``;

export const CloseWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

export const CloseButton = styled.div`
  cursor: pointer;
`;
