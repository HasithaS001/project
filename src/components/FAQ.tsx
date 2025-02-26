import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FAQProps {
  questions: {
    question: string;
    answer: string;
  }[];
}

const FAQ: React.FC<FAQProps> = ({ questions }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box className="w-full max-w-4xl mx-auto mt-8">
      <Box className="space-y-4">
        {questions.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              background: 'transparent',
              boxShadow: 'none',
              '&:before': { display: 'none' },
              '&.Mui-expanded': {
                margin: '16px 0',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                background: 'white',
                borderRadius: '16px !important',
              },
              borderRadius: '16px',
              border: '1px solid',
              borderColor: expanded === `panel${index}` ? 'primary.main' : 'divider',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                borderColor: 'primary.main',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
              }
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    color: expanded === `panel${index}` ? 'primary.main' : 'text.secondary',
                    transform: expanded === `panel${index}` ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                />
              }
              sx={{
                '&.Mui-expanded': {
                  minHeight: '64px',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                },
                padding: '16px 24px',
                '& .MuiAccordionSummary-content': {
                  margin: '12px 0',
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  color: expanded === `panel${index}` ? 'primary.main' : 'text.primary',
                  transition: 'color 0.3s ease-in-out',
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: '24px',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(248,250,255,0.9) 100%)',
                borderRadius: '0 0 16px 16px',
              }}
            >
              <Typography
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.7,
                  fontSize: '0.95rem',
                }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FAQ;
