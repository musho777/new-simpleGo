import { Tooltip, tooltipClasses } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  align-items: start;
  justify-content: center;
  padding: 0 29px;
  margin-bottom: 20px;
`;

export const Header = styled.div`
  width: 100%;
  border: 1px solid rgba(223, 223, 223, 1);
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  margin: 20px 0;
  padding: 0 20px;
  min-height: 90px;
  flex-wrap: wrap;

  .h-38 {
    height: 38px !important;
  }

  @media (max-width: 991px) {
    display: block;
    text-align: center;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const ItemBox = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 410px;
  border-radius: 12px;
  padding: 12px 8px 8px 8px;
  cursor: pointer;
  box-sizing: border-box;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

export const ShiftControllers = styled.div`
  display: flex;
  gap: 15px;
  min-height: 40px;
  justify-content: end;
  align-items: center;
  padding-top: 5px;
  border-top: 1px solid rgb(223, 223, 223);
  margin-top: 17px;
`;

export const ShiftControl = styled.div`
  cursor: pointer;
`;

export const CustomLoyaltyProgram = styled.h3`
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0%;
  color: rgba(33, 37, 41, 1);
  margin-top: 17px;
`;
export const ItemInfo = styled.h3`
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: rgba(108, 117, 125, 1);
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`;

export const BtnWrapper = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .h-38 {
    height: 38px;
    font-size: 14px;
    font-weight: 600;
  }
`;

export const BtnWrapperTop = styled.div`
  max-width: 200px;
`;

export const CreateItem = styled.div`
  margin-top: 20px;
`;

export const Form = styled.form``;

export const UsageLifespanBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  .usage {
    width: 100%;
  }
  .lifespan {
    width: 100%;
  }
`;
export const IconValidation = styled.img`
  width: 10px;
`;

export const NameQuantityBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  .quantity {
    width: 90px;
    padding: 0 10px;
  }
  .usage {
    width: 100%;
  }

  .max-count-title {
    display: none;
  }
`;

export const ItemsMainBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 16px;
  width: 100%;
  box-sizing: border-box;

  > * {
    min-width: 0;
    max-width: 100%;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const TableWrapper = styled.div`
  padding: 20px 0;
`;

export const TableActions = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const ActionIcon = styled.img`
  cursor: pointer;
`;

export const ClickableItemInfo = styled(ItemInfo)`
  cursor: pointer;
`;

export const ItemImages = styled.div`
  display: flex;
  border-radius: 10px;
  gap: 10px;
  width: 100%;
  justify-content: center;
  margin-top: 5px;
`;

export const ImagesBoxMain = styled.div`
  height: 180px;
  margin-top: 0px;
  position: relative;
  z-index: 5;
`;

export const ItemImage = styled.img`
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  width: ${({ $count }) => ($count === 1 ? '100%' : $count === 2 ? '50%' : '32%')};
  height: ${({ $count }) => ($count === 1 ? '180px' : $count === 2 ? '180px' : '180px')};
`;

export const CategoryImage = styled.div`
  padding: 8px;
  width: 100%;
  height: 190px;
  background-color: grey;
  border-radius: 10px;
`;

export const CategoryName = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 100%;
  color: #1d3557;
`;

export const ItemFilterAndSearch = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
  flex-wrap: wrap;
  gap: 16px;
`;
export const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 6px;
`;

export const QuantityBox = styled.div`
  color: #212529;
  font-weight: 600;
`;

export const LifespanBox = styled.div`
  height: 27px;
  display: flex;
  justify-content: flex-end;
  border-radius: 20px;
  position: relative;
  z-index: 999;
  font-size: 12px;
  font-weight: 700;
  line-height: 100%;
  align-items: center;
`;

export const PhotoError = styled.div`
  color: #e63946;
  font-weight: 600;
  padding: 3px 0 2px 0;
  display: flex;
  gap: 3px;
  justify-content: end;
  font-size: 12px;
  line-height: 12px;
`;
export const Icon = styled.img`
  width: 10px;
  height: 10px;
`;

export const NoResultsBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-top: 30px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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

export const Lifespan = styled.div`
  display: flex;
  gap: 20px;
  .lifespan {
    width: 100%;
  }
`;

export const DelateItemMessage = styled.p`
  font-family: Nunito;
  font-weight: 400;
  font-style: Regular;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0%;
  color: #6c757d;
  text-align: center;
`;

export const EllipsisCell = styled.div`
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
