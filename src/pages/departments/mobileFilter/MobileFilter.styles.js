import styled from 'styled-components';

export const Container = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

export const RowFilter = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  gap: 14px;

  div {
    width: 100%;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: end;

  button {
    background-color: white;

    color: #212529;
    font-size: 12px;
    font-weight: 600;

    max-width: 180px;
    height: 38px;
  }
`;

export const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 30px 30px 0 0;
  padding: 15px 30px 35px 30px;
  box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease-out;
  display: flex;
  z-index: 99999;
  flex-direction: column;

  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }

  label {
    color: #6c757d;
    font-weight: 700;
  }
`;

export const Icon = styled.img``;

export const LineWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 0.5px solid #dfdfdf;
  margin-bottom: 16px;
`;

export const DescLabel = styled.p`
  color: #212529;
  font-size: 16px;
  font-weight: 700;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: 150px;
`;
