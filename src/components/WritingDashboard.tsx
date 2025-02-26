import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { TypeAnimation } from 'react-type-animation';
import RichTextEditor from './RichTextEditor';
import FAQ from './FAQ';
import TypeWriter from './TypeWriter';
import { 
  Container, 
  Paper, 
  Typography,
  Box, 
  Button, 
  CircularProgress,
  Tabs,
  Tab,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  createTheme,
  ThemeProvider,
  SelectChangeEvent
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Spellcheck,
  Summarize,
  Translate,
  Language,
  FormatListBulleted,
  ShortText,
  TextFields,
  AutoAwesome,
  School,
  Work,
  Chat,
  ErrorOutline,
  Psychology,
  Assessment,
  Search,
} from '@mui/icons-material';
import ReadabilityDisplay from './ReadabilityDisplay';
import {
  AnalysisResult, 
  GrammarResult, 
  ReadabilityResult, 
  AIDetectorResult, 
  ParaphraseResult 
} from '../types/grammar';
import { 
  parseGrammarResult, 
  parseParaphraseResult, 
  parseReadabilityResult, 
  parseAIDetectorResult 
} from '../utils/textProcessing';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const theme = createTheme({
  palette: {
    primary: {
      main: '#9234ea',
    },
    background: {
      default: '#f8f9ff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(146, 52, 234, 0.08)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          minHeight: 56,
          fontSize: '0.95rem',
          fontWeight: 500,
          '&.Mui-selected': {
            backgroundColor: alpha('#9234ea', 0.08),
            borderRadius: 12,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '50px',
          fontWeight: 600,
          padding: '8px 24px',
          fontSize: '0.95rem',
          transition: 'all 0.2s ease-in-out',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(146, 52, 234, 0.2)',
          },
          '&.MuiButton-contained': {
            background: 'linear-gradient(45deg, #9234ea, #b15ffb)',
            '&:hover': {
              background: 'linear-gradient(45deg, #9234ea, #b15ffb)',
            },
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          textTransform: 'none',
          fontWeight: 500,
          '&.Mui-selected': {
            backgroundColor: alpha('#9234ea', 0.12),
          },
        },
      },
    },
  },
});

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
];

const paraphraseStyles = [
  {
    id: 'simple',
    name: 'Simple',
    icon: <AutoAwesome />,
    description: 'Basic sentence structure changes',
    prompt: 'Paraphrase the following text using simple sentence structure changes. Keep the meaning clear and easy to understand.Do not show anything else in the output:\n\n'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    icon: <Psychology />,
    description: 'Sophisticated restructuring',
    prompt: 'Paraphrase the following text using sophisticated sentence restructuring. Make significant changes to sentence structure while preserving the exact meaning.only show advanced paraphrase textDo not show anything else in the output:\n\n'
  },
  {
    id: 'fluency',
    name: 'Fluency',
    icon: <TextFields />,
    description: 'Natural and readable',
    prompt: 'Paraphrase the following text to enhance its fluency and readability. Focus on making the text flow naturally, fix any awkward phrasing, and improve clarity while keeping the original meaning intact. Make it sound more polished and professional. Only show the enhanced fluent text in the output:\n\n'
  },
  {
    id: 'formal',
    name: 'Formal',
    icon: <Work />,
    description: 'Professional tone',
    prompt: 'Paraphrase the following text using formal and professional language. Use sophisticated vocabulary and maintain a professional tone.only show professional paraphrase text.Do not show anything else in the output:\n\n'
  },
  {
    id: 'academic',
    name: 'Academic',
    icon: <School />,
    description: 'Academic writing',
    prompt: 'Paraphrase the following text in an academic style. Use scholarly language, precise terminology, and maintain an academic tone.only show academic paraphrase text.Do not show anything else in the output:\n\n'
  },
  {
    id: 'casual',
    name: 'Casual',
    icon: <Chat />,
    description: 'Informal tone',
    prompt: 'Paraphrase the following text in a casual, conversational style. Use natural, everyday language and maintain an informal tone.Do not show anything else in the output:\n\n'
  }
];

const humanizeStyles = {
  options: [
    {
      id: 'casual',
      name: 'Casual',
      icon: <Chat />,
      description: 'Friendly and conversational',
      prompt: 'Transform the following text into a casual, friendly tone while maintaining its core message. Make it sound natural and conversational, as if speaking to a friend:\n\n'
    },
    {
      id: 'professional',
      name: 'Professional',
      icon: <Work />,
      description: 'Formal and business-like',
      prompt: 'Transform the following text into a professional, business-appropriate tone while maintaining its core message. Make it sound polished and formal, suitable for a business context:\n\n'
    },
    {
      id: 'academic',
      name: 'Academic',
      icon: <School />,
      description: 'Scholarly and analytical',
      prompt: 'Transform the following text into an academic tone while maintaining its core message. Make it sound scholarly and analytical, suitable for academic writing:\n\n'
    },
    {
      id: 'empathetic',
      name: 'Empathetic',
      icon: <Psychology />,
      description: 'Warm and understanding',
      prompt: 'Transform the following text into an empathetic, understanding tone while maintaining its core message. Add emotional depth and show understanding:\n\n'
    }
  ]
};

const summaryStyles = {
  options: [
    {
      id: 'bullet',
      name: 'Bullet Points',
      description: 'Convert text into key points for quick readability',
      icon: <FormatListBulleted />,
      prompt: 'Convert the following text into a bullet-point summary. Extract only the key points and present them in a clear, concise format. Format each point with a "•" bullet point:\n\n'
    },
    {
      id: 'sentence',
      name: 'Sentence-Level',
      description: 'Extract important sentences while maintaining context',
      icon: <ShortText />,
      prompt: 'Summarize the following text by extracting the most important sentences. Maintain the context and flow while reducing length. Present it as a continuous paragraph:\n\n'
    },
    {
      id: 'paragraph',
      name: 'Paragraph-Level',
      description: 'Retain overall meaning while reducing word count',
      icon: <TextFields />,
      prompt: 'Create a concise paragraph-level summary of the following text. Retain the main ideas and overall meaning while significantly reducing the word count:\n\n'
    }
  ]
};

const tools = [
  { 
    id: 'readability',
    name: 'Readability Checker',
    icon: <Assessment />,
    prompt: `Analyze the following text for readability and provide a detailed analysis in JSON format with the following structure:
    {
      "fleschKincaid": number,
      "gunningFog": number,
      "smogIndex": number,
      "complexSentences": [{"sentence": string, "suggestion": string}],
      "difficultWords": [{"word": string, "synonyms": string[]}],
      "overallScore": number
    }
    
    Focus on:
    1. Calculate Flesch-Kincaid, Gunning Fog, and SMOG Index scores
    2. Identify complex sentences and suggest simpler alternatives
    3. Highlight difficult words and provide easier synonyms
    4. Provide an overall readability score (0-100)
    
    Text to analyze:\n\n`
  },
  { 
    id: 'ai-detector',
    name: 'AI Content Detector',
    icon: <Search />,
    prompt: `Analyze the following text and determine if it was likely written by AI, human, or a mix of both. Provide the analysis in JSON format:
    {
      "aiProbability": number,
      "humanProbability": number,
      "mixedProbability": number,
      "contentType": "AI" | "Human" | "Mixed",
      "indicators": string[],
      "explanation": string
    }
    
    Note:
    - Probabilities should be percentages (0-100)
    - The sum of all probabilities should equal 100
    - contentType should be the highest probability category
    - Include specific indicators that helped determine the content type
    - Provide a detailed explanation of the analysis
    
    Text to analyze:\n\n`
  },
  { 
    id: 'grammar',
    name: 'Grammar Check',
    icon: <Spellcheck />,
    prompt: 'Check the following text for grammar, spelling, and style errors. Return the analysis in a user-friendly format, including a score between 0-100, a list of error descriptions, and the corrected version of the text.\n\nText to analyze:\n\n'
  },
  { 
    id: 'paraphrase',
    name: 'Paraphrase',
    icon: <AutoAwesome />,
    prompt: 'Paraphrase the following text. Return only the paraphrased text without any additional explanation or HTML tags:\n\n'
  },
  { 
    id: 'summarize',
    name: 'Summarize',
    icon: <Summarize />,
    prompt: 'Provide a concise summary of the following text. Return only the summary without any additional explanation or HTML tags.Do not show anything else in the output.:\n\n'
  },
  { 
    id: 'translate',
    name: 'Translate',
    icon: <Translate />,
    prompt: 'Translate the following text to [targetLanguage]. Return only the translated text without any additional explanation or HTML tags:\n\n'
  },
  {
    id: 'tone',
    name: 'Tone Converter',
    icon: <Psychology />,
    prompt: 'Convert the following text to [toneStyle] tone while preserving its core meaning. Return only the converted text without any additional explanation or HTML tags:\n\n'
  },
  {
    id: 'humanize',
    name: 'AI Humanizer',
    icon: <AutoAwesome />,
    prompt: 'Transform the following AI-generated text to make it more natural and human-like. Adjust the tone, add emotional nuance, and improve readability while maintaining the core message. Return only the humanized text without any additional explanation:\n\n'
  }
];

interface WritingDashboardProps {
  defaultTool?: string;
  title: string;
  description: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  onAnalyze: (text: string) => Promise<AnalysisResult>;
  results?: React.ReactNode;
}

const WritingDashboard = ({ 
  defaultTool = 'grammar',
  title, 
  description, 
  placeholder,
  value,
  onChange,
  onAnalyze,
  results
}: WritingDashboardProps) => {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState<string>(defaultTool);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paraphraseStyle, setParaphraseStyle] = useState('simple');
  const [humanizeStyle, setHumanizeStyle] = useState('casual');
  const [toneStyle, setToneStyle] = useState('formal');
  const [grammarScore, setGrammarScore] = useState<number | null>(null);
  const [grammarResult, setGrammarResult] = useState<GrammarResult | null>(null);
  const [readabilityResult, setReadabilityResult] = useState<ReadabilityResult | null>(null);
  const [aiDetectorResult, setAIDetectorResult] = useState<AIDetectorResult>({
    aiProbability: 0,
    humanProbability: 0,
    mixedProbability: 0,
    indicators: [],
    explanation: '',
    contentType: 'Human'
  });

  const handleEditorChange = (value: string) => {
    onChange(value);
  };

  const processWithGemini = async (text: string, toolId: string) => {
    if (!text.trim()) return;

    // Clean the text from HTML tags before sending to API
    const cleanText = text.replace(/<[^>]*>/g, '');
    
    setLoading(true);
    setError(null);
    setGrammarScore(null);
    setReadabilityResult(null);
    setAIDetectorResult({
      aiProbability: 0,
      humanProbability: 0,
      mixedProbability: 0,
      indicators: [],
      explanation: '',
      contentType: 'Human'
    });

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const tool = tools.find(t => t.id === toolId);
      if (!tool) throw new Error('Tool not found');

      let prompt = tool.prompt + cleanText;
      
      if (toolId === 'translate') {
        const language = languages.find(l => l.code === 'es');
        prompt = prompt.replace('[targetLanguage]', language?.name || 'Spanish');
      } else if (toolId === 'paraphrase') {
        const style = paraphraseStyles.find(s => s.id === paraphraseStyle);
        prompt = style ? style.prompt + cleanText : tool.prompt + cleanText;
      } else if (toolId === 'summarize') {
        const style = summaryStyles.options.find(s => s.id === 'bullet');
        prompt = style ? style.prompt + cleanText : tool.prompt + cleanText;
      } else if (toolId === 'humanize') {
        const style = humanizeStyles.options.find(s => s.id === humanizeStyle);
        prompt = style ? style.prompt + cleanText : tool.prompt + cleanText;
      } else if (toolId === 'tone') {
        prompt = `Convert the following text to ${toneStyle} tone while preserving its core meaning. Return only the converted text without any additional explanation or HTML tags:\n\n` + cleanText;
      }

      prompt += '\n\nNote: Please provide the output in plain text format without any HTML tags or markdown formatting.';

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();

      if (toolId === 'grammar') {
        const grammarResult = parseGrammarResult(responseText);
        setGrammarScore(grammarResult.score);
        setGrammarResult(grammarResult); 
      } else if (toolId === 'readability') {
        const readabilityResult = parseReadabilityResult(responseText);
        setReadabilityResult(readabilityResult);
      } else if (toolId === 'ai-detector') {
        const aiResult = parseAIDetectorResult(responseText);
        setAIDetectorResult(aiResult);
      } else if (toolId === 'paraphrase') {
        const result = parseParaphraseResult(responseText);
        onChange(result.paraphrasedText);
      } else {
        setGrammarResult(null); 
        setReadabilityResult(null); 
        setAIDetectorResult({
          aiProbability: 0,
          humanProbability: 0,
          mixedProbability: 0,
          indicators: [],
          explanation: '',
          contentType: 'Human'
        }); 
        onChange(responseText);
      }
    } catch (error) {
      console.error('Error processing text:', error);
      setError('An error occurred while processing your text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
    if ((toolId === 'readability' || toolId === 'ai-detector') && value.trim()) {
      processWithGemini(value, toolId);
    } else {
      onChange('');
      setGrammarResult(null);
      setReadabilityResult(null);
      setAIDetectorResult({
        aiProbability: 0,
        humanProbability: 0,
        mixedProbability: 0,
        indicators: [],
        explanation: '',
        contentType: 'Human'
      });
    }
  };

  const handleParaphraseStyleChange = (_event: React.MouseEvent<HTMLElement>, newStyle: string) => {
    if (newStyle !== null) {
      setParaphraseStyle(newStyle);
      if (value && selectedTool === 'paraphrase') {
        processWithGemini(value, 'paraphrase');
      }
    }
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const language = languages.find(l => l.code === event.target.value);
    if (language) {
      if (value && selectedTool === 'translate') {
        processWithGemini(value, 'translate');
      }
    }
  };

  const handleSummaryStyleChange = (_event: React.MouseEvent<HTMLElement>, newStyle: string) => {
    if (newStyle !== null) {
      const style = summaryStyles.options.find(s => s.id === newStyle);
      if (style) {
        if (value && selectedTool === 'summarize') {
          processWithGemini(value, 'summarize');
        }
      }
    }
  };

  const handleHumanizeStyleChange = (_event: React.MouseEvent<HTMLElement>, newStyle: string) => {
    if (newStyle !== null) {
      const style = humanizeStyles.options.find(s => s.id === newStyle);
      if (style) {
        if (value && selectedTool === 'humanize') {
          processWithGemini(value, 'humanize');
        }
      }
    }
  };

  const handleToneStyleChange = (_event: React.MouseEvent<HTMLElement>, newStyle: string) => {
    if (newStyle !== null) {
      setToneStyle(newStyle);
      if (value && selectedTool === 'tone') {
        processWithGemini(value, 'tone');
      }
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#4CAF50'; 
    if (score >= 70) return '#FFC107'; 
    return '#F44336'; 
  };

  const customToolControls = {
    tone: (
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Select Tone
        </Typography>
        <ToggleButtonGroup
          value={toneStyle}
          exclusive
          onChange={handleToneStyleChange}
          aria-label="tone style"
        >
          <ToggleButton value="formal" aria-label="formal">
            🎩 Formal
          </ToggleButton>
          <ToggleButton value="casual" aria-label="casual">
            😎 Casual
          </ToggleButton>
          <ToggleButton value="persuasive" aria-label="persuasive">
            📢 Persuasive
          </ToggleButton>
          <ToggleButton value="creative" aria-label="creative">
            💡 Creative
          </ToggleButton>
          <ToggleButton value="humorous" aria-label="humorous">
            🎭 Humorous
          </ToggleButton>
          <ToggleButton value="academic" aria-label="academic">
            📰 Academic
          </ToggleButton>
          <ToggleButton value="authoritative" aria-label="authoritative">
            🏆 Authoritative
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    ),
  };

  const grammarFAQs = [
    {
      question: "What is the Grammar Checker tool?",
      answer: "Our Grammar Checker helps you instantly identify and correct grammar, spelling, and punctuation errors. It enhances your writing by ensuring clarity, professionalism, and correctness."
    },
    {
      question: "Is the Grammar Checker free to use?",
      answer: "Yes! Our basic Grammar Checker is free to use. However, for advanced features like style suggestions, tone adjustments, and in-depth analysis, you can upgrade to our premium version."
    },
    {
      question: "Is my text safe and secure?",
      answer: "Yes! We prioritize your privacy. Your text is not stored or shared—it's processed securely to provide instant feedback and then deleted."
    },
    {
      question: "Does it support multiple languages?",
      answer: "Currently, our tool primarily supports English, but we are working on adding support for other languages soon!"
    },
    {
      question: "How accurate is the Grammar Checker?",
      answer: "Our tool is powered by advanced AI and linguistic algorithms, ensuring highly accurate grammar, punctuation, and style corrections."
    }
  ];

  const summarizerFAQs = [
    {
      question: "What is the AI Summarizer tool?",
      answer: "Our AI Summarizer tool condenses long pieces of text into clear, concise summaries while preserving the key points. It helps you quickly grasp the main ideas without reading the entire content."
    },
    {
      question: "Can I customize the summary length?",
      answer: "Yes! You can adjust the summary length based on your needs, whether you want a brief overview or a more detailed summary."
    },
    {
      question: "What types of content can be summarized?",
      answer: "Our AI Summarizer works with:\n\n• Articles & blog posts\n• Research papers\n• Business reports\n• Essays & academic content\n• Meeting notes & transcripts"
    },
    {
      question: "Does the tool work in multiple languages?",
      answer: "Yes! Our AI Summarizer supports multiple languages, making it easy to summarize content from different sources worldwide."
    },
    {
      question: "Is the AI Summarizer free to use?",
      answer: "We offer both a free version with limited summaries and a premium version with advanced features, including longer text input, more accurate summaries, and additional customization options."
    }
  ];

  const paraphraserFAQs = [
    {
      question: "What is a paraphraser tool?",
      answer: "A paraphraser tool rewrites text while maintaining its original meaning. It helps improve clarity, avoid plagiarism, and enhance writing style."
    },
    {
      question: "Can I use this tool for academic writing?",
      answer: "Yes! Our paraphraser is great for students, researchers, and professionals looking to rephrase content while keeping it plagiarism-free."
    },
    {
      question: "Is the paraphrased content plagiarism-free?",
      answer: "Yes! The tool creates unique versions of your text, reducing the risk of plagiarism while maintaining coherence."
    },
    {
      question: "Is the paraphraser free to use?",
      answer: "We offer both a free version with basic features and a premium version with advanced rewriting capabilities and more style options."
    },
    {
      question: "Does the tool support multiple languages?",
      answer: "Yes! Our paraphraser supports multiple languages, making it accessible for users worldwide."
    }
  ];

  const translatorFAQs = [
    {
      question: "What is the AI Translator Tool?",
      answer: "Our AI Translator is an advanced language translation tool that instantly converts text from one language to another with high accuracy while preserving context and meaning."
    },
    {
      question: "How many languages does the translator support?",
      answer: "Our tool supports 100+ languages, including English, Spanish, French, German, Chinese, Japanese, Arabic, and many more."
    },
    {
      question: "Is the translation accurate?",
      answer: "Yes! Our AI-powered translation engine ensures high accuracy by understanding context, grammar, and nuances better than traditional translation tools."
    },
    {
      question: "Is my data safe and private?",
      answer: "Absolutely! We prioritize data security and privacy. Your text is not stored or shared with third parties."
    },
    {
      question: "Is this tool free to use?",
      answer: "We offer a free plan with basic translations. For unlimited access and additional features, premium plans are available."
    }
  ];

  const toneConverterFAQs = [
    {
      question: "What is the AI Tone Converter?",
      answer: "Our AI Tone Converter transforms your text into seven different tones: Formal, Casual, Persuasive, Creative, Humorous, Academic, and Authoritative. It helps you adjust your writing to suit any audience or purpose effortlessly."
    },
    {
      question: "What are the seven tone options?",
      answer: "✅ Formal – Professional and respectful, perfect for business or official writing.\n" +
             "✅ Casual – Relaxed and friendly, ideal for everyday conversations.\n" +
             "✅ Persuasive – Convincing and engaging, great for marketing and sales.\n" +
             "✅ Creative – Imaginative and expressive, suited for storytelling and content writing.\n" +
             "✅ Humorous – Lighthearted and fun, adding a touch of wit to your writing.\n" +
             "✅ Academic – Well-structured and research-based, best for essays and research papers.\n" +
             "✅ Authoritative – Confident and knowledgeable, ideal for expert opinions and reports."
    },
    {
      question: "Who can use the AI Tone Converter?",
      answer: "Anyone! Writers, marketers, students, professionals, and content creators can use it to tailor their writing for different audiences."
    },
    {
      question: "Can I convert long-form content?",
      answer: "Yes! The AI can handle short and long-form text, ensuring consistency across your content."
    },
    {
      question: "Does the tool change the meaning of my text?",
      answer: "No, it preserves your original message while adjusting the tone to match your selected style."
    }
  ];

  const humanizerFAQs = [
    {
      question: "What is an AI Humanizer?",
      answer: "AI Humanizer is a tool that transforms AI-generated text into natural, human-like writing. It removes robotic tones, improves readability, and makes content sound more authentic and engaging."
    },
    {
      question: "Who can use this tool?",
      answer: "✅ Content creators\n" +
             "✅ Writers & bloggers\n" +
             "✅ Students & researchers\n" +
             "✅ Marketers & businesses\n" +
             "✅ Anyone who wants to make AI text sound more natural!"
    },
    {
      question: "Can it bypass AI detection tools?",
      answer: "Yes! Our AI Humanizer is designed to make AI-generated text sound more human, which helps in reducing AI detection rates while maintaining quality and coherence."
    },
    {
      question: "Does it work for all types of content?",
      answer: "Yes! Whether it's essays, articles, emails, or marketing copy, our AI Humanizer can make any text sound more natural and engaging."
    },
    {
      question: "How is AI Humanizer different from a paraphrasing tool?",
      answer: "While paraphrasing tools reword text, AI Humanizer enhances readability, natural flow, and emotional tone to make it sound more like a real person wrote it."
    }
  ];

  const aiDetectorPromo = {
    title: "AI Detector: Spot AI-Generated Content Instantly! 🚀",
    subtitle: "🧐 Is it Human-Written or AI-Generated? Find Out in Seconds!",
    description: "With the rise of AI-generated content, ensuring authenticity is more important than ever. Our AI Detector is your go-to tool for detecting AI-written text with unmatched accuracy. Whether you're a teacher, content creator, business owner, or researcher, stay ahead with reliable AI detection.",
    features: [
      "Lightning-Fast Analysis – Detect AI-generated content in seconds",
      "Highly Accurate – Advanced AI models trained to spot even the most sophisticated AI text",
      "Protect Originality – Ensure your content is authentic, human-written, and plagiarism-free",
      "Easy to Use – Just paste your text and get instant results!"
    ],
    callToAction: "Don't let AI-generated content slip through—try our AI Detector today!"
  };

  const readabilityPromo = {
    title: "Make Your Content Effortlessly Readable with Our AI-Powered Readability Checker! 🚀✨",
    subtitle: "Struggling to make your writing clear, engaging, and easy to understand? Our AI Readability Checker ensures your content is crystal clear and perfectly tailored to your audience!",
    features: [
      "Instant Analysis – Get real-time feedback on how readable your content is.",
      "Improves Clarity – Identify complex sentences and confusing phrases.",
      "Boosts Engagement – Make your writing flow effortlessly for any reader.",
      "Custom Recommendations – Tailored suggestions to simplify and enhance your text.",
      "Perfect for Everyone – Writers, students, marketers, bloggers, and professionals!"
    ],
    highlight: "Turn Jargon into Clarity!",
    highlightDesc: "Whether you're writing a blog, email, essay, or professional report, our tool ensures your message is understood, not just read.",
    callToAction: "Write smarter, not harder! Try our AI Readability Checker now and make every word count. 💡"
  };

  const renderReadabilityResult = () => {
    if (!readabilityResult) return null;

    return (
      <Box>
        <Typography variant="h6">Overall Score: {readabilityResult.overallScore}</Typography>
        <Typography variant="body1">Flesch-Kincaid Grade: {readabilityResult.fleschKincaid}</Typography>
        <Typography variant="body1">Gunning Fog Index: {readabilityResult.gunningFog}</Typography>
        <Typography variant="body1">SMOG Index: {readabilityResult.smogIndex}</Typography>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}>
        <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3,
              height: '100%',
              bgcolor: 'background.paper',
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom 
              sx={{ 
                color: 'primary.main',
                fontWeight: 700,
                mb: 4
              }}
            >
              {title}
            </Typography>
            
            <Typography 
              variant="subtitle1" 
              color="text.secondary" 
              sx={{ mb: 4 }}
            >
              {description}
            </Typography>

            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mb: 3
            }}>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center', 
                gap: 2,
                flexWrap: { xs: 'wrap', md: 'nowrap' }
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2,
                  flexDirection: { xs: 'column', md: 'row' },
                  maxHeight: { xs: '200px', md: 'auto' },
                  overflowY: { xs: 'auto', md: 'visible' },
                  width: { xs: '100%', md: 'auto' },
                  '&::-webkit-scrollbar': {
                    width: '8px'
                  },
                  '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '4px'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: (theme) => alpha(theme.palette.primary.main, 0.2),
                    borderRadius: '4px',
                    '&:hover': {
                      background: (theme) => alpha(theme.palette.primary.main, 0.3)
                    }
                  }
                }}>
                  {tools.map((tool) => (
                    <Button
                      key={tool.id}
                      variant={selectedTool === tool.id ? 'contained' : 'outlined'}
                      onClick={() => handleToolSelect(tool.id)}
                      startIcon={tool.icon}
                      sx={{ 
                        textTransform: 'none',
                        width: { xs: '100%', md: 'auto' }
                      }}
                    >
                      {tool.name}
                    </Button>
                  ))}
                </Box>

                {selectedTool === 'translate' && (
                  <FormControl 
                    sx={{ 
                      minWidth: 200,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                      }
                    }}
                  >
                    <InputLabel id="language-select-label">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Language fontSize="small" />
                        Target Language
                      </Box>
                    </InputLabel>
                    <Select
                      labelId="language-select-label"
                      value={'es'}
                      onChange={handleLanguageChange}
                      label="Target Language"
                    >
                      {languages.map((lang) => (
                        <MenuItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Box>

              {selectedTool === 'paraphrase' && (
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: { xs: 2, md: 1 },
                    bgcolor: alpha(theme.palette.primary.main, 0.03),
                    width: { xs: '100%', md: 'auto' }
                  }}
                >
                  <ToggleButtonGroup
                    value={paraphraseStyle}
                    exclusive
                    onChange={handleParaphraseStyleChange}
                    aria-label="paraphrase style"
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      width: '100%',
                      '& .MuiToggleButton-root': {
                        border: 'none',
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                        flex: { xs: '1 1 100%', md: '0 1 auto' },
                        '&.Mui-selected': {
                          bgcolor: alpha(theme.palette.primary.main, 0.12),
                        },
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                        }
                      }
                    }}
                  >
                    {paraphraseStyles.map((style) => (
                      <Tooltip key={style.id} title={style.description}>
                        <ToggleButton 
                          value={style.id}
                          aria-label={style.name}
                        >
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1 
                          }}>
                            {style.icon}
                            <Typography variant="body2">
                              {style.name}
                            </Typography>
                          </Box>
                        </ToggleButton>
                      </Tooltip>
                    ))}
                  </ToggleButtonGroup>
                </Paper>
              )}

              {selectedTool === 'summarize' && (
                <Box sx={{ 
                  mt: 2,
                  width: { xs: '100%', md: 'auto' }
                }}>
                  <Typography 
                    variant="subtitle2" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.secondary',
                      mb: 1
                    }}
                  >
                    Summary Style
                  </Typography>
                  <ToggleButtonGroup
                    value={'bullet'}
                    exclusive
                    onChange={handleSummaryStyleChange}
                    aria-label="summary style"
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      width: '100%',
                      '& .MuiToggleButton-root': {
                        flex: { xs: '1 1 100%', md: '1 1 auto' },
                        borderRadius: '8px !important',
                        border: '1px solid',
                        borderColor: 'divider',
                        textTransform: 'none',
                        py: 1.5,
                        px: 2,
                      }
                    }}
                  >
                    {summaryStyles.options.map((style) => (
                      <ToggleButton 
                        key={style.id} 
                        value={style.id}
                        aria-label={style.name}
                      >
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 1.5
                        }}>
                          {style.icon}
                          <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {style.name}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                display: 'block',
                                color: 'text.secondary',
                                mt: 0.5
                              }}
                            >
                              {style.description}
                            </Typography>
                          </Box>
                        </Box>
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Box>
              )}

              {selectedTool === 'humanize' && (
                <Box sx={{ 
                  mt: 2,
                  width: { xs: '100%', md: 'auto' }
                }}>
                  <Typography 
                    variant="subtitle2" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.secondary',
                      mb: 1
                    }}
                  >
                    Humanize Style
                  </Typography>
                  <ToggleButtonGroup
                    value={humanizeStyle}
                    exclusive
                    onChange={handleHumanizeStyleChange}
                    aria-label="humanize style"
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      width: '100%',
                      '& .MuiToggleButton-root': {
                        flex: { xs: '1 1 100%', md: '1 1 auto' },
                        borderRadius: '8px !important',
                        border: '1px solid',
                        borderColor: 'divider',
                        textTransform: 'none',
                        py: 1.5,
                        px: 2,
                      }
                    }}
                  >
                    {humanizeStyles.options.map((style) => (
                      <ToggleButton 
                        key={style.id} 
                        value={style.id}
                        aria-label={style.name}
                      >
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 1.5
                        }}>
                          {style.icon}
                          <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {style.name}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                display: 'block',
                                color: 'text.secondary',
                                mt: 0.5
                              }}
                            >
                              {style.description}
                            </Typography>
                          </Box>
                        </Box>
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Box>
              )}

              {selectedTool === 'tone' && customToolControls.tone}
            </Box>

            <Box sx={{ 
              display: 'flex', 
              gap: 3,
              flex: 1,
              minHeight: { xs: 'auto', md: 'calc(100vh - 250px)' },
              flexDirection: { xs: 'column', md: 'row' }
            }}>
              <Box sx={{ 
                flex: { xs: 'none', md: 1 }, 
                display: 'flex', 
                flexDirection: 'column',
                minHeight: { xs: '300px', md: 0 },
                width: '100%'
              }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    opacity: 0.9
                  }}
                >
                  Input
                </Typography>
                <RichTextEditor
                  value={value}
                  onChange={handleEditorChange}
                  placeholder={placeholder}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => processWithGemini(value, selectedTool)}
                  disabled={!value || loading}
                  sx={{ 
                    mt: 3,
                    minHeight: 56,
                    fontSize: '1rem',
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                    }
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={24} color="inherit" />
                      <span>Processing...</span>
                    </Box>
                  ) : (
                    'Process Text'
                  )}
                </Button>
              </Box>

              <Box sx={{ 
                flex: { xs: 'none', md: 1 }, 
                display: 'flex', 
                flexDirection: 'column',
                minHeight: { xs: '300px', md: 0 },
                width: '100%',
                mt: { xs: 4, md: 0 }
              }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    opacity: 0.9
                  }}
                >
                  Output
                </Typography>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    height: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    bgcolor: alpha(theme.palette.primary.main, 0.02),
                  }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 2
                  }}>
                    <Typography variant="h6">Output</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {selectedTool === 'grammar' && grammarResult?.correctedText && (
                        <Button 
                          variant="outlined" 
                          color="secondary"
                          onClick={() => grammarResult.correctedText && navigator.clipboard.writeText(grammarResult.correctedText)}
                        >
                          Copy Corrected Text
                        </Button>
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ 
                    flex: 1,
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '8px'
                    },
                    '&::-webkit-scrollbar-track': {
                      background: '#f1f1f1',
                      borderRadius: '4px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#9234ea',
                      borderRadius: '4px',
                      '&:hover': {
                        background: '#7828c8'
                      }
                    }
                  }}>
                    {loading ? (
                      <Box 
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          height: '100%',
                        }}
                      >
                        <CircularProgress size={60} sx={{ animationDuration: '550ms', color: theme.palette.primary.main }} />
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>Processing your text...</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Please wait a moment.</Typography>
                      </Box>
                    ) : value ? (
                      <Box>
                        {selectedTool === 'ai-detector' ? (
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                              AI Content Analysis:
                            </Typography>
                            <Box sx={{ 
                              mb: 3,
                              p: 2,
                              borderRadius: 1,
                              bgcolor: 'background.paper',
                              border: '1px solid',
                              borderColor: 'divider'
                            }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                                Detected Content Type: {aiDetectorResult.contentType}
                              </Typography>
                            </Box>
                            <Box sx={{ 
                              display: 'grid',
                              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
                              gap: 2,
                              mb: 3,
                            }}>
                              <Box sx={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                p: 2,
                                borderRadius: 1,
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider'
                              }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                  AI Probability:
                                </Typography>
                                <Typography variant="h6" sx={{ 
                                  color: aiDetectorResult.aiProbability > 70 ? 'error.main' : 'text.primary'
                                }}>
                                  {aiDetectorResult.aiProbability}%
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                p: 2,
                                borderRadius: 1,
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider'
                              }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                  Human Probability:
                                </Typography>
                                <Typography variant="h6" sx={{ 
                                  color: aiDetectorResult.humanProbability > 70 ? 'success.main' : 'text.primary'
                                }}>
                                  {aiDetectorResult.humanProbability}%
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                p: 2,
                                borderRadius: 1,
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider'
                              }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                  Mixed Probability:
                                </Typography>
                                <Typography variant="h6" sx={{ 
                                  color: aiDetectorResult.mixedProbability > 70 ? 'warning.main' : 'text.primary'
                                }}>
                                  {aiDetectorResult.mixedProbability}%
                                </Typography>
                              </Box>
                            </Box>
                            {aiDetectorResult.indicators.length > 0 && (
                              <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                                  Content Indicators:
                                </Typography>
                                <Box sx={{ 
                                  bgcolor: 'background.paper',
                                  borderRadius: 1,
                                  p: 2,
                                  border: '1px solid',
                                  borderColor: 'divider'
                                }}>
                                  {aiDetectorResult.indicators.map((indicator, index) => (
                                    <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                                      • {indicator}
                                    </Typography>
                                  ))}
                                </Box>
                              </Box>
                            )}
                            <Box sx={{ mb: 3 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                                Detailed Analysis:
                              </Typography>
                              <Typography variant="body2" sx={{ 
                                color: 'text.secondary',
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                p: 2,
                                border: '1px solid',
                                borderColor: 'divider'
                              }}>
                                {aiDetectorResult.explanation}
                              </Typography>
                            </Box>
                          </Box>
                        ) : selectedTool === 'readability' ? (
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                              Readability Analysis:
                            </Typography>
                            <ReadabilityDisplay result={readabilityResult} />
                          </Box>
                        ) : (
                          <TypeWriter text={value} />
                        )}
                      </Box>
                    ) : (
                      <Typography 
                        color="text.secondary"
                        sx={{ 
                          fontStyle: 'italic',
                          textAlign: 'center',
                          mt: 2 
                        }}
                      >
                        Processed text will appear here...
                      </Typography>
                    )}
                  </Box>
                </Paper>
              </Box>
            </Box>

            {/* Promotional content for Paraphrase tool */}
            {selectedTool === 'paraphrase' && (
              <Box 
                sx={{ 
                  mt: 4,
                  p: 4,
                  bgcolor: '#FAFBFF',
                  borderRadius: 2,
                  width: { xs: '100%', md: 'auto' }
                }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '1.75rem', md: '2rem' },
                  }}
                >
                  AI-Powered Paraphrasing Tool
                </Typography>
                
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 6,
                    maxWidth: '800px',
                  }}
                >
                  Transform your writing instantly with our intelligent paraphrasing tool. Create unique, engaging content while maintaining your original message.
                </Typography>

                {/* Two Column Section */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: { xs: 4, md: 8 },
                    mb: 6,
                    mt: 4,
                  }}
                >
                  {/* Left Column - Content */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        mb: 3,
                        background: 'linear-gradient(45deg, #9234ea 30%, #b15ffb 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Rephrase with Clarity & Precision
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '1.1rem',
                        lineHeight: 1.7,
                        mb: 4,
                      }}
                    >
                      Need a fresh way to express your thoughts? Our AI-powered Paraphraser transforms your content while preserving its original meaning. Whether you're writing essays, emails, or creative pieces, our tool helps you enhance clarity, improve fluency, and adapt tone effortlessly.
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<AutoAwesome />}
                        sx={{
                          borderRadius: '50px',
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          background: 'linear-gradient(45deg, #9234ea 30%, #b15ffb 90%)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(146, 52, 234, 0.25)',
                          },
                        }}
                      >
                        Start Paraphrasing
                      </Button>
                    </Box>
                  </Box>

                  {/* Right Column - Illustration */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/paraphraser-illustration.svg"
                      alt="Paraphraser Illustration"
                      sx={{
                        width: '100%',
                        maxWidth: '500px',
                        height: 'auto',
                        filter: 'drop-shadow(0px 10px 20px rgba(146, 52, 234, 0.1))',
                        animation: 'float 6s ease-in-out infinite',
                        '@keyframes float': {
                          '0%, 100%': {
                            transform: 'translateY(0px)',
                          },
                          '50%': {
                            transform: 'translateY(-20px)',
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Rest of the promotional content with increased spacing */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                  mb: 6,
                  mt: 6,
                }}>
                  {/* Features section */}
                  {[
                    'Get clear, concise content in one click',
                    'Choose from 5 different writing styles',
                    'Maintain original meaning and context',
                    'Save time on content creation',
                  ].map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Box 
                        component="span" 
                        sx={{ 
                          color: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        ✓
                      </Box>
                      <Typography variant="body1">{feature}</Typography>
                    </Box>
                  ))}
                </Box>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Available Paraphrasing Modes
                </Typography>

                <Box 
                  sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { 
                      xs: '1fr', 
                      sm: '1fr 1fr', 
                      md: 'repeat(5, 1fr)' 
                    },
                    gap: 2,
                  }}
                >
                  {[
                    {
                      mode: 'Simple',
                      desc: 'Clear and easy to understand'
                    },
                    {
                      mode: 'Advanced',
                      desc: 'Professional and refined'
                    },
                    {
                      mode: 'Fluency',
                      desc: 'Natural and readable'
                    },
                    {
                      mode: 'Formal',
                      desc: 'Business and academic'
                    },
                    {
                      mode: 'Academic',
                      desc: 'Scholarly writing'
                    },
                    {
                      mode: 'Casual',
                      desc: 'Friendly and conversational'
                    },
                  ].map((item, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 1.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        textAlign: 'center',
                      }}
                    >
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 0.5,
                        }}
                      >
                        {item.mode}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'text.secondary',
                          display: 'block',
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}

            {/* Promotional content for Summarize tool */}
            {selectedTool === 'summarize' && (
              <Box 
                sx={{ 
                  mt: 4,
                  p: 4,
                  bgcolor: '#FAFBFF',
                  borderRadius: 2,
                  width: { xs: '100%', md: 'auto' }
                }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '1.75rem', md: '2rem' },
                  }}
                >
                  AI-Powered Summarizer
                </Typography>
                
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 4,
                    maxWidth: '800px',
                  }}
                >
                  Process long articles, reports, or documents instantly. Get concise, accurate summaries that capture the essential information.
                </Typography>

                {/* Two Column Section */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: { xs: 4, md: 8 },
                    mb: 6,
                    mt: 2,
                  }}
                >
                  {/* Left Column - Content */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        mb: 3,
                        background: 'linear-gradient(45deg, #9234ea 30%, #b15ffb 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Get Key Insights in Seconds
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '1.1rem',
                        lineHeight: 1.7,
                        mb: 4,
                      }}
                    >
                      Too much text to read? Our AI-powered Summarizer extracts the most important points from any content, helping you grasp key information quickly. Whether it's an article, research paper, or meeting notes, our tool condenses long texts into clear, concise summaries without losing meaning.
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Summarize />}
                        sx={{
                          borderRadius: '50px',
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          background: 'linear-gradient(45deg, #9234ea 30%, #b15ffb 90%)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(146, 52, 234, 0.25)',
                          },
                        }}
                      >
                        Start Summarizing
                      </Button>
                    </Box>
                  </Box>

                  {/* Right Column - Illustration */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/summarizer-illustration.svg"
                      alt="Summarizer Illustration"
                      sx={{
                        width: '100%',
                        maxWidth: '500px',
                        height: 'auto',
                        filter: 'drop-shadow(0px 10px 20px rgba(146, 52, 234, 0.1))',
                        animation: 'float 6s ease-in-out infinite',
                        '@keyframes float': {
                          '0%, 100%': {
                            transform: 'translateY(0px)',
                          },
                          '50%': {
                            transform: 'translateY(-20px)',
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                  mb: 4,
                }}>
                  {[
                    'Convert lengthy content into key takeaways in seconds',
                    'Choose from three smart summary levels',
                    'Retain important details while eliminating fluff',
                    'Read less, understand more, work smarter',
                  ].map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Box 
                        component="span" 
                        sx={{ 
                          color: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        ✓
                      </Box>
                      <Typography variant="body1">{feature}</Typography>
                    </Box>
                  ))}
                </Box>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Available Summary Levels
                </Typography>

                <Box 
                  sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { 
                      xs: '1fr', 
                      sm: 'repeat(3, 1fr)' 
                    },
                    gap: 2,
                  }}
                >
                  {[
                    {
                      mode: 'Bullet Points',
                      desc: 'Quick, scannable key points for fast readability'
                    },
                    {
                      mode: 'Sentence-Level',
                      desc: 'Condensed sentences that retain essential information'
                    },
                    {
                      mode: 'Paragraph-Level',
                      desc: 'Detailed yet concise version of the original content'
                    },
                  ].map((item, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        textAlign: 'center',
                      }}
                    >
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 1,
                        }}
                      >
                        {item.mode}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          color: 'text.secondary',
                          display: 'block',
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}

            {/* Promotional content for Humanize tool */}
            {selectedTool === 'humanize' && (
              <Box 
                sx={{ 
                  mt: 4,
                  p: 4,
                  bgcolor: '#FAFBFF',
                  borderRadius: 2,
                  width: { xs: '100%', md: 'auto' }
                }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '1.75rem', md: '2rem' },
                  }}
                >
                  AI Humanizer – Make Your AI-Generated Text Sound Natural & Engaging!
                </Typography>
                
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 4,
                    maxWidth: '800px',
                  }}
                >
                  Tired of robotic, AI-sounding text? Our AI Humanizer transforms machine-like writing into fluent, natural, and engaging content that feels truly human! Whether you need a friendly conversation, a professional email, or an academic paper, we've got you covered!
                </Typography>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Why Use Our AI Humanizer?
                </Typography>

                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                  mb: 4,
                }}>
                  {[
                    'Instantly Transform AI-Generated Text – Make it sound more human, natural, and authentic',
                    '4 Unique Modes for Every Writing Need – Customize tone and style to fit your audience',
                    'AI Precision & Human-Like Fluency – Get polished, error-free, and engaging content',
                    'Perfect for Any Purpose – Use it for emails, blogs, reports, essays, and more!',
                  ].map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Box 
                        component="span" 
                        sx={{ 
                          color: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        ✓
                      </Box>
                      <Typography variant="body1">{feature}</Typography>
                    </Box>
                  ))}
                </Box>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Choose the Perfect Mode for Your Writing
                </Typography>

                <Box 
                  sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { 
                      xs: '1fr', 
                      sm: '1fr 1fr',
                      md: 'repeat(4, 1fr)',
                    },
                    gap: 2,
                    mb: 4,
                  }}
                >
                  {[
                    { mode: 'Casual Mode', desc: 'Light, friendly, and conversational for blogs, chats, and social media' },
                    { mode: 'Professional Mode', desc: 'Clear, polished, and authoritative for business and formal communication' },
                    { mode: 'Academic Mode', desc: 'Structured, precise, and research-oriented for scholarly writing' },
                    { mode: 'Empathetic Mode', desc: 'Warm, understanding, and emotionally intelligent for sensitive messages' },
                  ].map((item, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        height: '100%',
                      }}
                    >
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 1,
                        }}
                      >
                        {item.mode}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </Paper>
                  ))}
                </Box>

                <Box
                  sx={{
                    p: 4,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 2,
                    }}
                  >
                    Write Like a Human – Instantly!
                  </Typography>
                  <Typography variant="body1">
                    Turn dull, robotic text into engaging, relatable, and human-like writing with just one click. Try our AI Humanizer today and make your words come alive!
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Promotional content for Grammar tool */}
            {selectedTool === 'grammar' && (
              <Box 
                sx={{ 
                  mt: 4,
                  p: 4,
                  bgcolor: '#FAFBFF',
                  borderRadius: 2,
                  width: { xs: '100%', md: 'auto' }
                }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '1.75rem', md: '2rem' },
                  }}
                >
                  AI-Powered Grammar Checker – Write Flawlessly in Any Language!
                </Typography>
                
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 4,
                    maxWidth: '800px',
                  }}
                >
                  Tired of embarrassing grammar mistakes? Struggling with complex sentences? Our AI-Powered Grammar Checker ensures your writing is flawless, professional, and crystal clear—no matter what language you use! 
                </Typography>

                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: { xs: 4, md: 8 },
                    mb: 6,
                    mt: 2,
                  }}
                >
                  {/* Left Column - Content */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        mb: 3,
                        background: 'linear-gradient(45deg, #9234ea 30%, #b15ffb 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Perfect Grammar, Polished Writing
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '1.1rem',
                        lineHeight: 1.7,
                        mb: 4,
                      }}
                    >
                      Make every word count! Our AI-powered Grammar Checker ensures your writing is error-free, professional, and crystal clear in any language. Whether you're drafting emails, reports, or creative content, our tool helps you write with confidence and precision.
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Spellcheck />}
                        sx={{
                          borderRadius: '50px',
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          background: 'linear-gradient(45deg, #9234ea 30%, #b15ffb 90%)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(146, 52, 234, 0.25)',
                          },
                        }}
                      >
                        Check Grammar Now
                      </Button>
                    </Box>
                  </Box>

                  {/* Right Column - Illustration */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/grammar-checker-illustration.gif"
                      alt="Grammar Checker Illustration"
                      sx={{
                        width: '100%',
                        maxWidth: '500px',
                        height: 'auto',
                        filter: 'drop-shadow(0px 10px 20px rgba(146, 52, 234, 0.1))',
                        animation: 'float 6s ease-in-out infinite',
                        '@keyframes float': {
                          '0%, 100%': {
                            transform: 'translateY(0px)',
                          },
                          '50%': {
                            transform: 'translateY(-20px)',
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Why Choose Our Grammar Checker?
                </Typography>

                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                  mb: 4,
                }}>
                  {[
                    'All Languages Supported – Whether it\'s English, Spanish, French, or any other language, we\'ve got you covered!',
                    'Instant Grammar Fixes – Corrects grammar, punctuation, and spelling errors in seconds',
                    'AI-Powered Precision – Detects even the subtlest mistakes for polished writing',
                    'Smart Sentence Refinement – Enhances clarity, tone, and readability',
                    'Perfect for Everyone – Writers, students, professionals, and non-native speakers!'
                  ].map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        p: 3,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>{feature}</Typography>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    p: 4,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 2,
                    }}
                  >
                    Write with Confidence – Anytime, Anywhere!
                  </Typography>
                  <Typography variant="body1">
                    From emails and essays to reports and social media posts, our Grammar Checker ensures your writing is error-free and impactful. Try it now and level up your writing! 
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      borderRadius: '50px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(146, 52, 234, 0.25)',
                      },
                    }}
                  >
                    Start Writing Flawlessly Now! 
                  </Button>
                </Box>
              </Box>
            )}

            {/* Promotional content for Translate tool */}
            {selectedTool === 'translate' && (
              <Box 
                sx={{ 
                  mt: 4,
                  p: 4,
                  bgcolor: '#FAFBFF',
                  borderRadius: 2,
                  width: { xs: '100%', md: 'auto' }
                }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '1.75rem', md: '2rem' },
                  }}
                >
                  AI-Powered Translator – Translate Instantly, Anytime, Anywhere!
                </Typography>
                
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 4,
                    maxWidth: '800px',
                  }}
                >
                  Break language barriers with our AI-Powered Translator! Whether you need to translate documents, chats, emails, or websites, our tool delivers accurate, fast, and natural-sounding translations in just seconds. 
                </Typography>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Why Choose Our Translator?
                </Typography>

                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                  mb: 4,
                }}>
                  {[
                    'Supports All Languages – Translate effortlessly between 100+ languages worldwide!',
                    'Lightning-Fast Translations – Get instant results without delays',
                    'AI-Powered Accuracy – Ensures natural, context-aware translations for perfect meaning',
                    'Fluent & Human-Like – No more robotic translations—your text will sound smooth and natural!',
                    'Perfect for Everyone – Students, travelers, professionals, and businesses!'
                  ].map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        p: 3,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>{feature}</Typography>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    p: 4,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 2,
                    }}
                  >
                    Speak, Understand & Connect – Without Language Limits!
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 3,
                      color: 'text.secondary',
                      maxWidth: '800px',
                      mx: 'auto',
                    }}
                  >
                    From everyday conversations to professional documents, our AI Translator helps you communicate effortlessly across cultures.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      borderRadius: '50px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(146, 52, 234, 0.25)',
                      },
                    }}
                  >
                    Try it now and translate like a pro! 
                  </Button>
                </Box>
              </Box>
            )}

            {/* Promotional content for Tone tool */}
            {selectedTool === 'tone' && (
              <Box 
                sx={{ 
                  mt: 4,
                  p: 4,
                  bgcolor: '#FAFBFF',
                  borderRadius: 2,
                  width: { xs: '100%', md: 'auto' }
                }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '1.75rem', md: '2rem' },
                  }}
                >
                  AI Tone Converter – Instantly Transform Your Writing Style!
                </Typography>
                
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 4,
                    maxWidth: '800px',
                  }}
                >
                  Writing for different audiences has never been easier! Our AI Tone Converter helps you adjust your text's tone effortlessly—whether you need to sound professional, friendly, or persuasive. With 7 powerful tone options, your message will always hit the right note! 
                </Typography>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Why Choose Our AI Tone Converter?
                </Typography>

                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                  mb: 4,
                }}>
                  {[
                    '7 Tone Styles for Every Occasion – Easily switch between different writing styles!',
                    'Instant Transformation – Convert text in seconds with AI-powered precision',
                    'Perfect for Any Content – Emails, blogs, social media, reports, and more!',
                    'Polished, Engaging, and Audience-Ready – Never sound out of place again!'
                  ].map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        p: 3,
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>{feature}</Typography>
                    </Box>
                  ))}
                </Box>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Choose Your Perfect Tone:
                </Typography>

                <Box 
                  sx={{ 
                    display: 'grid',
                    gridTemplateColumns: { 
                      xs: '1fr', 
                      sm: '1fr 1fr',
                      md: 'repeat(4, 1fr)',
                    },
                    gap: 2,
                    mb: 4,
                  }}
                >
                  {[
                    { tone: 'Formal', desc: 'Professional, respectful, and polished for business or academic use' },
                    { tone: 'Casual', desc: 'Friendly, relaxed, and conversational for everyday writing' },
                    { tone: 'Persuasive', desc: 'Convincing and compelling for marketing and sales' },
                    { tone: 'Creative', desc: 'Unique and engaging for storytelling and content writing' },
                    { tone: 'Humorous', desc: 'Witty and lighthearted for fun and entertaining content' },
                    { tone: 'Academic', desc: 'Clear, structured, and research-oriented for scholarly writing' },
                    { tone: 'Authoritative', desc: 'Confident, strong, and commanding for leadership communication' }
                  ].map((item, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        height: '100%',
                      }}
                    >
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 1,
                        }}
                      >
                        {item.tone}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                        }}
                      >
                        {item.desc}
                      </Typography>
                    </Paper>
                  ))}
                </Box>

                <Box
                  sx={{
                    p: 4,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 2,
                    }}
                  >
                    Write Smarter, Sound Better!
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 3,
                      color: 'text.secondary',
                      maxWidth: '800px',
                      mx: 'auto',
                    }}
                  >
                    No more struggling with tone—our AI does it for you! Perfect for students, marketers, professionals, and content creators.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      borderRadius: '50px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(146, 52, 234, 0.25)',
                      },
                    }}
                  >
                    Try it now and make every word count! 
                  </Button>
                </Box>

                {/* Two Column Section */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: { xs: 4, md: 8 },
                    mb: 6,
                    mt: 2,
                  }}
                >
                  {/* Left Column - Content */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        mb: 3,
                        background: 'linear-gradient(45deg, #9234ea 30%, #b15ffb 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      Perfect Tone, Every Time
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '1.1rem',
                        lineHeight: 1.7,
                        mb: 4,
                      }}
                    >
                      Need to change the tone of your writing? With our Tone Converter Tool, you can easily tailor your content to match the right tone for any situation. Whether you're writing an email, a report, or a creative piece, our tool ensures that your message resonates with your audience perfectly.
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Psychology />}
                        sx={{
                          borderRadius: '50px',
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          background: 'linear-gradient(45deg, #9234ea 30%, #b15ffb 90%)',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 20px rgba(146, 52, 234, 0.25)',
                          },
                        }}
                      >
                        Convert Tone Now
                      </Button>
                    </Box>
                  </Box>

                  {/* Right Column - Illustration */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src="/images/tone-converter-illustration.svg"
                      alt="Tone Converter Illustration"
                      sx={{
                        width: '100%',
                        maxWidth: '500px',
                        height: 'auto',
                        filter: 'drop-shadow(0px 10px 20px rgba(146, 52, 234, 0.1))',
                        animation: 'float 6s ease-in-out infinite',
                        '@keyframes float': {
                          '0%, 100%': {
                            transform: 'translateY(0px)',
                          },
                          '50%': {
                            transform: 'translateY(-20px)',
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                  mb: 4,
                }}>
                  {[
                    'Customize Your Tone – Choose from 7 powerful tone options',
                    'Instant Tone Adjustment – Change your text\'s tone in seconds',
                    'Tailor Your Message – Perfect for emails, reports, and creative pieces',
                    'Perfect for Everyone – Students, marketers, professionals, and content creators!'
                  ].map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Box 
                        component="span" 
                        sx={{ 
                          color: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        ✓
                      </Box>
                      <Typography variant="body1">{feature}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            
            {/* Add FAQ section only for Grammar Checker, Summarizer, Paraphraser, Translator, and Tone Converter */}
            {selectedTool === 'grammar' && (
              <FAQ questions={grammarFAQs} />
            )}
            {selectedTool === 'summarize' && (
              <FAQ questions={summarizerFAQs} />
            )}
            {selectedTool === 'paraphrase' && (
              <FAQ questions={paraphraserFAQs} />
            )}
            {selectedTool === 'translate' && (
              <FAQ questions={translatorFAQs} />
            )}
            {selectedTool === 'tone' && (
              <FAQ questions={toneConverterFAQs} />
            )}
            {selectedTool === 'humanize' && (
              <FAQ questions={humanizerFAQs} />
            )}
            {selectedTool === 'ai-detector' && (
              <Box 
                sx={{ 
                  mt: 4,
                  p: 4,
                  bgcolor: '#FAFBFF',
                  borderRadius: 2,
                  width: { xs: '100%', md: 'auto' }
                }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700,
                    mb: 3,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {aiDetectorPromo.title}
                </Typography>
                
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mb: 4,
                    maxWidth: '800px',
                    mx: 'auto',
                    color: 'text.secondary'
                  }}
                >
                  {aiDetectorPromo.subtitle}
                </Typography>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    color: 'primary.main',
                    fontWeight: 600
                  }}
                >
                  ✅ Why Use Our AI Detector?
                </Typography>

                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 2,
                  mb: 4
                }}>
                  {aiDetectorPromo.features.map((feature, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        bgcolor: 'background.paper',
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <span>🔹</span> {feature}
                      </Typography>
                    </Paper>
                  ))}
                </Box>

                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: 3,
                    borderRadius: 2,
                    mb: 4,
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    🔥 {aiDetectorPromo.callToAction}
                  </Typography>
                  <Typography>
                    From academic papers to marketing copy, our AI Detector helps you verify the authenticity of any content.
                  </Typography>
                </Box>
              </Box>
            )}
            {selectedTool === 'readability' && (
              <Box 
                sx={{ 
                  mt: 4,
                  p: 4,
                  bgcolor: '#FAFBFF',
                  borderRadius: 2,
                  width: { xs: '100%', md: 'auto' },
                  textAlign: 'center'
                }}
              >
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700,
                    mb: 3,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {readabilityPromo.title}
                </Typography>
                
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mb: 4,
                    maxWidth: '800px',
                    mx: 'auto',
                    color: 'text.secondary'
                  }}
                >
                  {readabilityPromo.subtitle}
                </Typography>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 3,
                    color: 'primary.main',
                    fontWeight: 600
                  }}
                >
                  ✅ Why Use Our Readability Checker?
                </Typography>

                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                  gap: 2,
                  mb: 4
                }}>
                  {readabilityPromo.features.map((feature, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        bgcolor: 'background.paper',
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        }
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <span>🔹</span> {feature}
                      </Typography>
                    </Paper>
                  ))}
                </Box>

                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: 3,
                    borderRadius: 2,
                    mb: 4,
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    🔥 {readabilityPromo.highlight}
                  </Typography>
                  <Typography>
                    {readabilityPromo.highlightDesc}
                  </Typography>
                </Box>

                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary',
                    p: 2,
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: 2,
                    display: 'inline-block'
                  }}
                >
                  {readabilityPromo.callToAction}
                </Typography>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default WritingDashboard;
