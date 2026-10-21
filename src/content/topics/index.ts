import { discreteMathTopicSets } from './discrete-math';
import type { Topic, TopicSet } from '../types';

export const allTopicSets: TopicSet[] = [...discreteMathTopicSets];

export const topicsByLessonId = new Map<string, TopicSet>(
  allTopicSets.map((set) => [set.lessonId, set]),
);

export const allTopics: Topic[] = allTopicSets.flatMap((set) => set.topics);
