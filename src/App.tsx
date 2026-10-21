import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, LoaderCircle } from 'lucide-react';
import { CourseLibrary } from './components/CourseLibrary';
import { LessonReader } from './components/LessonReader';
import { SourceBadge } from './components/SourceBadge';
import { SourceViewer } from './components/SourceViewer';
import { allPracticeItems, allSectionCoverage, lessonBySourceKey } from './content/lessonIndex';
import { masterKeysByLessonId, pageGuidesByLessonId } from './content/masterKeys';
import { sourceKeyForAsset } from './content/sourceKey';
import type { CatalogResponse, SourceAsset } from './types/catalog';

function readerLocation() {
  const query = new URLSearchParams(window.location.search);
  const page = Number(query.get('page'));
  return {
    assetId: query.get('asset'),
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

export default function App() {
  const [catalog, setCatalog] = useState<CatalogResponse | null>(null);
  const [error, setError] = useState('');
  const initialLocation = readerLocation();
  const [selectedId, setSelectedId] = useState(initialLocation.assetId);
  const [selectedPage, setSelectedPage] = useState(initialLocation.page);
  const selectedAsset = useMemo(() => catalog?.assets.find((asset) => asset.id === selectedId) || null, [catalog, selectedId]);
  const lesson = useMemo(() => selectedAsset ? lessonBySourceKey.get(sourceKeyForAsset(selectedAsset)) || null : null, [selectedAsset]);
  const practiceMap = useMemo(() => new Map(allPracticeItems.map((item) => [item.id, item])), []);
  const masterKey = lesson ? masterKeysByLessonId[lesson.id] || null : null;
  const pageGuides = lesson ? pageGuidesByLessonId[lesson.id] || null : null;
  const lessonPractices = useMemo(
    () => allPracticeItems.filter((item) => item.lessonId === lesson?.id),
    [lesson?.id],
  );
  const selectedSourceKey = selectedAsset ? sourceKeyForAsset(selectedAsset) : '';
  const sectionPractices = useMemo(
    () => allPracticeItems.filter((item) => item.sectionSourceKey === selectedSourceKey),
    [selectedSourceKey],
  );
  const sectionCoverage = useMemo(
    () => allSectionCoverage.find((entry) => entry.sourceKey === selectedSourceKey) || null,
    [selectedSourceKey],
  );

  useEffect(() => {
    let alive = true;
    fetch('/api/catalog')
      .then(async (response) => {
        if (!response.ok) throw new Error('The course folders could not be read.');
        return await response.json() as CatalogResponse;
      })
      .then((value) => { if (alive) setCatalog(value); })
      .catch((reason: unknown) => { if (alive) setError(reason instanceof Error ? reason.message : 'Could not load your course folder.'); });
    const onPopState = () => {
      const location = readerLocation();
      setSelectedId(location.assetId);
      setSelectedPage(location.page);
    };
    window.addEventListener('popstate', onPopState);
    return () => { alive = false; window.removeEventListener('popstate', onPopState); };
  }, []);

  function openAsset(asset: SourceAsset) {
    setSelectedId(asset.id);
    setSelectedPage(1);
    window.history.pushState({}, '', `?asset=${encodeURIComponent(asset.id)}&page=1`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function closeReader() {
    setSelectedId(null);
    setSelectedPage(1);
    window.history.pushState({}, '', window.location.pathname);
  }

  function changeSourcePage(page: number) {
    if (!Number.isInteger(page) || page < 1) return;
    setSelectedPage(page);
    if (!selectedId) return;
    const query = new URLSearchParams({ asset: selectedId, page: String(page) });
    window.history.replaceState({}, '', `${window.location.pathname}?${query}`);
  }

  if (!catalog && !error) return <div className="loading-screen"><span className="loading-mark"><LoaderCircle size={23} /></span><b>Setting your study desk</b><span>Looking through the course folders…</span></div>;
  if (error) return <div className="error-screen"><div className="error-card"><BookOpen size={25} /><h1>The course folders aren’t connected</h1><p>{error} Keep “EELU Study Companion” beside the subject folders, then start it again.</p></div></div>;
  if (!catalog) return null;

  if (selectedAsset) {
    return (
      <div className="reader-shell">
        <header className="reader-topbar">
          <button className="back-button" onClick={closeReader} type="button"><ArrowLeft size={16} /> All subjects</button>
          <div className="reader-title-group"><span className="reader-course">{selectedAsset.courseTitle}</span><span className="reader-title-divider">/</span><strong>{selectedAsset.displayName}</strong></div>
          <SourceBadge type={selectedAsset.sourceType} compact />
        </header>
        <div className="reader-columns">
          <section className="source-pane">
            <div className="pane-label"><span className="pane-label-dot" /> ORIGINAL MATERIAL <span>{selectedAsset.extension.replace('.', '').toUpperCase()}</span></div>
            <SourceViewer asset={selectedAsset} page={selectedPage} onPageChange={changeSourcePage} />
          </section>
          <section className="lesson-pane">
            <div className="pane-label pane-label--lesson"><span className="lesson-label-icon">✳</span> YOUR EXPLANATION</div>
          <LessonReader
            asset={selectedAsset}
            lesson={lesson}
            sourcePage={selectedPage}
            onGoToSourcePage={changeSourcePage}
            practices={practiceMap}
            sectionPractices={sectionPractices}
            sectionCoverage={sectionCoverage}
            masterKey={masterKey}
            pageGuides={pageGuides}
            lessonPractices={lessonPractices}
          />
          </section>
        </div>
      </div>
    );
  }

  return <CourseLibrary catalog={catalog} onOpen={openAsset} />;
}
