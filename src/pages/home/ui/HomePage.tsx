import { HealthInsightSection, LatestMetricsSection, QuickActionsSection } from '@/widgets/home';

export function HomePage() {
  return (
    <main className="px-6 py-8 w-full max-w-7xl">
      <h1 className="mb-1 text-(--text) text-2xl font-bold">대시보드</h1>
      <p className="text-(--text-subtitle) text-base mb-4">건강 지표와 변화 추이를 모니터링하세요.</p>

      <div>
        <LatestMetricsSection />
      </div>

      <div className="flex gap-4">
        <QuickActionsSection />
        <HealthInsightSection />
      </div>
    </main>
  );
}
