export const COMPLETED_LESSONS_KEY = 'eelu-study-companion:completed-lessons';
export const COMPLETED_PRACTICE_KEY = 'eelu-study-companion:completed-practice';

export function hasProgress(key: string, id: string) {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(key) || '[]');
    return Array.isArray(value) && value.includes(id);
  } catch {
    return false;
  }
}

export function toggleProgress(key: string, id: string) {
  try {
    const value: unknown = JSON.parse(window.localStorage.getItem(key) || '[]');
    const entries = Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
    const next = new Set(entries);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    window.localStorage.setItem(key, JSON.stringify([...next]));
    return next.has(id);
  } catch {
    return false;
  }
}

export function resetStudyProgress() {
  try {
    window.localStorage.removeItem(COMPLETED_LESSONS_KEY);
    window.localStorage.removeItem(COMPLETED_PRACTICE_KEY);
  } catch {
    // The app remains usable when local storage is unavailable.
  }
}
