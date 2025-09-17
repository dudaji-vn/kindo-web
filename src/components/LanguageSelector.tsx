'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LANGUAGE_CODES_MAP } from '@/configs/default-language';
import i18n from '@/lib/i18n/config';
import { useAppStore } from '@/stores/app.store';
import { CircleFlag } from 'react-circle-flags';

const LANG_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Tiếng Việt' },
];

export function LanguageSelector({
  size = 'default',
  className,
}: {
  size?: 'sm' | 'default';
  className?: string;
}) {
  const language = useAppStore((s) => s.language) || 'en';
  const setLanguage = useAppStore((s) => s.setLanguage);

  const handleChange = (val: string) => {
    setLanguage(val);
    i18n.changeLanguage(val);
  };

  const current =
    LANG_OPTIONS.find((o) => o.value === language) || LANG_OPTIONS[0];

  return (
    <Select value={current.value} onValueChange={handleChange}>
      <SelectTrigger size={size} className={className}>
        <SelectValue>
          <span className="flex items-center gap-2">
            <CircleFlag
              countryCode={LANGUAGE_CODES_MAP[
                current.value as keyof typeof LANGUAGE_CODES_MAP
              ].toLowerCase()}
              className="inline-block h-5 w-5 overflow-hidden rounded-full"
            />
            <span className="inline">{current.label}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end">
        {LANG_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            <span className="flex items-center gap-2">
              <CircleFlag
                countryCode={LANGUAGE_CODES_MAP[
                  opt.value as keyof typeof LANGUAGE_CODES_MAP
                ].toLowerCase()}
                className="inline-block h-5 w-5 overflow-hidden rounded-full"
              />
              {opt.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
