import styled from 'styled-components';

export const NavbarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 769px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;
