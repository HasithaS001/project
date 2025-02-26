import React from 'react';
import { Container, Typography, Paper, Grid, Box, Button, TextField } from '@mui/material';
import { Email, Phone, Forum, PlayCircle, Help, ArrowForward } from '@mui/icons-material';
import FAQ from '../components/FAQ';

const Support: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          🛠️ Support Center
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          💡 Need help? We've got you covered!
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto' }}>
          Welcome to our Support Center. Find answers, troubleshoot issues, and get expert assistance for your AI Writing Assistant.
        </Typography>
      </Box>

      {/* FAQ Section */}
      <Paper elevation={0} sx={{ p: 4, mb: 6, bgcolor: '#f8f9fa', borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          🔍 Frequently Asked Questions
        </Typography>
        <FAQ />
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            endIcon={<ArrowForward />}
            component="a"
            href="/faq"
          >
            View Full FAQ
          </Button>
        </Box>
      </Paper>

      {/* Contact Section */}
      <Paper elevation={0} sx={{ p: 4, mb: 6, bgcolor: '#fff', borderRadius: 4, border: 1, borderColor: 'divider' }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          📩 Contact Our Support Team
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Email sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Email Support</Typography>
              <Typography variant="body2" color="text.secondary">
                support@yourdomain.com
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Forum sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Live Chat</Typography>
              <Typography variant="body2" color="text.secondary">
                Available 24/7
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Phone sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Phone Support</Typography>
              <Typography variant="body2" color="text.secondary">
                Mon-Fri, 9 AM - 5 PM
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Help Resources */}
      <Paper elevation={0} sx={{ p: 4, mb: 6, bgcolor: '#f8f9fa', borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          🚀 Help Resources
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2 }}>
              <Help sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Step-by-Step Guides</Typography>
              <Typography variant="body2" color="text.secondary">
                Learn how to use every feature efficiently.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2 }}>
              <PlayCircle sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Video Tutorials</Typography>
              <Typography variant="body2" color="text.secondary">
                Watch quick demos on AI writing tips.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2 }}>
              <Forum sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>Community Forum</Typography>
              <Typography variant="body2" color="text.secondary">
                Connect with other users & share insights.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Submit Ticket Section */}
      <Paper elevation={0} sx={{ p: 4, bgcolor: '#fff', borderRadius: 4, border: 1, borderColor: 'divider' }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          💡 Submit a Support Ticket
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Can't find what you're looking for? Submit a ticket, and our support team will assist you.
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                required
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                required
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                Submit Ticket
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Support;