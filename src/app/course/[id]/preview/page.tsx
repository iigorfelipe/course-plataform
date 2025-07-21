'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { courseAtom } from '@store/course';
import { NotFoundCourse } from '@components/not-found-course';
import { LoadingCourse } from '@components/loading-course';
import { CoursePreviewLayout } from '@modules/preview/preview-layout';

export default function CoursePreviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [course, setCourse] = useAtom(courseAtom.course);
  const courses = useAtomValue(courseAtom.courses);
  const setOpenModules = useSetAtom(courseAtom.openModules);
  const setSelectedLesson = useSetAtom(courseAtom.selectedLesson);

  useEffect(() => {
    const courseId = params.id as string;
    const foundCourse = courses.find((c) => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      setOpenModules(foundCourse.modules.map((m) => m.id));
      if (foundCourse.modules[0]?.lessons[0]) {
        setSelectedLesson(foundCourse.modules[0].lessons[0].id);
      }
    } else {
      router.push('/');
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, searchParams]);

  if (loading) return <LoadingCourse />;
  if (!course) return <NotFoundCourse />;

  return <CoursePreviewLayout />;
}
