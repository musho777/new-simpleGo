import styled from 'styled-components';
import theme from 'styles/theme';

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${theme.colors.white};
  margin: 10px 0;
  padding: 20px;

  border-radius: 8px;
  border: 0.5px solid rgba(223, 223, 223, 0.05);
  background: #fff;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  @media screen and (max-width: 905px) {
    display: flex;
    width: 100%;
    gap: 15px;
  }
`;

export const FilterActions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 0px;
    width: 100%;
  }
  .h-38 {
    height: 38px !important;
  }
`;

export const Div = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
export const NextStatusWrapper = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: flex-start;

    button {
      width: 100%;
      margin-top: 12px;
    }
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

export const Icon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const RightSideContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  padding: 10px 10px 0 0;
`;

export const FormRow = styled.form`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;
  padding: 16px 30px 0 30px;

  .btn {
    height: 29px;
    width: 29px;
    padding: 0;
  }

  .max-count-title {
    display: none;
  }

  .select-st {
    max-width: 200px;
  }

  .text-area-field {
    opacity: 1;
  }

  @media (max-width: 1050px) {
    .m-w-138 {
      max-width: 138px;
    }
    .m-w-187 {
      max-width: 187px;
    }
  }
`;

export const Filters = styled.div`
  display: flex;
  gap: 12px;
  border-top: 1px solid rgba(223, 223, 223, 1);
`;

export const FilterBox = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 30px 0;
  gap: 20px;
`;

export const CalendarWrapper = styled.div`
  max-width: 380px;
  display: flex;
  gap: 16px;

  @media screen and (min-width: 865px) {
    align-items: start;
    max-width: 470px;
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

export const StatusDiv = styled.div`
  width: 170px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
export const ChangeStatusDiv = styled.div`
  width: 160px;
  @media screen and (max-width: 886px) {
    width: 100%;
    display: flex;
    gap: 15px;
  }

  & > div:hover .tooltip-text {
    opacity: 1 !important;
  }
`;

export const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
    button {
      width: 100%;
    }
  }
`;

export const TooltipText = styled.div`
  opacity: 0;
  white-space: pre-line;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 10;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translate(-50%, -100%);
  background-color: #f4a261;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 10;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SearchButtonWrapper = styled.div`
  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: flex-start;

    button {
      width: 100%;
      margin-top: 12px;
    }
  }
`;
