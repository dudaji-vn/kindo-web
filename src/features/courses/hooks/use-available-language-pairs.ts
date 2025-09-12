import { useGetCourses } from '@/features/courses/hooks/use-get-courses';
import { useMemo } from 'react';

export type LanguagePair = {
  sourceLanguage: string;
  targetLanguage: string;
};

export const useAvailableLanguagePairs = () => {
  const { data: courses, isLoading, error } = useGetCourses();

  const availableLanguagePairs = useMemo(() => {
    if (!courses) return [];

    const pairs = new Set<string>();
    courses.forEach((course) => {
      if (course.source_language && course.target_language) {
        pairs.add(`${course.source_language}-${course.target_language}`);
      }
    });

    return Array.from(pairs).map((pair) => {
      const [sourceLanguage, targetLanguage] = pair.split('-');
      return { sourceLanguage, targetLanguage };
    });
  }, [courses]);

  return { availableLanguagePairs, isLoading, error };
};
