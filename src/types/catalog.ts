export type AssetKind = 'lecture' | 'section' | 'unit' | 'other';
export type SourceType = 'archive' | 'current';

export interface CourseInfo {
  id: string;
  title: string;
}

export interface SourceAsset {
  id: string;
  courseId: string;
  courseTitle: string;
  sourceType: SourceType;
  sourceLabel: string;
  kind: AssetKind;
  group: 'current-download' | 'course-archive';
  fileName: string;
  displayName: string;
  relativePath: string;
  extension: string;
  size: number;
  modifiedAt: string;
  sourceUrl: string;
}

export interface CatalogResponse {
  generatedAt: string;
  missingRoots: string[];
  courses: CourseInfo[];
  assets: SourceAsset[];
}
