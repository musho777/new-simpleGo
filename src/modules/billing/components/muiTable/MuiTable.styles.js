import { Tooltip, tooltipClasses } from '@mui/material';
import styled from 'styled-components';

export const ContractsCell = styled.td`
  color: #2d6cdf;
  text-decoration: underline;
  text-decoration-color: #2d6cdf;
`;

export const NotFound = styled.div`
  height: 100%;
  margin-top: 150px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FooterTablet = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const TitleWrapperTablet = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const Title = styled.p`
  font-size: 12px;
  color: #6c757d;
  margin-right: 5px;
`;
export const TitleCount = styled.p`
  font-size: 12px;
  color: #212529;
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

export const LoadContainer = styled.div`
  width: 100%;
  min-height: 500px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
