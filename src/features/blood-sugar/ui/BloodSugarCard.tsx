'use client';

import { Card } from '@/shared/ui/components/Card';
import React from 'react';

export const BloodSugarCard = () => {
  return (
    <Card className="w-1/2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-medium text-(--text) mb-2">최근 혈당 수치</h3>
        <div className="text-sm text-(--text-subtitle)">마지막 업데이트: 3일전</div>
      </div>
      <div className="flex items-center gap-3 pb-3">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-bold text-(--text)">100</span>
          <span className="text-base text-(--text-subtitle)">mg/dL</span>
        </div>

        <div className="text-sm text-(--color-green-500)">양호</div>
      </div>
    </Card>
  );
};
