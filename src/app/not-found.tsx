'use client';

import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const router = useRouter();
  const { t } = useTranslation(['common']);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 px-4">
      <div className="mx-auto max-w-md text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="text-8xl font-bold text-neutral-300">404</div>
          <div className="text-6xl">🔍</div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl font-bold text-neutral-800">
            {t('NOT_FOUND.TITLE')}
          </h1>
          <p className="text-neutral-600">{t('NOT_FOUND.DESCRIPTION')}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/" className="block">
            <Button className="w-full" size="lg">
              <Home className="mr-2 size-4" />
              {t('NOT_FOUND.GO_HOME')}
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 size-4" />
            {t('NOT_FOUND.GO_BACK')}
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-neutral-500">
          {t('NOT_FOUND.HELP_TEXT')}
        </div>
      </div>
    </div>
  );
}
