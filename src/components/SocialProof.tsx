import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8faff 100%)',
  borderRadius: theme.spacing(1.5),
  transition: 'transform 0.2s ease-in-out',
  border: '1px solid rgba(0, 0, 0, 0.06)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
  }
}));

const SocialProof: React.FC = () => {
  const metrics = [
    { number: '10K+', label: 'Users', icon: '👥' },
    { number: '4.9', label: 'Rating', icon: '⭐' },
    { number: '1M+', label: 'Documents', icon: '📝' },
    { number: '99%', label: 'Uptime', icon: '🚀' }
  ];

  return (
    <Box sx={{ py: 4, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={1} justifyContent="center">
          {metrics.map((metric, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <StyledPaper elevation={0}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {metric.icon}
                </Typography>
                <Typography
                  variant="h5" sx={{ mb: 0.5, fontSize: '1.75rem' }}>
                  {metric.icon}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #2196F3 30%, #1976D2 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 0.5,
                    fontSize: '1.25rem'
                  }}
                >
                  {metric.number}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                    fontSize: '0.875rem'
                  }}
                >
                  {metric.label}
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SocialProof;