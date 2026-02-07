import styled from 'styled-components';

export const ErpAddressesTabsStyled = styled.div`
  display: flex;
  flex-wrap: nowrap;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  max-width: 731px;
  height: 49px;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }

  @media (max-width: 480px) {
    height: auto;
    flex-wrap: wrap;
    overflow-x: visible;
    box-shadow: none;
    padding: 0;
    margin: 0;
  }
`;

export const TabButton = styled.button`
  position: relative;
  background: transparent;
  padding: 10px 25px;
  border: none;
  color: ${({ $active }) => ($active ? '#007bff' : 'rgba(108, 117, 125, 1)')};
  font-size: 14px;
  font-weight: 400;
  line-height: 9px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.2s;
  text-decoration: none;
  display: flex;
  align-items: center;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    opacity: 0.9;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ $active }) => ($active ? '50%' : '0')};
    height: 3px;
    background-color: rgba(45, 108, 223, 1);
    transition: width 0.3s ease;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    flex: 1 0 calc(50% - 10px);
    margin: 5px;
    padding: 12px 10px;
    text-align: center;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background: ${({ $active }) => ($active ? '#f0f7ff' : 'white')};

    &::after {
      display: none;
    }
  }
`;

export const ErpAddressesContainer = styled.div`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const Title = styled.h1`
  color: #1d3557;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 16px;
    padding-left: 10px;
  }
`;

export const TabContent = styled.div`
  font-size: 24px;
  margin-top: 20px;

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;
