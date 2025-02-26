export interface GrammarError {
  type: string;
  message: string;
  index: number;
  length: number;
  suggestions: string[];
}

export interface AnalysisStats {
  score: number;
  improvements: number;
  characters: number;
  words: number;
  categoryScores: {
    grammar: number;
    spelling: number;
    punctuation: number;
    style: number;
  };
}

export interface AnalysisResult {
  suggestions: GrammarError[];
  stats: AnalysisStats;
}

export interface GrammarResult {
  score: number;
  errors: string[];
  correctedText: string;
}

export interface ParaphraseResult {
  paraphrasedText: string;
}

export interface ReadabilityResult {
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
}

export interface AIDetectorResult {
  aiProbability: number;
  humanProbability: number;
  mixedProbability: number;
  indicators: string[];
  explanation: string;
  contentType: 'AI' | 'Human' | 'Mixed';
}
