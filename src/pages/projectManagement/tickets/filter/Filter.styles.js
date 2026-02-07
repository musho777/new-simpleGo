import styled from 'styled-components';

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 22px 20px;
  background: #fff;

  @media screen and (max-width: 767px) {
    display: block;
  }

  @media screen and (max-width: 726px) {
    flex-direction: column-reverse;
    gap: 16px;
  }
  @media screen and (max-width: 500px) {
    padding: 22px 5px;
  }
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

export const CloseIconWrapper = styled.div`
  cursor: pointer;
`;

export const FilterActionsWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: end;

  .create-button {
    min-width: 150px;
    max-width: 150px;
    color: #fff !important;
    font-size: 15px;
    font-weight: 600;
  }

  .filter-trigger-button {
    max-width: 148px;
  }

  .search-trigger-button {
    max-width: 154px;
  }

  button {
    height: 38px;
    color: #212529;
    font-size: 12px;
    font-weight: 600;
    max-width: 200px;
  }

  @media screen and (max-width: 865px) {
    justify-content: end;
  }
  @media screen and (max-width: 790px) {
    gap: 7px;
  }
  @media screen and (max-width: 767px) {
    justify-content: center;
  }
  @media screen and (max-width: 650px) {
    flex-wrap: nowrap;
    justify-content: center;
  }
  @media screen and (max-width: 398px) {
    gap: 5px;
    flex-wrap: wrap;
  }
`;

export const SearchArea = styled.div`
  border-top: 1px solid #dfdfdf;
  display: flex;
  gap: 16px;
  padding: 16px 25px;
  border-bottom: 1px solid #dfdfdf;
  flex-wrap: wrap;

  label {
    color: #6c757d;
    font-size: 12px;
    font-weight: 700;
  }

  div {
    min-height: 0 !important;
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const IconCircle = styled.div`
  border-radius: 9999px;
  border: 0.5px solid #d4d8dd;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;

  color: #212529;
  font-size: 11px;
  font-weight: 600;

  ${({ $isNew, $isActive }) =>
    $isNew
      ? `
        // Styles for "New" buttons
        background-color: ${$isActive ? 'rgba(255, 106, 0, 0.1)' : 'transparent'};
        border: 0.5px solid ${$isActive ? '#ff6a00' : '#d4d8dd'};
        color: ${$isActive ? '#ff6a00' : '#212529'};

        &:hover {
          box-shadow: 0px 0px 5px 0px #00000040;
        }
      `
      : `
        // Styles for non-"New" buttons
        background-color: ${$isActive ? 'rgba(0, 123, 255, 0.1)' : 'transparent'};
        border: 0.5px solid ${$isActive ? '#2D6CDF' : '#d4d8dd'};
        color: ${$isActive ? '#2D6CDF' : '#212529'};

        &:hover {
          box-shadow: 0px 0px 5px 0px #00000040;
        }
      `}
`;

export const IconCircleNewCount = styled.div`
  position: absolute;
  border-radius: 999px;
  height: 17px;
  min-width: 17px;
  width: auto;
  background-color: ${({ $type }) => ($type === 'new' ? '#FF6A00' : '#2D6CDF')};
  top: -8px;
  right: -6px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  font-size: 9px;
  font-weight: 700;
`;

export const Row = styled.div`
  display: flex;
  align-items: end;
  gap: 3px;
`;

export const Line = styled.div`
  width: 8px;
  height: 19px;
  border-top: 1px solid #dfdfdf;
`;

export const TicketTypeWrapper = styled.div`
  display: flex;
  gap: 30px;

  @media screen and (max-width: 767px) {
    justify-content: center;
    margin-bottom: 10px;
  }
`;

export const CalendarTypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Icon = styled.img``;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-left: auto;
  justify-content: space-between;
  gap: 16px;
`;

export const BottomSheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 30px 30px 0 0;
  padding: 15px 30px 35px 30px;
  box-shadow: 0px 0px 22px 0px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 18px;
  /* padding-bottom: 260px; */

  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
  div {
    min-height: 0;
  }
  label {
    color: #6c757d;
    font-weight: 700;
  }

  @media screen and (min-width: 768px) {
    display: none;
  }

  .multiple-select-wrapper {
    @media screen and (max-width: 610px) {
      flex-wrap: wrap;
    }
  }
  .double-select-wrapper {
    @media screen and (max-width: 420px) {
      flex-wrap: wrap;
    }
  }
`;

export const MobileFilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  div {
    width: 100%;
  }
`;

export const LineWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CustomTimePicker = styled.div`
  color: blue;
  position: absolute;
  right: 10px;
`;

export const MobileDateTimePicker = styled.input`
  height: 38px;
  font-size: 12px;
  padding: 0 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const FilterAllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
  gap: 14px;
  width: 100%;
`;

export const MobileCreateSwitchWrapperShow = styled.div`
  display: flex;
  gap: 18px;
`;
