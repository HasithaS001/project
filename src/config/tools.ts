import { Description } from '@mui/icons-material';
import AIContentDetector from '../pages/tools/AIContentDetector';

export const tools = [
  // ... existing tools ...
  {
    id: 'ai-content-detector',
    name: 'AI Content Detector',
    description: 'Check if text was written by AI or a human',
    icon: Description,
    path: '/tools/ai-content-detector',
    component: AIContentDetector,
    category: 'writing'
  },
  // ... other tools ...
]; 