'use client';

import { Button } from '@/components/ui/button';
import { useGetLecture } from '@/features/lectures/hooks/use-get-lecture';
import { useGetLesson } from '@/features/lessons/hooks/use-get-lesson';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Maximize,
  Minimize,
} from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import {
  getDocument,
  GlobalWorkerOptions,
  PDFDocumentProxy,
} from 'pdfjs-dist/legacy/build/pdf.mjs';
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import HTMLFlipBook from 'react-pageflip';

function PDFViewer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipBookRef = useRef<any>(null);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const lectureId = params.id;
  const { data } = useGetLecture(lectureId ?? '');
  const { data: lesson } = useGetLesson(data?.lesson_id);
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
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  useEffect(() => {
    console.log({ data });
    if (data?.file_url) {
      setPdfUrl(data?.file_url);
    }
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

    const padding = isFullscreen ? 0 : 24; // More padding in fullscreen
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
    const maxWidth = isFullscreen ? 1200 : 900;
    const minWidth = isFullscreen ? 300 : 200;
    width = Math.max(Math.min(width, maxWidth), minWidth);
    height = Math.max(Math.min(height, availableHeight), 300);

    const newSize = {
      width: Math.round(width),
      height: Math.round(height),
    };

    // Only update if size actually changed
    setPageSize((prevSize) => {
      if (
        prevSize.width !== newSize.width ||
        prevSize.height !== newSize.height
      ) {
        return newSize;
      }
      return prevSize;
    });
  }, [pdfAspectRatio, isFullscreen]);

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

  // Fullscreen functionality
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
          setShowShortcuts(true);
          setTimeout(() => setShowShortcuts(false), 3000);
        })
        .catch((err) => {
          console.error('Error attempting to enable fullscreen:', err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
          setShowShortcuts(false);
        })
        .catch((err) => {
          console.error('Error attempting to exit fullscreen:', err);
        });
    }
  }, []);

  // Listen for fullscreen changes (e.g., pressing Esc)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      if (!isNowFullscreen) {
        setShowShortcuts(false);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Recalculate page size on window resize
  useEffect(() => {
    // Initial calculation
    calculatePageSize();

    // Listen to resize events
    window.addEventListener('resize', calculatePageSize);
    return () => window.removeEventListener('resize', calculatePageSize);
  }, [calculatePageSize]);

  // Recalculate when PDF aspect ratio changes or fullscreen toggles
  useEffect(() => {
    calculatePageSize();
  }, [pdfAspectRatio, isFullscreen, calculatePageSize]);

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
      } else if (e.key === 'f' || e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape' && isFullscreen) {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPreviousPage, goToNextPage, goHome, toggleFullscreen, isFullscreen]);

  // Load and render PDF pages
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError('');
      setPages([]);
      try {
        // Use proxy API for external URLs to avoid CORS issues
        const isExternalUrl =
          pdfUrl?.startsWith('http://') || pdfUrl?.startsWith('https://');
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
    <div
      className={`group flex h-screen flex-col transition-colors duration-300 ${isFullscreen ? 'bg-black' : 'bg-neutral-200'}`}
    >
      {/* Header - hide in fullscreen mode */}
      {!isFullscreen && (
        <div className="border-b border-neutral-100 bg-neutral-50 transition-all duration-300">
          <div className="flex items-center justify-between px-5 py-5 md:px-10 lg:mx-[5vw]">
            <Button variant="ghost" onClick={goHome} className="h-auto">
              <div className="flex items-center gap-5">
                <ArrowLeft className="size-4" />
                {pdfUrl && lesson ? (
                  <div className="flex flex-col items-start">
                    <span className="text-sm">You&apos;re reading</span>
                    <span className="text-lg font-semibold">
                      {data?.title ??
                        `Lesson ${lesson.order_index} - ${lesson.title}`}
                    </span>
                  </div>
                ) : (
                  <p>Back to Homepage</p>
                )}
              </div>
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={toggleFullscreen}
                title={
                  isFullscreen
                    ? 'Exit fullscreen (F or Esc)'
                    : 'Enter fullscreen (F)'
                }
                className="h-9 w-9 p-0"
              >
                {isFullscreen ? (
                  <Minimize className="size-4" />
                ) : (
                  <Maximize className="size-4" />
                )}
              </Button>
              <a href={pdfUrl} target="_blank" rel="noreferrer">
                <Button variant={'secondary'} title="Download PDF">
                  <Download className="size-4" />
                  <span className="ml-2 hidden sm:inline">Download as PDF</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Viewer container */}
      <div ref={containerRef} className="min-h-0 flex-1 overflow-hidden">
        {loading && (
          <div
            className={`flex h-full items-center justify-center gap-2 ${
              isFullscreen ? 'text-white' : 'text-muted-foreground'
            }`}
          >
            <Loader2 className="size-5 animate-spin" />
            {pdfUrl?.startsWith('http') ? 'Loading PDF...' : 'Loading PDF...'}
          </div>
        )}
        {error && !loading && (
          <div
            className={`flex h-full items-center justify-center text-sm ${
              isFullscreen ? 'text-red-400' : 'text-red-500'
            }`}
          >
            {error}
          </div>
        )}
        {!loading && !error && pages.length > 0 && (
          <div className="relative flex h-full w-full items-center justify-center shadow-2xl">
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
                <div
                  key={idx}
                  className="bg-background flex items-center justify-center"
                >
                  <Image
                    src={src}
                    alt={`Page ${idx + 1}`}
                    className="h-full max-h-full w-full max-w-full object-contain"
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
          <>
            {/* Main navigation controls */}
            <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform group-hover:opacity-100 sm:opacity-0">
              <div
                className={`flex items-center gap-2 rounded-full border px-2 py-2 shadow-lg backdrop-blur-sm ${
                  isFullscreen
                    ? 'border-neutral-700 bg-black/80'
                    : 'bg-background/90'
                }`}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 0}
                  className={`rounded-full p-2 ${
                    isFullscreen ? 'text-white hover:bg-neutral-800' : ''
                  }`}
                >
                  <ChevronLeft className="size-5" />
                </Button>

                <div
                  className={`min-w-[80px] px-2 text-center text-sm font-medium ${
                    isFullscreen ? 'text-white' : ''
                  }`}
                >
                  {currentPage + 1} / {totalPages}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={currentPage >= totalPages - 1}
                  className={`rounded-full p-2 ${
                    isFullscreen ? 'text-white hover:bg-neutral-800' : ''
                  }`}
                >
                  <ChevronRight className="size-5" />
                </Button>
              </div>
            </div>

            {/* Fullscreen controls - only show in fullscreen */}
            {isFullscreen && (
              <div className="fixed top-6 right-6 z-50">
                <div className="flex items-center gap-2 rounded-full border border-neutral-700 bg-black/80 px-2 py-2 shadow-lg backdrop-blur-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFullscreen}
                    title="Exit fullscreen (F or Esc)"
                    className="hover:text-background rounded-full p-2 text-white hover:bg-neutral-800"
                  >
                    <Minimize className="size-4" />
                  </Button>
                  <a href={pdfUrl} target="_blank" rel="noreferrer">
                    <Button
                      variant="ghost"
                      size="sm"
                      title="Download PDF"
                      className="hover:text-background rounded-full p-2 text-white hover:bg-neutral-800"
                    >
                      <Download className="size-4" />
                    </Button>
                  </a>
                </div>
              </div>
            )}
            {/* Keyboard shortcuts help - only show in fullscreen */}
            {isFullscreen && showShortcuts && (
              <div className="fixed top-6 left-6 z-50">
                <div className="rounded-lg border border-neutral-700 bg-black/90 p-4 text-white shadow-lg backdrop-blur-sm">
                  <h3 className="mb-2 text-sm font-semibold">
                    Keyboard Shortcuts
                  </h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between gap-4">
                      <span>Navigate:</span>
                      <span className="text-neutral-300">← → ↑ ↓</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Exit fullscreen:</span>
                      <span className="text-neutral-300">F or Esc</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Home:</span>
                      <span className="text-neutral-300">Home</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader2 className="size-6 animate-spin" />
        </div>
      }
    >
      <PDFViewer />
    </Suspense>
  );
}
