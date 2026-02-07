import styled from 'styled-components';

export const Container = styled.div`
  min-height: 44px;
  height: auto;
  width: 100%;
  border-radius: 10px;
  border: 0.5px solid ${(props) => (props.$active ? '#FF6A00' : 'transparent')};
  border-left: 3px solid #ff6a00;
  background: ${(props) => (props.$highlighted ? '#2D6CDF1A' : '#fbfcff')};
  padding: 5px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  transition: background-color 0.3s ease;

  &:hover {
    background: #ff6a0008;
  }

  @media (max-width: 417px) {
    flex-wrap: wrap;
    padding: 16px;
    gap: 10px;
  }
`;

export const Icon = styled.img`
  cursor: pointer;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 99999;
  gap: 20px;
  padding: 5px 10px 16px 10px;

  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);

  width: 320px;
  /* height: 579px; */
  flex-shrink: 0;

  bottom: 0;
  right: -350px;

  @media (max-width: 1400px) {
    bottom: 50px;
    right: 0px;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DetailIcon = styled.img``;

export const AppointmentLabel = styled.p`
  color: #6c757d;
  font-size: 12px;
  font-weight: 600;
  line-height: 24px;
  width: 80px;
`;

export const AppointmentValue = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 600;
  width: 175px;
`;

export const CloseIconWrapper = styled.div`
  width: 24px;
  height: 24px;
`;

export const CloseContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

export const DescriptionArea = styled.div`
  width: 100%;
  height: 263px;
  padding: 16px;

  border-radius: 10px;
  border: 1px solid #d4d8dd;
  background: #fbfcff;

  color: #212529;
  font-size: 14px;
  line-height: 21px;
  line-break: anywhere;
  overflow-y: auto;
`;

export const DetailColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 30px 25px 30px;
`;

export const WeeklyLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: transparent;
  /* justify-content: space-between; */
  gap: 10px;
`;

export const MarginRightFifty = styled.p`
  margin-right: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
`;
export const DisplayFlex = styled.div`
  display: flex;
`;
export const MarginWeekDay = styled.p`
  margin: 0 10px 0 0;
`;
