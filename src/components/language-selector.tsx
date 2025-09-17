'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import React from 'react';

type LanguagePair = {
  sourceLanguage: string;
  targetLanguage: string;
};

type LanguageSelectorProps = {
  value: LanguagePair | null;
  onChange: (value: LanguagePair | null) => void;
  availableLanguagePairs: LanguagePair[];
  hasLoadedFromStorage?: boolean;
};

const getLanguageDisplayName = (code: string): string => {
  const languageMap: Record<string, string> = {
    en: 'English',
    vi: 'Tiếng Việt',
    fr: 'Français',
    de: 'Deutsch',
    es: 'Español',
    ja: '日本語',
    ko: '한국어',
    zh: '中文',
    th: 'ไทย',
    id: 'Bahasa Indonesia',
    // Add more languages as needed
  };
  return languageMap[code] || code.toUpperCase();
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onChange,
  availableLanguagePairs,
  hasLoadedFromStorage = false,
}) => {
  const [hasUserSelected, setHasUserSelected] = React.useState(false);

  // Detect browser language only when user hasn't made any selection and storage has been loaded
  React.useEffect(() => {
    console.log({
      value,
      availableLanguagePairs,
      hasUserSelected,
      hasLoadedFromStorage,
    });
    if (
      hasLoadedFromStorage &&
      !hasUserSelected &&
      !value &&
      availableLanguagePairs.length > 0
    ) {
      const browserLang =
        typeof navigator !== 'undefined' && navigator.language
          ? navigator.language.split('-')[0]
          : 'en';
      // Tìm cặp có sourceLanguage trùng với browserLang
      const found = availableLanguagePairs.find(
        (pair) => pair.sourceLanguage === browserLang,
      );
      if (found) {
        onChange(found);
      }
    }
  }, [
    value,
    onChange,
    availableLanguagePairs,
    hasUserSelected,
    hasLoadedFromStorage,
  ]);

  const getValue = (): string => {
    if (!value) return '';
    return `${value.sourceLanguage}-${value.targetLanguage}`;
  };

  const handleValueChange = (selectedValue: string) => {
    setHasUserSelected(true); // Mark that user has made a selection

    if (selectedValue === 'all') {
      onChange(null);
      return;
    }

    const [sourceLanguage, targetLanguage] = selectedValue.split('-');
    if (sourceLanguage && targetLanguage) {
      onChange({ sourceLanguage, targetLanguage });
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
      <span className="text-center text-sm font-medium text-neutral-700 sm:text-left">
        Language:
      </span>
      <Select value={getValue()} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full border-neutral-200 bg-white transition-colors hover:border-neutral-300 sm:min-w-[240px]">
          <SelectValue placeholder="Select language pair">
            {value ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {getLanguageDisplayName(value.sourceLanguage)}
                </span>
                <ArrowRight className="h-3 w-3 text-neutral-400" />
                <span className="text-sm">
                  {getLanguageDisplayName(value.targetLanguage)}
                </span>
              </div>
            ) : (
              'All languages'
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-background">
          <SelectItem value="all">
            <span className="font-medium">All languages</span>
          </SelectItem>
          {availableLanguagePairs.length > 0 && (
            <>
              <div className="my-1 h-px bg-neutral-200" />
              {availableLanguagePairs.map((pair) => (
                <SelectItem
                  key={`${pair.sourceLanguage}-${pair.targetLanguage}`}
                  value={`${pair.sourceLanguage}-${pair.targetLanguage}`}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    {getLanguageDisplayName(pair.sourceLanguage)}
                    <ArrowRight className="h-3 w-3 text-neutral-400" />
                    {getLanguageDisplayName(pair.targetLanguage)}
                  </div>
                </SelectItem>
              ))}
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
export type { LanguagePair };
