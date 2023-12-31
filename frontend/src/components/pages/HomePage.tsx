import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Test comment
const HomePage = () => {
  const navigate = useNavigate();

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
        Discover, Connect, Share - Your Space for Everything!
      </Typography>
      <Button variant='contained' color='primary'
      onClick={() => {
        navigate('/login');
      }}>
        Get Started
      </Button>

    </Box>
  );
}

export default HomePage;
