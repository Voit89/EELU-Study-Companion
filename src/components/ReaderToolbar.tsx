import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReaderToolbarProps {
  page: number;
  totalPages: number;
  itemLabel?: string;
  onPageChange: (page: number) => void;
}

export function ReaderToolbar({ page, totalPages, itemLabel = 'Page', onPageChange }: ReaderToolbarProps) {
  const canNavigate = totalPages > 0;
  const safePage = canNavigate ? Math.min(Math.max(page, 1), totalPages) : 1;
  const [draft, setDraft] = useState(String(safePage));

  useEffect(() => setDraft(String(safePage)), [safePage]);

  function commitPage() {
    const requested = Number(draft.trim());
    if (!draft.trim() || !Number.isFinite(requested) || !Number.isInteger(requested)) {
      setDraft(String(safePage));
      return;
    }
    onPageChange(Math.min(Math.max(requested, 1), Math.max(totalPages, 1)));
  }

  return (
    <nav className="reader-toolbar" aria-label={`${itemLabel} navigation`}>
      <span className="reader-toolbar-label">{itemLabel}</span>
      <button
        className="reader-toolbar-button"
        type="button"
        aria-label={`Previous ${itemLabel.toLowerCase()}`}
        disabled={!canNavigate || safePage <= 1}
        onClick={() => onPageChange(safePage - 1)}
      >
        <ChevronLeft size={15} />
      </button>
      <input
        className="reader-toolbar-input"
        aria-label={`Current ${itemLabel.toLowerCase()}`}
        type="number"
        step={1}
        min={1}
        max={Math.max(totalPages, 1)}
        disabled={!canNavigate}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commitPage}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            commitPage();
            event.currentTarget.blur();
          }
        }}
      />
      <span className="reader-toolbar-total">of {canNavigate ? totalPages : '—'}</span>
      <button
        className="reader-toolbar-button"
        type="button"
        aria-label={`Next ${itemLabel.toLowerCase()}`}
        disabled={!canNavigate || safePage >= totalPages}
        onClick={() => onPageChange(safePage + 1)}
      >
        <ChevronRight size={15} />
      </button>
    </nav>
  );
}
