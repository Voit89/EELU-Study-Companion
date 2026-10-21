import { FileClock, FolderArchive } from 'lucide-react';
import type { SourceType } from '../types/catalog';

export function SourceBadge({ type, compact = false }: { type: SourceType; compact?: boolean }) {
  const current = type === 'current';
  const Icon = current ? FileClock : FolderArchive;
  return (
    <span className={`source-badge ${current ? 'source-badge--current' : 'source-badge--archive'} ${compact ? 'source-badge--compact' : ''}`}>
      <Icon size={13} strokeWidth={1.8} aria-hidden="true" />
      <span>{current ? 'This year · Moodle' : 'Older course folder'}</span>
    </span>
  );
}
