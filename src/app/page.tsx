'use client';

import LanguageSelector, {
  type LanguagePair,
} from '@/components/language-selector';
import { useAvailableLanguagePairs } from '@/features/courses/hooks/use-available-language-pairs';
import LectureList from '@/features/lectures/components/lecture-list';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const { availableLanguagePairs } = useAvailableLanguagePairs();
  const [selectedLanguagePair, setSelectedLanguagePair] =
    useState<LanguagePair | null>(null);

  // Load saved language pair from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('selectedLanguagePair');
    if (saved) {
      try {
        setSelectedLanguagePair(JSON.parse(saved));
      } catch {
        // Ignore invalid JSON
      }
    }
  }, []);

  // Save language pair to localStorage when it changes
  const handleLanguagePairChange = (languagePair: LanguagePair | null) => {
    setSelectedLanguagePair(languagePair);
    if (languagePair) {
      localStorage.setItem(
        'selectedLanguagePair',
        JSON.stringify(languagePair),
      );
    } else {
      localStorage.removeItem('selectedLanguagePair');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-neutral-100 bg-neutral-50 shadow-sm">
        <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-10 lg:mx-[5vw]">
          <div className="flex flex-col items-center sm:items-start">
            <Image
              src={'/kindo-logo-light.svg'}
              width="136"
              height="40"
              alt="Kindo Logo"
            />
            <span className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
              Online Lecture
            </span>
          </div>

          {/* Language Selector */}
          <div className="flex justify-center sm:justify-end">
            <LanguageSelector
              value={selectedLanguagePair}
              onChange={handleLanguagePairChange}
              availableLanguagePairs={availableLanguagePairs}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <LectureList languagePair={selectedLanguagePair} />
    </div>
  );
}
