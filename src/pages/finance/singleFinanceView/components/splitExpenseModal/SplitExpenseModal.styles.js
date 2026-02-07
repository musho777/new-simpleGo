import styled from 'styled-components';

export const Icon = styled.img``;
export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  div {
    min-height: auto;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Text = styled.p`
  color: #2d6cdf;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const InputWrapper = styled.div`
  flex: 1;

  ${({ disabled }) =>
    disabled &&
    `
    .MuiOutlinedInput-root.Mui-disabled {
      background-color: #f5f5f5;
      opacity: 0.6;
      cursor: not-allowed;
      
      fieldset {
        border-color: #d0d0d0 !important;
      }
      
      input {
        color: #999 !important;
        cursor: not-allowed;
      }
      
      &:hover fieldset {
        border-color: #d0d0d0 !important;
        box-shadow: none !important;
      }
      
      img {
        opacity: 0.5;
        cursor: not-allowed !important;
      }
    }
  `}
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

export const SplitButton = styled.div`
  width: 100%;
  button {
    background-color: #2d6cdf;
    border-color: #2d6cdf;
    &:hover {
      background-color: #1f56c2;
      border-color: #1f56c2;
    }
  }
  div {
    color: white;
  }
`;

export const AmountInfo = styled.div`
  background-color: #2d6cdf1a;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const KeyText = styled.p`
  color: #6c757d;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

export const AmountText = styled.p`
  color: #2d6cdf;
  font-size: 18px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

export const MonthlyAmount = styled.p`
  color: #212529;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const MonthlyAmountText = styled.p`
  color: #6c757d;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
`;

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
