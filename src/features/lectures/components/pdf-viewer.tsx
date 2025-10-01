"use client";

import { Button } from '@/components/ui/button';
import { useGetLecture } from '@/features/lectures/hooks/use-get-lecture';
import { useGetLesson } from '@/features/lessons/hooks/use-get-lesson';
import { cn } from '@/lib/utils';
import { usePdf } from '@mikecousins/react-pdf';
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Loader2, Maximize, Minimize } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';


export function ReactPDFViewer() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
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
  const INACTIVITY_MS = 500; // 3s inactivity hides controls
  useEffect(() => {
    if (data?.file_url) setPdfUrl(data.file_url);
  }, [data]);


  const { pdfDocument } = usePdf({
    file: pdfUrl || '',
    page,
    canvasRef,
  });
  const numPages = useMemo(() => pdfDocument?.numPages || 0, [pdfDocument])


  const goHome = useCallback(() => router.push('/lectures'), [router]);

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
  }, [setIsFullscreen,
setShowShortcuts]);

  const goToNextPage = useCallback(() => {
    setPage(p => (numPages && p < numPages ? p + 1 : p));
  }, [numPages]);

  const goToPreviousPage = useCallback(() => {
    setPage(p => (p > 1 ? p - 1 : p));
  }, []);
  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  const canPrev = page > 1;
  const canNext = page < numPages;

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowControls(false), INACTIVITY_MS);
  }, []);

  const showAndScheduleHide = useCallback(() => {
    setShowControls(true);
    scheduleHide();
  }, [scheduleHide]);

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

  return (
    <div className={`flex h-screen flex-col ${isFullscreen ? 'bg-black' : 'bg-neutral-100'} select-none`}>
      {/* Top Bar */}
      {!isFullscreen && (
        <div className="border-b bg-white/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Button variant="ghost" className="h-9 px-2" onClick={goHome}>
                <ArrowLeft className="mr-1 size-4" /> <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Reading</span>
                <span className="truncate text-sm font-medium max-w-[200px] sm:max-w-[360px]">
                  {data?.title || (lesson && `Lesson ${lesson.order_index} - ${lesson.title}`) || 'Untitled'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              <Button size="icon" variant="outline" onClick={toggleFullscreen} title={isFullscreen ? 'Exit fullscreen (f)' : 'Fullscreen (f)'}>
                {isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
              </Button>
              {pdfUrl && (
                <a href={pdfUrl} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="secondary">
                    <Download className="mr-1 size-4" /> <span className="hidden sm:inline">Download as PDF</span>
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Viewer Area */}
      <div
        className={cn("flex h-full flex-col items-center justify-center select-none", !isFullscreen && "p-5")}
        onMouseMove={showAndScheduleHide}
        onTouchStart={showAndScheduleHide}
        onKeyDown={showAndScheduleHide}
        tabIndex={0} // allow key events when focused
        role="application"
        aria-label="PDF document viewer"
      >
        {(!pdfUrl) && (
          <div className="flex h-full w-full items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" /> Loading PDF...
          </div>
        )}
        {pdfUrl && (
          <div className="relative group flex flex-col items-center">
            <canvas
              ref={canvasRef}
              className={isFullscreen ? "max-h-screen w-full" : 'w-full max-h-[calc(100dvh-100px)]'}
              draggable={false}
               />
          </div>
        )}
        {page > 0 && (
          <div
            className={cn(
              "mt-4 flex flex-wrap items-center gap-2 justify-center absolute bottom-10 transition-opacity duration-300",
              showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <div
              className={cn(
                "flex items-center gap-2 rounded-full border px-2 py-2 shadow-lg backdrop-blur-sm",
                isFullscreen ? "border-neutral-700 bg-black/80" : "bg-background/90"
              )}
              onMouseMove={showAndScheduleHide}
            >
              <Button
                variant="ghost"
                size="sm"
                disabled={!canPrev}
                onClick={() => canPrev && setPage((p) => p - 1)}
                className={cn("rounded-full p-2", isFullscreen && "text-white hover:text-white hover:bg-neutral-800")}
              >
                <ChevronLeft className="size-5" />
              </Button>
              <div
                className={cn(
                  "min-w-[80px] px-2 text-center text-sm font-medium",
                  isFullscreen && "text-white hover:text-white"
                )}
              >
                {page} / {numPages}
              </div>
              <Button
                variant="ghost"
                size="sm"
                disabled={!canNext}
                onClick={() => canNext && setPage((p) => p + 1)}
                className={cn("rounded-full group p-2", isFullscreen && "text-white hover:text-white hover:bg-neutral-800")}
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>  {/* Keyboard shortcuts help - only show in fullscreen */}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default ReactPDFViewer;

