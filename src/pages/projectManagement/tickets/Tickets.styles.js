import { Tooltip, tooltipClasses } from '@mui/material';
import styled from 'styled-components';
import theme from 'styles/theme';

export const Container = styled.div`
  padding: 20px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media screen and (max-width: 1300px) {
    .table-main-container {
      display: none;
    }
  }

  @media screen and (min-width: 1300px) {
    .mobile-list-main-container {
      display: none;
    }
  }
`;

export const CreateContainer = styled.div`
  display: flex;
  justify-content: end;
  background: #fff;

  button {
    height: 38px;
  }
`;

export const CreateWrapper = styled.div`
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

export const Title = styled.p`
  color: #212529;
  font-size: 14px;
  font-weight: 600;
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
