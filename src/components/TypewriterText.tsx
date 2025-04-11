
import { useState, useEffect } from 'react';

type TypewriterTextProps = {
  textArray: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayAfterType?: number;
  delayAfterDelete?: number;
  className?: string;
};

const TypewriterText = ({
  textArray,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayAfterType = 1000,
  delayAfterDelete = 500,
  className = '',
}: TypewriterTextProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!textArray.length) return;

    let timeout: NodeJS.Timeout;
    
    if (isTyping) {
      if (currentText === textArray[currentTextIndex]) {
        // Full word typed, pause before deleting
        timeout = setTimeout(() => setIsTyping(false), delayAfterType);
      } else {
        // Continue typing current word
        timeout = setTimeout(() => {
          setCurrentText(textArray[currentTextIndex].substring(0, currentText.length + 1));
        }, typingSpeed);
      }
    } else {
      if (currentText === '') {
        // Word fully deleted, move to next word
        setIsTyping(true);
        setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
        timeout = setTimeout(() => {}, delayAfterDelete);
      } else {
        // Continue deleting
        timeout = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }, deletingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isTyping, textArray, typingSpeed, deletingSpeed, delayAfterType, delayAfterDelete]);

  return <span className={`typewriter ${className}`}>{currentText}</span>;
};

export default TypewriterText;
