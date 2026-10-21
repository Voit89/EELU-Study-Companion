import type { LessonMasterKey, PageGuide } from '../types';
import {
  discreteMathLecture3MasterKey,
  discreteMathLecture3PageGuides,
} from './discrete-math-lecture-3';
import {
  mathematics1Lecture7MasterKey,
  mathematics1Lecture7PageGuides,
} from './mathematics-1-lecture-7';

export const masterKeysByLessonId: Record<string, LessonMasterKey> = {
  'discrete-math-lecture-3': discreteMathLecture3MasterKey,
  'mathematics-1-lecture-7-archive': mathematics1Lecture7MasterKey,
};

export const pageGuidesByLessonId: Record<string, Record<number, PageGuide>> = {
  'discrete-math-lecture-3': discreteMathLecture3PageGuides,
  'mathematics-1-lecture-7-archive': mathematics1Lecture7PageGuides,
};
