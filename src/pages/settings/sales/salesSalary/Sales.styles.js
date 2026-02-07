import styled from 'styled-components';

export const SalesTabs = styled.div`
  display: flex;
  flex-wrap: nowrap;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  width: max-content;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 10px;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background: #6c757d;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #6c757d;
    }
  }
`;

export const ErrorText = styled.legend`
  color: #e63946;
  font-weight: 600;
  display: flex;
  gap: 3px;
  justify-content: end;
  font-size: 12px;
  line-height: 12px;
`;

export const TabButton = styled.button`
  position: relative;
  background: transparent;
  padding: 13px 20px;
  border: none;
  color: ${({ $active }) => ($active ? '#007bff' : 'rgba(108, 117, 125, 1)')};
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.2s;
  text-decoration: none;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  white-space: nowrap;

  &:hover {
    opacity: 0.9;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ $active }) => ($active ? '50%' : '0')};
    height: 3px;
    background-color: rgba(45, 108, 223, 1);
    transition: width 0.3s ease;
  }
`;

export const SalesContainer = styled.div`
  padding: 20px;
`;

export const TabContent = styled.div`
  font-size: 24px;
  margin-top: 20px;
`;

export const BtnWrapper = styled.div`
  width: max-content;
  margin-right: 20px;
  .h-38 {
    height: 38px;
    font-size: 14px;
    font-weight: 600;
  }
  @media (max-width: 593px) {
    margin-right: 0;
    display: flex;
    gap: 10px;
    width: 100%;
    padding: 10px;
    flex-wrap: wrap;
  }
`;

export const Form = styled.form`
  .color-selector-input {
    top: -320px !important;
  }
`;

export const ShiftControl = styled.div`
  cursor: pointer;
`;

export const EllipsisCell = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 550px) {
    width: 70p;
  }
`;

export const LeadSourceFilter = styled.div`
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 20px 0;
  @media (max-width: 550px) {
    height: auto;
    flex-direction: column;
    margin: 0;
  }
`;

export const LeadFilterBox = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-left: 20px;

  .max-count-title {
    display: none;
  }
  @media (max-width: 550px) {
    flex-direction: column;
    gap: 5px;
    margin: 10px 0;
  }
`;

export const CountPriceCurrencyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  > div {
    width: 100%;
  }
`;

export const InputWrapper = styled.div`
  flex: 1;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 80vh;
`;

export const FilterSelectBox = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    margin: 0;
  }
  > div {
    width: 120px;
    min-height: 0;
  }
  .async-select {
    display: flex;
  }
  @media (max-width: 550px) {
    width: 100%;
    > div {
      width: 100%;
      min-height: 0;
    }
  }
`;

export const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 22px 0;
  width: 100%;
  justify-content: end;
`;

export const EnableSwitchContainer = styled.div`
  margin-top: 16px;
`;

export const EnableSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;
`;

export const SwitchLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
`;
export const WorkflowSwitch = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: end;
`;
export const Icon = styled.img``;

export const TrashIcon = styled.img`
  width: 30px;
  height: 50px;
`;

export const DatePickerWrapper = styled.div`
  height: 80px;
  flex: 1;
`;

export const AddStep = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: center;
  justify-content: flex-end;
  button {
    width: max-content;
    color: #2d6cdf;
    font-size: 14px;
    font-weight: 700;
    max-width: 160px;
  }
`;

export const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  > div {
    min-height: 0;
    width: 50%;
  }
`;

export const Label = styled.div`
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  display: flex;
  align-self: start;
  margin-bottom: 5px;
  color: ${({ customColor }) => customColor || 'black'};

  span {
    color: #e63946;
    margin-left: 2px;
  }
`;

export const AddResponseOption = styled.p`
  cursor: pointer;
  color: #155dfc;
  font-size: 15px;
  font-weight: 700;
  text-align: right;
`;

export const OptionInputWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  .AsyncSelect {
    width: 100%;
  }
  > div {
    min-height: 40px;
  }
`;

export const ResponseOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AddResponseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DelateStepText = styled.div`
  background-color: rgba(255, 0, 0, 0.2);
  border-radius: 10px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 12px;
  padding-bottom: 2px;
  cursor: pointer;
`;

export const DelateStep = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;
