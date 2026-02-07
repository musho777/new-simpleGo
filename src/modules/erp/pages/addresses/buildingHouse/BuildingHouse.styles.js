import { Tooltip, tooltipClasses } from '@mui/material';
import styled from 'styled-components';

export const BuildingHouseContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ButtonWrapper = styled.div`
  margin-bottom: 20px;

  @media (max-width: 480px) {
    margin-bottom: 15px;

    button {
      width: 100% !important;
    }
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 20px;

  @media (max-width: 1050px) {
    gap: 15px;
    flex-wrap: wrap;
  }

  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 15px;
  }
`;

export const SelectWrapper = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 232px;

  > div {
    min-height: 38px;
    width: 100%;
  }

  @media (max-width: 1050px) {
    max-width: calc(50% - 7.5px);
  }

  @media (max-width: 480px) {
    max-width: 100%;
    min-width: 100%;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  padding-top: 50px;

  @media (max-width: 480px) {
    gap: 10px;
    padding-top: 30px;

    button {
      flex: 1;
    }
  }
`;

export const BuildingHousesList = styled.div`
  flex: 1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    overflow-x: visible;
  }
`;

export const PaginationWrapper = styled.div`
  width: 731px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const BuildingHouseItem = styled.div`
  width: 1003px;
  height: 50px;
  border-radius: 0;
  border: 0.4px solid rgba(212, 216, 221, 0.5);
  border-top: none;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 0;

  &:last-child {
    border-radius: 0 0 10px 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 1050px) {
    width: 100%;
    min-width: 700px;
  }

  @media (max-width: 768px) {
    min-width: unset;
    width: 100%;
    height: auto;
    min-height: 120px;
    border-radius: 8px;
    border: 1px solid rgba(212, 216, 221, 0.5);
    margin-bottom: 10px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:last-child {
      border-radius: 8px;
      margin-bottom: 10px;
    }
  }

  @media (max-width: 480px) {
    min-height: 140px;
    padding: 12px;
  }
`;

export const BuildingHouseName = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #333;

  @media (max-width: 768px) {
    font-weight: 500;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    padding: 8px;
    background: #f5f5f5;
    border-radius: 6px;
    border: 1px solid transparent;

    &:hover {
      background: #e0e0e0;
      border-color: #ccc;
    }
  }

  @media (max-width: 480px) {
    padding: 10px;

    img {
      width: 18px;
      height: 18px;
    }
  }
`;

export const TableHeader = styled.div`
  width: 1003px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-radius: 10px 10px 0 0;
  border: 0.4px solid rgba(212, 216, 221, 0.5);
  background: #fff;
  margin-bottom: 0;
  font-weight: 400;
  font-size: 14px;
  color: #6c757d;

  @media (max-width: 1050px) {
    width: 100%;
    min-width: 700px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeaderColumn = styled.div`
  flex: ${(props) => props.$flex || '1'};
  text-align: ${(props) => props.$align || 'left'};
`;

export const DataColumn = styled.div`
  flex: ${(props) => props.$flex || '1'};
  font-size: 14px;
  color: #333;
  text-align: ${(props) => props.$align || 'left'};
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    flex: unset;
    width: 100%;
    text-align: left !important;
    white-space: normal;
    padding: 0;

    &:nth-child(1)::before {
      content: 'Տուն: ';
      font-weight: 500;
      color: #6c757d;
    }

    &:nth-child(2)::before {
      content: 'Վարչական շրջան: ';
      font-weight: 500;
      color: #6c757d;
    }

    &:nth-child(3)::before {
      content: 'Մեկնաբանություն: ';
      font-weight: 500;
      color: #6c757d;
    }

    &:last-child {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
    }
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const BuildingHouseInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
`;

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    color: '#000000',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontSize: 12,
  },
}));
