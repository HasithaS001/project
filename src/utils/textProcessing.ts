import { GrammarResult, ParaphraseResult, ReadabilityResult, AIDetectorResult } from '../types/grammar';

export const parseGrammarResult = (text: string): GrammarResult => {
  try {
    // Extract score
    const scoreMatch = text.match(/WRITING SCORE:\s*([\d]+)\s*%/i);
    const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

    // Extract errors
    const errorSection = text.split(/ERRORS FOUND:/i)[1]?.split(/CORRECTED TEXT:/i)[0] || '';
    const errors = errorSection
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.trim().replace(/^-\s*/, ''))
      .filter(error => error.length > 0);

    // Extract corrected text
    const correctedTextMatch = text.match(/CORRECTED TEXT:\s*([\s\S]*?)(?=---|$)/i);
    const correctedText = correctedTextMatch 
      ? correctedTextMatch[1].trim()
      : text.split(/CORRECTED TEXT:/i)[1]?.split('---')[0]?.trim() || '';

    return {
      score,
      errors,
      correctedText: correctedText || text // Fallback to original text if parsing fails
    };
  } catch (error) {
    console.error('Error parsing grammar result:', error);
    return {
      score: 0,
      errors: ['Error parsing grammar results. Please try again.'],
      correctedText: text // Fallback to original text
    };
  }
};

export const parseParaphraseResult = (text: string): ParaphraseResult => {
  const paraphrasedText = text.split('PARAPHRASED TEXT:\n')[1]?.split('\n---')[0]?.trim() || text;
  return { paraphrasedText };
};

export const parseReadabilityResult = (text: string): ReadabilityResult => {
  try {
    return JSON.parse(text);
  } catch (error) {
    return {
      fleschKincaid: 0,
      gunningFog: 0,
      smogIndex: 0,
      complexSentences: [],
      difficultWords: [],
      overallScore: 0
    };
  }
};

export const parseAIDetectorResult = (text: string): AIDetectorResult => {
  try {
    return JSON.parse(text);
  } catch (error) {
    return {
      aiProbability: 0,
      humanProbability: 0,
      mixedProbability: 0,
      indicators: [],
      explanation: '',
      contentType: 'Human'
    };
  }
};
