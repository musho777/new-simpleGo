import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  > div {
    min-height: 0;
    width: 200px;
  }
  label {
    display: none;
  }
  .action-button {
    max-height: 38px;
    max-width: 120px;
    font-size: 12px;
    color: #212529;
    font-style: normal;
    line-height: normal;
    img {
      color: white;
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  > div {
    min-height: 38px;
  }
  input {
    padding: 0 10px;
    height: 38px;
  }
  button {
    width: 29px;
    height: 29px;
    background-color: #2d6cdf;
    color: white;
    border: 1px solid #2d6cdf;
    transition: all 0.2s ease;
    &:hover {
      background-color: #2d6cdf;
      color: white;
      transform: scale(1.05);
    }
  }
`;

export const Line = styled.div`
  border-top: 1px solid #dfdfdf;
  padding: 10px 0;
  width: 100%;
`;

export const ClearAllText = styled.span`
  cursor: pointer;
  color: #212529;
  font-size: 14px;
  font-weight: 600;
  width: 57px;
  text-decoration: underline;
`;

export const ClearAllRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const CloseIconWrapper = styled.div`
  cursor: pointer;
  height: 15px;
`;

export const Icon = styled.img``;

export const CustomDatePickerWrapper = styled.div`
  width: 173px;

  .MuiOutlinedInput-root {
    height: 44px;
  }
`;
