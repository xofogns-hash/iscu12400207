import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }) {
  const { shortCode } = await params;
  const originalUrl = global.urlStore?.get(shortCode);

  if (originalUrl) {
    redirect(originalUrl);
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>404 - Not Found</h1>
    </main>
  );
}