import styled from 'styled-components';
import theme from 'styles/theme';

export const Container = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media screen and (max-width: 1300px) {
    .table-main-container {
      display: block;
    }
    .table-wrapper-page {
      display: block;
    }
    .table-wrapper {
      display: block;
    }
  }

  @media screen and (min-width: 1300px) {
    .mobile-list-main-container {
      display: block;
    }
  }
`;

export const Title = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 500;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
  cursor: pointer;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`;

export const Icon = styled.img``;

export const Tracker = styled.p`
  color: ${({ $color }) => theme.colors[`${$color}Color`]};
  font-size: 14px;
  font-weight: 600;
`;

export const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  color: #212529;
  font-size: 14px;
  font-weight: 500;
`;

export const IconCursor = styled.div`
  cursor: pointer;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 400px;
  overflow: scroll;
`;
