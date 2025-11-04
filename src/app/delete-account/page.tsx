'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/client';
import { useDeleteAccount } from '@/hooks/use-delete-account';
import { Loader2, Trash2, LogIn, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

export default function DeleteAccountPage() {
  const { t } = useTranslation(['common']);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const supabase = createClient();
  const deleteAccount = useDeleteAccount();

  useEffect(() => {
    // Check current session
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    checkUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setEmailError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/delete-account`,
        },
      });

      if (error) {
        console.error('Google sign-in error:', error);
        setEmailError(t('DELETE_ACCOUNT.SIGN_IN_ERROR'));
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setEmailError(t('DELETE_ACCOUNT.SIGN_IN_ERROR'));
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigningIn(true);
    setEmailError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Email sign-in error:', error);
        setEmailError(t('DELETE_ACCOUNT.INVALID_CREDENTIALS'));
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setEmailError(t('DELETE_ACCOUNT.SIGN_IN_ERROR'));
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.id) return;

    try {
      await deleteAccount.mutateAsync(user.id);
    } catch (error) {
      console.error('Delete account error:', error);
      alert(
        t('DELETE_ACCOUNT.DELETE_ERROR') ||
          'Failed to delete account. Please try again.',
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-8 animate-spin text-neutral-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 py-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">
            {t('DELETE_ACCOUNT.TITLE')}
          </CardTitle>
          <CardDescription>{t('DELETE_ACCOUNT.DESCRIPTION')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!user ? (
            // Not signed in - show sign in button
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">
                {t('DELETE_ACCOUNT.SIGN_IN_REQUIRED')}
              </p>

              {/* Email/Password Sign In Form */}
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {t('DELETE_ACCOUNT.EMAIL_LABEL')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('DELETE_ACCOUNT.EMAIL_PLACEHOLDER')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSigningIn}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {t('DELETE_ACCOUNT.PASSWORD_LABEL')}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder={t('DELETE_ACCOUNT.PASSWORD_PLACEHOLDER')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSigningIn}
                  />
                </div>
                {emailError && (
                  <p className="text-destructive text-sm">{emailError}</p>
                )}
                <Button
                  type="submit"
                  disabled={isSigningIn}
                  className="w-full"
                  size="lg"
                >
                  {isSigningIn ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      {t('DELETE_ACCOUNT.SIGNING_IN')}
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 size-4" />
                      {t('DELETE_ACCOUNT.SIGN_IN_WITH_EMAIL')}
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background text-muted-foreground px-2">
                    {t('DELETE_ACCOUNT.OR_DIVIDER')}
                  </span>
                </div>
              </div>

              {/* Google Sign In */}
              <Button
                onClick={handleGoogleSignIn}
                disabled={isSigningIn}
                variant="outline"
                className="w-full"
                size="lg"
              >
                {isSigningIn ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    {t('DELETE_ACCOUNT.SIGNING_IN')}
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 size-4" />
                    {t('DELETE_ACCOUNT.SIGN_IN_WITH_GOOGLE')}
                  </>
                )}
              </Button>

              <div className="text-center">
                <Link
                  href="/"
                  className="text-muted-foreground text-sm hover:underline"
                >
                  {t('DELETE_ACCOUNT.BACK_TO_HOME')}
                </Link>
              </div>
            </div>
          ) : (
            // Signed in - show delete account option
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg border p-4">
                <p className="text-sm font-medium">
                  {t('DELETE_ACCOUNT.SIGNED_IN_AS')}
                </p>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>

              <div className="border-destructive/20 bg-destructive/5 space-y-3 rounded-lg border p-4">
                <h3 className="text-destructive font-semibold">
                  {t('DELETE_ACCOUNT.WARNING_TITLE')}
                </h3>
                <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                  <li>{t('DELETE_ACCOUNT.WARNING_1')}</li>
                  <li>{t('DELETE_ACCOUNT.WARNING_2')}</li>
                  <li>{t('DELETE_ACCOUNT.WARNING_3')}</li>
                </ul>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="lg"
                    className="w-full"
                    disabled={deleteAccount.isPending}
                  >
                    {deleteAccount.isPending ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        {t('DELETE_ACCOUNT.DELETING')}
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 size-4" />
                        {t('DELETE_ACCOUNT.DELETE_BUTTON')}
                      </>
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {t('DELETE_ACCOUNT.CONFIRM_TITLE')}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('DELETE_ACCOUNT.CONFIRM_DESCRIPTION')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      {t('DELETE_ACCOUNT.CANCEL')}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-destructive hover:bg-destructive/90 text-white"
                    >
                      {t('DELETE_ACCOUNT.CONFIRM_DELETE')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div className="text-center">
                <Link
                  href="/"
                  className="text-muted-foreground text-sm hover:underline"
                >
                  {t('DELETE_ACCOUNT.BACK_TO_HOME')}
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
