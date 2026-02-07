import styled, { css } from 'styled-components';
import theme from 'styles/theme';

export const ViewContainer = styled.div`
  width: 100%;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FilterActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 22px 30px;
  .calendar {
    width: 175px;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${theme.colors.white};
  border-radius: 8px 8px 0 0;
`;

export const CardWrapper = styled.div`
  display: grid;
  gap: 16px;
  margin-bottom: 30px;

  ${({ $isTablet, $isMobile }) => css`
    grid-template-columns: ${$isMobile
      ? '1fr'
      : $isTablet
        ? 'repeat(2, 1fr)'
        : 'repeat(4, 1fr)'};
  `}
`;

export const CardStatusWrapper = styled.div`
  display: grid;
  gap: 16px;
  margin-top: 20px;
  ${({ $isTablet, $isMobile }) => css`
    grid-template-columns: ${$isMobile
      ? 'repeat(2, 1fr)'
      : $isTablet
        ? 'repeat(4, 1fr)'
        : 'repeat(7, 1fr)'};
  `}

  @media (max-width: 1410px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
`;

export const Title = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;

export const TableContainer = styled.div`
  display: flex;
  gap: 30px;
  @media (max-width: 1770px) {
    flex-direction: column;
  }
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  @media (max-width: 1770px) {
    display: ${({ $active }) => ($active ? 'flex' : 'none')};
    flex-direction: column;
    gap: 12px;
  }

  @media (min-width: 1770px) {
    .tags {
      padding: 0;
      background: none;
    }
  }
`;

export const LoadContainer = styled.div`
  width: 100%;
  min-height: 322px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingIcon = styled.img`
  animation: rotate 1s linear infinite;
  width: 100px;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 20px 24px;
  border-radius: 10px 10px 0px 0px;
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  .w {
    max-width: 190px;
  }

  .w-p {
    max-width: 150px;
  }

  @media screen and (max-width: 460px) {
    flex-direction: column-reverse;
    align-items: end;
    gap: 12px;
    width: 100%;
  }

  @media screen and (min-width: 1771px) {
    display: none;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  background-color: ${theme.colors.white};
  border-radius: 10px;
  width: ${({ $hrTab }) => ($hrTab ? '239px' : '560px')};
  border: 0.4px solid ${theme.colors.borderColor}80;
  justify-content: space-around;

  @media screen and (max-width: 768px) {
    width: 100% !important;
  }
`;

export const TabButton = styled.button`
  line-height: 9px;
  padding: 17px 25px;
  font-size: 14px;
  color: ${({ $isActive }) =>
    $isActive ? theme.colors.secondary : theme.colors.secondaryText};
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-weight: ${({ $isActive }) => ($isActive ? '700' : '400')};
  text-align: center;
  position: relative;

  &:hover {
    color: ${theme.colors.secondary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translate(-50%, 50%);
    width: 37px;
    height: 3px;
    background-color: ${theme.colors.secondary};
    border-radius: 3px 3px 0px 0px;
    opacity: ${({ $isActive }) => ($isActive ? '1' : '0')};
    transition: opacity 0.3s ease;
  }

  @media screen and (max-width: 768px) {
    padding: 17px 4px;
  }
`;
