import { createContext } from 'react';
import { PeriodFilter } from '../types/measurement';

export const PeriodFilterContext = createContext<PeriodFilter | null>(null);
