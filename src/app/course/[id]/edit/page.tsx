'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { NotFoundCourse } from '@components/not-found-course';
import { LoadingCourse } from '@components/loading-course';
import { BgCourse } from '@modules/course/background';
import { CourseHeader } from '@modules/course/header';
import { ProgressSteps } from '@modules/course/progress-steps';
import { useAtom, useAtomValue } from 'jotai';
import { courseAtom } from '@store/course';
import { BasicInformationStep } from '@modules/course/step-1-basic-information';
import { SettingsStep } from '@modules/course/step-2-settings';
import { ContentStep } from '@modules/course/step-3-content';
import type { Course } from '@contracts/course';

export default function EditCourse() {
  const router = useRouter();
  const params = useParams();
  const [course, setCourse] = useAtom(courseAtom.course);
  const courses = useAtomValue(courseAtom.courses);

  const [loading, setLoading] = useState(true);
  const currentStep = useAtomValue(courseAtom.currentStep);

  useEffect(() => {
    const courseId = params.id as string;
    const foundCourse = courses.find((c: Course) => c.id === courseId);

    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      router.push('/');
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, router]);

  if (loading) return <LoadingCourse />;
  if (!course) return <NotFoundCourse />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <BgCourse />

      <div className="container mx-auto p-4 relative z-10">
        <CourseHeader type="edit" />
        <ProgressSteps />

        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && <BasicInformationStep type="edit" />}
          {currentStep === 2 && <SettingsStep type="edit" />}
          {currentStep === 3 && <ContentStep type="edit" />}
        </div>
      </div>
    </div>
  );
}
