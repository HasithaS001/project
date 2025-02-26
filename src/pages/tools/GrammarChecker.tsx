import React, { useState, useCallback, useEffect } from 'react';
import WritingDashboard from '../../components/WritingDashboard';
import { Box, Chip, Typography, Paper, Tooltip, IconButton, Popover } from '@mui/material';
import { ErrorOutline, CheckCircleOutline, Edit } from '@mui/icons-material';
import debounce from 'lodash/debounce';
import { GrammarError, AnalysisResult } from '../../types/grammar';

const GrammarChecker: React.FC = () => {
  const [errors, setErrors] = useState<GrammarError[]>([]);
  const [text, setText] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedError, setSelectedError] = useState<GrammarError | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, error: GrammarError) => {
    setAnchorEl(event.currentTarget);
    setSelectedError(error);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedError(null);
  };

  const applyFix = useCallback((suggestion: string) => {
    if (selectedError) {
      const newText = 
        text.substring(0, selectedError.index) + 
        suggestion + 
        text.substring(selectedError.index + selectedError.length);
      setText(newText);
      setErrors(prevErrors => prevErrors.filter(error => error !== selectedError));
      handlePopoverClose();
    }
  }, [selectedError, text]);

  // Real-time analysis with debounce
  const debouncedAnalyze = useCallback(
    debounce(async (text: string) => {
      const result = await handleAnalyze(text);
      setErrors(result.suggestions);
    }, 500),
    []
  );

  useEffect(() => {
    if (text) {
      debouncedAnalyze(text);
    } else {
      setErrors([]);
    }
  }, [text, debouncedAnalyze]);

  const handleAnalyze = useCallback(async (text: string): Promise<AnalysisResult> => {
    const grammarErrors: GrammarError[] = [];
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const characters = text.length;
    
    // Initialize category scores
    let grammarScore = 100;
    let spellingScore = 100;
    let punctuationScore = 100;
    let styleScore = 100;
    let currentIndex = 0;

    // Enhanced grammar rules
    const grammarRules = [
      // Punctuation spacing
      {
        pattern: /[.,!?](?=[A-Za-z])/g,
        type: 'punctuation',
        message: 'Missing space after punctuation',
        fix: (match: string) => `${match[0]} ${match[1]}`
      },
      // Multiple spaces
      {
        pattern: /\s{2,}/g,
        type: 'spacing',
        message: 'Multiple spaces detected',
        fix: () => ' '
      },
      // Sentence capitalization
      {
        pattern: /(?<=[.!?]\s+)[a-z]/g,
        type: 'capitalization',
        message: 'Sentence should start with a capital letter',
        fix: (match: string) => match.toUpperCase()
      },
      // Common word pairs
      {
        pattern: /\b(could of|would of|should of)\b/gi,
        type: 'grammar',
        message: 'Incorrect usage. Use "have" instead of "of"',
        fix: (match: string) => match.replace(/\bof\b/i, 'have')
      },
      // Double negatives
      {
        pattern: /\b(?:don't|doesn't|didn't|won't|wouldn't|can't|couldn't)\b.*?\b(?:no|none|nobody|nothing|nowhere)\b/gi,
        type: 'grammar',
        message: 'Double negative detected',
        fix: (match: string) => 'Consider rephrasing to avoid double negative'
      },
      // Subject-verb agreement
      {
        pattern: /\b(he|she|it)\s+(are|were|have)\b|\b(they)\s+(is|was|has)\b/gi,
        type: 'grammar',
        message: 'Subject-verb agreement error',
        fix: (match: string) => 'Fix subject-verb agreement'
      },
      // Run-on sentences
      {
        pattern: /[a-z]\s+[a-z]/gi,
        type: 'style',
        message: 'Potential run-on sentence',
        fix: (match: string) => 'Consider breaking into shorter sentences'
      },
      // Commonly misspelled words
      {
        pattern: /\b(recieve|seperate|occured|accomodate|untill|begining|beleive|concious|definately|enviroment|existance|foreward|gaurd|independant|liason|occassion|priviledge|reccommend|relevent|sieze|suprise|tommorow|truely|untill|wierd)\b/gi,
        type: 'spelling',
        message: 'Commonly misspelled word',
        fix: (match: string) => match.toLowerCase() === 'recieve' ? 'receive' :
          match.toLowerCase() === 'seperate' ? 'separate' :
          match.toLowerCase() === 'occured' ? 'occurred' : 'Check spelling'
      }
    ];

    // Apply enhanced grammar rules
    grammarRules.forEach(rule => {
      const matches = text.matchAll(rule.pattern);
      for (const match of matches) {
        if (match[0] && match.index !== undefined) {
          grammarErrors.push({
            type: rule.type,
            message: rule.message,
            index: match.index,
            length: match[0].length,
            suggestions: [typeof rule.fix === 'function' ? rule.fix(match[0]) : rule.fix]
          });
          
          // Update category scores based on error type
          switch (rule.type) {
            case 'grammar':
              grammarScore = Math.max(0, grammarScore - 8);
              break;
            case 'spelling':
              spellingScore = Math.max(0, spellingScore - 5);
              break;
            case 'punctuation':
              punctuationScore = Math.max(0, punctuationScore - 4);
              break;
            case 'style':
              styleScore = Math.max(0, styleScore - 3);
              break;
          }
        }
      }
    });

    // Calculate overall score as weighted average
    const score = Math.round(
      (grammarScore * 0.4) +
      (spellingScore * 0.3) +
      (punctuationScore * 0.2) +
      (styleScore * 0.1)
    );

    // Ensure score stays within bounds
    const finalScore = Math.max(0, Math.min(100, score));

    return {
      suggestions: grammarErrors,
      stats: {
        score: finalScore,
        improvements: grammarErrors.length,
        characters,
        words: words.length,
        categoryScores: {
          grammar: grammarScore,
          spelling: spellingScore,
          punctuation: punctuationScore,
          style: styleScore
        }
      }
    };
  }, []);

  const renderText = () => {
    if (!text) return null;

    let lastIndex = 0;
    const elements: JSX.Element[] = [];

    errors.sort((a, b) => a.index - b.index).forEach((error, i) => {
      // Add text before error
      if (error.index > lastIndex) {
        elements.push(
          <span key={`text-${i}`}>
            {text.substring(lastIndex, error.index)}
          </span>
        );
      }

      // Add highlighted error
      elements.push(
        <Tooltip
          key={`error-${i}`}
          title={error.message}
          arrow
        >
          <span
            style={{
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              borderBottom: '2px wavy red',
              cursor: 'pointer'
            }}
            onClick={(e) => handlePopoverOpen(e, error)}
          >
            {text.substring(error.index, error.index + error.length)}
          </span>
        </Tooltip>
      );

      lastIndex = error.index + error.length;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(
        <span key="text-end">
          {text.substring(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  return (
    <>
      <WritingDashboard
        defaultTool="grammar"
        title="Grammar Checker"
        description="Real-time grammar checking and improvement suggestions"
        placeholder="Start typing to check grammar in real-time..."
        value={text}
        onChange={(newText: string) => setText(newText)}
        onAnalyze={(text: string) => {
          const result = handleAnalyze(text);
          return result;
        }}
        results={
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mt: 2,
              backgroundColor: 'background.paper',
              borderRadius: 3,
              position: 'relative'
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Text Analysis
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {renderText()}
              </Box>
            </Box>

            {errors.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Found Issues ({errors.length})
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {errors.map((error, index) => (
                    <Chip
                      key={index}
                      icon={<ErrorOutline />}
                      label={error.message}
                      color="error"
                      variant="outlined"
                      onClick={(e) => handlePopoverOpen(e as any, error)}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Paper>
        }
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {selectedError && (
          <Box sx={{ p: 2, maxWidth: 300 }}>
            <Typography variant="subtitle1" gutterBottom>
              Suggestions:
            </Typography>
            {selectedError.suggestions.map((suggestion, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1
                }}
              >
                <Typography variant="body2">{suggestion}</Typography>
                <IconButton
                  size="small"
                  onClick={() => applyFix(suggestion)}
                  title="Apply fix"
                >
                  <Edit fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Popover>
    </>
  );
};

export default GrammarChecker;
