import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { LessonRecord } from './use-get-lessons';

export const LESSON_KEY = 'lesson';

export const useGetLesson = (id?: string | null) => {
  return useQuery<LessonRecord>({
    queryKey: [LESSON_KEY, id],
    queryFn: async () => {
      const supabase = createClient();
      const query = supabase.from('lessons').select('*').eq('id', id).single();
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data;
    },
  });
};
