import { useState } from 'react';

interface ReadabilityResult {
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

interface AnalyzeError {
  message: string;
  type: 'network' | 'server' | 'unknown';
}

export const useAnalyzeText = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReadabilityResult | null>(null);
  const [error, setError] = useState<AnalyzeError | null>(null);

  const analyze = async (text: string) => {
    setLoading(true);
    setError(null);

    const retryWithDelay = async (retries: number = 3, delay: number = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch('/api/analyze-readability', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setResult(data);
          return;
        } catch (error) {
          const isNetworkError = error instanceof Error && 
            (error.message.includes('network') || 
             error.message.includes('ERR_NETWORK') || 
             error.message.includes('Failed to fetch'));

          if (isNetworkError && i < retries - 1) {
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }

          setError({
            message: isNetworkError ? 
              'Network connection issue. Please check your internet connection.' : 
              'An error occurred while analyzing the text.',
            type: isNetworkError ? 'network' : 'unknown'
          });
          throw error;
        }
      }
    };

    try {
      await retryWithDelay();
    } catch (error) {
      console.error('Error analyzing text:', error);
    } finally {
      setLoading(false);
    }
  };

  return { analyze, loading, result, error };
};
