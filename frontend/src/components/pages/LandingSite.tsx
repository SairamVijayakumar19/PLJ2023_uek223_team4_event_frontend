import React from 'react';
import { Box, Typography, Button } from '@mui/material';

// Test comment
const LandingSite = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
    >
      <Typography variant='h3' >
        Welcome to OurSpace
      </Typography>
      <Typography variant='body1' paragraph>
        Only for for logged in Users.
      </Typography>
      <Button variant='contained' color='primary'>
        Get Started
      </Button>

    </Box>
  );
}

export default LandingSite;
