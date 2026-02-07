import styled from 'styled-components';

export const Container = styled.div`
  input {
    max-width: 270px;
    margin-bottom: 20px;
  }

  label {
    color: #6c757d;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  gap: 10px;
  .w-91 {
    width: 120px;
  }

  @media screen and (max-width: 534px) {
    border-bottom: 0.5px solid #eeeeee;
    padding: 16px 0;

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const AddPhoneLink = styled.p`
  color: #2d6cdf;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  margin: 16px 0;
`;

export const Group = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .form-control {
    max-width: 183px;
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  margin-top: 8px;

  .w-132 {
    width: 150px;
  }
  .w-80 {
    width: 80px;
  }
`;

export const Form = styled.form``;

export const TrashIcon = styled.img`
  cursor: pointer;
`;

export const Tooltip = styled.div`
  position: absolute;
  background-color: #f4a261;
  color: #fff;
  padding: 5px 10px;
  border-radius: 18px;
  font-size: 12px;
  font-weight: 700;
  top: -23px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease-in-out;
  white-space: nowrap;
  z-index: 1;
`;

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 13px;
  &:hover ${Tooltip} {
    opacity: 1;
  }
`;

export const PendingIcon = styled.img`
  cursor: ${({ $eventsOff }) => ($eventsOff ? 'pointer' : 'default')};
  margin-top: 20px;
`;
