import { redirect, notFound } from 'next/navigation';

export default async function RedirectPage({ params }) {
  const resolvedParams = await params;
  const shortCode = resolvedParams.shortCode;
  const originalUrl = global.urlStore?.get(shortCode);

  if (originalUrl) {
    redirect(originalUrl);
  }
  
  // 실제 404 HTTP 상태 코드를 반환하도록 Next.js 내장 함수 사용
  notFound();
}
