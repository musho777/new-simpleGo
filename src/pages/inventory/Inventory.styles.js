import styled from 'styled-components';
import theme from 'styles/theme';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: end;
  padding: 20px;
  flex-wrap: wrap;
  div {
    min-height: 0;
  }

  label {
    display: none;
  }
`;

export const BtnWrapper = styled.div`
  max-width: 200px;
  .h-38 {
    height: 38px;
    font-size: 14px;
    font-weight: 600;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 22px;
`;

export const Form = styled.form`
  .max-count-title {
    display: none;
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

  .max-count-title {
    display: none;
  }

  .m-w-138 {
    max-width: 138px;
  }

  .m-w-187 {
    max-width: 187px;
  }
`;

export const Icon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;
export const IconValidation = styled.img`
  width: 10px;
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

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 29px 12px 29px;

  .h-38 {
    height: 38px !important;
  }
`;

export const ALlCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px 20px 0 20px;
  margin-top: 16px;
  width: 100%;
  box-sizing: border-box;

  > * {
    min-width: 0;
    max-width: 100%;
  }
  gap: 25px;
  padding: 20px 20px 0 20px;
  margin-top: 16px;
  cursor: pointer;

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

export const CategoryBox = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  height: 300px;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  border-radius: 12px;
  padding: 12px 8px 8px 8px;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  background-color: white;
`;

export const CategoryImage = styled.div`
  padding: 8px;
  width: 100%;
  height: 190px;
  background-color: #ffffff;
  border-radius: 10px;
`;

export const CategoryName = styled.div`
  max-width: 300px;
  font-size: 18px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: 0%;
  padding-bottom: 15px;
  padding-top: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ShiftControllers = styled.div`
  display: flex;
  gap: 15px;
  min-height: 40px;
  justify-content: end;
  align-items: center;
  padding-top: 5px;
  border-top: 1px solid rgb(223, 223, 223);
`;
export const TableAction = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  height: 25px;
  align-items: center;
`;
export const ShiftControl = styled.div`
  cursor: pointer;
`;

export const DeleteText = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 0%;
  color: rgba(108, 117, 125, 1);
`;

export const ItemsCount = styled.div`
  width: 73px;
  height: 36px;
  border-radius: 10px;
  pad: 12px 13px;
  background-color: #2d6cdf;
  position: absolute;
  margin-top: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
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

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 91vh;
  padding: 0 20px;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PaginationWrapper = styled.div`
  margin-top: auto;
  padding: 0 20px 20px 0;
`;

export const CategoryContent = styled.div`
  display: ${({ $viewType }) => ($viewType === 'list' ? 'flex' : 'block')};
  flex-direction: ${({ $viewType }) => ($viewType === 'list' ? 'column' : 'initial')};
  flex: 1;
  gap: ${({ $viewType }) => ($viewType === 'list' ? '8px' : '0')};
`;

export const CategoryActions = styled.div`
  display: ${({ $viewType }) => ($viewType === 'list' ? 'flex' : 'block')};
  align-items: ${({ $viewType }) => ($viewType === 'list' ? 'center' : 'initial')};
  gap: ${({ $viewType }) => ($viewType === 'list' ? '15px' : '0')};
  margin-left: ${({ $viewType }) => ($viewType === 'list' ? 'auto' : '0')};
`;

export const SecondItemText = styled.p`
  color: rgba(108, 117, 125, 1);
`;

export const SecondTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const LastTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-size: 14px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(223, 223, 223, 1);
`;

export const EllipsisCell = styled.div`
  width: 260px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-decoration: underline;
  @media (max-width: 600px) {
    width: 130px;
  }
`;

export const DeleteIconWrapper = styled.img``;

export const EmptyViewWrapper = styled.div`
  width: 100%;
  padding: 30px 60px;
  background-color: white;
  flex: 1;
  justify-content: center;
  display: flex;
  align-items: center;
`;

export const ItemCountWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
