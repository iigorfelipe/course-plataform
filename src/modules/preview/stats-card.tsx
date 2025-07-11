'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { useAtomValue } from 'jotai';
import { courseAtom } from '@store/course';
import { getTotalDuration, getTotalLessons } from '@utils/get';

export const StatsCard = () => {
  const course = useAtomValue(courseAtom.course);

  return (
    <Card className="glass-effect border-white/20 animate-slide-up" style={{ animationDelay: '0.5s' }}>
      <CardHeader>
        <CardTitle className="text-white">Estatísticas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <p className="text-2xl font-bold text-blue-400">{course.modules.length}</p>
            <p className="text-xs text-white/60">Módulos</p>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <p className="text-2xl font-bold text-green-400">{getTotalLessons(course)}</p>
            <p className="text-xs text-white/60">Aulas</p>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <p className="text-2xl font-bold text-purple-400">{getTotalDuration(course)}</p>
            <p className="text-xs text-white/60">Duração</p>
          </div>
          <div className="text-center p-3 bg-white/5 rounded-lg">
            <p className="text-2xl font-bold text-yellow-400">4.8</p>
            <p className="text-xs text-white/60">Avaliação</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
