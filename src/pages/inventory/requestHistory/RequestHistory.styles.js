import { Tooltip, tooltipClasses } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const DescriptionLimitSpan = styled.div`
  max-width: 200px;
  width: 100%;
  word-break: break-word;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const MobileItemRowBox = styled.div`
  display: flex;
  align-items: center;
  margin: 15px auto;
  gap: 10px;
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

export const TruncatedText = styled.span`
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  cursor: default;

  &:hover .full-text-tooltip {
    display: block;
  }
`;

export const ExportWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: ${(props) => (props.disabled ? 0.6 : 0.8)};
  }
`;

export const Icon = styled.img``;

export const ExportText = styled.p`
  color: #2d6cdf;
  font-family: Nunito;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: uppercase;
`;
