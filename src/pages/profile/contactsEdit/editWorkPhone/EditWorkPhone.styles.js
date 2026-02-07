import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;

  .w-132 {
    width: 150px;
  }
  .w-80 {
    width: 80px;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  input {
    margin-left: 17px;

    &:first-child {
      margin-left: 0;
    }
  }

  .mt-13 {
    margin-top: 13px;
  }

  .otp-btn {
    width: 316px;
    height: 48px;
  }
  .error-message {
    color: red;
    margin-top: 8px;
    font-size: 14px;
  }
`;

export const FormTitle = styled.h2`
  color: #212529;
  font-size: 20px;
  font-weight: 700;
`;

export const FormDescription = styled.p`
  color: #6c757d;
  text-align: center;
  font-size: 14px;
`;

export const PhoneStyle = styled.p`
  color: #212529;
  font-size: 13px;
  font-weight: 600;
`;

export const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 20px 0 20px 0;
`;

export const CloseIcon = styled.img`
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
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 5px;
  padding-right: 5px;

  .form-control {
    max-width: 183px;
  }
`;
