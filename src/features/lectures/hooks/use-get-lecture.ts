import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { LectureRecord } from './use-get-lectures';

export const LECTURES_KEY = 'lecture';
export const useGetLecture = (id?:string) => {
  return useQuery<LectureRecord>({
    queryKey: [LECTURES_KEY,id],
    queryFn: async () => {
     const supabase = createClient();
      const query = supabase
        .from('lectures')
.select('*').eq('id',id).single();
        
     
      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data;
    },
  });
};
