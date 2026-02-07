import { Tooltip, styled, tooltipClasses } from '@mui/material';

export const CustomTooltip = styled(({ className, placement = 'top', ...props }) => (
  <Tooltip {...props} placement={placement} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    color: '#6C757D',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontSize: 12,
  },
}));
