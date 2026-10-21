import path from 'node:path';
import { fileURLToPath } from 'node:url';

const APP_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const WORKSPACE_ROOT = path.resolve(APP_ROOT, '..');

export const COURSE_ROOTS = [
  { id: 'discrete-math', title: 'Discrete Math', kind: 'archive', directory: 'Discrete Math' },
  { id: 'electronics', title: 'Electronics', kind: 'archive', directory: 'Electronics' },
  { id: 'human-rights', title: 'Human Rights', kind: 'archive', directory: 'Human Rights' },
  { id: 'introduction-to-computers', title: 'Introduction to Computers', kind: 'archive', directory: 'Introduction to Computers' },
  { id: 'mathematics-0', title: 'Mathematics 0', kind: 'archive', directory: 'Mathematics 0' },
  { id: 'mathematics-1', title: 'Mathematics 1', kind: 'archive', directory: 'Mathematics 1' },
  { id: 'technical-report-writing', title: 'Technical Report Writing', kind: 'archive', directory: 'Technical Report Writing' },
  { id: 'current-moodle', title: 'Current Moodle downloads', kind: 'current', directory: 'The Lectures i downloaded this term recently' },
].map((root) => ({ ...root, absolutePath: path.resolve(WORKSPACE_ROOT, root.directory) }));

export const APP_ROOT_PATH = APP_ROOT;
