import { discreteMathLessons } from './lessons/discrete-math';
import { discreteMathLecture1Lesson } from './lessons/discrete-math-lecture-1';
import { discreteMathLecture3Lesson } from './lessons/discrete-math-lecture-3';
import { discreteMathLecture4Lesson } from './lessons/discrete-math-lecture-4';
import { discreteMathLecture5Lesson } from './lessons/discrete-math-lecture-5';
import { discreteMathLecture6Lesson } from './lessons/discrete-math-lecture-6';
import { discreteMathMidtermRevisionLesson } from './lessons/discrete-math-midterm-revision';
import { discreteMathMidtermSolutionsLesson } from './lessons/discrete-math-midterm-solutions';
import { discreteMathSpecialGraphsSupplementLesson } from './lessons/discrete-math-special-graphs-supplement';
import { electronicsLessons } from './lessons/electronics';
import { electronicsLecture1 } from './lessons/electronics-lecture-1';
import { electronicsLecture2Lesson } from './lessons/electronics-lecture-2';
import { electronicsLecture3Lesson } from './lessons/electronics-lecture-3';
import { electronicsLecture4Lesson } from './lessons/electronics-lecture-4';
import { electronicsLecture5Lesson } from './lessons/electronics-lecture-5';
import { electronicsLecture6Lesson } from './lessons/electronics-lecture-6';
import { electronicsLecture7Lesson } from './lessons/electronics-lecture-7';
import { electronicsMidtermSolutionsLesson } from './lessons/electronics-midterm-solutions';
import { humanRightsLessons } from './lessons/human-rights';
import { humanRightsLecture2Lesson } from './lessons/human-rights-lecture-2';
import { humanRightsLecture3Lesson } from './lessons/human-rights-lecture-3';
import { humanRightsLecture4Lesson } from './lessons/human-rights-lecture-4';
import { introductionToComputersLessons } from './lessons/introduction-to-computers';
import { introductionToComputersLecture1Lesson } from './lessons/introduction-to-computers-lecture-1';
import { introductionToComputersLecture2Lesson } from './lessons/introduction-to-computers-lecture-2';
import { mathematics0Lessons } from './lessons/mathematics-0';
import { mathematics0Lecture2Lessons } from './lessons/mathematics-0-lecture-2';
import { mathematics0Lecture3Lesson } from './lessons/mathematics-0-lecture-3';
import { mathematics0Lecture4Lesson } from './lessons/mathematics-0-lecture-4';
import { mathematics0Lecture5Lesson } from './lessons/mathematics-0-lecture-5';
import { mathematics0Lecture6Lesson } from './lessons/mathematics-0-lecture-6';
import { mathematics0Lecture7Lesson } from './lessons/mathematics-0-lecture-7';
import { mathematics0Lecture8Lesson } from './lessons/mathematics-0-lecture-8';
import { mathematics0Lecture9Lesson } from './lessons/mathematics-0-lecture-9';
import { mathematics0Lecture10Lesson } from './lessons/mathematics-0-lecture-10';
import { mathematics0Lecture12Lesson } from './lessons/mathematics-0-lecture-12';
import { mathematics0Lecture13Lesson } from './lessons/mathematics-0-lecture-13';
import { mathematics1Lessons } from './lessons/mathematics-1';
import { mathematics1Lecture2Lesson } from './lessons/mathematics-1-lecture-2';
import { mathematics1Lecture3Lesson } from './lessons/mathematics-1-lecture-3';
import { mathematics1Lecture4Lesson } from './lessons/mathematics-1-lecture-4';
import { mathematics1Lecture5Lesson } from './lessons/mathematics-1-lecture-5';
import { mathematics1Lecture6Lesson } from './lessons/mathematics-1-lecture-6';
import { mathematics1Lecture7Lesson } from './lessons/mathematics-1-lecture-7';
import { mathematics1Lecture8Lesson } from './lessons/mathematics-1-lecture-8';
import { mathematics1Lecture9Lesson } from './lessons/mathematics-1-lecture-9';
import { mathematics1Lecture10Lesson } from './lessons/mathematics-1-lecture-10';
import { mathematics1Lecture11Lesson } from './lessons/mathematics-1-lecture-11';
import { mathematics1Lecture12Lesson } from './lessons/mathematics-1-lecture-12';
import { mathematics1Lecture13Lesson } from './lessons/mathematics-1-lecture-13';
import { mathematics1Lecture14Lesson } from './lessons/mathematics-1-lecture-14';
import { technicalReportWritingLessons } from './lessons/technical-report-writing';
import { technicalReportWritingUnit1Part1Lesson } from './lessons/technical-report-writing-unit-1-part-1';
import { discreteMathSectionSet } from './sections/discrete-math';
import { electronicsSectionSet } from './sections/electronics';
import { humanRightsSectionSet } from './sections/human-rights';
import { introductionToComputersSectionSet } from './sections/introduction-to-computers';
import { mathematics0SectionSet } from './sections/mathematics-0';
import { mathematics1SectionSet } from './sections/mathematics-1';
import { technicalReportWritingSectionSet } from './sections/technical-report-writing';
import type { CourseId, Lesson } from './types';

export const lessonsByCourse: Record<CourseId, Lesson[]> = {
  'discrete-math': [discreteMathLecture1Lesson, ...discreteMathLessons, discreteMathLecture3Lesson, discreteMathLecture4Lesson, discreteMathLecture5Lesson, discreteMathLecture6Lesson, discreteMathSpecialGraphsSupplementLesson, discreteMathMidtermRevisionLesson, discreteMathMidtermSolutionsLesson],
  electronics: [...electronicsLessons, electronicsLecture1, electronicsLecture2Lesson, electronicsLecture3Lesson, electronicsLecture4Lesson, electronicsLecture5Lesson, electronicsLecture6Lesson, electronicsLecture7Lesson, electronicsMidtermSolutionsLesson],
  'human-rights': [...humanRightsLessons, humanRightsLecture2Lesson, humanRightsLecture3Lesson, humanRightsLecture4Lesson],
  'introduction-to-computers': [...introductionToComputersLessons, introductionToComputersLecture1Lesson, introductionToComputersLecture2Lesson],
  'mathematics-0': [...mathematics0Lessons, ...mathematics0Lecture2Lessons, mathematics0Lecture3Lesson, mathematics0Lecture4Lesson, mathematics0Lecture5Lesson, mathematics0Lecture6Lesson, mathematics0Lecture7Lesson, mathematics0Lecture8Lesson, mathematics0Lecture9Lesson, mathematics0Lecture10Lesson, mathematics0Lecture12Lesson, mathematics0Lecture13Lesson],
  'mathematics-1': [...mathematics1Lessons, mathematics1Lecture2Lesson, mathematics1Lecture3Lesson, mathematics1Lecture4Lesson, mathematics1Lecture5Lesson, mathematics1Lecture6Lesson, mathematics1Lecture7Lesson, mathematics1Lecture8Lesson, mathematics1Lecture9Lesson, mathematics1Lecture10Lesson, mathematics1Lecture11Lesson, mathematics1Lecture12Lesson, mathematics1Lecture13Lesson, mathematics1Lecture14Lesson],
  'technical-report-writing': [...technicalReportWritingLessons, technicalReportWritingUnit1Part1Lesson],
};

export const allLessons = Object.values(lessonsByCourse).flat();
export const lessonBySourceKey = new Map(allLessons.map((lesson) => [lesson.sourceKey, lesson]));

export const sectionSetsByCourse = {
  'discrete-math': discreteMathSectionSet,
  electronics: electronicsSectionSet,
  'human-rights': humanRightsSectionSet,
  'introduction-to-computers': introductionToComputersSectionSet,
  'mathematics-0': mathematics0SectionSet,
  'mathematics-1': mathematics1SectionSet,
  'technical-report-writing': technicalReportWritingSectionSet,
} satisfies Record<CourseId, (typeof discreteMathSectionSet)>;

export const allPracticeItems = Object.values(sectionSetsByCourse).flatMap((set) => set.practiceItems);
export const allSectionCoverage = Object.values(sectionSetsByCourse).flatMap((set) => set.sectionCoverage);
