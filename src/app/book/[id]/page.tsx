'use client';
import { Button } from '@/components/ui/button';
import { useGetLecture } from '@/features/lectures/hooks/use-get-lecture';
import { useGetLesson } from '@/features/lessons/hooks/use-get-lesson';
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';

function PDFViewer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipBookRef = useRef<any>(null);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const lectureId = params.id;
  const { data } = useGetLecture(lectureId ?? '');
  const { data: lesson } = useGetLesson(data?.lesson_id)
  const [pdfUrl, setPdfUrl] = useState<string | undefined>();
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<{ width: number; height: number }>({
    width: 400,
    height: 600,
  });
  const [pdfAspectRatio, setPdfAspectRatio] = useState<number>(0.7);
  useEffect(() => {
    console.log({ data });
    if (data?.file_url) { setPdfUrl(data?.file_url); }
  }, [data]);

  // Configure PDF.js worker
  useMemo(() => {
    if (typeof window !== 'undefined') {
      GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
    }
  }, []);

  // Calculate page size based on container and aspect ratio
  const calculatePageSize = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const padding = 24; // 12px padding each side
    const availableWidth = rect.width - padding;
    const availableHeight = rect.height - padding;

    // Use stored aspect ratio
    const aspect = pdfAspectRatio;

    // Try fitting by width first
    let width = availableWidth;
    let height = width / aspect;

    // If height is too big, fit by height instead
    if (height > availableHeight) {
      height = availableHeight;
      width = height * aspect;
    }

    // Apply reasonable constraints
    width = Math.max(Math.min(width, 900), 200);
    height = Math.max(Math.min(height, availableHeight), 300);

    const newSize = {
      width: Math.round(width),
      height: Math.round(height)
    };

    // Only update if size actually changed
    setPageSize(prevSize => {
      if (prevSize.width !== newSize.width || prevSize.height !== newSize.height) {
        return newSize;
      }
      return prevSize;
    });
  }, [pdfAspectRatio]);

  // Navigation functions
  const goToNextPage = useCallback(() => {
    if (flipBookRef.current && currentPage < totalPages - 1) {
      flipBookRef.current.pageFlip().flipNext();
    }
  }, [currentPage, totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (flipBookRef.current && currentPage > 0) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  }, [currentPage]);

  const goHome = useCallback(() => {
    router.push('/');
  }, [router]);

  // Recalculate page size on window resize  
  useEffect(() => {
    // Initial calculation
    calculatePageSize();

    // Listen to resize events
    window.addEventListener('resize', calculatePageSize);
    return () => window.removeEventListener('resize', calculatePageSize);
  }, [calculatePageSize]);

  // Recalculate when PDF aspect ratio changes
  useEffect(() => {
    calculatePageSize();
  }, [pdfAspectRatio, calculatePageSize]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPreviousPage();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goHome();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPreviousPage, goToNextPage, goHome]);

  // Load and render PDF pages
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError('');
      setPages([]);
      try {
        // Use proxy API for external URLs to avoid CORS issues
        const isExternalUrl = pdfUrl?.startsWith('http://') || pdfUrl?.startsWith('https://');
        if (!pdfUrl) throw new Error('No PDF URL specified');
        const fetchUrl = isExternalUrl
          ? `/api/pdf-proxy?url=${encodeURIComponent(pdfUrl)}`
          : pdfUrl;

        const loadingTask = getDocument({
          url: fetchUrl,
          withCredentials: false,
        });
        const pdf: PDFDocumentProxy = await loadingTask.promise;
        setTotalPages(pdf.numPages);

        const newPages: string[] = [];
        // Render sequentially to reduce memory spikes
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });

          // Set aspect ratio from first page and trigger size recalculation
          if (i === 1) {
            const pdfAspect = viewport.width / viewport.height;
            setPdfAspectRatio(pdfAspect);
          }

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) continue;

          const dpr = window.devicePixelRatio || 1;
          const scaledViewport = page.getViewport({ scale: 3 * dpr });
          canvas.width = Math.floor(scaledViewport.width);
          canvas.height = Math.floor(scaledViewport.height);

          // Render
          await page.render({
            canvasContext: context,
            viewport: scaledViewport,
            canvas: canvas,
          }).promise;
          const dataUrl = canvas.toDataURL('image/png');
          newPages.push(dataUrl);

          if (cancelled) return;
          // Update progressively
          setPages((prev) => [...prev, dataUrl]);
        }
      } catch (e) {
        console.log(e);
        setError(
          'Failed to load PDF. Please check the URL or try a different PDF file.',
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  return (
    <div className="flex h-screen flex-col bg-neutral-200 group">
      <div className="bg-neutral-50 border-b border-neutral-100">
        <div className="lg:mx-[5vw] py-5 flex items-center justify-between px-5 md:px-10">
          <Button
            variant="ghost"
            onClick={goHome}
            className='h-auto'
          >
            <div
              className="flex items-center gap-5"
            >
              <ArrowLeft className="size-4" />
              {pdfUrl && lesson ?
                <div className='flex flex-col items-start'>
                  <span className="text-sm ">You&apos;re reading</span>
                  <span className="text-lg font-semibold">Lesson {lesson?.order_index} - {lesson?.title}</span>
                </div>
                : 
                <p>Back to Homepage</p>
              }
            </div>
          </Button>
          <a href={pdfUrl} target="_blank" rel="noreferrer">
            <Button variant={'secondary'} title="Download PDF">
              <Download className="size-4" />
              <span className="hidden sm:inline ml-2">Download as PDF</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Viewer container */}
      <div
        ref={containerRef}
        className="min-h-0 flex-1 overflow-hidden"
      >
        {loading && (
          <div className="flex h-full items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
            {pdfUrl?.startsWith('http') ? 'Loading PDF via proxy...' : 'Loading PDF...'}
          </div>
        )}
        {error && !loading && (
          <div className="flex h-full items-center justify-center text-sm text-red-500">
            {error}
          </div>
        )}
        {!loading && !error && pages.length > 0 && (
          <div className="flex h-full w-full items-center justify-center relative shadow-2xl">
            <HTMLFlipBook
              ref={flipBookRef}
              width={pageSize.width}
              height={pageSize.height}
              startPage={0}
              style={{}}
              size="stretch"
              minWidth={pageSize.width}
              maxWidth={pageSize.width}
              minHeight={pageSize.height}
              maxHeight={pageSize.height}
              drawShadow
              flippingTime={700}
              usePortrait
              startZIndex={0}
              autoSize
              maxShadowOpacity={0.3}
              showCover={pages.length > 1 ? true : false}
              mobileScrollSupport
              clickEventForward
              useMouseEvents
              swipeDistance={50}
              showPageCorners
              disableFlipByClick={false}
              className=""
              onFlip={(e) => setCurrentPage(e.data)}
            >
              {pages.map((src, idx) => (
                <div key={idx} className="bg-background flex items-center justify-center">
                  <Image
                    src={src}
                    alt={`Page ${idx + 1}`}
                    className="max-w-full w-full max-h-full h-full object-contain"
                    draggable={false}
                    fill
                  />
                </div>
              ))}
            </HTMLFlipBook>
          </div>
        )}

        {/* Navigation Controls - Fixed position for mobile */}
        {!loading && !error && pages.length > 0 && (
          <div className="group-hover:opacity-100 sm:opacity-0 fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm border rounded-full px-2 py-2 shadow-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={goToPreviousPage}
                disabled={currentPage === 0}
                className="rounded-full p-2"
              >
                <ChevronLeft className="size-5" />
              </Button>

              <div className="text-sm font-medium px-2 min-w-[80px] text-center">
                {currentPage + 1} / {totalPages}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage >= totalPages - 1}
                className="rounded-full p-2"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin" />
      </div>
    }>
      <PDFViewer />
    </Suspense>
  );
}
