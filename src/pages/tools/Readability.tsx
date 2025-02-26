import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ReadabilityDisplay from '../../components/ReadabilityDisplay';
import { useAnalyzeText } from '../../hooks/useAnalyzeText';

const Readability = () => {
  const [text, setText] = useState('');
  const { analyze, loading, result } = useAnalyzeText();

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    await analyze(text);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Readability Checker
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Analyze your text for readability scores, complex sentences, and difficult words.
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            placeholder="Enter your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <LoadingButton
              variant="contained"
              onClick={handleAnalyze}
              loading={loading}
              disabled={!text.trim()}
            >
              Analyze Text
            </LoadingButton>
            <Button
              variant="outlined"
              onClick={() => setText('')}
              disabled={!text.trim()}
            >
              Clear
            </Button>
          </Box>
        </Paper>

        <ReadabilityDisplay result={result} />
      </Box>
    </Container>
  );
};

export default Readability;
