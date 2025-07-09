import React from 'react';
import { Card } from '@/shared/ui/components';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';

export const HealthInsightSection = () => {
  return (
    <section className="mb-8 w-[60%] flex-1">
      <Card className="h-full">
        <h2 className="text-white text-xl font-semibold mb-4">건강 인사이트</h2>

        <div className="flex flex-col justify-between h-[calc(100%-44px)]">
          <p className="text-(--text-subtitle) text-sm mb-4">
            최근 측정값을 바탕으로 볼 때, 귀하의 건강 지표는 정상 범위 내에 있는 것으로 보입니다. 지속적인 모니터링은
            추세와 잠재적인 문제를 조기에 파악하는 데 도움을 줍니다.
          </p>

          <Link
            href="/"
            className="py-2 text-center full-width flex justify-center items-center border-1 border-(--divider) rounded-md"
          >
            <span className="text-(--text) text-sm mr-2">자세히 보기</span>
            <MoveRight className="text-(--text) w-4 h-4" />
          </Link>
        </div>
      </Card>
    </section>
  );
};
