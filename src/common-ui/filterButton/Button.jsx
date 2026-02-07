import { Button, Stack } from '@mui/material';
import theme from 'styles/theme';

import blackFilter from './blackFilter.svg';
import filter from './filter.svg';

const BasicButton = ({
  title,
  onClick,
  icon = blackFilter,
  activeIcon = filter,
  isActive = false,
}) => {
  return (
    <Stack spacing={2} direction="row">
      <Button
        onClick={onClick}
        variant={isActive ? 'outlined' : 'none'}
        startIcon={<img src={isActive ? activeIcon : icon} alt="filter icon" />}
        sx={{
          textTransform: 'none',
          borderRadius: '10px',
          fontSize: '12px',
          fontWeight: 500,
          height: '38px',
          border: isActive ? `1px solid ${theme.colors.secondary}` : '0.5px solid #D4D8DD',
          backgroundColor: isActive ? '#2D6CDF1A' : 'transparent',
          '&:hover': {
            backgroundColor: `${theme.colors.secondary}1a`,
          },
        }}
      >
        {title}
      </Button>
    </Stack>
  );
};

export default BasicButton;
