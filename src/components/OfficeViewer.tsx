import { useEffect, useRef, useState } from 'react';
import { math } from '@silurus/ooxml/math';
import { PptxScrollViewer } from '@silurus/ooxml/pptx';
import { DocxScrollViewer } from '@silurus/ooxml/docx';
import { ReaderToolbar } from './ReaderToolbar';

interface OfficeViewerProps {
  sourceUrl: string;
  format: 'pptx' | 'docx';
  page: number;
  onPageChange: (page: number) => void;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'The original file could not be displayed.';
}

export function OfficeViewer({ sourceUrl, format, page, onPageChange }: OfficeViewerProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<PptxScrollViewer | DocxScrollViewer | null>(null);
  const onPageChangeRef = useRef(onPageChange);
  const requestedPageRef = useRef(page);
  const initialTargetReached = useRef(false);
  const sourceKeyRef = useRef(`${format}\0${sourceUrl}`);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const itemLabel = format === 'pptx' ? 'Slide' : 'Page';

  if (sourceKeyRef.current !== `${format}\0${sourceUrl}`) {
    sourceKeyRef.current = `${format}\0${sourceUrl}`;
    initialTargetReached.current = false;
  }
  requestedPageRef.current = page;

  useEffect(() => { onPageChangeRef.current = onPageChange; }, [onPageChange]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let alive = true;
    setTotalPages(0);
    setError('');
    initialTargetReached.current = false;

    const reportPage = (index: number, total: number, layoutComplete: boolean) => {
      if (!alive) return;
      setTotalPages(total);
      if (total <= 0) return;
      const visiblePage = Math.min(Math.max(index + 1, 1), total);
      const requestedPage = layoutComplete
        ? Math.min(Math.max(requestedPageRef.current, 1), total)
        : Math.max(requestedPageRef.current, 1);
      if (!initialTargetReached.current) {
        if (visiblePage !== requestedPage) return;
        initialTargetReached.current = true;
      }
      onPageChangeRef.current(visiblePage);
    };
    const reportError = (reason: Error) => {
      if (alive) setError(errorMessage(reason));
    };

    const viewer = format === 'pptx'
      ? new PptxScrollViewer(host, {
          math,
          onVisibleSlideChange: (index, total, layoutComplete) => reportPage(index, total, layoutComplete),
          onError: reportError,
          background: '#e7e6de',
          pageShadow: '0 2px 12px rgb(35 45 40 / 16%)',
          enableTextSelection: true,
        })
      : new DocxScrollViewer(host, {
          math,
          onVisiblePageChange: (index, total, layoutComplete) => reportPage(index, total, layoutComplete),
          onError: reportError,
          background: '#e7e6de',
          pageShadow: '0 2px 12px rgb(35 45 40 / 16%)',
          enableTextSelection: true,
        });
    viewerRef.current = viewer;

    void viewer.load(sourceUrl).then(() => {
      if (!alive) return;
      const total = format === 'pptx'
        ? (viewer as PptxScrollViewer).slideCount
        : (viewer as DocxScrollViewer).pageCount;
      setTotalPages(total);
    }).catch((reason: unknown) => {
      reportError(reason instanceof Error ? reason : new Error(errorMessage(reason)));
    });

    return () => {
      alive = false;
      viewer.destroy();
      viewerRef.current = null;
    };
  }, [format, sourceUrl]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !totalPages) return;
    const targetIndex = Math.min(Math.max(page, 1), totalPages) - 1;
    if (format === 'pptx') {
      const pptxViewer = viewer as PptxScrollViewer;
      if (pptxViewer.topVisibleSlide !== targetIndex) pptxViewer.scrollToSlide(targetIndex, { behavior: 'smooth' });
    } else {
      const docxViewer = viewer as DocxScrollViewer;
      if (docxViewer.topVisiblePage !== targetIndex) docxViewer.scrollToPage(targetIndex, { behavior: 'smooth' });
    }
  }, [format, page, totalPages]);

  return (
    <div className={`source-viewer source-viewer--office source-viewer--${format}`}>
      <ReaderToolbar page={page} totalPages={totalPages} itemLabel={itemLabel} onPageChange={onPageChange} />
      <div className="office-scroll-host" ref={hostRef} aria-label={`Original ${format.toUpperCase()} ${format === 'pptx' ? 'slides' : 'pages'}`} />
      {error && (
        <div className="source-viewer-message source-viewer-message--error source-viewer-message--overlay" role="alert">
          <strong>We couldn’t display this {format.toUpperCase()} file.</strong>
          <span>{error}</span>
          <a href={`${sourceUrl}?download=1`}>Download the original file</a>
        </div>
      )}
      {!error && totalPages === 0 && <div className="source-viewer-message source-viewer-message--overlay">Opening the original {format.toUpperCase()}…</div>}
    </div>
  );
}
