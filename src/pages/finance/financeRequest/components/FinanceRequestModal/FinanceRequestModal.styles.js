import styled from 'styled-components';

export const Form = styled.form`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 1080px) {
    padding: 16px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 10px;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 1080px) {
    gap: 16px;
  }

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 1600px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const InlineRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const FullWidthField = styled.div`
  grid-column: span 2;

  @media (max-width: 1080px) {
    grid-column: span 1;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
    gap: 10px;

    button {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    margin-top: 16px;
    gap: 8px;
  }
`;

export const ExistingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: rgba(250, 250, 250, 0.7);
  padding: 10px;
  border: 1px solid #d4d8dd;
  border-radius: 8.66px;
  margin: 15px 0;
`;

export const SwitchWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const Label = styled.div`
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-self: start;
  color: ${({ customColor }) => customColor || 'black'};
  margin-top: 2px;
`;

export const ErrorText = styled.legend`
  color: #e63946;
  font-weight: 600;
  padding: 3px 0 2px 0;
  display: flex;
  gap: 3px;
  justify-content: start;
  font-size: 12px;
  line-height: 12px;
`;

export const AsyncSelectWrapper = styled.div`
  > div {
    min-height: 0;
  }
`;

export const RadioButtonWrapper = styled.div`
  margin-top: 10px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  z-index: 9999;
`;
