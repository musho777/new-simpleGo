import styled from 'styled-components';
import theme from 'styles/theme';

export const Container = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
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
  width: 100%;
  padding: 22px 30px;

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

export const Icon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
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
`;

export const ClearAllText = styled.span`
  cursor: pointer;
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  width: 57px;
  &:hover {
    text-decoration: underline;
  }
`;

export const RightSideContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: end;
  flex-direction: column;
`;

export const Name = styled.p`
  color: #212529;
  font-size: 16px;
  font-weight: 700;
  max-width: 200px;
  width: 100%;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  max-width: 380px;
  display: flex;
  gap: 16px;

  @media screen and (min-width: 865px) {
    align-items: start;
    max-width: 430px;
  }
  @media screen and (max-width: 865px) {
    align-items: start;
    max-width: 330px;
  }

  @media screen and (max-width: 767px) {
    display: none;

    &.showBelow767px {
      display: flex;
      flex-direction: column;
      max-width: 100%;
    }

    &.dateTo767 {
      margin-top: 16px;
    }
  }
`;
