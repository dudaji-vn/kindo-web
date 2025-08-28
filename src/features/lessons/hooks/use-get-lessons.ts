import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const LESSONS_KEY = 'lessons';
export type LessonRecord = {
  course_id: string | null;
  title: string | null;
  sub_title: string | null;
  description: string | null;
  description_sections: string | null;
  image_url: string | null;
  order_index: number | null;
  total_question: number | null;
  targets: string | null;
  vocabulary: string | null;
  typing_words: string | null;
  grammar: string | null;
  is_level_test: number | null;
  lesson_type: string | null;
  is_published: number | null;
  created_at: string | null;
  updated_at: string | null;
} & {
  id: string;
}


export const useGetLessons = () => {
  return useQuery<LessonRecord[]>({
    queryKey: [LESSONS_KEY],
    queryFn: async () => {
      const supabase = createClient();
      const query = supabase
        .from('lessons')
        .select('*').order('order_index', { ascending: true });
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data;
    },
  });
};
