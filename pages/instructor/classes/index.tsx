// pages/instructor/classes/index.tsx
import Link from 'next/link';

export default function ClassesPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📚 수업 관리</h1>
      <Link href="/instructor/classes/new" className="text-blue-600 underline">➕ 새 수업 만들기</Link>
    </div>
  );
}
