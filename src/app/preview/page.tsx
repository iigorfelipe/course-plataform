'use client';

import { SharedCoursePreview } from '@modules/preview/shared-course-preview';
import { Suspense } from 'react';

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="text-white">Carregando preview do curso...</div>}>
      <SharedCoursePreview />
    </Suspense>
  );
}
