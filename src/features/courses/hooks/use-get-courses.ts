import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const COURSES_KEY = 'courses';
export type CourseRecord = {
    title: string | null;
    description: string | null;
    cover_image_url: string | null;
    difficulty_level: string | null;
    total_lessons: number | null;
    is_level_test: number | null;
    is_featured: number | null;
    is_premium: number | null;
    source_language: string | null;
    target_language: string | null;
    created_at: string | null;
    updated_at: string | null;
    order_index: number | null;
} & {
    id: string;
}

export const useGetCourses = () => {
  return useQuery<CourseRecord[]>({
    queryKey: [COURSES_KEY],
    queryFn: async () => {
     const supabase = createClient();
      const query = supabase
        .from('courses')
.select('*').order('order_index', { ascending: true });
        
     
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data;
    },
  });
};
