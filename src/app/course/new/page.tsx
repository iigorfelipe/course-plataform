'use client';

import { BgCourse } from '@modules/course/background';
import { CourseHeader } from '@modules/course/header';
import { ProgressSteps } from '@modules/course/progress-steps';
import { BasicInformationStep } from '@modules/course/step-1-basic-information';
import { SettingsStep } from '@modules/course/step-2-settings';
import { ContentStep } from '@modules/course/step-3-content';
import { useAtom, useSetAtom } from 'jotai';
import { courseAtom, emptyCourse } from '@store/course';
import { useEffect } from 'react';
import type { Course } from '@contracts/course';

export default function NewCourse() {
  const [currentStep, setCurrentStep] = useAtom(courseAtom.currentStep);
  const setCourse = useSetAtom(courseAtom.course);

  useEffect(() => {
    setCurrentStep(1);
    setCourse(emptyCourse as Course);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <BgCourse />
      <div className="container mx-auto p-4 relative z-10">
        <CourseHeader type="new" />
        <ProgressSteps />

        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && <BasicInformationStep type="new" />}
          {currentStep === 2 && <SettingsStep type="new" />}
          {currentStep === 3 && <ContentStep type="new" />}
        </div>
      </div>
    </div>
  );
}
