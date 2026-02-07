import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  gap: 20px;
  > div {
    width: max-content;
    min-width: 330px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const LoadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const LoadingIcon = styled.img`
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const OneDayCardWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  > div {
    width: max-content;
    min-width: 330px;
  }

  @media (max-width: 769px) {
    > div {
      min-width: 100%;
      width: 100%;
    }
  }
`;
