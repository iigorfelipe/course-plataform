'use client';

import { Background } from '../modules/dashboard/backgound';
import { IntroSection } from '../modules/dashboard/intro-section';
import { StatsCards } from '../modules/dashboard/stats-cards';
import { CoursesGrid } from '../modules/dashboard/courses-grid';
import { useAtomValue, useSetAtom } from 'jotai';
import { EmpetyCourses } from '../modules/dashboard/empty-courses';
import { courseAtom } from '@store/course';
import { DeleteCourseModal } from '@modules/modals/delete-course';
import { modalAtom } from '@store/modals';
import { useEffect } from 'react';

export default function Dashboard() {
  const courses = useAtomValue(courseAtom.courses);
  const setIsLoaded = useSetAtom(courseAtom.isLoaded);
  const isOpenDeleteCourseModal = useAtomValue(modalAtom.isOpenDeleteCourseModal);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <Background />

        <div className="container mx-auto px-4 py-8 relative z-10">
          <IntroSection />
          {courses.length > 0 && <StatsCards />}
          {courses.length === 0 ? <EmpetyCourses /> : <CoursesGrid />}
        </div>
      </div>

      {isOpenDeleteCourseModal && <DeleteCourseModal />}
    </>
  );
}
