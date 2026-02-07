import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 30px;

  .max-count-title {
    display: none;
  }
`;

export const EmptyViewWrapper = styled.div`
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  gap: 22px;

  div {
    min-height: 0;
  }

  button {
    font-weight: 600;
  }

  input {
    width: 100%;
    padding: 0 16px;
  }
`;

export const Title = styled.h2`
  color: #212529;
  font-size: 18px;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
`;

export const ScheduleCard = styled.div`
  width: 100%;
  height: auto;
  padding: 20px 20px 10px 20px;
  border-left: 3px solid #ff6a00;
  border-radius: 10px;
  background-color: white;
`;

export const ShiftInfo = styled.span`
  color: #6c757d;
  font-size: 14px;
  font-weight: 600;
  margin: 0 5px;
`;
export const ShiftText = styled.h2`
  color: black;
  margin-left: 10px;
  font-size: 14px;
  font-weight: 600;
`;
export const ShiftFlex = styled.h2`
  display: flex;
  margin: 10px 0;
`;

export const ShiftControllers = styled.div`
  display: flex;
  gap: 15px;
  min-height: 40px;
  justify-content: end;
  align-items: center;
`;

export const ShiftControl = styled.div`
  cursor: pointer;
`;

export const AllShifts = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
  flex-wrap: wrap;
`;

export const ShiftWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  width: 100%;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
  }
`;

export const HeadOfShift = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  button {
    width: 170px;
  }

  label {
    display: none;
  }

  @media (max-width: 490px) {
    flex-direction: column;
    gap: 20px;
    div {
      min-height: 0;
    }
    button {
      margin-bottom: 20px;
    }
  }
`;

export const ErrorForInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 12px;

  p {
    color: #e63946;
    font-weight: 600;
    padding: 3px 0 2px 0;
    display: flex;
    gap: 3px;
    justify-content: end;
    align-items: center;
    font-size: 12px;
    line-height: 12px;
  }
`;

export const DeleteConfirmText = styled.p`
  color: #6c757d;
  font-size: 14px;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const DeleteTitle = styled.h2`
  color: #212529;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

export const TitleRate = styled.h2`
  color: #212529;
  font-size: 13px;
  font-weight: 600;
`;

export const Step2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TimeSelectorWrapper = styled.div``;
