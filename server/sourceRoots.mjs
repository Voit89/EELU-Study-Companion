import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const APP_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT || path.resolve(APP_ROOT, '..');

function resolveDirectory(directoryName) {
  const candidates = [
    process.env.COURSE_ROOT_DIR && path.resolve(process.env.COURSE_ROOT_DIR, directoryName),
    path.resolve(WORKSPACE_ROOT, directoryName),
    path.resolve(WORKSPACE_ROOT, 'Curriculum', directoryName),
    path.resolve(WORKSPACE_ROOT, '..', 'Downloads', 'semester 1-20260930T144852Z-1-001', 'semester 1', directoryName),
    path.resolve('C:\\Users\\Ali abd El Aziz\\Documents\\Downloads\\semester 1-20260930T144852Z-1-001\\semester 1', directoryName),
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  return path.resolve(WORKSPACE_ROOT, directoryName);
}

export const COURSE_ROOTS = [
  { id: 'discrete-math', title: 'Discrete Math', kind: 'archive', directory: 'Discrete Math' },
  { id: 'electronics', title: 'Electronics', kind: 'archive', directory: 'Electronics' },
  { id: 'human-rights', title: 'Human Rights', kind: 'archive', directory: 'Human Rights' },
  { id: 'introduction-to-computers', title: 'Introduction to Computers', kind: 'archive', directory: 'Introduction to Computers' },
  { id: 'mathematics-0', title: 'Mathematics 0', kind: 'archive', directory: 'Mathematics 0' },
  { id: 'mathematics-1', title: 'Mathematics 1', kind: 'archive', directory: 'Mathematics 1' },
  { id: 'technical-report-writing', title: 'Technical Report Writing', kind: 'archive', directory: 'Technical Report Writing' },
  { id: 'current-moodle', title: 'Current Moodle downloads', kind: 'current', directory: 'The Lectures i downloaded this term recently' },
].map((root) => ({ ...root, absolutePath: resolveDirectory(root.directory) }));

export const APP_ROOT_PATH = APP_ROOT;
