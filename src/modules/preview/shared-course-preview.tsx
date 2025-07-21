'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { courseAtom } from '@store/course';
import { CoursePreviewLayout } from '@modules/preview/preview-layout';
import { NotFoundCourse } from '@components/not-found-course';
import { LoadingCourse } from '@components/loading-course';
import { decompressFromBase64Url } from 'lib/compression';
import { Course, MinifiedCourse } from '@contracts/course';

export const SharedCoursePreview = () => {
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
        const parsed = decompressFromBase64Url<MinifiedCourse>(data);

        const reconstructedCourse = {
          title: parsed.t,
          description: parsed.d,
          fav: parsed.f,
          category: parsed.c || 'outros',
          level: parsed.l || 'beginner',
          modules: [
            {
              id: 'mod-1',
              name: parsed.m.t,
              lessons: [
                {
                  id: 'lesson-1',
                  title: parsed.m.l.t,
                  videoUrl: parsed.m.l.u,
                  description: parsed.m.l.d,
                  duration: parsed.m.l.h,
                },
              ],
            },
          ],
        };

        console.log('Curso reconstruído:', reconstructedCourse);

        setCourse(reconstructedCourse as Course);
        setPreviewMode('student');
        setOpenModules(reconstructedCourse.modules.map((m) => m.id));
        if (reconstructedCourse.modules[0]?.lessons[0]) {
          setSelectedLesson(reconstructedCourse.modules[0].lessons[0].id);
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
};
