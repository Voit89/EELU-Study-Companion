/// <reference types="vite/client" />
import { lazy, Suspense, useState } from 'react';
import { ExternalLink, FileDown } from 'lucide-react';
import type { SourceAsset } from '../types/catalog';
import './SourceViewer.css';

const OfficeViewer = lazy(() => import('./OfficeViewer').then((module) => ({ default: module.OfficeViewer })));
const PdfViewer = lazy(() => import('./PdfViewer').then((module) => ({ default: module.PdfViewer })));

export interface SourceViewerProps {
  asset: SourceAsset;
  page: number;
  onPageChange: (page: number) => void;
}

function ImagePreview({ sourceUrl, displayName }: { sourceUrl: string; displayName: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="source-viewer source-viewer--image">
      <div className="image-preview-scroll">
        <img
          src={sourceUrl}
          alt={`Original image: ${displayName}`}
          data-failed={failed || undefined}
          onLoad={() => setFailed(false)}
          onError={() => setFailed(true)}
        />
        <p className="image-load-error" role="alert">This image could not be displayed. <a href={`${sourceUrl}?download=1`}>Download the original image</a>.</p>
      </div>
    </div>
  );
}

function UnsupportedPreview({ asset }: { asset: SourceAsset }) {
  const isLegacyPowerPoint = asset.extension.toLowerCase() === '.ppt';
  return (
    <div className="source-viewer source-viewer--unsupported">
      <div className="unsupported-card">
        <span className="unsupported-kicker">ORIGINAL FILE</span>
        <h2>{isLegacyPowerPoint ? 'This older PowerPoint format needs the original app.' : 'This file format can’t be previewed here yet.'}</h2>
        <p>
          {isLegacyPowerPoint
            ? 'The local viewer supports newer .pptx slides. Your .ppt file is preserved as it is; open it in PowerPoint or download it to view.'
            : `The local viewer can’t render ${asset.extension.toUpperCase()} files. You can still open or download the original without changing it.`}
        </p>
      </div>
    </div>
  );
}

function SourcePreview({ asset, page, onPageChange }: SourceViewerProps) {
  const loadingPreview = <div className="source-viewer source-viewer-message">Opening the local document viewer…</div>;
  switch (asset.extension.toLowerCase()) {
    case '.pdf':
      return <Suspense fallback={loadingPreview}><PdfViewer sourceUrl={asset.sourceUrl} page={page} onPageChange={onPageChange} /></Suspense>;
    case '.pptx':
      return <Suspense fallback={loadingPreview}><OfficeViewer sourceUrl={asset.sourceUrl} format="pptx" page={page} onPageChange={onPageChange} /></Suspense>;
    case '.docx':
      return <Suspense fallback={loadingPreview}><OfficeViewer sourceUrl={asset.sourceUrl} format="docx" page={page} onPageChange={onPageChange} /></Suspense>;
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.webp':
      return <ImagePreview key={asset.sourceUrl} sourceUrl={asset.sourceUrl} displayName={asset.displayName} />;
    default:
      return <UnsupportedPreview asset={asset} />;
  }
}

export function SourceViewer({ asset, page, onPageChange }: SourceViewerProps) {
  return (
    <div className="source-viewer-shell">
      <div className="source-original-actions" aria-label="Original file actions">
        <a href={asset.sourceUrl} target="_blank" rel="noreferrer">
          <ExternalLink size={13} /> Open original
        </a>
        <a href={`${asset.sourceUrl}?download=1`}>
          <FileDown size={13} /> Download original
        </a>
      </div>
      <SourcePreview asset={asset} page={page} onPageChange={onPageChange} />
    </div>
  );
}
