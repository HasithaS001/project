import React from 'react';
import WritingDashboard from '../../components/WritingDashboard';

const Summarizer = () => {
  const handleAnalyze = async (text: string) => {
    // Implement your text analysis logic here
    return {
      suggestions: [],
      stats: {
        score: 0,
        improvements: 0,
        characters: text.length,
        words: text.split(/\s+/).length,
      }
    };
  };

  return (
    <WritingDashboard
      defaultTool="summarize"
      title="Text Summarizer"
      description="Summarize your text into concise, clear content"
      placeholder="Enter the text you want to summarize..."
      onAnalyze={handleAnalyze}
    />
  );
};

export default Summarizer;
