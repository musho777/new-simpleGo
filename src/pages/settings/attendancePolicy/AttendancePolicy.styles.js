import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 30px;
  height: 70vh;

  .empty-view-btn {
    margin-top: 24px;
  }
`;

export const Card = styled.div`
  border-radius: 10px;
  border-left: 3px solid #ff6a00;
  background: #fff;
  padding: 20px;
  margin-top: 20px;

  width: 359px;
  height: 322px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .max-count-title {
    display: none;
  }
`;

export const Icon = styled.img`
  object-fit: contain;
  height: 18px;
`;

export const Label = styled.h2`
  color: #212529;
  font-size: 18px;
  font-weight: 600;
`;

export const DetailLabel = styled.p`
  color: #6c757d;
  font-size: 14px;
`;

export const DetailValue = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 600;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  padding-top: 14px;
  border-top: 0.4px solid #dfdfdf;

  img {
    cursor: pointer;
  }

  button {
    background: none;
    border: none;
  }
`;
