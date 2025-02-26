import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  TextField, 
  Button, 
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';

interface AIDetectionResponse {
  text: string;
  isAIGenerated: boolean;
  confidence: number;
  message: string;
}

const AIDetector: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AIDetectionResponse | null>(null);

  const detectAI = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://ai-content-detector-ai-gpt.p.rapidapi.com/api/detectText/', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '18f4419f85msh7c2dadcd9fa84a0p1305d2jsn62f1a1f9347d',
          'X-RapidAPI-Host': 'ai-content-detector-ai-gpt.p.rapidapi.com'
        },
        body: JSON.stringify({ text: inputText })
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      console.log('API Response:', data); // Debug log
      setResult(data);
    } catch (error) {
      console.error('API Error:', error);
      setError('Failed to analyze text. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        mt: 4, 
        p: 4, 
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1
      }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ 
          color: 'primary.main',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          AI Detector: Spot AI-Generated Content Instantly! 🚀
        </Typography>

        <Box sx={{ mt: 4 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            placeholder="Paste your text here to analyze..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={loading}
          />
          
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={detectAI}
              disabled={loading || !inputText.trim()}
              sx={{ minWidth: 200 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze Text'}
            </Button>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {result && (
            <Paper sx={{ mt: 3, p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Analysis Results
              </Typography>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            </Paper>
          )}
        </Box>

        <Box sx={{ 
          mt: 4, 
          mb: 4, 
          p: 3, 
          bgcolor: 'background.default',
          borderRadius: 2
        }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            🔥 Why Choose Our AI Detector?
          </Typography>
          <Typography component="div">
            ✅ Lightning-Fast Analysis – Detect AI-generated content in seconds<br/>
            ✅ Highly Accurate – Advanced AI models trained to spot even the most sophisticated AI text<br/>
            ✅ Protect Originality – Ensure your content is authentic, human-written, and plagiarism-free<br/>
            ✅ Easy to Use – Just paste your text and get instant results!
          </Typography>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ 
          color: 'text.secondary',
          textAlign: 'center',
          mb: 4
        }}>
          🧐 Is it Human-Written or AI-Generated? Find Out in Seconds!
        </Typography>

        <Typography variant="body1" paragraph>
          With the rise of AI-generated content, ensuring authenticity is more important than ever. 
          Our AI Detector is your go-to tool for detecting AI-written text with unmatched accuracy. 
          Whether you're a teacher, content creator, business owner, or researcher, stay ahead with reliable AI detection.
        </Typography>

        <Typography variant="h6" align="center" sx={{ 
          color: 'primary.main',
          fontWeight: 'bold'
        }}>
          🚀 Don't let AI-generated content slip through—try our AI Detector today!
        </Typography>
      </Box>
    </Container>
  );
};

export default AIDetector;
