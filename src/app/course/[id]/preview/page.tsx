'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BgPreview } from '@modules/preview/background';
import { HeaderPreview } from '@modules/preview/header';
import { VideoPlayer } from '@modules/preview/video-player';
import { CourseInfo } from '@modules/preview/course-info';
import { ProgressCard } from '@modules/preview/progress-card';
import { ActionsCard } from '@modules/preview/actions-card';
import { CourseContent } from '@modules/preview/course-content';
import { StatsCard } from '@modules/preview/stats-card';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { courseAtom } from '@store/course';
import { NotFoundCourse } from '@components/not-found-course';
import { LoadingCourse } from '@components/loading-course';
import type { Course, Module } from '@contracts/course';

export default function CoursePreview() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [course, setCourse] = useAtom(courseAtom.course);
  const courses = useAtomValue(courseAtom.courses);
  const setOpenModules = useSetAtom(courseAtom.openModules);
  const setSelectedLesson = useSetAtom(courseAtom.selectedLesson);

  useEffect(() => {
    const courseId = params.id as string;
    const foundCourse = courses.find((c: Course) => c.id === courseId);

    if (foundCourse) {
      setCourse(foundCourse);
      setOpenModules(foundCourse.modules.map((m: Module) => m.id));
      if (foundCourse.modules.length > 0 && foundCourse.modules[0].lessons.length > 0) {
        setSelectedLesson(foundCourse.modules[0].lessons[0].id);
      }
    } else {
      router.push('/');
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, router]);

  if (loading) return <LoadingCourse />;
  if (!course) return <NotFoundCourse />;

  return (
    <div className="min-h-screen flex justify-center w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <BgPreview />

      <div className="container p-4 relative z-10">
        <HeaderPreview />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <VideoPlayer />
            <CourseInfo />
          </div>

          <div className="space-y-6">
            <ProgressCard />
            <ActionsCard />
            <CourseContent />
            <StatsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
