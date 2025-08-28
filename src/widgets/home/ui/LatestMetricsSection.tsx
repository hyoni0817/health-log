import React from 'react';
import { BloodPressureCard } from '@/features/blood-pressure/ui/BloodPressureCard';
import { BloodSugarCard } from '@/features/blood-sugar';

export const LatestMetricsSection = () => {
  return (
    <section className="flex gap-4 mb-6">
      <BloodSugarCard />
      <BloodPressureCard />
    </section>
  );
};
