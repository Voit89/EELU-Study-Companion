import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';

const markdownPlugins = [remarkMath, remarkGfm];
const htmlPlugins = [rehypeKatex];

export function LessonMarkdown({ children }: { children: string }) {
  return <div className="lesson-markdown" dir="auto"><ReactMarkdown remarkPlugins={markdownPlugins} rehypePlugins={htmlPlugins}>{children}</ReactMarkdown></div>;
}
