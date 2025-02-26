import React from 'react';
import { Container, Typography, Box, Button, Paper, Grid, Card, CardContent, Divider } from '@mui/material';
import { Email, CheckCircleOutline, CancelOutlined, AccessTime, AccountBalance } from '@mui/icons-material';
import Footer from '../components/Footer';

const RefundPolicy = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });



  const eligibleCases = [
    {
      text: 'Technical issues preventing tool usage (unresolved by support)',
      icon: CheckCircleOutline
    },
    {
      text: 'Wrongful charges due to billing errors',
      icon: CheckCircleOutline
    },
    {
      text: 'Accidental wrong subscription plan purchase (unused)',
      icon: CheckCircleOutline
    }
  ];

  const nonRefundableCases = [
    {
      text: 'Extensive service usage before refund request',
      icon: CancelOutlined
    },
    {
      text: 'Change of mind after purchase',
      icon: CancelOutlined
    },
    {
      text: 'Late subscription cancellation',
      icon: CancelOutlined
    },
    {
      text: 'Terms of service violations',
      icon: CancelOutlined
    }
  ];

  return (
    <Box sx={{ bgcolor: '#f8faff', minHeight: '100vh', pt: 8, pb: 12 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              color: '#0064bf',
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Refund Policy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            Last Updated: {currentDate}
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto', color: 'text.secondary' }}>
            At WriteAI, we strive to provide a seamless and satisfying experience with our AI Writing Assistant. 
            However, if you are not fully satisfied with your purchase, we offer a refund policy under the following terms.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Eligibility Card */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={0}
              sx={{ 
                height: '100%',
                backgroundColor: 'white',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,100,191,0.1)'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CheckCircleOutline sx={{ color: '#0064bf', mr: 2, fontSize: 32 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#0064bf' }}>
                    Eligibility for Refunds
                  </Typography>
                </Box>
                <Typography paragraph color="text.secondary" sx={{ mb: 3 }}>
                  We provide refunds under the following conditions:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {eligibleCases.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <item.icon sx={{ color: 'success.main' }} />
                      <Typography>{item.text}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ mt: 3, p: 2, bgcolor: '#f8faff', borderRadius: 2 }}>
                  <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTime sx={{ color: '#0064bf' }} />
                    Refund requests must be made within 7 days of purchase
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Non-Refundable Card */}
          <Grid item xs={12} md={6}>
            <Card 
              elevation={0}
              sx={{ 
                height: '100%',
                backgroundColor: 'white',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,100,191,0.1)'
                }
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CancelOutlined sx={{ color: '#0064bf', mr: 2, fontSize: 32 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#0064bf' }}>
                    Non-Refundable Cases
                  </Typography>
                </Box>
                <Typography paragraph color="text.secondary" sx={{ mb: 3 }}>
                  We do not offer refunds in the following situations:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {nonRefundableCases.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <item.icon sx={{ color: 'error.main' }} />
                      <Typography>{item.text}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* How to Request Section */}
          <Grid item xs={12}>
            <Card 
              elevation={0}
              sx={{ 
                backgroundColor: 'white',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AccountBalance sx={{ color: '#0064bf', mr: 2, fontSize: 32 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#0064bf' }}>
                    How to Request a Refund
                  </Typography>
                </Box>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={8}>
                    <Typography paragraph>
                      To request a refund, please contact our support team with the following details:
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                      <Typography component="li" paragraph>
                        Your full name and email used for registration
                      </Typography>
                      <Typography component="li" paragraph>
                        Your order/transaction ID
                      </Typography>
                      <Typography component="li" paragraph>
                        A brief explanation of why you're requesting a refund
                      </Typography>
                    </Box>
                    <Typography paragraph>
                      We will review your request and respond within 3-5 business days. If approved, 
                      refunds will be processed to your original payment method within 5-10 business days.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box 
                      sx={{ 
                        bgcolor: '#f8faff',
                        p: 3,
                        borderRadius: 2,
                        textAlign: 'center'
                      }}
                    >
                      <Typography variant="h6" gutterBottom sx={{ color: '#0064bf' }}>
                        Need Assistance?
                      </Typography>
                      <Typography paragraph sx={{ mb: 3 }}>
                        Our support team is here to help you with your refund request
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<Email />}
                        href="mailto:support@writeai.com"
                        sx={{
                          bgcolor: '#9234ea',
                           borderRadius: '50px',
                           '&:hover': {
                            bgcolor: '#9234ea',
                             borderRadius: '50px'
                          }
                        }}
                      >
                        Contact Support
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Subscription Cancellations Card */}
          <Grid item xs={12}>
            <Card 
              elevation={0}
              sx={{ 
                backgroundColor: 'white',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AccessTime sx={{ color: '#0064bf', mr: 2, fontSize: 32 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#0064bf' }}>
                    Subscription Cancellations
                  </Typography>
                </Box>
                <Typography paragraph>
                  If you no longer wish to continue using our service, you can cancel your subscription anytime 
                  through your account settings. Cancellation will prevent future charges but does not entitle 
                  you to a refund for the current billing cycle.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default RefundPolicy;