import { LinearProgress } from '@mui/material';

const LinearProgressBar = ({ value, color = '#FF6A00', trackColor = '#D4D8DD' }) => {
  return (
    <LinearProgress
      style={{ height: 6, width: 120, borderRadius: 20 }}
      variant="determinate"
      value={value}
      sx={{
        '& .MuiLinearProgress-bar': {
          backgroundColor: color,
        },
        backgroundColor: trackColor,
      }}
    />
  );
};

export default LinearProgressBar;
