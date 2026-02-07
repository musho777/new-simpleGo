import { Box, CircularProgress } from '@mui/material';

const ProgressBar = ({
  value = 0,
  size = 16,
  thickness = 10,
  color = '#1976d2',
  trackColor = '#DFDFDF',
}) => {
  return (
    <Box position="relative" display="inline-flex" alignItems="center" justifyContent="center">
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={thickness}
        sx={{
          color: trackColor,
          position: 'absolute',
        }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={thickness}
        sx={{
          color: color,
        }}
      />
    </Box>
  );
};

export default ProgressBar;
