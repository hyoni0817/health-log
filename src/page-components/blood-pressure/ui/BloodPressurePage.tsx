import { BloodPressureAnalysisSection } from '@/widgets/blood-pressure';

export default function BloodPressurePage() {
  return (
    <main className="px-6 py-8 w-full max-w-7xl">
      <h1 className="mb-1 text-(--text) text-2xl font-bold">혈압 관리</h1>
      <p className="text-(--text-subtitle) text-base mb-4">혈압 수치를 추적하고 관리하세요.</p>

      <BloodPressureAnalysisSection />
    </main>
  );
}
