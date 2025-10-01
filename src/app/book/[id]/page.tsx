'use client'
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

// Dynamically load the client-only PDF viewer to avoid DOM APIs (DOMMatrix) on the server.
const PdfViewerClient = dynamic(() => import('@/features/lectures/components/pdf-viewer'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center text-muted-foreground gap-2">
      <Loader2 className="size-5 animate-spin" /> Loading viewer...
    </div>
  ),
});

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center text-muted-foreground gap-2">
          <Loader2 className="size-5 animate-spin" /> Preparing...
        </div>
      }
    >
      <PdfViewerClient />
    </Suspense>
  );
}
