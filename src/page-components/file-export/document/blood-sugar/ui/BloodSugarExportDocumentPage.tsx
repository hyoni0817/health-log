import { BloodSugarAnalysisDocument } from '@/features/blood-sugar/ui/BloodSugarAnalysisDocument';
import { Suspense } from 'react';

export default function BloodSugarExportDocumentPage() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>{/* <BloodSugarAnalysisDocument /> */}</Suspense>
    </main>
  );
}
