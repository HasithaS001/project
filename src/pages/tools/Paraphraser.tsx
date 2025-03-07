import WritingDashboard from '../../components/WritingDashboard';

const Paraphraser = () => {
  return (
    <WritingDashboard 
      defaultTool="paraphrase"
      title="Paraphraser"
      description="Rewrite your text in different ways while keeping the original meaning"
      placeholder="Enter your text to paraphrase..."
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

export default Paraphraser;
