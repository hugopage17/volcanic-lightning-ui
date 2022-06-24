import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';

const Loader = () => {
  return (
    <Box sx={{ textAlign: 'center', width: '35%', position: 'fixed', top: '25%', left: '35%' }}>
      <Typography aria-label="loading-text">Loading, please wait...</Typography>
      <LinearProgress />
    </Box>
  );
}

export default Loader;
