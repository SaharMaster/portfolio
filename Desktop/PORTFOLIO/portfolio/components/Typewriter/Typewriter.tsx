'use client';

import { useState, useEffect } from 'react';
import styles from './Typewriter.module.scss';

const Typewriter = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeoutId);
    } else {
      const finishTimeout = setTimeout(() => {
        setIsFinished(true);
      }, 500);
      return () => clearTimeout(finishTimeout);
    }
  }, [displayedText, text, speed]);

  return (
    <span className={styles.typewriterWrapper}>
      <span className={styles.typewriterText}>{displayedText}</span>
      {!isFinished && <span className={styles.cursor}></span>}
    </span>
  );
};

export default Typewriter;