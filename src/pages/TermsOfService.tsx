import { Container, Typography, Box, Paper } from '@mui/material';

const TermsOfService = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={0} sx={{ p: 4, backgroundColor: '#fafafa' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#1a1a1a' }}>
          Terms of Service
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ color: '#666', mb: 4 }}>
          Last updated: February 25, 2025
        </Typography>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
            1. Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to WriteAI. By accessing or using our AI writing assistant tool, you agree to be bound by these Terms of Service. Please read them carefully before using our services.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
            2. Service Description
          </Typography>
          <Typography variant="body1" paragraph>
            WriteAI is an AI-powered writing assistant that helps users improve their writing through grammar checking, style suggestions, and content enhancement. The service is provided "as is" and may be updated or modified at any time.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
            3. User Responsibilities
          </Typography>
          <Typography variant="body1" paragraph>
            You are responsible for:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">Maintaining the confidentiality of your account</Typography>
            </li>
            <li>
              <Typography variant="body1">All content you submit to or process through our service</Typography>
            </li>
            <li>
              <Typography variant="body1">Ensuring you have the rights to use any content you submit</Typography>
            </li>
          </ul>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
            4. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            You retain all rights to your content. By using our service, you grant us a license to process and analyze your content solely for the purpose of providing our services to you.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
            5. Usage Limitations
          </Typography>
          <Typography variant="body1" paragraph>
            Our service may have usage limitations based on your subscription plan. We reserve the right to modify these limitations at any time with notice to users.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
            6. Privacy and Data Protection
          </Typography>
          <Typography variant="body1" paragraph>
            We handle your data in accordance with our Privacy Policy. We implement appropriate security measures to protect your information but cannot guarantee absolute security.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
            7. Disclaimer of Warranties
          </Typography>
          <Typography variant="body1" paragraph>
            While we strive for accuracy, we cannot guarantee that our AI suggestions will be error-free or suitable for every purpose. Users should review and verify all AI-generated content.
          </Typography>
        </Box>

        <Box component="section" sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
            8. Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the modified terms.
          </Typography>
        </Box>

        <Box component="section">
          <Typography variant="h5" gutterBottom sx={{ color: '#333', fontWeight: 600 }}>
            9. Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            For questions about these Terms of Service, please contact our support team.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermsOfService;
