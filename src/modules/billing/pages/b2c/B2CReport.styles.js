import styled from 'styled-components';
import theme from 'styles/theme';

export const ViewContainer = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 12px;

    align-items: start;
  }
`;

export const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #1d3557;
  margin: 0;
`;

export const NavWrapper = styled.div`
  .nav {
    margin: 0;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px 8px 0 0;
`;

export const FilterWrapper = styled.div`
  width: 100%;
  padding: 22px 30px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #e5e5e5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${theme.colors.white};
`;

export const FilterActionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 22px 0;
  gap: 16px;
`;

export const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #212529;
`;

export const Image = styled.img``;

export const ExportWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Message = styled.p`
  margin-top: 8px;
  color: ${theme.colors.warningColor};
  font-size: 14px;
`;

export const ExportContainer = styled.div`
  display: block;
`;

export const DatePickerWrapper = styled.div`
  width: 193px;
`;
export const Loading = styled.p`
  color: green;
`;
