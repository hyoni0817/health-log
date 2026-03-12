'use client';

import React from 'react';
import { BloodSugarHistoryTable } from '@/widgets/blood-sugar/ui/BloodSugarHistoryTable';
import { BloodSugarStatSummary } from '@/widgets/blood-sugar/ui/BloodSugarStatSummary';
import { Document, DocumentGroup, Footer, Header } from '@/shared/lib/document-export';
import { PeriodFilter, PeriodFilterType } from '@/shared/types/measurement';
import dayjs from 'dayjs';
import { BloodSugarPeriodFilterContext } from '../model';
import { BloodSugarAnalysisExportContext } from '../model';

export const BloodSugarAnalysisDocument = () => {
  const now = dayjs().format('YYYY-MM-DD');
  const before1year = dayjs().subtract(1, 'year').format('YYYY-MM-DD');
  const periodFilter: PeriodFilter = { type: PeriodFilterType.RANGE, startDate: before1year, endDate: now };

  return (
    <BloodSugarAnalysisExportContext.Provider value={{ isExport: true }}>
      <BloodSugarPeriodFilterContext.Provider value={periodFilter}>
        <div className="blood-sugar-analysis-document">
          <DocumentGroup
            renderHeader={(currentPage, totalPages) => (
              <Header title="혈당 리포트" currentPage={currentPage} totalPages={totalPages} />
            )}
            renderFooter={(currentPage, totalPages) => <Footer currentPage={currentPage} totalPages={totalPages} />}
          >
            <Document>
              <BloodSugarStatSummary />
              <BloodSugarHistoryTable />
            </Document>
            <Document>
              <BloodSugarHistoryTable />
            </Document>
          </DocumentGroup>
        </div>
      </BloodSugarPeriodFilterContext.Provider>
    </BloodSugarAnalysisExportContext.Provider>
  );
};
