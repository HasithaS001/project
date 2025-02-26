import React from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Divider,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';

interface ReadabilityDisplayProps {
  result: {
    fleschKincaid: number;
    gunningFog: number;
    smogIndex: number;
    complexSentences: Array<{
      sentence: string;
      suggestion: string;
    }>;
    difficultWords: Array<{
      word: string;
      synonyms: string[];
    }>;
    overallScore: number;
  } | null;
}

const ScoreCircle = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  margin: theme.spacing(2),
}));

const getScoreColor = (score: number) => {
  if (score >= 80) return '#4caf50';
  if (score >= 60) return '#ff9800';
  return '#f44336';
};

const getReadabilityLevel = (score: number): { level: string; grade: string; notes: string } => {
  if (score >= 70) return { 
    level: 'Very Easy to Read',
    grade: '7th grade',
    notes: 'Fairly easy to read.'
  };
  if (score >= 60) return {
    level: 'Easy to Read',
    grade: '8th & 9th grade',
    notes: 'Plain English. Easily understood by 13- to 15-year-old students.'
  };
  if (score >= 50) return {
    level: 'Moderate',
    grade: '10th to 12th grade',
    notes: 'Fairly difficult to read.'
  };
  return {
    level: 'Difficult',
    grade: 'College',
    notes: 'Difficult to read.'
  };
};

const ReadabilityDisplay: React.FC<ReadabilityDisplayProps> = ({ result }) => {
  if (!result) return null;

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        {/* Overall Score */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Overall Readability Score
              </Typography>
              <ScoreCircle>
                <CircularProgress
                  variant="determinate"
                  value={result.overallScore}
                  size={120}
                  thickness={4}
                  sx={{
                    color: getScoreColor(result.overallScore),
                    circle: {
                      strokeLinecap: 'round',
                    },
                  }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h4" component="div" color="text.secondary">
                    {Math.round(result.overallScore)}
                  </Typography>
                </Box>
              </ScoreCircle>
              <Typography variant="subtitle1" color="text.secondary">
                Level: {getReadabilityLevel(result.overallScore).level} ({getReadabilityLevel(result.overallScore).grade})
                <br />
                {getReadabilityLevel(result.overallScore).notes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Detailed Metrics */}
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Detailed Metrics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Tooltip title="Flesch-Kincaid Grade Level indicates the US grade level required to understand the text">
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Flesch-Kincaid
                      </Typography>
                      <Typography variant="h6">
                        {result.fleschKincaid.toFixed(1)}
                      </Typography>
                    </Paper>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Tooltip title="Gunning Fog Index estimates the years of formal education needed to understand the text">
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Gunning Fog
                      </Typography>
                      <Typography variant="h6">
                        {result.gunningFog.toFixed(1)}
                      </Typography>
                    </Paper>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Tooltip title="SMOG Index predicts the years of education needed to understand a piece of writing">
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        SMOG Index
                      </Typography>
                      <Typography variant="h6">
                        {result.smogIndex.toFixed(1)}
                      </Typography>
                    </Paper>
                  </Tooltip>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Complex Sentences */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AutoFixHighIcon sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Complex Sentences
                </Typography>
              </Box>
              <List>
                {result.complexSentences.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={item.sentence}
                        secondary={
                          <Typography
                            component="span"
                            variant="body2"
                            color="success.main"
                            sx={{ mt: 1 }}
                          >
                            Suggestion: {item.suggestion}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < result.complexSentences.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Difficult Words */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SpellcheckIcon sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Difficult Words
                </Typography>
              </Box>
              <List>
                {result.difficultWords.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" component="span">
                            {item.word}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            {item.synonyms.map((synonym, i) => (
                              <Chip
                                key={i}
                                label={synonym}
                                size="small"
                                sx={{ mr: 1, mb: 1 }}
                              />
                            ))}
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < result.difficultWords.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReadabilityDisplay;
