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

export const NavWrapper = styled.div`
  width: 305px;
`;

export const FilterWrapper = styled.div`
  width: 100%;
  padding: 22px 30px;
`;

export const FilterActionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 22px 0;
  gap: 16px;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${theme.colors.white};
  border-radius: 8px 8px 0 0;
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
