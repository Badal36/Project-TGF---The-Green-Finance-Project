import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const file = path.join(dataDir, 'submissions.json');
const example = path.join(dataDir, 'submissions.example.json');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(file)) {
  const contents = fs.existsSync(example) ? fs.readFileSync(example, 'utf8') : '[]';
  fs.writeFileSync(file, contents, 'utf8');
  console.log('Seeded data/submissions.json');
} else {
  console.log('data/submissions.json already exists');
}

