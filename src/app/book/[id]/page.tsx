'use client';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const PdfViewerClient = dynamic(
  () => import('@/features/lectures/components/pdf-viewer'),
  {
    ssr: false,
    loading: () => (
      <div className="text-muted-foreground flex h-screen items-center justify-center gap-2">
        <Loader2 className="size-5 animate-spin" /> Loading viewer...
      </div>
    ),
  },
);

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="text-muted-foreground flex h-screen items-center justify-center gap-2">
          <Loader2 className="size-5 animate-spin" /> Preparing...
        </div>
      }
    >
      <PdfViewerClient />
    </Suspense>
  );
}
