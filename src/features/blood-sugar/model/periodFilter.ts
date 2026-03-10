import { PeriodFilter } from '@/shared/types/measurement';
import { createContext } from 'react';

export const BloodSugarPeriodFilterContext = createContext<PeriodFilter | null>(null);
