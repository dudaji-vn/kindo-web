'use client';

import LanguageSelector, {
  type LanguagePair,
} from '@/components/language-selector';
import { useAvailableLanguagePairs } from '@/features/courses/hooks/use-available-language-pairs';
import LectureList from '@/features/lectures/components/lecture-list';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const { availableLanguagePairs } = useAvailableLanguagePairs();
  const [selectedLanguagePair, setSelectedLanguagePair] =
    useState<LanguagePair | null>(null);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

  // Load saved language pair from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('selectedLanguagePair');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSelectedLanguagePair(parsed);
      } catch {
        // Ignore invalid JSON
      }
    }
    setHasLoadedFromStorage(true);
  }, []);

  // Save language pair to localStorage when it changes
  const handleLanguagePairChange = useCallback(
    (languagePair: LanguagePair | null) => {
      setSelectedLanguagePair(languagePair);
      if (languagePair) {
        localStorage.setItem(
          'selectedLanguagePair',
          JSON.stringify(languagePair),
        );
      } else {
        localStorage.removeItem('selectedLanguagePair');
      }
    },
    [],
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="right-0 flex justify-center gap-4 px-5 py-5 sm:absolute sm:flex-row sm:items-center sm:justify-end md:px-10 lg:mx-[5vw]">
        <LanguageSelector
          value={selectedLanguagePair}
          onChange={handleLanguagePairChange}
          availableLanguagePairs={availableLanguagePairs}
          hasLoadedFromStorage={hasLoadedFromStorage}
        />
      </div>

      {/* Main Content */}
      <LectureList languagePair={selectedLanguagePair} />
    </div>
  );
}
