import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const LECTURES_KEY = 'lectures';
export type LectureRecord = {
  course_id: string | null;
  lesson_id: string | null;
  file_url: string | null;
  cover_image_url: string | null;
  created_at: string | null;
  updated_at: string | null;
  title: string | null;
  order_index: string | null;
} & {
  id: string;
};
export const useGetLectures = () => {
  return useQuery<LectureRecord[]>({
    queryKey: [LECTURES_KEY],
    queryFn: async () => {
      const supabase = createClient();
      const query = supabase
        .from('lectures')
        .select('*')
        .order('order_index', { ascending: true });
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data;
    },
  });
};
