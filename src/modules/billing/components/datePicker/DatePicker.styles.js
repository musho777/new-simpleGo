import styled from 'styled-components';
import theme from 'styles/theme';

export const DatePickerWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const DatePickerContainer = styled.div`
  top: 50px;
  width: 260px;
  height: 310px;
  background-color: ${theme.colors.white};
  border-radius: 10px;
  padding: 6px 19px 13px;
  position: absolute;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid ${theme.colors.borderColor};
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 8px 0;
  background-color: ${({ $active }) =>
    $active ? `${theme.colors.hoverText}1A` : 'transparent'};
  border: none;
  color: ${({ $active }) =>
    $active ? `${theme.colors.hoverText}` : `${theme.colors.emptyTitleColor}`};
  cursor: pointer;
  border-radius: 8px;
  font-weight: 500;
  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const MonthNavigator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.secondaryText};
  position: relative;
  padding-top: 7px;
  cursor: pointer;
`;

export const YearNavigator = styled.div`
  text-align: center;
  color: ${theme.colors.secondaryText};
  font-size: 12px;
  cursor: pointer;
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};

  img {
    transform: ${({ $rotate }) => ($rotate ? 'rotate(180deg)' : 'none')};
  }
`;

export const DayLabels = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  color: ${theme.colors.emptyTitleColor};
  text-align: center;
  font-weight: 500;
  font-size: 13px;
`;

export const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

export const DayButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  border-radius: ${({ $isSelected }) => $isSelected && '30%'};
  font-size: 14px;
  background: none;
  background-color: ${({ $isSelected }) => ($isSelected ? '#2D6CDF' : 'transparent')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  color: ${({ $isPreviousMonth, $isSaturday, $isSunday, $disabled, $isSelected }) =>
    $disabled
      ? `${theme.colors.borderColor}`
      : $isSelected
        ? 'white'
        : $isPreviousMonth
          ? `${theme.colors.mutedGray}`
          : $isSunday || $isSaturday
            ? `${theme.colors.hoverText}80`
            : `${theme.colors.emptyTitleColor}`};
  opacity: ${({ $isPreviousMonth }) => ($isPreviousMonth ? 0.4 : 1)};
  pointer-events: ${({ $isPreviousMonth }) => ($isPreviousMonth ? 'none' : 'auto')};
`;

export const ScrollMonthContainer = styled.div`
  position: absolute;
  background-color: ${theme.colors.white};
  top: 10%;
  left: 16%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  max-height: 100px;
  overflow-y: scroll;
  border-radius: 10px;
  width: 150px;
  z-index: 100;
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.borderColor};
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  font-size: 16px;
`;

export const ScrollYearContainer = styled.div`
  position: absolute;
  background-color: ${theme.colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  max-height: 100px;
  overflow-y: scroll;
  top: 25%;
  left: 20%;
  border-radius: 10px;
  width: 150px;
  z-index: 100;
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.borderColor};
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  font-size: 16px;
`;

export const ScrollItem = styled.div`
  padding: 5px;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  border-radius: 12px;

  &:hover {
    background-color: ${theme.colors.hoverText}1a;
    color: ${theme.colors.hoverText};
  }

  &:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

export const CalendarButton = styled.button`
  width: 193px;
  display: flex;
  align-items: center;
  height: 38px;
  padding: 11px 7px 11px 8px;
  font-size: 12px;
  border-radius: 10px;
  border: 1px solid ${theme.colors.borderColor};
  font-weight: 600;
  &:hover {
    background-color: ${theme.colors.secondary}1a;
  }
  background-color: ${({ $active }) =>
    $active ? `${theme.colors.secondary}1a` : theme.colors.white};
`;

export const LabelWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  cursor: pointer;
`;

export const Label = styled.span`
  font-weight: 500;
  color: ${({ $active }) => ($active ? theme.colors.secondary : theme.colors.primaryText)};
`;

export const CloseIcon = styled.img`
  cursor: pointer;
`;
export const CalendarIcon = styled.img`
  cursor: pointer;
`;
