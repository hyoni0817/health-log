import { BloodSugarAnalysisSection } from '@/widgets/blood-sugar';

export default function BloodSugarPage() {
  return (
    <main className="px-6 py-8 w-full max-w-7xl">
      <h1 className="mb-1 text-(--text) text-2xl font-bold">혈당 관리</h1>
      <p className="text-(--text-subtitle) text-base mb-4">혈당 수치를 추적하고 관리하세요.</p>

      <BloodSugarAnalysisSection />
    </main>
  );
}
