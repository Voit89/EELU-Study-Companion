// Dev utility: dumps all topic sets as JSON (consumed by the lecture-docx
// generator in download/lecture-docs/). Bundled with esbuild, run with node:
//   npx esbuild scripts/dump-topics.ts --bundle --format=cjs --platform=node --outfile=/tmp/topics-dump.cjs
//   node /tmp/topics-dump.cjs > /tmp/topics.json
import { allTopicSets } from '../src/content/topics';

console.log(JSON.stringify(allTopicSets, null, 2));
