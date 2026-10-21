import type { SourceAsset } from '../types/catalog';

export function makeSourceKey(sourceType: 'archive' | 'current', courseId: string, relativePath: string) {
  return `${sourceType}:${courseId}:${relativePath.replaceAll('\\', '/')}`;
}

export function sourceKeyForAsset(asset: SourceAsset) {
  return makeSourceKey(asset.sourceType, asset.courseId, asset.relativePath);
}
