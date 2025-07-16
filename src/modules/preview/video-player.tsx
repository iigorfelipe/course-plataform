'use client';

import { Play, Clock, Star, Users } from 'lucide-react';
import { Button } from '@components/ui/button';
import { Card, CardContent } from '@components/ui/card';
import { useAtomValue } from 'jotai';
import { courseAtom } from '@store/course';
import { getEmbedUrl, getTotalDuration } from '@utils/get';
import { useState } from 'react';

export const VideoPlayer = () => {
  const course = useAtomValue(courseAtom.course);
  const selectedLesson = useAtomValue(courseAtom.selectedLesson);
  const [urlVideo, setUrlVideo] = useState<string | null>(null);

  const getSelectedLesson = () => {
    if (!course || !selectedLesson) return null;
    for (const mod of course.modules) {
      const lesson = mod.lessons.find((l) => l.id === selectedLesson);
      if (lesson) return lesson;
    }
    return null;
  };

  const currentLesson = getSelectedLesson();

  const handlePlayVideo = () => {
    if (!currentLesson || !currentLesson.videoUrl) return;
    const embedUrl = getEmbedUrl(currentLesson.videoUrl);
    setUrlVideo(embedUrl);
  };

  return (
    <Card className="glass-effect border-white/20 animate-slide-up">
      <CardContent className="p-0">
        <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-xl flex items-center justify-center relative overflow-hidden">
          {course.thumbnail && !urlVideo && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={course.thumbnail || ''} alt={course.title} className="w-full h-full object-cover" />
          )}
          {urlVideo ? (
            <iframe
              src={urlVideo}
              width="560"
              height="315"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button
                  size="lg"
                  onClick={handlePlayVideo}
                  className="text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
                >
                  <Play className="size-6 mr-2" />
                  Reproduzir
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="p-4 sm:p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{currentLesson?.title || course.title}</h2>
          <p className="text-white/60 mb-4">{currentLesson?.description || course.description}</p>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <div className="flex items-center flex-col text-center gap-1 sm:flex-row">
              <Clock className="size-4" />
              {currentLesson?.duration || getTotalDuration(course)}
            </div>
            <div className="flex items-center gap-1 flex-col text-center sm:flex-row">
              <Users className="size-4" />
              1.2k visualizações
            </div>
            <div className="flex items-center gap-1 flex-col text-center sm:flex-row">
              <Star className="size-4 text-yellow-400" />
              4.8 (324 avaliações)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
