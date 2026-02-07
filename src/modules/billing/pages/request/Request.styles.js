import styled from 'styled-components';
import theme from 'styles/theme';

export const ViewContainer = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .mobile-list-header {
    div {
      font-size: 10px !important;
    }
  }
`;

export const Title = styled.p`
  color: #2d6cdf;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${theme.colors.white};
  border-radius: 8px 8px 0 0;
`;

export const FiltersWrapper = styled.div`
  border-top: 1px solid #dfdfdf80;
  display: ${({ $showFilters }) => ($showFilters ? 'flex' : 'none')};
  align-items: center;
  padding: 10px 20px;
  justify-content: space-between;
`;

export const FiltersSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const RightSideContainer = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
  gap: 10px;
`;

export const ClearAllText = styled.span`
  cursor: pointer;
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  width: 90px;
  text-decoration: underline;
  white-space: nowrap;
`;

export const FilterActionsWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 22px 30px;
  justify-content: flex-end;
  align-items: center;

  .input {
    max-width: 190px;
  }

  input {
    height: 38px;
  }

  div {
    min-height: 0 !important;
    label {
      display: none;
    }
  }
  @media (max-width: 400px) {
    padding: 10px 11px;
  }
  @media (max-width: 360px) {
    padding: 10px 2px;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
`;

export const ActionsCalendar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5px;

  .calendar {
    width: 153px;
  }
`;

export const DateTitle = styled.p`
  font-size: 12px;
  color: ${theme.colors.primaryText};
`;

export const CloseTitle = styled.p`
  font-size: 12px;
  color: ${theme.colors.primaryText};
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 2px 1px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-size: 12px;
  padding: 10px;
  color: #212529;
  cursor: pointer;

  &:hover {
    background-color: #2c4a72;

    ${CloseTitle} {
      color: #ffffff;
    }
  }
`;

export const CloseIcon = styled.img`
  width: 10px;
  height: 10px;
`;

export const ActionsTabletWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (min-width: 768px) and (max-width: 810px) {
    flex-wrap: wrap;
    .calendar {
      width: 153px;
    }
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 33px;
`;

export const ContactValue = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 600;
`;

export const ContactLabel = styled.p`
  color: #6c757d;
  font-size: 12px;
  font-weight: 600;
`;

export const Icon = styled.img``;

export const ContractValue = styled.p`
  color: #2d6cdf;
  font-size: 14px;
  font-weight: 600;
`;

export const ActionsMobileWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 10px;
`;

export const ActionsMobileGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .text {
    width: 100%;
    font-size: 14px;
  }
  @media (max-width: 417px) {
    .filter {
      width: 95px;
    }
  }
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
  color: #212529;
  text-align: right;
  word-break: break-word;
  font-size: 14px;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px 0;
  align-items: center;
  gap: 12px;
`;

export const CalendarWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
`;
