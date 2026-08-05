'use client';

import React from 'react';
import { BloodSugarHistoryTable } from '@/widgets/blood-sugar/ui/BloodSugarHistoryTable';
import { BloodSugarStatSummary } from '@/widgets/blood-sugar/ui/BloodSugarStatSummary';
import { Document, DocumentGroup, Footer, Header } from 'react-export-doc';
import { PeriodFilter, PeriodFilterType, PeriodFilterValues } from '@/shared/types/measurement';
import { PeriodFilterContext } from '@/shared/model/periodFilter';
import { BloodSugarAnalysisExportContext } from '../model';

interface BloodSugarAnalysisDocumentProps {
  periodFilterFields: PeriodFilterValues;
}

export const BloodSugarAnalysisDocument = ({ periodFilterFields }: BloodSugarAnalysisDocumentProps) => {
  const { periodType, days, startDate, endDate } = periodFilterFields;

  const periodFilter: PeriodFilter =
    periodType === PeriodFilterType.RANGE
      ? {
          type: PeriodFilterType.RANGE,
          startDate: startDate as string,
          endDate: endDate as string,
        }
      : {
          type: PeriodFilterType.DAY,
          days: Number(days),
        };

  return (
    <BloodSugarAnalysisExportContext.Provider value={{ isExport: true }}>
      <PeriodFilterContext.Provider value={periodFilter}>
        <div data-doc-export className="blood-sugar-analysis-document">
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
          </DocumentGroup>
        </div>
      </PeriodFilterContext.Provider>
    </BloodSugarAnalysisExportContext.Provider>
  );
};
