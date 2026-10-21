import { useMemo, useState } from 'react';
import { ArrowRightLeft, BookOpen, Check, CircleHelp, FileWarning, LoaderCircle, Search } from 'lucide-react';
import type { CatalogResponse, SourceAsset } from '../types/catalog';

type ComparisonStatus = 'same-file' | 'text-matches' | 'some-differences' | 'not-enough-readable-text';
interface ComparisonResult {
  status: ComparisonStatus;
  currentPageCount: number | null;
  archivePageCount: number | null;
  changedPages: number[];
  currentOnlyPages: number[];
  archiveOnlyPages: number[];
  unreadablePages: number[];
  comparedAs: 'sha256' | 'page-text' | 'slide-text' | 'unsupported';
  reason?: string;
}

function lectureNumber(name: string) {
  const match = name.match(/\b(?:lec(?:ture)?)[\s_-]*(\d+)/i) || name.match(/^\s*(\d+)\s+/i);
  return match ? Number(match[1]) : null;
}

function findCandidates(current: SourceAsset, assets: SourceAsset[]) {
  const number = lectureNumber(current.fileName);
  const sameCourse = assets.filter((asset) => asset.sourceType === 'archive' && asset.courseId === current.courseId && asset.kind !== 'section');
  const matched = number === null ? [] : sameCourse.filter((asset) => lectureNumber(asset.fileName) === number);
  const candidates = matched.length ? matched : sameCourse;
  return candidates.sort((a, b) => {
    const extMatch = Number(b.extension === current.extension) - Number(a.extension === current.extension);
    const numberMatch = Number(lectureNumber(b.fileName) === number) - Number(lectureNumber(a.fileName) === number);
    return numberMatch || extMatch || a.displayName.localeCompare(b.displayName);
  });
}

function pagesLabel(numbers: number[]) {
  return numbers.length ? numbers.join(', ') : '';
}

function StatusNote({ result }: { result: ComparisonResult }) {
  const unitName = result.comparedAs === 'slide-text' ? 'slides' : 'pages';
  if (result.status === 'same-file') return <div role="status" className="comparison-result comparison-result--match"><Check size={16} /><div><b>Same file</b><span>The file contents match byte for byte.</span></div></div>;
  if (result.status === 'text-matches') return <div role="status" className="comparison-result comparison-result--match"><Check size={16} /><div><b>Text matches</b><span>Extracted text and page/slide order match. Pictures, scanned writing, and diagrams were not compared.</span></div></div>;
  if (result.status === 'not-enough-readable-text') {
    const unreadable = result.unreadablePages.length ? `Some pages or slides have too little readable text (${pagesLabel(result.unreadablePages)}).` : '';
    const changed = result.changedPages.length ? ` Readable text also differs on: ${pagesLabel(result.changedPages)}.` : '';
    const counts = result.currentPageCount !== null && result.archivePageCount !== null ? `Current has ${result.currentPageCount} ${unitName}; older has ${result.archivePageCount}. ` : '';
    return <div role="status" className="comparison-result comparison-result--uncertain"><CircleHelp size={16} /><div><b>Not enough readable text</b><span>{counts}{result.reason || `${unreadable || 'The extracted text is incomplete.'} Compare the originals visually.`}{changed}</span></div></div>;
  }

  const pageWord = result.comparedAs === 'slide-text' ? 'slide' : 'page';
  const differences: string[] = [];
  if (result.changedPages.length) differences.push(`changed ${pageWord}s: ${pagesLabel(result.changedPages)}`);
  if (result.currentOnlyPages.length) differences.push(`new this year: ${pagesLabel(result.currentOnlyPages)}`);
  if (result.archiveOnlyPages.length) differences.push(`only in older file: ${pagesLabel(result.archiveOnlyPages)}`);
  if (result.unreadablePages.length) differences.push(`text unreadable on: ${pagesLabel(result.unreadablePages)}`);
  const counts = result.currentPageCount !== null && result.archivePageCount !== null ? `Current has ${result.currentPageCount} ${unitName}; older has ${result.archivePageCount}. ` : '';
  return <div role="status" className="comparison-result comparison-result--different"><FileWarning size={16} /><div><b>Some differences</b><span>{counts}{differences.join(' · ') || result.reason || 'Extracted text differs.'}</span></div></div>;
}

export function VersionComparison({ catalog, onOpen }: { catalog: CatalogResponse; onOpen: (asset: SourceAsset) => void }) {
  const currentAssets = useMemo(() => catalog.assets.filter((asset) => asset.sourceType === 'current').sort((a, b) => a.courseTitle.localeCompare(b.courseTitle) || a.displayName.localeCompare(b.displayName)), [catalog.assets]);
  const [selectedArchives, setSelectedArchives] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, ComparisonResult>>({});
  const [loadingId, setLoadingId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function runComparison(current: SourceAsset, archive: SourceAsset) {
    setLoadingId(current.id);
    setErrors((value) => ({ ...value, [current.id]: '' }));
    try {
      const query = new URLSearchParams({ current: current.id, archive: archive.id });
      const response = await fetch(`/api/compare?${query}`);
      const body = await response.json() as ComparisonResult | { error: string };
      if (!response.ok || 'error' in body) throw new Error('error' in body ? body.error : 'The files could not be compared.');
      setResults((value) => ({ ...value, [current.id]: body }));
    } catch (reason) {
      setErrors((value) => ({ ...value, [current.id]: reason instanceof Error ? reason.message : 'The files could not be compared.' }));
    } finally {
      setLoadingId('');
    }
  }

  if (!currentAssets.length) return null;
  return (
    <section className="comparison-section" id="compare-versions">
      <div className="comparison-heading"><div><span className="eyebrow eyebrow--muted">CURRENT MOODLE VS. OLDER COURSE FOLDER</span><h2>Check what changed<span className="heading-period">.</span></h2></div><span className="comparison-heading-mark"><ArrowRightLeft size={17} /></span></div>
      <p className="comparison-intro">Choose an older file for each Moodle download. The first suggestion uses the subject and lecture number in the filename; the label below comes from extracted text, not the title alone.</p>
      <div className="comparison-list">
        {currentAssets.map((current) => {
          const candidates = findCandidates(current, catalog.assets);
          const selectedId = selectedArchives[current.id] || candidates[0]?.id || '';
          const selectedArchive = catalog.assets.find((asset) => asset.id === selectedId) || null;
          const result = results[current.id];
          const isLoading = loadingId === current.id;
          return (
            <article className="comparison-card" key={current.id}>
              <div className="comparison-current"><div className="comparison-file-icon"><BookOpen size={16} /></div><div className="comparison-file-text"><span>THIS YEAR · {current.courseTitle}</span><b>{current.displayName}</b><small>{current.extension.replace('.', '').toUpperCase()} · Moodle download</small></div><button type="button" className="comparison-open" onClick={() => onOpen(current)}>Open</button></div>
              <div className="comparison-arrow"><ArrowRightLeft size={14} /><span>COMPARE WITH</span></div>
              <div className="comparison-older"><label htmlFor={`older-${current.id}`}>Older course file</label><div className="comparison-select-row"><select id={`older-${current.id}`} value={selectedId} onChange={(event) => { setSelectedArchives((value) => ({ ...value, [current.id]: event.target.value })); setResults((value) => { const next = { ...value }; delete next[current.id]; return next; }); setErrors((value) => ({ ...value, [current.id]: '' })); }}>
                {!candidates.length && <option value="">No suggested older match</option>}
                {candidates.map((asset) => <option key={asset.id} value={asset.id}>{asset.displayName} · {asset.extension.replace('.', '').toUpperCase()}</option>)}
              </select><button className="comparison-open" disabled={!selectedArchive} type="button" onClick={() => selectedArchive && onOpen(selectedArchive)}>Open</button></div>
              {lectureNumber(current.fileName) !== null && !catalog.assets.some((asset) => asset.sourceType === 'archive' && asset.courseId === current.courseId && asset.kind !== 'section' && lectureNumber(asset.fileName) === lectureNumber(current.fileName)) && candidates.length > 0 && <p className="comparison-no-match">No same-number lecture was found by filename. Choose another file only if you recognize it as the same topic.</p>}
              {candidates.length === 0 && <p className="comparison-no-match">No older file from this subject was found in the folders.</p>}
              <button className="compare-action" disabled={!selectedArchive || Boolean(loadingId)} type="button" onClick={() => selectedArchive && void runComparison(current, selectedArchive)}>{isLoading ? <><LoaderCircle size={14} className="spin" /> Reading the two files…</> : <><Search size={14} /> Compare readable text</>}</button>
              </div>
              {result && <StatusNote result={result} />}
              {errors[current.id] && <div className="comparison-error"><CircleHelp size={14} />{errors[current.id]}</div>}
            </article>
          );
        })}
      </div>
      <div className="comparison-reminder"><CircleHelp size={15} /><span>When your instructor uploads this year’s version, use that version as the authority for what will be taught or examined.</span></div>
    </section>
  );
}
