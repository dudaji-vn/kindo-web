'use client';

import { useMutation } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export const useDeleteAccount = () => {
  const router = useRouter();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (!userId) {
        throw new Error('No user ID provided');
      }

      // Call Supabase RPC to delete account
      const { data, error } = await supabase.rpc('delete_user_account', {
        target_user_id: userId,
      });

      if (error) {
        console.error('Supabase delete error:', error);
        throw new Error(`Failed to delete account: ${error.message}`);
      }

      // Sign out after successful deletion
      await supabase.auth.signOut();

      return data;
    },
    onSuccess: () => {
      // Redirect to home after deletion
      router.push('/');
    },
    onError: (error) => {
      console.error('Error deleting account:', error);
    },
  });
};
