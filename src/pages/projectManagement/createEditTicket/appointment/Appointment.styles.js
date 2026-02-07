import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1430px) {
    gap: 30px;
  }

  @media screen and (max-width: 950px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  max-width: 45%;
  min-width: 45%;
  @media screen and (max-width: 950px) {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
`;

export const TextAreaWrapper = styled.div`
  .textArea {
    resize: none;
    &:hover {
      opacity: 1;
    }
  }
`;

export const LeftColum = styled.div`
  width: 45%;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;

  .choose-days {
    width: 160px;
  }

  .appt-select {
    min-width: 160px;
  }
  .frequency-select {
    max-width: 127px;
  }
  @media screen and (max-width: 1400px) {
    gap: 12px;
  }

  @media screen and (max-width: 700px) {
    flex-wrap: wrap;

    .frequency-select {
      width: 127px;
    }

    .appt-select {
      min-width: 127px;
    }
  }
`;

export const TimeSelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const DatePickWrapper = styled.div`
  max-width: 196px;
`;

export const WeekDayLabel = styled.div`
  color: #2d6cdf;
  font-size: 14px;
  font-weight: 600;
  width: 120px;

  border-radius: 10px;
  background: rgba(45, 108, 223, 0.1);

  display: flex;
  height: 44px;
  padding: 15px 28px;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 670px),
    screen and (min-width: 1050px) and (max-width: 1200px) {
    font-size: 12px;
    width: 92px;
    padding: 15px 8px;
  }
`;

export const WeekdayContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  @media screen and (max-width: 670px) {
    gap: 4px;
  }

  @media screen and (max-width: 430px) {
    flex-wrap: wrap;
  }
`;

export const CommunicationTitle = styled.p`
  color: #212529;
  font-size: 13px;
  font-weight: 600;
  font-size: 13px;
  font-weight: 600;

  span {
    color: #e63946;
  }
`;

export const CommunicationLabel = styled.span`
  color: #2d6cdf;
  font-size: 14px;
  font-weight: 600;
  width: 150px;
  min-width: 100px;
  max-width: 100px;

  border-radius: 10px;
  background: rgba(45, 108, 223, 0.1);

  display: flex;
  height: 44px;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 670px),
    screen and (min-width: 1050px) and (max-width: 1200px) {
    font-size: 12px;
    width: 92px;
    max-width: 92px;
    padding: 15px 8px;
  }
`;

export const CommunicationRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  label {
    display: none;
  }
  .input-div {
    width: 265px;
  }

  .flag-dropdown {
    width: 65px;
  }

  div {
    min-height: 0;
  }

  @media screen and (max-width: 670px), screen and (min-width: 950px) and (max-width: 1600px) {
    gap: 4px;

    .form-control {
      width: 140px;
    }
    .input-div {
      width: 265px;
    }
  }

  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const CommunicationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DisabledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: end;
  padding-top: 30px;
`;

export const TrashIcon = styled.img`
  cursor: pointer;
  width: 32px;
`;
