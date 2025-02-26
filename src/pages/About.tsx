import React from 'react';
import { Box, Container, Typography, Grid, Avatar, Paper, Divider } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Star, Rocket, Group, TrendingUp, CheckCircle, Speed } from '@mui/icons-material';
import Footer from '../components/Footer';

const AboutPage = () => {
  const themeColor = '#0064bf';
  
  const achievements = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to revolutionize AI writing.' },
    { year: '2021', title: 'First Major Release', description: 'Launched our flagship AI writing assistant.' },
    { year: '2022', title: 'Global Expansion', description: 'Expanded to serve clients worldwide.' },
    { year: '2023', title: 'Industry Recognition', description: 'Received multiple industry awards for innovation.' },
  ];

  const stats = [
    { number: '1M+', label: 'Active Users' },
    { number: '50+', label: 'Countries' },
    { number: '100M+', label: 'Documents Created' },
    { number: '99%', label: 'Customer Satisfaction' },
  ];

  return (
    <Box sx={{ py: 8, bgcolor: '#ffffff' }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8, position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '200px', background: `linear-gradient(180deg, ${themeColor}08 0%, transparent 100%)`, zIndex: 0, borderRadius: '50%' }} />
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h2" component="h1" sx={{ mb: 3, fontWeight: 800, color: themeColor, fontSize: { xs: '2.5rem', md: '3.5rem' }, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              About WriteAI
            </Typography>
            <Typography variant="h5" sx={{ color: 'text.secondary', mb: 4, maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}>
              Transforming the future of content creation with advanced artificial intelligence
            </Typography>
          </Box>
        </Box>

        {/* Stats Section */}
        <Box sx={{ mb: 12 }}>
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat) => (
              <Grid item xs={6} md={3} key={stat.label}>
                <Paper elevation={0} sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  backgroundColor: '#ffffff',
                  borderRadius: 2,
                  border: '1px solid rgba(0, 100, 191, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': { 
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0, 100, 191, 0.12)'
                  } 
                }}>
                  <Typography variant="h3" sx={{ color: themeColor, fontWeight: 700, mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Mission Section */}
        <Box sx={{ mb: 12 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 3, color: themeColor }}>
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
                At WriteAI, we're committed to democratizing advanced writing technology. Our mission is to empower individuals 
                and organizations with AI-driven tools that enhance creativity, productivity, and communication effectiveness.
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                We believe that everyone deserves access to powerful writing assistance, regardless of their background or expertise level.
                Our platform combines cutting-edge AI technology with intuitive design to make professional writing accessible to all.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/mission.png"
                alt="Our Mission"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Timeline Section */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h4" sx={{ mb: 6, textAlign: 'center', color: themeColor }}>
            Our Journey
          </Typography>
          <Timeline position="alternate">
            {achievements.map((achievement, index) => (
              <TimelineItem key={achievement.year}>
                <TimelineSeparator>
                  <TimelineDot sx={{ bgcolor: themeColor }}>
                    {index === 0 ? <Star /> : index === 1 ? <Rocket /> : index === 2 ? <Group /> : <TrendingUp />}
                  </TimelineDot>
                  {index !== achievements.length - 1 && <TimelineConnector sx={{ bgcolor: themeColor }} />}
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={1} sx={{ p: 3, bgcolor: 'rgba(0, 100, 191, 0.02)' }}>
                    <Typography variant="h6" sx={{ color: themeColor }}>
                      {achievement.year}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {achievement.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {achievement.description}
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>

        {/* Team Section */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h4" sx={{ mb: 6, textAlign: 'center', color: themeColor }}>
            Meet Our Team
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: 'John Smith',
                role: 'CEO & Founder',
                image: '/images/team/member1.png',
                description: 'Visionary leader with 15+ years in AI and machine learning.',
                social: {
                  linkedin: 'https://linkedin.com/in/johnsmith',
                  twitter: 'https://twitter.com/johnsmith'
                }
              },
              {
                name: 'Sarah Johnson',
                role: 'Chief Technology Officer',
                image: '/images/team/member2.png',
                description: 'AI expert specializing in NLP and machine learning algorithms.',
                social: {
                  linkedin: 'https://linkedin.com/in/sarahjohnson',
                  twitter: 'https://twitter.com/sarahjohnson'
                }
              },
              {
                name: 'Michael Chen',
                role: 'Head of Product',
                image: '/images/team/member3.png',
                description: 'Product strategist with a passion for user-centric design.',
                social: {
                  linkedin: 'https://linkedin.com/in/michaelchen',
                  twitter: 'https://twitter.com/michaelchen'
                }
              }
            ].map((member) => (
              <Grid item xs={12} sm={6} md={4} key={member.name}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    textAlign: 'center',
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    border: '1px solid rgba(0, 100, 191, 0.1)',
                    transition: 'all 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0, 100, 191, 0.12)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 180,
                      height: 180,
                      mx: 'auto',
                      mb: 3,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: -2,
                        left: -2,
                        right: -2,
                        bottom: -2,
                        background: `linear-gradient(45deg, ${themeColor}, #00a3ff)`,
                        borderRadius: '50%',
                        zIndex: 0
                      }
                    }}
                  >
                    <Box
                      component="img"
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        position: 'relative',
                        zIndex: 1,
                        border: '4px solid white'
                      }}
                    />
                  </Box>
                  <Typography variant="h5" sx={{ mb: 1, color: themeColor, fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mb: 2, color: 'text.secondary', fontWeight: 500 }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
                    {member.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#0064bf] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a 
                      href={member.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#0064bf] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 12 }}>
          <Typography variant="h4" sx={{ mb: 6, textAlign: 'center', color: themeColor }}>
            Why Choose WriteAI
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                name: 'Emily Rodriguez',
                role: 'Content Creator',
                image: '/images/testimonials/user1.png',
                rating: 5,
                quote: 'WriteAI has completely transformed my content creation process. The AI suggestions are incredibly accurate and have helped me improve my writing significantly.',
              },
              {
                name: 'David Chen',
                role: 'Marketing Manager',
                image: '/images/testimonials/user2.png',
                rating: 5,
                quote: 'As a marketing professional, I need to produce high-quality content quickly. WriteAI has become an indispensable tool in my daily workflow.',
              },
              {
                name: 'Sophie Anderson',
                role: 'Freelance Writer',
                image: '/images/testimonials/user3.png',
                rating: 5,
                quote: 'The accuracy and speed of WriteAI are unmatched. It helps me maintain my high standards while meeting tight deadlines.',
              },
            ].map((testimonial) => (
              <Grid item xs={12} md={4} key={testimonial.name}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    backgroundColor: '#ffffff',
                    borderRadius: 2,
                    border: '1px solid rgba(0, 100, 191, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0, 100, 191, 0.12)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                      src={testimonial.image}
                      alt={testimonial.name}
                      sx={{ width: 64, height: 64, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ color: themeColor, fontWeight: 600 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2, display: 'flex', gap: 0.5 }}>
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <Star key={index} sx={{ color: '#FFD700', fontSize: 20 }} />
                    ))}
                  </Box>
                  <Typography variant="body1" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    "{testimonial.quote}"
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            p: 8, 
            borderRadius: 2,
            backgroundColor: '#ffffff',
            border: '1px solid rgba(0, 100, 191, 0.1)',
            mb: 8 
          }}
        >
          <Typography variant="h4" sx={{ mb: 3, color: themeColor }}>
            Ready to Transform Your Writing?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
            Join thousands of satisfied users who have already elevated their writing with WriteAI.
          </Typography>
          <button 
            className="bg-[#0064bf] text-white px-8 py-4 rounded-lg hover:bg-[#0056a3] transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
          >
            Start Writing for Free
          </button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default AboutPage;
