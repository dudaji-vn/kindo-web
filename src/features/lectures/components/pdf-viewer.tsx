'use client';

import { Button } from '@/components/ui/button';
import { useGetLecture } from '@/features/lectures/hooks/use-get-lecture';
import { useGetLesson } from '@/features/lessons/hooks/use-get-lesson';
import { useDetectAppleDevice } from '@/hooks/use-detect-apple-device';
import { cn } from '@/lib/utils';
import { usePdf } from '@mikecousins/react-pdf';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Maximize,
  Minimize,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export function ReactPDFViewer() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation(['common']);
  const lectureId = params.id;
  const { data } = useGetLecture(lectureId ?? '');
  const { data: lesson } = useGetLesson(data?.lesson_id);

  const [pdfUrl, setPdfUrl] = useState<string | undefined>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(
    null,
  );
  const { isIOS } = useDetectAppleDevice();
  const INACTIVITY_MS = 2000; // 3s inactivity hides controls
  const MIN_SWIPE_DISTANCE = 50;
  useEffect(() => {
    if (data?.file_url) setPdfUrl(data.file_url);
  }, [data]);

  const { pdfDocument } = usePdf({
    file: pdfUrl || '',
    page,
    canvasRef,
  });
  const numPages = useMemo(() => pdfDocument?.numPages || 0, [pdfDocument]);

  const goHome = useCallback(() => router.push('/lectures'), [router]);

  const toggleFullscreen = useCallback(() => {
    if (isIOS) return; // Prevent attempting fullscreen on iOS (not supported reliably)
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
  }, [isIOS, setIsFullscreen, setShowShortcuts]);

  const goToNextPage = useCallback(() => {
    setPage((p) => (numPages && p < numPages ? p + 1 : p));
  }, [numPages]);

  const goToPreviousPage = useCallback(() => {
    setPage((p) => (p > 1 ? p - 1 : p));
  }, []);
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!(
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        (
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        )
      );
      setIsFullscreen(isNowFullscreen);
      if (!isNowFullscreen) {
        setShowShortcuts(false);
      }
    };

    // Add event listeners for all vendor prefixes
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'MSFullscreenChange',
        handleFullscreenChange,
      );
    };
  }, []);
  const canPrev = page > 1;
  const canNext = page < numPages;

  const handleDownload = useCallback(async () => {
    if (!pdfUrl || downloading) return;
    try {
      setDownloading(true);
      // Build filename
      const baseName = (data?.title || lesson?.title || 'document')
        .toLowerCase()
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
      const filename = baseName.endsWith('.pdf') ? baseName : baseName + '.pdf';

      // For iOS Safari we rely on the proxy forcing attachment (cannot programmatically set download reliably)
      const effectiveUrl = `/api/pdf-proxy?url=${encodeURIComponent(pdfUrl)}&filename=${encodeURIComponent(filename)}`;

      // Detect Safari (including Chrome on iOS which is still WebKit) vs other browsers
      const ua = navigator.userAgent;
      const isSafariEngine =
        /Safari\//.test(ua) && !/Chrome\//.test(ua) && !/Chromium\//.test(ua);
      const useDirectBlob = !isIOS && !isSafariEngine; // other browsers can use blob for better naming

      if (useDirectBlob) {
        const resp = await fetch(pdfUrl, { mode: 'cors' });
        if (!resp.ok) throw new Error('Failed to fetch file');
        const blob = await resp.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 4000);
      } else {
        // Navigate via hidden iframe to trigger native download prompt without opening a new tab
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = effectiveUrl;
        document.body.appendChild(iframe);
        // Cleanup later
        setTimeout(() => iframe.remove(), 10000);
      }
    } catch (e) {
      console.error('Download failed', e);
      try {
        window.open(pdfUrl, '_blank', 'noopener');
      } catch {}
    } finally {
      setDownloading(false);
    }
  }, [pdfUrl, downloading, data?.title, lesson?.title, isIOS]);

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(
      () => setShowControls(false),
      INACTIVITY_MS,
    );
  }, []);

  const showAndScheduleHide = useCallback(() => {
    setShowControls(true);
    scheduleHide();
  }, [scheduleHide]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > MIN_SWIPE_DISTANCE;
    const isRightSwipe = distanceX < -MIN_SWIPE_DISTANCE;

    // Only trigger if horizontal swipe is more significant than vertical
    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      if (isLeftSwipe && canNext) {
        goToNextPage();
      } else if (isRightSwipe && canPrev) {
        goToPreviousPage();
      }
    }
  }, [touchStart, touchEnd, canNext, canPrev, goToNextPage, goToPreviousPage]);

  useEffect(() => {
    // initial schedule
    scheduleHide();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [scheduleHide]);

  // When page changes, keep controls visible briefly again
  useEffect(() => {
    showAndScheduleHide();
  }, [page, showAndScheduleHide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToPreviousPage();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goHome();
      } else if (!isIOS && (e.key === 'f' || e.key === 'F11')) {
        e.preventDefault();
        toggleFullscreen();
      } else if (!isIOS && e.key === 'Escape' && isFullscreen) {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    goToPreviousPage,
    goToNextPage,
    goHome,
    toggleFullscreen,
    isFullscreen,
    isIOS,
  ]);

  return (
    <div
      className={`flex h-screen flex-col ${isFullscreen ? 'bg-black' : 'bg-neutral-100'} select-none`}
    >
      {/* Top Bar */}
      {isFullscreen && showControls && !isIOS && (
        <div
          className={cn(
            'absolute top-5 right-5 items-center gap-2 rounded-full border shadow-lg backdrop-blur-sm',
            isFullscreen
              ? 'border-neutral-700 bg-black/80'
              : 'bg-background/90',
          )}
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleFullscreen}
            className={cn(
              'rounded-full p-3',
              isFullscreen &&
                'text-white hover:bg-neutral-800 hover:text-white',
            )}
            title={t('PDF_VIEWER.EXIT_FULLSCREEN')}
          >
            <Minimize className="size-5 text-white" />
          </Button>
        </div>
      )}
      {!isFullscreen && (
        <div className="border-b bg-white/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <Button variant="ghost" className="h-9 px-2" onClick={goHome}>
                <ArrowLeft className="mr-1 size-4" />{' '}
                <span className="hidden sm:inline">{t('PDF_VIEWER.BACK')}</span>
              </Button>
              <div className="flex min-w-0 flex-col">
                <span className="text-muted-foreground text-[10px] tracking-wide uppercase">
                  {t('PDF_VIEWER.READING_LABEL')}
                </span>
                <span className="max-w-[200px] truncate text-sm font-medium sm:max-w-[360px]">
                  {data?.title ||
                    (lesson &&
                      `Lesson ${lesson.order_index} - ${lesson.title}`) ||
                    t('PDF_VIEWER.UNTITLED')}
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center justify-end gap-2">
              {!isIOS && (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={toggleFullscreen}
                  title={
                    isFullscreen
                      ? t('PDF_VIEWER.EXIT_FULLSCREEN')
                      : t('PDF_VIEWER.FULLSCREEN')
                  }
                >
                  {isFullscreen ? (
                    <Minimize className="size-4" />
                  ) : (
                    <Maximize className="size-4" />
                  )}
                </Button>
              )}
              {pdfUrl && (
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={downloading}
                  onClick={handleDownload}
                  title={t('PDF_VIEWER.DOWNLOAD')}
                >
                  {downloading ? (
                    <Loader2 className="mr-1 size-4 animate-spin" />
                  ) : (
                    <Download className="mr-1 size-4" />
                  )}
                  <span className="hidden sm:inline">
                    {downloading
                      ? t('PDF_VIEWER.DOWNLOADING')
                      : t('PDF_VIEWER.DOWNLOAD')}
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Viewer Area */}
      <div
        className={cn(
          'flex h-full items-center justify-center select-none',
          !isFullscreen && 'p-5',
        )}
        onMouseMove={showAndScheduleHide}
        onTouchStart={(e) => {
          showAndScheduleHide();
          handleTouchStart(e);
        }}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={showAndScheduleHide}
        tabIndex={0} // allow key events when focused
        role="application"
        aria-label="PDF document viewer"
      >
        {!pdfUrl && (
          <div className="text-muted-foreground flex h-full w-full items-center justify-center gap-2">
            <Loader2 className="size-5 animate-spin" />{' '}
            {t('PDF_VIEWER.LOADING')}
          </div>
        )}
        {pdfUrl && (
          <div>
            <canvas
              ref={canvasRef}
              className={
                isFullscreen
                  ? 'max-h-screen w-full'
                  : 'max-h-[calc(100dvh-100px)] w-full'
              }
              draggable={false}
            />
          </div>
        )}
        {page > 0 && (
          <div
            className={cn(
              'absolute bottom-10 mt-4 flex flex-wrap items-center justify-center gap-2 transition-opacity duration-300',
              showControls ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          >
            <div
              className={cn(
                'flex items-center gap-2 rounded-full border px-2 py-2 shadow-lg backdrop-blur-sm',
                isFullscreen
                  ? 'border-neutral-700 bg-black/80'
                  : 'bg-background/90',
              )}
              onMouseMove={showAndScheduleHide}
            >
              <Button
                variant="ghost"
                size="sm"
                disabled={!canPrev}
                onClick={() => canPrev && setPage((p) => p - 1)}
                className={cn(
                  'rounded-full p-2',
                  isFullscreen &&
                    'text-white hover:bg-neutral-800 hover:text-white',
                )}
              >
                <ChevronLeft className="size-5" />
              </Button>
              <div
                className={cn(
                  'min-w-[80px] px-2 text-center text-sm font-medium',
                  isFullscreen && 'text-white hover:text-white',
                )}
              >
                {page} / {numPages}
              </div>
              <Button
                variant="ghost"
                size="sm"
                disabled={!canNext}
                onClick={() => canNext && setPage((p) => p + 1)}
                className={cn(
                  'group rounded-full p-2',
                  isFullscreen &&
                    'text-white hover:bg-neutral-800 hover:text-white',
                )}
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>{' '}
            {/* Keyboard shortcuts help - only show in fullscreen */}
            {isFullscreen && showShortcuts && (
              <div className="fixed top-6 left-6 z-50">
                <div className="rounded-lg border border-neutral-700 bg-black/90 p-4 text-white shadow-lg backdrop-blur-sm">
                  <h3 className="mb-2 text-sm font-semibold">
                    {t('PDF_VIEWER.SHORTCUTS_TITLE')}
                  </h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between gap-4">
                      <span>{t('PDF_VIEWER.SHORTCUT_NAVIGATE')}</span>
                      <span className="text-neutral-300">← → ↑ ↓</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>{t('PDF_VIEWER.SHORTCUT_SWIPE')}</span>
                      <span className="text-neutral-300">← →</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>{t('PDF_VIEWER.SHORTCUT_EXIT_FULLSCREEN')}</span>
                      <span className="text-neutral-300">F or Esc</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>{t('PDF_VIEWER.SHORTCUT_HOME')}</span>
                      <span className="text-neutral-300">Home</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReactPDFViewer;
