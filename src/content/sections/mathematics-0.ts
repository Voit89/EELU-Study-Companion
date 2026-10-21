import type { CourseSectionSet } from '../types';

const courseId = 'mathematics-0' as const;
const sectionSourceKey = 'archive:mathematics-0:Section/Math(0) Section (1) - with solution (1).pptx';
const sectionSourcePath = 'Mathematics 0/Section/Math(0) Section (1) - with solution (1).pptx';
const lecture2LessonId = 'mathematics-0-lecture-2-current';

export const mathematics0SectionSet: CourseSectionSet = {
  practiceItems: [
    {
      id: 'math0-section-1-example-25a-simplify',
      courseId,
      sectionSourceKey,
      sectionSourcePage: 22,
      lessonId: lecture2LessonId,
      topic: 'Simplify an expression using grouping and order of operations',
      questionSource: 'section',
      question: 'The section asks you to simplify $3(5+2)-(4+1)\\times2$. Show the order of your steps.',
      recognition: 'The parentheses tell you what to calculate first. After simplifying both groups, perform the multiplications before the subtraction.',
      hint: '**Hint 1:** Evaluate the two parentheses separately: find $5+2$ and $4+1$. Rewrite the expression with those results in place.\n\n**Hint 2:** Multiply each resulting pair, then subtract the second product from the first.',
      steps: [
        'Start with the source expression: $3(5+2)-(4+1)\\times2$.',
        'Evaluate the parentheses: $5+2=7$ and $4+1=5$. The expression becomes $3\\times7-5\\times2$.',
        'Do the multiplications: $3\\times7=21$ and $5\\times2=10$. Now the expression is $21-10$.',
        'Subtract: $21-10=11$.',
      ],
      answer: '$3(5+2)-(4+1)\\times2=11$. The section prints the worked simplification on slide 23.',
    },
  ],
  sectionCoverage: [
    {
      courseId,
      sourceKey: sectionSourceKey,
      sourcePath: sectionSourcePath,
      disposition: 'mapped',
      practiceIds: ['math0-section-1-example-25a-simplify'],
      note: 'This disposition covers Section (1) only. The mapped item is Example 25(a), asked on slide 22 and worked on slide 23. No coverage disposition is recorded here for the other Math 0 section decks.',
    },
  ],
};
