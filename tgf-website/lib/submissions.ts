import fs from 'fs';
import path from 'path';
import os from 'os';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'submissions.json');

function ensureFile(): string {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, '[]', 'utf8');
  } catch (e) {
    // ignore
  }
  return FILE_PATH;
}

function testFile(): string {
  const p = path.join(os.tmpdir(), 'tgf_submissions_test.json');
  if (!fs.existsSync(p)) fs.writeFileSync(p, '[]', 'utf8');
  return p;
}

export type Submission = {
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export function appendSubmission(data: Omit<Submission, 'createdAt'>) {
  try {
    const p = process.env.NODE_ENV === 'test' ? testFile() : ensureFile();
    const raw = fs.readFileSync(p, 'utf8');
    const list: Submission[] = JSON.parse(raw);
    const entry: Submission = { ...data, createdAt: new Date().toISOString() };
    list.push(entry);
    fs.writeFileSync(p, JSON.stringify(list, null, 2), 'utf8');
    return entry;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('appendSubmission failed (likely ephemeral FS). Returning success without persist.');
    return null;
  }
}

export function getSubmissions(limit = 50): Submission[] {
  try {
    const p = process.env.NODE_ENV === 'test' ? testFile() : ensureFile();
    const raw = fs.readFileSync(p, 'utf8');
    const list: Submission[] = JSON.parse(raw);
    return list.slice(-limit).reverse();
  } catch (e) {
    return [];
  }
}

