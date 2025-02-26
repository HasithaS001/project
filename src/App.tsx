import React, { useState } from 'react';
import {
  Wand2,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone
} from 'lucide-react';
import WritingDashboard from './components/WritingDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, Link } from 'react-router-dom';
import GrammarChecker from './pages/tools/GrammarChecker';
import Paraphraser from './pages/tools/Paraphraser';
import Summarizer from './pages/tools/Summarizer';
import Translator from './pages/tools/Translator';
import Humanize from './pages/tools/Humanize';
import ToneConverter from './pages/tools/ToneConverter';
import ToolsNavigation from './components/ToolsNavigation';
import Landing from './pages/Landing';
import AIContentDetector from './pages/tools/AIContentDetector';
import Pricing from './pages/Pricing';
import About from './pages/About';
import RefundPolicy from './pages/RefundPolicy';
import Privacy from './pages/Privacy';
import TermsOfService from './pages/TermsOfService';
import { toolRoutesConfig } from './routes/toolRoutes';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Wand2 className="w-8 h-8 text-purple-600" />
            <span className="ml-2 text-xl font-bold">Writeai</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
            <a href="#benefits" className="text-gray-600 hover:text-purple-600 transition-colors">Benefits</a>
            <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About Us</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</Link>
            <button className="bg-gray-50 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Sign In
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Try Free
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#benefits" className="text-gray-600 hover:text-purple-600 transition-colors">Benefits</a>
              <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>
              <button className="bg-gray-50 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Sign In
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Try Free
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [text, setText] = useState("");
  
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Header />
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsOfService />} />
          {/* Main dashboard route */}
          <Route path="/dashboard" element={
            <WritingDashboard 
              title="Writing Assistant"
              description="Enter your text below to analyze"
              placeholder="Type or paste your text here..."
              value={text}
              onChange={setText}
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
          } />

          {/* Tools section with nested routes */}
          <Route path="/tools" element={
            <>
              <ToolsNavigation />
              <Outlet />
            </>
          }>
            {toolRoutesConfig.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>

          {/* Catch all invalid routes and redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;