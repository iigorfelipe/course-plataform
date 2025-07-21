'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { decompressFromEncodedURIComponent } from 'lz-string';
import { useSetAtom } from 'jotai';
import { courseAtom } from '@store/course';
import { CoursePreviewLayout } from '@modules/preview/preview-layout';
import { NotFoundCourse } from '@components/not-found-course';
import { LoadingCourse } from '@components/loading-course';
import type { Course } from '@contracts/course';

export default function SharedCoursePreview() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const setPreviewMode = useSetAtom(courseAtom.previewMode);

  const setCourse = useSetAtom(courseAtom.course);
  const setOpenModules = useSetAtom(courseAtom.openModules);
  const setSelectedLesson = useSetAtom(courseAtom.selectedLesson);

  useEffect(() => {
    const data = searchParams.get('data');

    if (data) {
      try {
        const json = decompressFromEncodedURIComponent(data);
        const parsed: Course = JSON.parse(json);

        setPreviewMode('student');

        setCourse(parsed);
        setOpenModules(parsed.modules.map((m) => m.id));
        if (parsed.modules[0]?.lessons[0]) {
          setSelectedLesson(parsed.modules[0].lessons[0].id);
        }
        setValid(true);
      } catch (err) {
        console.error('Erro ao carregar curso compartilhado', err);
      }
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (loading) return <LoadingCourse />;
  if (!valid) return <NotFoundCourse />;

  return <CoursePreviewLayout />;
}
