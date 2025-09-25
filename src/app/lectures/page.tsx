'use client';

import { useAvailableLanguagePairs } from '@/features/courses/hooks/use-available-language-pairs';
import LectureList from '@/features/lectures/components/lecture-list';
import { LanguagePair } from '@/features/lectures/hooks/use-lecture';
import { useAppStore } from '@/stores/app.store';
import { useEffect, useState } from 'react';

export default function Home() {
  const { language } = useAppStore();

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
    <div className="flex justify-center px-5 pt-16 sm:px-10 md:px-[5vw]">
      {/* Main Content */}
      <div className="w-full max-w-7xl py-5">
        <LectureList languagePair={selectedLanguagePair} />
      </div>
    </div>
  );
}
