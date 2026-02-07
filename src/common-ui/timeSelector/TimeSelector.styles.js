import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 16px;

  .time-inp {
    padding: 0 0 0 32px !important;
  }

  .single-time-inp {
    padding: 0 0 0 32px !important;
    width: 110px;
  }

  .m-t-18 {
    margin-top: 22px;
  }

  .b-t-r {
    border-radius: 4px 4px 0 0;
  }
  .b-b-r {
    border-radius: 0 0 4px 4px;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 4px;
`;

export const StartEndTimeToggle = styled.div`
  cursor: pointer;
  color: ${({ $isActive }) => ($isActive ? '#2d6cdf' : '#6c757d')};
  background-color: ${({ $isActive }) => ($isActive ? '#2d6cdf1a' : 'transparent')};
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  width: 120px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  &:hover {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.12);
  }
`;

export const SelectWrapper = styled.div`
  > div {
    min-height: 75px;
  }
`;
