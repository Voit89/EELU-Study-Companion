import { useMemo, useState, type CSSProperties } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpenText,
  ChevronDown,
  CircleHelp,
  FileText,
  GraduationCap,
  MonitorPlay,
  Search,
  Sparkles,
} from 'lucide-react';
import { COURSE_ACCENTS, COURSE_SHORT_NAMES } from '../content/courseLabels';
import type { CatalogResponse, SourceAsset } from '../types/catalog';
import { CoveragePanel } from './CoveragePanel';
import { SourceBadge } from './SourceBadge';
import { VersionComparison } from './VersionComparison';

type SourceFilter = 'all' | 'current' | 'archive';

function kindLabel(asset: SourceAsset) {
  if (asset.kind === 'section') return 'Section practice';
  if (asset.kind === 'unit') return 'Unit';
  if (asset.kind === 'lecture') return 'Lecture';
  return 'Course material';
}

function FileMark({ asset }: { asset: SourceAsset }) {
  const isSlide = asset.extension === '.ppt' || asset.extension === '.pptx';
  const Icon = isSlide ? MonitorPlay : FileText;
  return <Icon size={17} strokeWidth={1.7} aria-hidden="true" />;
}

export function CourseLibrary({ catalog, onOpen }: { catalog: CatalogResponse; onOpen: (asset: SourceAsset) => void }) {
  const [query, setQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');
  const [showSections, setShowSections] = useState(true);

  const visible = useMemo(() => {
    const search = query.trim().toLocaleLowerCase();
    return catalog.assets.filter((asset) => {
      const matchesSearch = !search || `${asset.fileName} ${asset.courseTitle} ${kindLabel(asset)}`.toLocaleLowerCase().includes(search);
      const matchesCourse = selectedCourse === 'all' || asset.courseId === selectedCourse;
      const matchesSource = sourceFilter === 'all' || asset.sourceType === sourceFilter;
      const matchesKind = showSections || asset.kind !== 'section';
      return matchesSearch && matchesCourse && matchesSource && matchesKind;
    });
  }, [catalog.assets, query, selectedCourse, sourceFilter, showSections]);

  const archiveAssets = catalog.assets.filter((asset) => asset.sourceType === 'archive');
  const currentCount = catalog.assets.filter((asset) => asset.sourceType === 'current').length;
  const lessonCount = archiveAssets.filter((asset) => asset.kind === 'lecture' || asset.kind === 'unit').length;
  const sectionCount = archiveAssets.filter((asset) => asset.kind === 'section').length;

  return (
    <div className="library-page">
      <header className="topbar">
        <button className="brand-lockup" type="button" onClick={() => { setSelectedCourse('all'); setQuery(''); }} aria-label="Back to all courses">
          <span className="brand-mark"><GraduationCap size={19} strokeWidth={1.8} /></span>
          <span className="brand-words"><b>EELU</b><small>STUDY COMPANION</small></span>
        </button>
        <div className="topbar-right">
          <span className="offline-indicator"><i /> Works on this computer</span>
          <button className="icon-button help-button" type="button" title="Study guide" aria-label="Study guide"><CircleHelp size={18} /></button>
        </div>
      </header>

      <main className="library-main">
        <section className="welcome-grid">
          <div className="welcome-copy">
            <div className="eyebrow"><span>FIRST SEMESTER</span><span className="eyebrow-rule" /><span>YOUR STUDY DESK</span></div>
            <h1>Understand the idea.<br /><em>Then solve it yourself.</em></h1>
            <p className="welcome-description">Your lecture beside a clear, page-linked explanation. Take each topic at your own pace, with the section questions close at hand.</p>
            <div className="welcome-actions">
              <a className="primary-button" href="#course-library">Choose a subject <ArrowDownRight size={16} /></a>
              <span className="welcome-note"><Sparkles size={14} /> No AI key · Your files stay local</span>
            </div>
          </div>
          <aside className="welcome-card" aria-label="Semester overview">
            <div className="welcome-card-top"><span className="small-cap">THE SEMESTER</span><span className="card-spark">✳</span></div>
            <div className="overview-number">{catalog.courses.length.toString().padStart(2, '0')}<span> subjects</span></div>
            <div className="overview-divider" />
            <div className="overview-row"><span><BookOpenText size={15} /> Lectures & units</span><b>{lessonCount}</b></div>
            <div className="overview-row"><span><FileText size={15} /> Section files</span><b>{sectionCount}</b></div>
            <div className="overview-row overview-row--current"><span><span className="current-dot" /> Current Moodle files</span><b>{currentCount}</b></div>
            <div className="welcome-card-foot">Older files are marked clearly.<br />New Moodle uploads take priority.</div>
          </aside>
        </section>

        <section className="library-section" id="course-library">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow eyebrow--muted">PICK UP WHERE YOU ARE</div>
              <h2>Your subjects<span className="heading-period">.</span></h2>
            </div>
            <div className="library-count"><span className="library-count-number">{archiveAssets.length}</span> older course files <span className="current-count-inline">+ {currentCount} this year</span></div>
          </div>

          <div className="course-pills" role="group" aria-label="Filter by subject">
            <button className={`course-pill ${selectedCourse === 'all' ? 'is-active' : ''}`} onClick={() => setSelectedCourse('all')} type="button">All subjects</button>
            {catalog.courses.map((course, index) => (
              <button
                key={course.id}
                className={`course-pill ${selectedCourse === course.id ? 'is-active' : ''}`}
                onClick={() => setSelectedCourse(course.id)}
                type="button"
                style={{ '--pill-accent': `var(--${COURSE_ACCENTS[course.id] || 'moss'})` } as CSSProperties}
              >
                <span className="pill-number">{String(index + 1).padStart(2, '0')}</span>{COURSE_SHORT_NAMES[course.id] || course.title}
              </button>
            ))}
          </div>

          <div className="library-tools">
            <label className="search-box">
              <Search size={17} strokeWidth={1.8} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a lecture, unit or section…" aria-label="Search course files" />
              {query && <button className="clear-search" onClick={() => setQuery('')} type="button" aria-label="Clear search">×</button>}
            </label>
            <div className="filter-controls">
              <div className="segmented-filter" role="group" aria-label="Filter by source">
                {([['all', 'All files'], ['current', 'This year'], ['archive', 'Older folder']] as const).map(([value, label]) => (
                  <button className={sourceFilter === value ? 'is-active' : ''} key={value} onClick={() => setSourceFilter(value)} type="button">{label}</button>
                ))}
              </div>
              <button className={`text-toggle ${showSections ? 'is-on' : ''}`} onClick={() => setShowSections((value) => !value)} type="button">
                <span className="toggle-track"><span /></span> Sections
              </button>
            </div>
          </div>

          {catalog.missingRoots.length > 0 && <div className="notice notice--warning">Some folders could not be found: {catalog.missingRoots.join(', ')}. Check that this app remains beside the course folders.</div>}

          <CoveragePanel assets={catalog.assets} onOpen={onOpen} />

          <div className="file-grid">
            {visible.map((asset, index) => (
              <button className={`file-card accent-${COURSE_ACCENTS[asset.courseId] || 'moss'}`} key={asset.id} onClick={() => onOpen(asset)} type="button" style={{ animationDelay: `${Math.min(index, 18) * 24}ms` }}>
                <div className="file-card-top">
                  <span className="file-type-mark"><FileMark asset={asset} /></span>
                  <span className="kind-label">{kindLabel(asset)}</span>
                  <ArrowUpRight className="file-open-arrow" size={16} />
                </div>
                <div className="file-card-title">{asset.displayName}</div>
                <div className="file-card-meta"><span>{asset.courseTitle}</span><span className="meta-dot" /><span>{asset.extension.replace('.', '').toUpperCase()}</span></div>
                <div className="file-card-bottom"><SourceBadge type={asset.sourceType} compact /><span className="file-card-link">Open <ChevronDown size={13} className="open-chevron" /></span></div>
              </button>
            ))}
            {visible.length === 0 && <div className="empty-results"><Search size={22} /><b>No matching files yet</b><span>Try another subject or search term.</span></div>}
          </div>

          <VersionComparison catalog={catalog} onOpen={onOpen} />

          <footer className="library-footer">
            <span><span className="footer-star">✳</span> Made for slower steps and stronger understanding.</span>
            <span>Course content is served from your own folders.</span>
          </footer>
        </section>
      </main>
    </div>
  );
}
