import { Navigate } from 'react-router-dom';
import GrammarChecker from '../pages/tools/GrammarChecker';
import Paraphraser from '../pages/tools/Paraphraser';
import Summarizer from '../pages/tools/Summarizer';
import Translator from '../pages/tools/Translator';
import ToneConverter from '../pages/tools/ToneConverter';
import Humanize from '../pages/tools/Humanize';
import AIContentDetector from '../pages/tools/AIContentDetector';

export const toolRoutes = [
  {
    path: 'grammar',
    element: <GrammarChecker />,
    title: 'Grammar Checker',
    description: 'Check and improve your text\'s grammar'
  },
  {
    path: 'paraphrase',
    element: <Paraphraser />,
    title: 'Paraphraser',
    description: 'Rewrite your text in different styles'
  },
  {
    path: 'summarize',
    element: <Summarizer />,
    title: 'Summarizer',
    description: 'Create concise summaries of your text'
  },
  {
    path: 'translate',
    element: <Translator />,
    title: 'Translator',
    description: 'Translate your text to different languages'
  },
  {
    path: 'tone',
    element: <ToneConverter />,
    title: 'Tone Converter',
    description: 'Adjust the tone of your writing'
  },
  {
    path: 'humanize',
    element: <Humanize />,
    title: 'Humanizer',
    description: 'Make your text sound more natural'
  },
  {
    path: 'ai-content-detector',
    element: <AIContentDetector />,
    title: 'AI Content Detector',
    description: 'Check if text was written by AI'
  }
];

// export const defaultToolRoute = toolRoutes[0].path;

// export const toolRoutesConfig = [
//   // Default redirect for /tools
//   { path: '', element: <Navigate to={defaultToolRoute} replace /> },
  
//   // Individual tool routes
//   ...toolRoutes,
  
//   // Catch invalid tool routes and redirect to default
//   { path: '*', element: <Navigate to={defaultToolRoute} replace /> }
// ];
