// ---------------------------------------------------------------------------
// Discrete Math topics — barrel.
//
// Lecture 1 (Sets) is fully rebuilt in masterpiece style (Exemplar: the
// Electronics page-12 nodal analysis). Lectures 2-3 still carry their pilot
// Topic sets until their production sections upgrade them, lecture by
// lecture, through the verification-first pipeline.
//
// lessonId keys MUST match the lesson ids registered in
// src/content/lessonIndex.ts — TopicExplorer is keyed on them.
// ---------------------------------------------------------------------------

import type { TopicSet } from '../../types';
import { lecture1SetsTopicSet } from './lecture-1-sets';
import { functionsFunctionTestTopicSet, logicContrapositiveTopicSet } from './pilot-archive';

export const discreteMathTopicSets: TopicSet[] = [
  lecture1SetsTopicSet,
  functionsFunctionTestTopicSet,
  logicContrapositiveTopicSet,
];
