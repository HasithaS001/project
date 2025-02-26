import React from 'react';
import WritingDashboard from '../../components/WritingDashboard';

const ToneConverter = () => {
  return (
    <WritingDashboard 
      defaultTool="tone"
      title="Tone Converter"
      description="Transform your text into different tones while keeping the meaning intact"
      placeholder="Enter your text to convert its tone..."
      onAnalyze={async (text) => {
        return {
          suggestions: [],
          stats: {
            score: 0,
            improvements: 0,
            characters: text.length,
            words: text.split(/\s+/).length
          }
        };
      }}
    />
  );
};

export default ToneConverter;
