import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

interface TypeWriterProps {
  text: string;
  onComplete?: () => void;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ text, onComplete }) => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
  }, [text]);

  // Function to clean HTML tags from text
  const cleanText = (text: string) => {
    return text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
      .replace(/&amp;/g, '&') // Replace &amp; with &
      .replace(/&lt;/g, '<') // Replace &lt; with <
      .replace(/&gt;/g, '>'); // Replace &gt; with >
  };

  return (
    <TypeAnimation
      sequence={[
        cleanText(text),
        () => {
          setIsTyping(false);
          if (onComplete) onComplete();
        },
      ]}
      wrapper="div"
      cursor={isTyping}
      repeat={0}
      speed={90}
      style={{ 
        whiteSpace: 'pre-wrap',
        fontSize: '1rem',
        lineHeight: 1.6,
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      }}
    />
  );
};

export default TypeWriter;
