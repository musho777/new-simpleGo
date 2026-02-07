import { Tooltip, tooltipClasses } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  button {
    width: 163px;
    height: 40px;

    font-size: 14px;
    font-weight: 600;
    line-height: 9px;

    color: #1d3557;
    background: #fff;
  }
`;

export const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  right: 0;
  top: 20px;
  background: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 9px;
  z-index: 1000;
  width: 120px;
  height: 100px;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  div:hover > & {
    display: block;
  }
`;

export const DropdownItem = styled.div`
  padding: 12px 12px;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    background-color: #f0f0f0;
  }
`;
export const DropdownLabel = styled.p`
  white-space: nowrap;
  font-weight: 700;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0%;
  color: #212529;
`;

export const Image = styled.img``;

export const EditBox = styled.div`
  position: relative;
  display: inline-block;
`;

export const ModalText = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  color: #6c757d;
  text-align: center;
`;

export const EditModalBox = styled.div`
  display: flex;
  justify-content: start;
  gap: 20px;
`;

export const EditModalSelect = styled.div`
  max-width: 200px;
  min-width: 188px;
`;

export const QuantityInput = styled.div`
  max-width: 30px;
  min-width: 30px;
`;

export const CalendarWrapper = styled.div`
  max-width: 380px;
  display: flex;
  gap: 16px;

  @media screen and (min-width: 865px) {
    align-items: start;
    max-width: 510px;
  }
  @media screen and (max-width: 865px) {
    align-items: start;
    max-width: 330px;
  }

  @media screen and (max-width: 769px) {
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

export const FilterOfRequestHistory = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media screen and (max-width: 769px) {
    justify-content: space-between;
  }
`;

export const BackAndFilter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media screen and (max-width: 769px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const MobileItemRowBox = styled.div`
  display: flex;
  align-items: center;
  margin: 15px auto;
  gap: 10px;
`;

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    color: '#6C757D',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontSize: 12,
  },
}));

export const TruncatedText = styled.span`
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  cursor: default;

  &:hover .full-text-tooltip {
    display: block;
  }
`;
