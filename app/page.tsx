export default function Home() {
  return (
    <main className="px-6 py-8">
      <h1 className="mb-1 text-(--text) text-2xl font-bold">대시보드</h1>
      <p className="text-(--text-subtitle) text-base">건강 지표와 변화 추이를 모니터링하세요.</p>

      <div>
        <div>최근 혈당</div>
        <div>최근 혈압</div>
      </div>
    </main>
  );
}
