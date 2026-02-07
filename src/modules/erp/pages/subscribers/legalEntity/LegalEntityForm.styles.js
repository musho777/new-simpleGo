import { FormControl } from '@mui/material';
import Button from 'common-ui/button';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 25px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #1d3557;
  margin-bottom: 4px;
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #6c757d;
  margin-bottom: 24px;
  font-weight: 500;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1d3557;
  width: 100%;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 35px;
  flex-wrap: wrap;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 39px 23px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 0px 22px 0px rgba(108, 117, 125, 0.25);
  max-width: 861px;
`;

export const FormContainer = styled.div`
  margin-top: 20px;
`;

export const SecondaryButtonWithFont = styled(Button)`
  font-size: 14px;
`;

export const FullWidthInputWrapper = styled.div`
  width: 100%;
  max-width: 810px;

  /* Input component styling override */
  & input {
    max-width: 810px;
  }
`;

export const ButtonsFormWrapper = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 22px;
`;

export const BackAction = styled.div`
  display: flex;
  align-items: center;
  width: 117px;
  border-radius: 10px;
  border: 0.4px solid #d4d8dd;
  background: #fff;
  cursor: pointer;
  margin-bottom: 20px;
`;

export const BackTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1d3557;
  line-height: 9px;
`;

export const StyledFormControl = styled(FormControl)`
  width: 100%;
  border-radius: 8px;
  background: #f8f9fa;
  padding: 18px 0 30px 14px !important;
`;

export const PassportLabel = styled.label`
  color: #1d3557;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 20px;
`;

export const AddressFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 100%;
`;

export const AddressRow = styled.div`
  display: flex;
  gap: 35px;
  width: 100%;
`;

export const PhoneRow = styled.div`
  display: flex;
  gap: 35px;
  width: 100%;
  align-items: flex-start;
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f8f9fa;
    border-radius: 4px;
  }
`;

export const DeleteButtonContainer = styled.div`
  padding-right: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const WhiteSpacer = styled.div`
  background-color: white;
  height: 30px;
  width: calc(100% + 14px);
  margin-left: -14px;
`;

export const AutocompleteWrapper = styled.div`
  width: 370px;
  position: relative;
`;

export const CompactInputWrapper = styled.div`
  position: relative;
  width: 390px;

  & > div:first-child {
    min-height: auto !important;
  }
`;

export const CompactAddressWrapper = styled.div`
  position: relative;
  width: 370px;
  min-height: auto;

  & > div:first-child {
    min-height: auto !important;
  }
`;

export const SmallInputsRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;

  input {
    padding: 0 0 0 10px;
  }
`;

export const FullWidthAddressInputWrapper = styled.div`
  width: 100%;
`;

export const SelectWrapper = styled.div`
  width: 390px;

  > div {
    min-height: 44px;
  }
`;
