import { NextResponse } from 'next/server';

if (!global.urlStore) {
  global.urlStore = new Map();
  global.reverseStore = new Map();
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { originalUrl } = body;

    if (!originalUrl || typeof originalUrl !== 'string' || originalUrl.trim() === '') {
      return NextResponse.json({ error: { code: 'MISSING_URL', message: 'URL is required' } }, { status: 400 });
    }
    if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
      return NextResponse.json({ error: { code: 'INVALID_URL', message: 'Invalid URL format' } }, { status: 400 });
    }
    if (originalUrl.includes('localhost:3000')) {
      return NextResponse.json({ error: { code: 'SELF_REFERENCE', message: 'Cannot shorten self URL' } }, { status: 400 });
    }

    if (global.reverseStore.has(originalUrl)) {
      const existingCode = global.reverseStore.get(originalUrl);
      return NextResponse.json({ shortCode: existingCode, shortUrl: `http://localhost:3000/${existingCode}`, originalUrl }, { status: 200 });
    }

    const shortCode = Math.random().toString(36).substring(2, 8);
    const shortUrl = `http://localhost:3000/${shortCode}`;

    global.urlStore.set(shortCode, originalUrl);
    global.reverseStore.set(originalUrl, shortCode);

    return NextResponse.json({ shortCode, shortUrl, originalUrl }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: { code: 'INVALID_REQUEST', message: 'Bad request' } }, { status: 400 });
  }
}
