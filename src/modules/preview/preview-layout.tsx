import { BgPreview } from './background';
import { HeaderPreview } from './header';
import { VideoPlayer } from './video-player';
import { CourseInfo } from './course-info';
import { ProgressCard } from './progress-card';
import { ActionsCard } from './actions-card';
import { CourseContent } from './course-content';
import { StatsCard } from './stats-card';
import { useAtomValue } from 'jotai';
import { courseAtom } from '@store/course';

export const CoursePreviewLayout = () => {
  const isStudent = useAtomValue(courseAtom.previewMode) === 'student';

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
            {!isStudent && <ActionsCard />}
            <CourseContent />
            <StatsCard />
          </div>
        </div>
      </div>
    </div>
  );
};
