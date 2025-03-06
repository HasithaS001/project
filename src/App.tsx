import { useState } from "react";
import { Wand2, Menu, X } from "lucide-react";
import WritingDashboard from "./components/WritingDashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import GrammarChecker from "./pages/tools/GrammarChecker";
import Paraphraser from "./pages/tools/Paraphraser";
import Summarizer from "./pages/tools/Summarizer";
import Translator from "./pages/tools/Translator";
import Humanize from "./pages/tools/Humanize";
import ToneConverter from "./pages/tools/ToneConverter";
import AIContentDetector from "./pages/tools/AIContentDetector";
import ToolsNavigation from "./components/ToolsNavigation";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import RefundPolicy from "./pages/RefundPolicy";
import Privacy from "./pages/Privacy";
import TermsOfService from "./pages/TermsOfService";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [text, setText] = useState("");

  return (
    <Router>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/tools">
            <Route path="grammar" element={<GrammarChecker />} />
            <Route path="paraphrase" element={<Paraphraser />} />
            <Route path="summarize" element={<Summarizer />} />
            <Route path="translate" element={<Translator />} />
            <Route path="tone" element={<ToneConverter />} />
            <Route path="humanize" element={<Humanize />} />
            <Route path="ai-content-detector" element={<AIContentDetector />} />
          </Route>
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route
            path="/dashboard"
            element={
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
                      words: text.split(/\s+/).length,
                    },
                  };
                }}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
