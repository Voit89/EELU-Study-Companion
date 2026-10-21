/// <reference types="vite/client" />
import { useEffect, useRef, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { ReaderToolbar } from './ReaderToolbar';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

interface PdfViewerProps {
  sourceUrl: string;
  page: number;
  onPageChange: (page: number) => void;
}

interface PdfTextStatus {
  status: 'ready' | 'error';
  text: string;
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'The PDF could not be displayed.';
}

export function PdfViewer({ sourceUrl, page, onPageChange }: PdfViewerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef(new Map<number, HTMLElement>());
  const canvases = useRef(new Map<number, HTMLCanvasElement>());
  const activeRenders = useRef(new Map<number, RenderTask>());
  const pendingRenders = useRef(new Set<number>());
  const renderPageRef = useRef<(index: number) => void>(() => {});
  const containerWidthRef = useRef(0);
  const visiblePages = useRef(new Set<number>());
  const documentRef = useRef<PDFDocumentProxy | null>(null);
  const onPageChangeRef = useRef(onPageChange);
  const lastReportedPage = useRef(0);
  const requestedPageRef = useRef(page);
  const initialTargetReached = useRef(false);
  const suppressPageReports = useRef(false);
  const sourceKeyRef = useRef(sourceUrl);
  const measuredLayoutWidthRef = useRef(0);
  const [documentProxy, setDocumentProxy] = useState<PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [visiblePageIndices, setVisiblePageIndices] = useState<number[]>([]);
  const [pageTexts, setPageTexts] = useState<Record<number, PdfTextStatus>>({});
  const [containerWidth, setContainerWidth] = useState(0);
  const [pageLayoutReady, setPageLayoutReady] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [renderErrors, setRenderErrors] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  if (sourceKeyRef.current !== sourceUrl) {
    sourceKeyRef.current = sourceUrl;
    initialTargetReached.current = false;
    lastReportedPage.current = 0;
    visiblePages.current.clear();
    measuredLayoutWidthRef.current = 0;
  }
  requestedPageRef.current = page;
  containerWidthRef.current = containerWidth;

  useEffect(() => { onPageChangeRef.current = onPageChange; }, [onPageChange]);

  useEffect(() => {
    let alive = true;
    let loadingTask: ReturnType<typeof pdfjs.getDocument> | null = null;
    setLoading(true);
    setLoadError('');
    setRenderErrors({});
    setPageCount(0);
    setVisiblePageIndices([]);
    setPageTexts({});
    setDocumentProxy(null);
    setPageLayoutReady(false);
    measuredLayoutWidthRef.current = 0;
    documentRef.current = null;
    visiblePages.current.clear();
    initialTargetReached.current = false;
    lastReportedPage.current = 0;
    for (const canvas of canvases.current.values()) canvas.dataset.renderedWidth = '';
    for (const frame of pageRefs.current.values()) frame.style.minHeight = '';

    try {
      loadingTask = pdfjs.getDocument({ url: sourceUrl, disableRange: true });
    } catch (error) {
      setLoadError(errorMessage(error));
      setLoading(false);
      return;
    }

    void loadingTask.promise.then((document) => {
      if (!alive) {
        void loadingTask?.destroy();
        return;
      }
      documentRef.current = document;
      setDocumentProxy(document);
      setPageCount(document.numPages);
      setLoading(false);
    }).catch((error: unknown) => {
      if (!alive) return;
      setLoadError(errorMessage(error));
      setLoading(false);
    });

    return () => {
      alive = false;
      for (const task of activeRenders.current.values()) task.cancel();
      activeRenders.current.clear();
      const document = documentRef.current;
      documentRef.current = null;
      if (document || loadingTask) void loadingTask?.destroy();
    };
  }, [sourceUrl]);

  useEffect(() => {
    const host = scrollRef.current;
    if (!host) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const width = Math.round(entries[0]?.contentRect.width ?? 0);
      setContainerWidth((current) => current === width ? current : width);
    });
    resizeObserver.observe(host);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const loadedDocument = documentProxy;
    if (!loadedDocument || !pageCount || !containerWidth) return;
    let alive = true;
    measuredLayoutWidthRef.current = 0;
    setPageLayoutReady(false);

    const targetWidth = Math.max(160, Math.min(1_100, containerWidth - 30));
    void Promise.all(Array.from({ length: pageCount }, async (_, index) => {
      try {
        const pdfPage = await loadedDocument.getPage(index + 1);
        const baseViewport = pdfPage.getViewport({ scale: 1 });
        const viewport = pdfPage.getViewport({ scale: targetWidth / baseViewport.width });
        return { index, minHeight: Math.max(520, Math.ceil(viewport.height)) };
      } catch {
        return null;
      }
    })).then((measurements) => {
      if (!alive || documentRef.current !== loadedDocument) return;
      for (const measurement of measurements) {
        if (!measurement) continue;
        const frame = pageRefs.current.get(measurement.index);
        if (frame) frame.style.minHeight = `${measurement.minHeight}px`;
      }
      measuredLayoutWidthRef.current = containerWidth;
      setPageLayoutReady(true);
    });

    return () => { alive = false; };
  }, [containerWidth, documentProxy, pageCount]);

  useEffect(() => {
    const host = scrollRef.current;
    if (!host || !pageCount) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const index = Number((entry.target as HTMLElement).dataset.pageIndex);
        if (!Number.isInteger(index)) continue;
        if (entry.isIntersecting) visiblePages.current.add(index);
        else visiblePages.current.delete(index);
      }
      const nextVisibleIndices = [...visiblePages.current].sort((left, right) => left - right);
      setVisiblePageIndices((current) => current.length === nextVisibleIndices.length && current.every((value, index) => value === nextVisibleIndices[index])
        ? current
        : nextVisibleIndices);
      if (measuredLayoutWidthRef.current !== containerWidthRef.current) return;

      const currentVisible = [...visiblePages.current]
        .map((index) => ({ index, element: pageRefs.current.get(index) }))
        .filter((item): item is { index: number; element: HTMLElement } => Boolean(item.element));
      currentVisible.sort((left, right) => {
        const leftTop = left.element.getBoundingClientRect().top;
        const rightTop = right.element.getBoundingClientRect().top;
        const hostTop = host.getBoundingClientRect().top;
        const leftDistance = leftTop >= hostTop ? leftTop - hostTop : Math.abs(leftTop - hostTop) + 1_000;
        const rightDistance = rightTop >= hostTop ? rightTop - hostTop : Math.abs(rightTop - hostTop) + 1_000;
        return leftDistance - rightDistance;
      });
      const nextPage = currentVisible[0]?.index;
      const targetPage = Math.min(Math.max(requestedPageRef.current, 1), pageCount);
      if (suppressPageReports.current) {
        if (nextPage !== undefined && nextPage + 1 === targetPage) {
          suppressPageReports.current = false;
        }
        return;
      }
      if (!initialTargetReached.current) {
        if (nextPage !== targetPage - 1) return;
        initialTargetReached.current = true;
      }
      if (nextPage !== undefined && lastReportedPage.current !== nextPage + 1) {
        lastReportedPage.current = nextPage + 1;
        onPageChangeRef.current(nextPage + 1);
      }
    }, { root: host, threshold: [0, 0.2, 0.55] });

    pageRefs.current.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pageCount]);

  useEffect(() => {
    if (!pageCount || measuredLayoutWidthRef.current !== containerWidth) return;
    const safePage = Math.min(Math.max(page, 1), pageCount);
    suppressPageReports.current = true;
    pageRefs.current.get(safePage - 1)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const timer = window.setTimeout(() => { suppressPageReports.current = false; }, 1_200);
    return () => window.clearTimeout(timer);
  }, [containerWidth, page, pageCount, pageLayoutReady]);

  useEffect(() => {
    const loadedDocument = documentProxy;
    if (!loadedDocument) return;
    let alive = true;
    setPageTexts({});

    void (async () => {
      for (let index = 0; index < loadedDocument.numPages; index += 1) {
        try {
          const pdfPage = await loadedDocument.getPage(index + 1);
          const content = await pdfPage.getTextContent();
          if (!alive || documentRef.current !== loadedDocument) return;
          const text = content.items
            .map((item) => 'str' in item ? `${item.str}${item.hasEOL ? '\n' : ' '}` : '')
            .join('')
            .replace(/[ \t]+/g, ' ')
            .replace(/ *\n */g, '\n')
            .trim();
          setPageTexts((current) => ({ ...current, [index]: { status: 'ready', text } }));
        } catch {
          if (!alive || documentRef.current !== loadedDocument) return;
          setPageTexts((current) => ({ ...current, [index]: { status: 'error', text: '' } }));
        }
      }
    })();

    return () => { alive = false; };
  }, [documentProxy]);

  useEffect(() => {
    const loadedDocument = documentProxy;
    if (!loadedDocument || !containerWidth || !pageLayoutReady || measuredLayoutWidthRef.current !== containerWidth || !visiblePageIndices.length) return;

    async function renderVisiblePage(index: number) {
      const canvas = canvases.current.get(index);
      const frame = pageRefs.current.get(index);
      if (!canvas || !frame) return;
      if (documentRef.current !== loadedDocument) return;
      const targetWidth = Math.max(160, Math.min(1_100, containerWidth - 30));
      if (canvas.dataset.renderedWidth === String(targetWidth)) return;
      // Reserve the page before awaiting getPage(). Intersection and resize
      // updates can both request it while that promise is still pending.
      if (activeRenders.current.has(index) || pendingRenders.current.has(index)) return;
      pendingRenders.current.add(index);

      setRenderErrors((current) => {
        if (!(index in current)) return current;
        const next = { ...current };
        delete next[index];
        return next;
      });

      try {
        const pdfPage = await loadedDocument!.getPage(index + 1);
        if (documentRef.current !== loadedDocument) return;
        if (!canvas.isConnected) return;
        const baseViewport = pdfPage.getViewport({ scale: 1 });
        const scale = targetWidth / baseViewport.width;
        const viewport = pdfPage.getViewport({ scale });
        const outputScale = Math.min(window.devicePixelRatio || 1, 2);
        const context = canvas.getContext('2d', { alpha: false });
        if (!context) throw new Error('This browser could not prepare a PDF drawing surface.');

        canvas.width = Math.ceil(viewport.width * outputScale);
        canvas.height = Math.ceil(viewport.height * outputScale);
        canvas.style.width = `${Math.ceil(viewport.width)}px`;
        canvas.style.height = `${Math.ceil(viewport.height)}px`;
        frame.style.minHeight = `${Math.max(520, Math.ceil(viewport.height))}px`;
        const task = pdfPage.render({
          canvas,
          canvasContext: context,
          viewport,
          transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0],
          background: '#ffffff',
        });
        activeRenders.current.set(index, task);
        await task.promise;
        if (activeRenders.current.get(index) === task) {
          activeRenders.current.delete(index);
          canvas.dataset.renderedWidth = String(targetWidth);
          const latestTargetWidth = Math.max(160, Math.min(1_100, containerWidthRef.current - 30));
          if (canvas.dataset.renderedWidth !== String(latestTargetWidth) && visiblePages.current.has(index)) {
            requestAnimationFrame(() => renderPageRef.current(index));
          }
        }
      } catch (error) {
        if (documentRef.current !== loadedDocument) return;
        if (error instanceof Error && error.name === 'RenderingCancelledException') return;
        setRenderErrors((current) => ({ ...current, [index]: errorMessage(error) }));
      } finally {
        pendingRenders.current.delete(index);
      }
    }

    renderPageRef.current = (index) => { void renderVisiblePage(index); };
    for (const index of visiblePageIndices) renderPageRef.current(index);
  }, [containerWidth, documentProxy, pageLayoutReady, visiblePageIndices]);

  useEffect(() => () => {
    for (const task of activeRenders.current.values()) task.cancel();
    activeRenders.current.clear();
  }, []);

  return (
    <div className="source-viewer source-viewer--pdf">
      <ReaderToolbar page={page} totalPages={pageCount} itemLabel="Page" onPageChange={(nextPage) => onPageChange(nextPage)} />
      {loadError ? (
        <div className="source-viewer-message source-viewer-message--error" role="alert">
          <strong>We couldn’t display this PDF.</strong>
          <span>{loadError}</span>
          <a href={`${sourceUrl}?download=1`}>Download the original PDF</a>
        </div>
      ) : (
        <div className="pdf-scroll-host" ref={scrollRef} aria-label="PDF pages">
          {pageCount > 0 && Array.from({ length: pageCount }, (_, index) => (
            <section
              className="pdf-page-frame"
              key={index}
              data-page-index={index}
              ref={(element) => {
                if (element) pageRefs.current.set(index, element);
                else pageRefs.current.delete(index);
              }}
              aria-label={`Page ${index + 1}`}
            >
              <canvas
                className="pdf-page-canvas"
                ref={(element) => {
                  if (element) canvases.current.set(index, element);
                  else canvases.current.delete(index);
                }}
                aria-hidden="true"
              />
              <div className="pdf-text-equivalent">
                <h2>Page {index + 1}</h2>
                {!pageTexts[index] && <p>Loading page text…</p>}
                {pageTexts[index]?.status === 'error' && <p>Text for this page could not be extracted.</p>}
                {pageTexts[index]?.status === 'ready' && (pageTexts[index].text
                  ? <p>{pageTexts[index].text}</p>
                  : <p>No selectable text was found on this page. It may contain scanned or image-only content.</p>)}
              </div>
              {renderErrors[index] && <div className="pdf-render-error" role="alert">Page {index + 1} could not be rendered: {renderErrors[index]}</div>}
            </section>
          ))}
          {loading && <div className="source-viewer-message">Opening the original PDF…</div>}
          {!loading && pageCount === 0 && !loadError && <div className="source-viewer-message">This PDF has no pages to show.</div>}
        </div>
      )}
    </div>
  );
}
