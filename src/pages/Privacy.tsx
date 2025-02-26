import React from 'react';
import { Container, Typography, Box, Paper, Grid, Card, CardContent } from '@mui/material';
import { Security } from '@mui/icons-material';

const Privacy = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
          Privacy Policy
        </Typography>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Last Updated: {new Date().toLocaleDateString()}
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" paragraph>
            Welcome to WriteAI! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our AI-powered writing assistant.
          </Typography>
        </Box>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.3s ease-in-out' } }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                  <Security sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} /> Information We Collect
                </Typography>
                <Typography variant="body1" paragraph>
                  We collect the following types of data when you use our services:
                </Typography>
                <Box component="ul" sx={{ pl: 4 }}>
                  <Typography component="li" variant="body1" paragraph>🔹 Personal Information – Name, email, and payment details when you register.</Typography>
                  <Typography component="li" variant="body1" paragraph>🔹 Usage Data – Pages visited, interactions, and preferences.</Typography>
                  <Typography component="li" variant="body1" paragraph>🔹 Content Data – Text input provided to our AI tools.</Typography>
                  <Typography component="li" variant="body1" paragraph>🔹 Device & Technical Data – IP address, browser type, and device information.</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            2. How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            We use your data to:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" variant="body1" paragraph>✅ Provide and improve our AI writing tools.</Typography>
            <Typography component="li" variant="body1" paragraph>✅ Personalize your experience.</Typography>
            <Typography component="li" variant="body1" paragraph>✅ Enhance security and prevent fraud.</Typography>
            <Typography component="li" variant="body1" paragraph>✅ Analyze performance and optimize our service.</Typography>
            <Typography component="li" variant="body1" paragraph>✅ Communicate updates, offers, and support.</Typography>
          </Box>
          <Typography variant="body1" paragraph>
            We do not sell or share your data with third parties for advertising purposes.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            3. Data Security & Protection
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" variant="body1" paragraph>🔒 We use encryption (SSL/TLS) to protect your data.</Typography>
            <Typography component="li" variant="body1" paragraph>🔒 Your AI-generated content is not stored permanently unless you choose to save it.</Typography>
            <Typography component="li" variant="body1" paragraph>🔒 We follow industry best practices to secure your personal information.</Typography>
          </Box>
          <Typography variant="body1" paragraph>
            However, no system is 100% secure. If you suspect any unauthorized access, please contact us immediately.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            4. Third-Party Services
          </Typography>
          <Typography variant="body1" paragraph>
            We may use trusted third-party services for:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" variant="body1" paragraph>🔹 Payment processing (Stripe, PayPal – no credit card details stored).</Typography>
            <Typography component="li" variant="body1" paragraph>🔹 Authentication (Supabase, Google, Apple Sign-In).</Typography>
            <Typography component="li" variant="body1" paragraph>🔹 AI Processing (OpenAI, Azure AI, Google AI).</Typography>
          </Box>
          <Typography variant="body1" paragraph>
            Each service has its own privacy policies. We recommend reviewing them for more details.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            5. Cookies & Tracking Technologies
          </Typography>
          <Typography variant="body1" paragraph>
            🍪 We use cookies to enhance your experience, track analytics, and improve our services. You can control or disable cookies via your browser settings.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            6. Data Retention
          </Typography>
          <Typography variant="body1" paragraph>
            We store your data only as long as necessary to provide our services. If you delete your account, we erase all personal data, except where required by law.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            7. Your Privacy Rights
          </Typography>
          <Typography variant="body1" paragraph>
            Depending on your location, you may have rights to:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Typography component="li" variant="body1" paragraph>✅ Access, update, or delete your data.</Typography>
            <Typography component="li" variant="body1" paragraph>✅ Opt out of marketing emails.</Typography>
            <Typography component="li" variant="body1" paragraph>✅ Request a copy of your stored data.</Typography>
          </Box>
          <Typography variant="body1" paragraph>
            To exercise these rights, contact us at support@writeai.com
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            8. Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this Privacy Policy from time to time. Any changes will be posted here, and we will notify you via email or app notifications.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            9. Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            📧 Email: support@writeai.com
          </Typography>
          <Typography variant="body1" paragraph>
            🌐 Website: www.writeai.com
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            If you have any questions about this Privacy Policy, feel free to reach out! 🚀
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Privacy;