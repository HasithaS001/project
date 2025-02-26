import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const Hero = () => {
  const socialProofData = [
    { number: '10K+', label: 'Active Users', icon: '👥' },
    { number: '4.9/5', label: 'User Rating', icon: '⭐' },
    { number: '1M+', label: 'Documents Created', icon: '📝' },
    { number: '99.9%', label: 'Uptime', icon: '🚀' },
  ];

  return (
    <Box
      sx={{
        background: 'linear-gradient(45deg, #f3f4f6 0%, #ffffff 100%)',
        py: 12,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Write Better, Faster, Together
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
          >
            Transform your writing process with AI-powered collaboration tools
          </Typography>
        </Box>

        {/* Social Proof Section */}
        <Grid container spacing={4} justifyContent="center">
          {socialProofData.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StyledPaper 
                elevation={3}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)',
                  border: '1px solid',
                  borderColor: 'rgba(0,100,191,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #0064bf 0%, #3498db 100%)',
                  },
                  transform: 'translateY(0)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,100,191,0.15)',
                    '& .stat-number': {
                      color: '#0064bf',
                    },
                  },
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ fontSize: '2.5rem', mb: 0.5 }}
                >
                  {item.icon}
                </Typography>
                <Typography
                  className="stat-number"
                  variant="h3"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    color: '#2c3e50',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {item.number}
                </Typography>
                <Typography 
                  variant="h6" 
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: 500,
                    opacity: 0.85
                  }}
                >
                  {item.label}
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
