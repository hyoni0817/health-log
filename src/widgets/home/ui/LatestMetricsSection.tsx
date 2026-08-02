import React, { Suspense } from 'react';
import { BloodPressureCard } from '@/features/blood-pressure/ui/BloodPressureCard';
import { BloodSugarCard } from '@/features/blood-sugar/ui/BloodSugarCard';
import { Card } from '@/shared/ui/Card';
import { LoaderCircle } from 'lucide-react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { bloodSugarQueries } from '@/entities/blood-sugar/model';
import { getQueryClient } from '@/shared/api/queryClient';

export const LatestMetricsSection = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(bloodSugarQueries.latestRecord());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex gap-4 mb-6">
        <Suspense fallback={<LatestCardLoading title="최근 혈당 수치" />}>
          <BloodSugarCard />
        </Suspense>
        <BloodPressureCard />
      </section>
    </HydrationBoundary>
  );
};

interface LatestCardLoadingProps {
  title: string;
}

const LatestCardLoading = (props: LatestCardLoadingProps) => {
  const { title } = props;

  return (
    <Card className="w-1/2">
      <h3 className="text-base font-medium text-(--text) mb-2">{title}</h3>
      <div className="flex items-center justify-center">
        <LoaderCircle className="w-4 h-4 animate-spin text-(--text-subtitle)" />
      </div>
    </Card>
  );
};
