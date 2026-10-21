import { discreteMathTopicSets } from './discrete-math';
import { electronicsTopicSets } from './electronics';
import type { Topic, TopicSet } from '../types';

export const allTopicSets: TopicSet[] = [...discreteMathTopicSets, ...electronicsTopicSets];

export const topicsByLessonId = new Map<string, TopicSet>(
  allTopicSets.map((set) => [set.lessonId, set]),
);

export const allTopics: Topic[] = allTopicSets.flatMap((set) => set.topics);
