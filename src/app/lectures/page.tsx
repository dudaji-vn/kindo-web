'use client';

import { type LanguagePair } from '@/components/language-selector';
import { useAvailableLanguagePairs } from '@/features/courses/hooks/use-available-language-pairs';
import LectureList from '@/features/lectures/components/lecture-list';
import { useAppStore } from '@/stores/app.store';
import { useEffect, useState } from 'react';

export default function Home() {
  const language = useAppStore((state) => state.language);

  const { availableLanguagePairs } = useAvailableLanguagePairs();
  const [selectedLanguagePair, setSelectedLanguagePair] =
    useState<LanguagePair | null>(null);

  useEffect(() => {
    if (language && availableLanguagePairs.length > 0) {
      const match = availableLanguagePairs.find(
        (pair) => pair.sourceLanguage === language,
      );
      if (match) {
        setSelectedLanguagePair(match);
      } else {
        setSelectedLanguagePair(availableLanguagePairs[0]);
      }
    }
  }, [language, availableLanguagePairs]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Main Content */}
      <LectureList languagePair={selectedLanguagePair} />
    </div>
  );
}
