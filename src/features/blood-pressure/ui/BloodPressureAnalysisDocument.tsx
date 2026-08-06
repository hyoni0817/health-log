'use client';

import React from 'react';
import { Document, DocumentGroup, Footer, Header } from 'react-export-doc';
import { PeriodFilter, PeriodFilterType, PeriodFilterValues } from '@/shared/types/measurement';
import { PeriodFilterContext } from '@/shared/model/periodFilter';
import { FileExportContext } from '@/shared/model/fileExport';
import { BloodPressureStatSummary } from '@/widgets/blood-pressure/ui/BloodPressureStatSummary';
import { BloodPressureHistoryTable } from '@/widgets/blood-pressure/ui/BloodPressureHistoryTable';

interface BloodPressureAnalysisDocumentProps {
  periodFilterFields: PeriodFilterValues;
}

export const BloodPressureAnalysisDocument = ({ periodFilterFields }: BloodPressureAnalysisDocumentProps) => {
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
    <FileExportContext.Provider value={{ isExport: true }}>
      <PeriodFilterContext.Provider value={periodFilter}>
        <div data-doc-export className="blood-sugar-analysis-document">
          <DocumentGroup
            renderHeader={(currentPage, totalPages) => (
              <Header title="혈압 리포트" currentPage={currentPage} totalPages={totalPages} />
            )}
            renderFooter={(currentPage, totalPages) => <Footer currentPage={currentPage} totalPages={totalPages} />}
          >
            <Document>
              <BloodPressureStatSummary />
              <BloodPressureHistoryTable />
            </Document>
          </DocumentGroup>
        </div>
      </PeriodFilterContext.Provider>
    </FileExportContext.Provider>
  );
};
