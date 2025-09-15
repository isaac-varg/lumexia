
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const loadingPhrases = [
  "Yelling at Lalo...",
  "Giving treats to the dogs...",
  "Spilling fragrances...",
  "Reticulating splines...",
  "Feeding the office hamster...",
  "Polishing the pixels...",
  "Aligning the warp drive...",
  "Brewing coffee...",
  "Untangling the internet...",
  "Herding cats...",
  "Charging the flux capacitor...",
];

const phraseVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const SillyLoader = ({ isLoading }: { isLoading: boolean }) => {
  const [phrase, setPhrase] = useState(loadingPhrases[0]);

  useEffect(() => {
    if (isLoading) {
      setPhrase(loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]);

      const interval = setInterval(() => {
        setPhrase(
          loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);


  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className={`
            flex items-center justify-center
            text-3xl font-poppins font-semibold
             text-blue-500/60
            animate-pulse
          `}
        >
          <motion.p
            key={phrase}
            variants={phraseVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="whitespace-nowrap"
          >
            {phrase}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SillyLoader;

