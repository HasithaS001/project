import { Box, Container, Typography, Stack, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { GitHub, Twitter, LinkedIn, Email, Article, Help } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 'auto',
        backgroundColor: '#fafafa',
        borderTop: '1px solid #f0f0f0',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Box sx={{ mb: 2 }}>
              <img src="/robot-writer.svg" alt="WriteAI Logo" style={{ height: 40 }} />
            </Box>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              WriteAI is your intelligent writing companion, helping you create better content faster
              with advanced AI technology.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="h6" sx={{ mb: 2, color: '#333', fontSize: '1rem', fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {[
                { label: 'Contact', url: '/contact' },
                { label: 'Terms of Service', url: '/terms' },
                { label: 'Privacy Policy', url: '/privacy' },
                { label: 'Refund Policy', url: '/refund-policy' },
              ].map((link) => (
                <RouterLink
                  key={link.label}
                  to={link.url}
                  style={{
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#2196F3';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#666';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  {link.label}
                </RouterLink>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="h6" sx={{ mb: 2, color: '#333', fontSize: '1rem', fontWeight: 600 }}>
              Resources
            </Typography>
            <Stack spacing={1}>
              {[
                { label: 'About Us', url: '/about', icon: Article },
                { label: 'Blog', url: '/blog', icon: Article },
                { label: 'Documentation', url: '/docs', icon: Help },
                { label: 'Support', url: '/Support', icon: Email },
              ].map((link) => (
                <RouterLink
                  key={link.label}
                  to={link.url}
                  style={{
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#2196F3';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#666';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  <link.icon sx={{ fontSize: 16 }} />
                  {link.label}
                </RouterLink>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="h6" sx={{ mb: 2, color: '#333', fontSize: '1rem', fontWeight: 600 }}>
              Connect With Us
            </Typography>
            <Stack spacing={1}>
              {[
                { icon: GitHub, url: 'https://github.com/writeai', label: 'GitHub' },
                { icon: Twitter, url: 'https://twitter.com/writeai', label: 'Twitter' },
                { icon: LinkedIn, url: 'https://linkedin.com/company/writeai', label: 'LinkedIn' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    target.style.color = '#2196F3';
                    target.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    target.style.color = '#666';
                    target.style.textDecoration = 'none';
                  }}
                >
                  <social.icon sx={{ fontSize: 16 }} />
                  {social.label}
                </a>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #f0f0f0' }}>
          <Typography
            variant="body2"
            align="center"
            sx={{ color: '#666', fontSize: '0.875rem' }}
          >
            {new Date().getFullYear()} WriteAI. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
