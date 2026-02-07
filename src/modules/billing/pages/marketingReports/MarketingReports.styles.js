import styled from 'styled-components';

export const ViewContainer = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .mobile-list-header {
    div {
      font-size: 10px !important;
    }
  }
`;

export const NavWrapper = styled.div`
  margin-bottom: 20px;

  div {
    overflow-x: auto;
    width: auto;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 16px 20px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Title = styled.p`
  color: #2d6cdf;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const DataPickerContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: max-content;
  flex-wrap: wrap;
  .calendar {
    width: 175px;
  }
  @media (max-width: 768px) {
    width: 100%;
    gap: 0;
    .calendar {
      width: 100%;
    }
  }
`;
