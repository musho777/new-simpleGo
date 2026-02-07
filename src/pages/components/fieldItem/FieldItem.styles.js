import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  border-radius: 10px;
  background: #fff;
  border: ${({ $hideBorder }) =>
    $hideBorder ? 'none' : '0.4px solid rgba(212, 216, 221, 0.5)'};

  padding: ${({ $hideBorder }) => ($hideBorder ? 0 : '22px 30px')};

  @media screen and (max-width: 585px) {
    padding: 22px 8px !important;
  }
`;

export const TitleWrapper = styled.div`
  border-bottom: 0.5px solid #dfdfdf;
  padding-bottom: 16px;
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #212529;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
`;

export const Content = styled.div``;

export const Item = styled.div`
  border-radius: 10px;
  border: ${({ $bordered }) => ($bordered !== false ? '0.5px solid #d4d8dd' : 'none')};
  padding: ${({ $bordered }) => ($bordered !== false ? '15px' : 'none')};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: ${({ $opacity }) => ($opacity ? '0.5' : '1')};
  color: #212529;
  font-size: 14px;
  font-weight: 400;
  background: ${({ $isSelected }) => ($isSelected ? '#F0F4FA' : 'transparent')};

  @media screen and (max-width: 400px) {
    flex-wrap: wrap;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const LeftItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const CenterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const RightItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
`;

export const EditIcon = styled.img`
  cursor: pointer;
`;

export const EditIconWrapper = styled.div``;

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

export const LoadContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
