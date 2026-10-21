import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const markdownPlugins = [remarkMath];
const htmlPlugins = [rehypeKatex];

export function LessonMarkdown({ children }: { children: string }) {
  return <div className="lesson-markdown" dir="auto"><ReactMarkdown remarkPlugins={markdownPlugins} rehypePlugins={htmlPlugins}>{children}</ReactMarkdown></div>;
}
