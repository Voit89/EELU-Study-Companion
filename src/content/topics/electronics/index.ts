// ---------------------------------------------------------------------------
// Electronics topics — barrel.
//
// Lecture 4 (Kirchhoff's Laws, Node-Voltage & Mesh Analysis, Network
// Theorems) is fully rebuilt in masterpiece style (the Electronics page-12
// nodal-analysis exemplar is the canonical reference). All 9 concept units
// are grounded in the VLM slide transcript
// (workspace/extracted/elec-lec4-slides/Lec4_slide_transcript.md) and every
// numeric claim is recomputed by pipeline/verify-claims.mjs (family E4.*).
//
// lessonId keys MUST match the lesson ids registered in
// src/content/lessonIndex.ts — TopicExplorer is keyed on them.
// ---------------------------------------------------------------------------

import type { TopicSet } from '../../types';
import { lecture4NetworkTheoremsTopicSet } from './lecture-4-network-theorems';

export const electronicsTopicSets: TopicSet[] = [lecture4NetworkTheoremsTopicSet];
