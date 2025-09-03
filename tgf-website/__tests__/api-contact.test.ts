import { POST } from '@/app/api/contact/route';

describe('POST /api/contact', () => {
  it('accepts a valid payload', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Jane Doe', email: 'jane@example.com', message: 'Hello world!!' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });

  it('rejects invalid payload', async () => {
    const req = new Request('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'J', email: 'not-an-email', message: 'short' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});

