import React, { useState } from 'react';

const ParaphraseTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [selectedMode, setSelectedMode] = useState('simple');

  const modes = [
    { id: 'simple', label: 'Simple' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'formal', label: 'Formal' },
    { id: 'academic', label: 'Academic' },
    { id: 'casual', label: 'Casual' }
  ];

  return (
    <div className="flex flex-col space-y-6 p-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">AI-Powered Paraphrasing Tool</h1>
        <p className="text-lg mb-6">
          Transform your writing with intelligent paraphrasing that maintains meaning while enhancing clarity and style! 🎯
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedMode === mode.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here to paraphrase..."
            className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Paraphrase Text
          </button>
        </div>

        {/* SVG Animation Column */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <img 
              src="/writing-bot.svg" 
              alt="AI Writing Assistant" 
              className="w-full h-auto animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParaphraseTool;
