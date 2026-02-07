import styled from 'styled-components';
import theme from 'styles/theme';

export const BtnWrapper = styled.div`
  max-width: 150px;
  button {
    height: 38px;
    font-size: 14px;
    font-weight: 600;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px 0;
  align-items: center;
  gap: 12px;
`;

export const Form = styled.form`
  .f-w {
    width: 100%;
  }

  .react-tel-input .country-list {
    max-height: 150px !important;
    overflow-y: auto !important;
  }

  display: flex;
  flex-direction: column;
`;

export const ViewContainer = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: calc(100vh - 80px);
  @media screen and (max-width: 500px) {
    padding: 10px 10px;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${theme.colors.white};
  border-radius: 8px 8px 0 0;

  @media (max-width: 767px) {
    display: none;
  }
`;
export const FilterActions = styled.div`
  display: flex;
  width: 100%;
  padding: 22px 30px;
  justify-content: space-between;
  align-items: center;
  .h-38 {
    height: 38px !important;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  .action-button {
    max-height: 38px;
    max-width: 180px;
    color: ${theme.colors.primaryText};
    font-size: 12px;
    font-style: normal;
    line-height: normal;
  }
`;

export const Filters = styled.div`
  border-top: 1px solid #dfdfdf80;
  padding: 10px 10px 0 30px;
  display: ${({ $showFilters }) => ($showFilters ? 'flex' : 'none')};
  width: 100%;
  gap: 12px;
  justify-content: space-between;
  input {
    max-width: 200px;
    border-radius: 10px;
  }
  label {
    color: #6c757d;
    font-weight: 700;
  }
  .select-st {
    min-width: 200px;
  }
`;

export const FormRow = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;

  .btn {
    height: 29px;
    width: 29px;
    padding: 0;
  }

  @media (max-width: 1050px) {
    .m-w-123 {
      max-width: 123px;
    }
    .m-w-187 {
      max-width: 187px;
    }
  }

  .max-count-title {
    display: none;
  }
`;

export const CloseIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const StyledText = styled.p`
  text-align: center;
  font-size: ${theme.typography.fontSize.formDesc};
  color: ${theme.colors.secondaryText};
  margin-bottom: 30px;
`;

export const ClearAllText = styled.span`
  cursor: pointer;
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  width: 57px;
  text-decoration: underline;
`;

export const RightSideContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: end;
  flex-direction: column;
`;

export const ViewContacts = styled.p`
  color: #212529;
  font-size: 12px;
  font-weight: 500;
  text-decoration-line: underline;
`;

export const ContactValue = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 600;
`;

export const ContactLabel = styled.p`
  color: #6c757d;
  font-size: 14px;
  font-weight: 600;
`;

export const MobileCreateSwitchWrapperShow = styled.div`
  @media (max-width: 1051px) and (min-width: 768px) {
    display: flex;
  }

  @media (max-width: 767px), (min-width: 1051px) {
    display: none;
  }

  gap: 16px;
  width: 100%;
  justify-content: end;
`;

export const MobileCreateSwitchWrapperHide = styled.div`
  @media (max-width: 1050px) {
    display: none;
  }
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 33px;
`;

export const ExpandableWrapper = styled.div`
  border: 0.5px solid #dfdfdf80;
  border-right: none;
  border-left: none;
  padding: 17px 0;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ExpandedLabel = styled.p`
  color: #6c757d;
  font-size: 14px;
  word-break: break-word;
  min-width: 75px;
`;

export const ExpandedValue = styled.p`
  color: ${({ $highlight }) => ($highlight ? '#E63946' : '#212529')};
  text-align: right;
  word-break: break-word;
  font-size: 14px;
`;

export const MobileActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
  padding: 8px 0;
`;

export const MobileActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: end;
  padding-right: 16px;
`;

export const ActionIcon = styled.img`
  width: 22px;
  height: 22px;
`;

export const Name = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 700;
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
export const EmailLimitSpan = styled.div`
  max-width: 200px;
  width: 100%;
  word-break: break-word;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
